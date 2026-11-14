// Reads cards/*.md and vocab.json, plus private/cards/*.md and private/*.private.md when present.
// Writes ui/data.js and ui/private.js for the explorer, and ui/cards.md, ui/cards.json and
// ui/llms.txt for agents and scripts. Copies CHANGELOG.md to ui/changelog.md.
// --public ignores private/ and leaves out cards marked `publish: false`.
// --out <dir> also copies the finished site to <dir>.
// No dependencies. Frontmatter supports scalars, quoted strings and inline [a, b] lists.
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, copyFileSync } from "node:fs";
import { join, basename, resolve } from "node:path";

const root = import.meta.dirname;
const isPublic = process.argv.includes("--public");
const outArg = process.argv.indexOf("--out");
const outDir = outArg > -1 ? resolve(process.argv[outArg + 1]) : null;
const LINK = /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/g;

function parseValue(raw) {
  const v = raw.trim();
  if (v.startsWith("[") && v.endsWith("]")) {
    return v.slice(1, -1).split(",").map((s) => unquote(s.trim())).filter(Boolean);
  }
  return unquote(v);
}

function unquote(s) {
  return /^(["']).*\1$/.test(s) ? s.slice(1, -1) : s;
}

function parse(file) {
  const text = readFileSync(file, "utf8").replace(/\r\n/g, "\n");
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing frontmatter`);
  const meta = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (kv) meta[kv[1]] = parseValue(kv[2]);
  }
  return { meta, body: m[2].trim() };
}

function sections(body) {
  const out = { summary: "", sections: [] };
  let cur = null;
  for (const line of body.split("\n")) {
    const h = line.match(/^##\s+(.*)$/);
    if (h) {
      cur = { title: h[1].trim(), text: "" };
      out.sections.push(cur);
    } else if (cur) cur.text += line + "\n";
    else out.summary += line + "\n";
  }
  out.summary = out.summary.trim();
  out.sections.forEach((s) => (s.text = s.text.trim()));
  return out;
}

const links = (s) => [...s.matchAll(LINK)].map((m) => m[1].trim());
const inlineTags = (s) => [...s.matchAll(/(?:^|\s)#([a-z][\w/-]*)/g)].map((m) => m[1]);

const privDir = join(root, "private");
const mdFiles = (dir) => (existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => join(dir, f)) : []);
const cardFiles = mdFiles(join(root, "cards")).concat(isPublic ? [] : mdFiles(join(privDir, "cards")));
const parsed = cardFiles.map((f) => ({ id: basename(f, ".md"), ...parse(f) }));

// In a public build, drop unpublished cards and any mention of them:
// a parenthetical link is removed, and a sentence that links to one is removed.
const hidden = new Set(isPublic ? parsed.filter((p) => p.meta.publish === "false").map((p) => p.id) : []);
const mentionsHidden = (s) => [...s.matchAll(LINK)].some((m) => hidden.has(m[1].trim()));
const unlink = (text) =>
  text
    .split("\n")
    .map((line) => {
      if (!mentionsHidden(line)) return line;
      line = line.replace(/\s*\((\[\[[^\]]+\]\](?:,\s*)?)+\)/g, (m) => (mentionsHidden(m) ? "" : m));
      const [, lead = "", rest = line] = line.match(/^(\s*-\s+(?:\*\*[^*]+\*\*:\s*)?)(.*)$/) || [];
      return lead + rest.split(/(?<=\.)\s+/).filter((s) => !mentionsHidden(s)).join(" ");
    })
    .join("\n");

const cards = parsed
  .filter((p) => !hidden.has(p.id))
  .map(({ id, meta, body }) => {
    body = unlink(body);
    if (meta.part_of && hidden.has(links(meta.part_of)[0])) delete meta.part_of;
    const tags = [...new Set([...(meta.tags || []), ...inlineTags(body)])];
    const out = links(body).concat(meta.part_of ? links(meta.part_of) : []);
    return {
      id,
      name: meta.name || id,
      aliases: meta.aliases || [],
      type: meta.type || "",
      website: meta.website || "",
      part_of: meta.part_of ? links(meta.part_of)[0] : "",
      status: meta.status || "",
      participate: meta.participate || "",
      updated: meta.updated || "",
      tags,
      ...sections(body),
      links: [...new Set(out)].filter((l) => l !== id),
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

const ids = new Set(cards.map((c) => c.id));
for (const c of cards) {
  c.backlinks = cards.filter((o) => o.links.includes(c.id)).map((o) => o.id);
  for (const l of c.links) if (!ids.has(l)) console.warn(`dangling link in ${c.id}: [[${l}]]`);
}

const vocab = JSON.parse(readFileSync(join(root, "vocab.json"), "utf8"));
writeFileSync(join(root, "ui", "data.js"), `window.CARDS = ${JSON.stringify(cards, null, 1)};\nwindow.VOCAB = ${JSON.stringify(vocab, null, 1)};\n`);
console.log(`${cards.length} cards -> ui/data.js` + (hidden.size ? ` (left out: ${[...hidden.keys()].join(", ")})` : ""));

const priv = {};
if (!isPublic && existsSync(privDir)) {
  for (const f of readdirSync(privDir).filter((f) => f.endsWith(".private.md"))) {
    const { meta, body } = parse(join(privDir, f));
    const id = meta.card ? links(meta.card)[0] : basename(f, ".private.md");
    if (!ids.has(id) && !hidden.has(id)) console.warn(`private note ${f} points at unknown card ${id}`);
    priv[id] = sections(body);
  }
}
writeFileSync(
  join(root, "ui", "private.js"),
  `window.PRIVATE = ${isPublic ? "null" : JSON.stringify(priv, null, 1)};\n`,
);
console.log(isPublic ? "private notes excluded (--public)" : `${Object.keys(priv).length} private notes -> ui/private.js`);

// Plain files for agents and scripts: the same cards as JSON and Markdown, and an llms.txt that points at them.
const SITE = "https://www.olahungerford.com/content-provenance/";
const asOf = cards.map((c) => c.updated).filter(Boolean).sort().pop() || "";
const byId = Object.fromEntries(cards.map((c) => [c.id, c]));
const nameOf = (id) => (byId[id] ? byId[id].name : id);
const md = (s, base = "") => s.replace(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]/g, (m, id, label) => `[${label || nameOf(id.trim())}](${base}#${id.trim()})`);
const label = (t) => vocab.labels[t] || t.slice(t.indexOf("/") + 1).replace(/-/g, " ");
const blurb = `${cards.length} cards for the organizations, working groups, specifications and proposals that decide where content came from (provenance), what may be done with it (access, licensing, payment) and whether its source gets credited (attribution), and where the Model Context Protocol fits among them.`;
const caveat = "One person's working notes. Status lines carry the dates the sources gave, so check upstream before relying on one.";

function cardMd(c) {
  const rows = [
    `- Id: ${c.id}`,
    c.aliases.length ? `- Also known as: ${c.aliases.join(", ")}` : "",
    `- Type: ${c.type}`,
    c.status ? `- Status: ${md(c.status)}` : "",
    c.website ? `- Website: ${c.website}` : "",
    c.part_of ? `- Part of: [${nameOf(c.part_of)}](#${c.part_of})` : "",
    c.participate ? `- Take part: ${c.participate}` : "",
    `- Tags: ${c.tags.join(", ")}`,
    c.updated ? `- Updated: ${c.updated}` : "",
    `- Explorer: ${SITE}#${c.id}`,
  ].filter(Boolean);
  const parts = [`### ${c.name}`, "", ...rows, "", md(c.summary)];
  for (const s of c.sections) parts.push("", `#### ${s.title}`, "", md(s.text));
  if (c.backlinks.length) parts.push("", `Linked from: ${c.backlinks.map((b) => `[${nameOf(b)}](#${b})`).join(", ")}`);
  return parts.join("\n") + "\n";
}

const cardsMd = [
  "# Content Provenance, Access and Attribution: A Field Guide",
  "",
  `${blurb} Compiled by Ola Hungerford (https://www.olahungerford.com/about/)${asOf ? ", as of " + asOf : ""}. ${caveat}`,
  "",
  `Explorer for people: ${SITE}. The same cards as JSON: ${SITE}cards.json. What changed and when: ${SITE}changelog.md. Links between cards point at the card's heading in this file; each card also has an Id line.`,
  "",
  "## Layers",
  "",
  ...Object.entries(vocab.layers).map(([k, v]) => `- ${k}: ${v}.`),
  "",
  "## Stages",
  "",
  "Where a card sits on the path content takes through an agent. Not every card has one.",
  "",
  ...Object.entries(vocab.stages).map(([k, v]) => `- ${label("stage/" + k)}: ${v}.`),
  "",
  "## Cards",
  "",
  ...cards.map(cardMd),
].join("\n");

const llms = `# Content Provenance, Access and Attribution: A Field Guide

> ${blurb} Compiled by Ola Hungerford${asOf ? ", as of " + asOf : ""}.

${caveat} Each card has a name, type, status, website, tags (layer, stage, type), a short summary, topic sections, links to related cards and, where there is one, a public place to take part.

## Cards

- [All cards as Markdown](${SITE}cards.md): one file, one section per card, with the layer and stage definitions first
- [All cards as JSON](${SITE}cards.json): the same cards as structured data, with the vocabularies under "vocab"

## Optional

- [Explorer](${SITE}): the list and graph view for people
- [Changelog](${SITE}changelog.md): cards added and changed, by date
- [About the author](https://www.olahungerford.com/about/)
`;

const json = {
  title: "Content Provenance, Access and Attribution: A Field Guide",
  description: blurb,
  author: { name: "Ola Hungerford", url: "https://www.olahungerford.com/about/" },
  as_of: asOf,
  explorer: SITE,
  markdown: SITE + "cards.md",
  changelog: SITE + "changelog.md",
  note: caveat,
  vocab,
  cards: cards.map((c) => ({ ...c, url: SITE + "#" + c.id })),
};

writeFileSync(join(root, "ui", "cards.md"), cardsMd);
writeFileSync(join(root, "ui", "cards.json"), JSON.stringify(json, null, 1) + "\n");
writeFileSync(join(root, "ui", "llms.txt"), llms);
console.log(`${cards.length} cards -> ui/cards.md, ui/cards.json, ui/llms.txt`);

// The changelog is written by hand. Its [[links]] become links into the explorer.
const changelog = unlink(readFileSync(join(root, "CHANGELOG.md"), "utf8").replace(/\r\n/g, "\n"));
for (const l of links(changelog)) if (!ids.has(l)) console.warn(`dangling link in CHANGELOG.md: [[${l}]]`);
writeFileSync(join(root, "ui", "changelog.md"), md(changelog, SITE));
console.log("CHANGELOG.md -> ui/changelog.md");

if (outDir) {
  if (!isPublic) throw new Error("--out only runs with --public, so private notes never leave this repo");
  mkdirSync(outDir, { recursive: true });
  for (const f of ["index.html", "data.js", "private.js", "cards.md", "cards.json", "llms.txt", "changelog.md"]) copyFileSync(join(root, "ui", f), join(outDir, f));
  console.log(`site copied to ${outDir}`);
}

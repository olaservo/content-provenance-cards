// Reads cards/*.md and vocab.json, plus private/cards/*.md and private/*.private.md when present.
// Writes ui/data.js and ui/private.js for the explorer, and ui/cards.md, ui/cards.json,
// ui/updates.md, ui/updates.json and ui/llms.txt for agents and scripts. Copies CHANGELOG.md to ui/changelog.md.
// --public ignores private/ and leaves out cards marked `publish: false`.
// --out <dir> also copies the finished site to <dir>.
// --worker also writes the site the Cloudflare Worker serves to worker/site, and the skills and card data it bundles to worker/generated.
// --site <url> sets the URL the output is published at.
// No dependencies. Frontmatter supports scalars, quoted strings and inline [a, b] lists.
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, copyFileSync, rmSync, statSync } from "node:fs";
import { join, basename, resolve, dirname } from "node:path";

const root = import.meta.dirname;
const isPublic = process.argv.includes("--public");
const workerMode = process.argv.includes("--worker");
const outArg = process.argv.indexOf("--out");
const outDir = outArg > -1 ? resolve(process.argv[outArg + 1]) : null;
const siteArg = process.argv.indexOf("--site");
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

// "## History" bullets are dated events: "- 2026-11-12: what happened". A date is YYYY, YYYY-MM or YYYY-MM-DD.
const DATED = /^-\s+(\d{4}(?:-\d{2}){0,2}):\s+(.+)$/;
for (const c of cards) {
  const lines = (c.sections.find((s) => s.title === "History")?.text || "").split("\n").filter((l) => l.trim());
  c.history = [];
  for (const line of lines) {
    const m = line.match(DATED);
    if (m) c.history.push({ date: m[1], text: m[2] });
    else console.warn(`history line without a date in ${c.id}: ${line}`);
  }
  c.history.sort((a, b) => b.date.localeCompare(a.date));
}

// A status whose dates all come before the card's newest History entry has probably gone stale.
const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const statusDates = (s) => [
  ...[...s.matchAll(/\b\d{4}-\d{2}(?:-\d{2})?\b/g)].map((m) => m[0]),
  ...[...s.matchAll(new RegExp(`\\b(${MONTHS.join("|")}) (\\d{4})\\b`, "gi"))].map((m) => `${m[2]}-${String(MONTHS.indexOf(m[1].toLowerCase()) + 1).padStart(2, "0")}`),
];
for (const c of cards) {
  const newest = c.history[0]?.date;
  const inStatus = statusDates(c.status).sort().pop();
  if (!newest || !inStatus) continue;
  const n = Math.min(newest.length, inStatus.length);
  if (newest.slice(0, n) > inStatus.slice(0, n)) console.warn(`status of ${c.id} stops at ${inStatus} but its history goes to ${newest}`);
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
const SITE = siteArg > -1 ? process.argv[siteArg + 1].replace(/\/*$/, "/") : "https://www.olahungerford.com/content-provenance/";
const TITLE = "Content Provenance, Access and Attribution: A Field Guide";
const REPO = "https://github.com/olaservo/content-provenance-cards";
const asOf = cards.map((c) => c.updated).filter(Boolean).sort().pop() || "";
const byId = Object.fromEntries(cards.map((c) => [c.id, c]));
const nameOf = (id) => (byId[id] ? byId[id].name : id);
const WIKI = /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]*))?\]\]/g;
const inFile = (id) => "#" + id;
const inExplorer = (id) => SITE + "#" + id;
// Turns [[links]] into Markdown links. `href` says where a card lives in the file being written.
const md = (s, href = inFile) => s.replace(WIKI, (m, id, label) => `[${label || nameOf(id.trim())}](${href(id.trim())})`);
const plain = (s) => s.replace(WIKI, (m, id, label) => label || nameOf(id.trim()));
const label = (t) => vocab.labels[t] || t.slice(t.indexOf("/") + 1).replace(/-/g, " ");
const blurb = `${cards.length} cards for the organizations, working groups, specifications and proposals that decide where content came from (provenance), what may be done with it (access, licensing, payment) and whether its source gets credited (attribution), and where the Model Context Protocol fits among them.`;
const caveat = "One person's working notes. Status lines carry the dates the sources gave, so check upstream before relying on one.";

function cardMd(c, href = inFile, level = 3) {
  const h = "#".repeat(level);
  const rows = [
    `- Id: ${c.id}`,
    c.aliases.length ? `- Also known as: ${c.aliases.join(", ")}` : "",
    `- Type: ${c.type}`,
    c.status ? `- Status: ${md(c.status, href)}` : "",
    c.website ? `- Website: ${c.website}` : "",
    c.part_of ? `- Part of: [${nameOf(c.part_of)}](${href(c.part_of)})` : "",
    c.participate ? `- Take part: ${c.participate}` : "",
    `- Tags: ${c.tags.join(", ")}`,
    c.updated ? `- Updated: ${c.updated}` : "",
    `- Explorer: ${SITE}#${c.id}`,
  ].filter(Boolean);
  const parts = [`${h} ${c.name}`, "", ...rows, "", md(c.summary, href)];
  for (const s of c.sections) parts.push("", `${h}# ${s.title}`, "", md(s.text, href));
  if (c.backlinks.length) parts.push("", `Linked from: ${c.backlinks.map((b) => `[${nameOf(b)}](${href(b)})`).join(", ")}`);
  return parts.join("\n") + "\n";
}

// Every card's History entries in one list, newest first.
const updates = cards
  .flatMap((c) => c.history.map((e) => ({ date: e.date, card: c.id, name: c.name, text: e.text })))
  .sort((a, b) => b.date.localeCompare(a.date) || a.name.localeCompare(b.name));
const updatesMd = (href) =>
  [
    "# Updates",
    "",
    "Dated events from the History section of each card, newest first. These are things that happened to the efforts the cards describe. Edits to the guide itself are in the changelog.",
    "",
    ...updates.map((u) => `- ${u.date} [${u.name}](${href(u.card)}): ${md(u.text, href)}`),
    "",
  ].join("\n");

const cardsMd = [
  `# ${TITLE}`,
  "",
  `${blurb} Compiled by Ola Hungerford (https://www.olahungerford.com/about/)${asOf ? ", as of " + asOf : ""}. ${caveat}`,
  "",
  `Explorer for people: ${SITE}. The same cards as JSON: ${SITE}cards.json. Dated events across all cards: ${SITE}updates.md. What changed in the guide and when: ${SITE}changelog.md. Links between cards point at the card's heading in this file; each card also has an Id line.`,
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
  ...cards.map((c) => cardMd(c)),
].join("\n");

const llmsHead = `# ${TITLE}

> ${blurb} Compiled by Ola Hungerford${asOf ? ", as of " + asOf : ""}.

${caveat} Each card has a name, type, status, website, tags (layer, stage, type), a short summary, topic sections, a dated history where one is known, links to related cards and, where there is one, a public place to take part.
`;
const llms = `${llmsHead}
## Cards

- [All cards as Markdown](${SITE}cards.md): one file, one section per card, with the layer and stage definitions first
- [All cards as JSON](${SITE}cards.json): the same cards as structured data, with the vocabularies under "vocab"
- [Updates](${SITE}updates.md): dated events from every card's history, newest first, also as [JSON](${SITE}updates.json)

## Optional

- [Explorer](${SITE}): the list and graph view for people
- [Changelog](${SITE}changelog.md): cards added and changed in the guide, by date
- [About the author](https://www.olahungerford.com/about/)
`;

const json = {
  title: TITLE,
  description: blurb,
  author: { name: "Ola Hungerford", url: "https://www.olahungerford.com/about/" },
  as_of: asOf,
  explorer: SITE,
  markdown: SITE + "cards.md",
  updates: SITE + "updates.json",
  changelog: SITE + "changelog.md",
  note: caveat,
  vocab,
  cards: cards.map((c) => ({ ...c, url: SITE + "#" + c.id })),
};
const updatesJson = {
  title: `${TITLE}: updates`,
  description: "Dated events from the History section of each card, newest first.",
  as_of: asOf,
  cards: SITE + "cards.json",
  updates: updates.map((u) => ({ ...u, url: SITE + "#" + u.card })),
};

// The changelog is written by hand. Its [[links]] become links into the explorer.
const changelogSrc = unlink(readFileSync(join(root, "CHANGELOG.md"), "utf8").replace(/\r\n/g, "\n"));
for (const l of links(changelogSrc)) if (!ids.has(l)) console.warn(`dangling link in CHANGELOG.md: [[${l}]]`);
const changelog = md(changelogSrc, inExplorer);

const flat = {
  "cards.md": cardsMd,
  "cards.json": JSON.stringify(json, null, 1) + "\n",
  "updates.md": updatesMd(inExplorer),
  "updates.json": JSON.stringify(updatesJson, null, 1) + "\n",
  "llms.txt": llms,
  "changelog.md": changelog,
};
for (const [f, text] of Object.entries(flat)) writeFileSync(join(root, "ui", f), text);
console.log(`${cards.length} cards, ${updates.length} dated events -> ui/${Object.keys(flat).join(", ui/")}`);

if (outDir) {
  if (!isPublic) throw new Error("--out only runs with --public, so private notes never leave this repo");
  mkdirSync(outDir, { recursive: true });
  for (const f of ["index.html", "data.js", "private.js", ...Object.keys(flat)]) copyFileSync(join(root, "ui", f), join(outDir, f));
  console.log(`site copied to ${outDir}`);
}

// The Worker's site: the explorer and the flat files, plus one file per card, static HTML that reads
// without JavaScript, the skills, and a sitemap and robots.txt for its own origin.
if (workerMode) {
  if (!isPublic) throw new Error("--worker only runs with --public, so private notes never leave this repo");
  const site = {};
  const esc = (s) => s.replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);
  const yaml = (v) => (Array.isArray(v) ? `[${v.map((x) => JSON.stringify(x)).join(", ")}]` : JSON.stringify(v));
  const front = (fields) => ["---", ...Object.entries(fields).filter(([, v]) => v && v.length).map(([k, v]) => `${k}: ${yaml(v)}`), "---", ""].join("\n");
  const layersOf = (c) => c.tags.filter((t) => t.startsWith("layer/")).map((t) => t.slice(6));
  const line = (c, href) => `- [${c.name}](${href(c.id)}) (${[c.type, ...layersOf(c)].join(", ")})${c.status ? ": " + plain(c.status) : ""}`;

  // Markdown. Links are relative, so the same bytes work on the site and inside the skill.
  const sibling = (id) => id + ".md";
  const fromRoot = (id) => "cards/" + id + ".md";
  const cardFile = (c) =>
    front({ title: c.name, id: c.id, type: c.type, status: plain(c.status), tags: c.tags, updated: c.updated, canonical: SITE + "cards/" + c.id }) + cardMd(c, sibling, 1);
  const vocabulary = [
    "# Vocabulary",
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
  ].join("\n");
  const cardIndex = ["# Cards", "", "One line per card: name, type and layers, then the current status.", "", ...cards.map((c) => line(c, fromRoot)), ""].join("\n");
  const layerFile = (l) =>
    [`# Layer: ${l}`, "", `${l[0].toUpperCase() + l.slice(1)}: ${vocab.layers[l]}.`, "", ...cards.filter((c) => layersOf(c).includes(l)).map((c) => line(c, (id) => "../cards/" + id + ".md")), ""].join("\n");
  const READER = "content-provenance-field-guide";
  const CONTRIBUTOR = "content-provenance-field-guide-contributor";

  const indexMd =
    front({ title: TITLE, description: blurb, updated: asOf, canonical: SITE }) +
    [
      `# ${TITLE}`,
      "",
      `${blurb} Compiled by Ola Hungerford (https://www.olahungerford.com/about/)${asOf ? ", as of " + asOf : ""}. ${caveat}`,
      "",
      "## How to read this guide",
      "",
      "- One card per file: `cards/<id>.md` and `cards/<id>.json`. The ids are in the list below.",
      `- Cards by layer: ${Object.keys(vocab.layers).map((l) => `[${l}](layers/${l}.md)`).join(", ")}.`,
      "- [Updates](updates.md): dated events across all cards, newest first. Also as [JSON](updates.json).",
      "- [Changelog](changelog.md): cards added and changed in the guide.",
      "- Everything in one file: [cards.md](cards.md) or [cards.json](cards.json).",
      `- As an agent skill: [${READER}](skills/${READER}/SKILL.md). To suggest a change: [${CONTRIBUTOR}](skills/${CONTRIBUTOR}/SKILL.md).`,
      `- Over MCP: ${SITE}mcp serves both skills with the Skills extension, plus tools to search cards and list updates.`,
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
      ...cards.map((c) => line(c, fromRoot)),
      "",
    ].join("\n");

  Object.assign(site, flat, { "index.md": indexMd, "updates.md": updatesMd(fromRoot) });
  for (const c of cards) {
    site[`cards/${c.id}.md`] = cardFile(c);
    site[`cards/${c.id}.json`] = JSON.stringify({ ...c, url: SITE + "cards/" + c.id, explorer: SITE + "#" + c.id }, null, 1) + "\n";
  }
  for (const l of Object.keys(vocab.layers)) site[`layers/${l}.md`] = layerFile(l);

  // Skills. skills/<name>/ is written by hand; the reader skill also gets the cards as references.
  const skills = {};
  const walk = (dir, rel = "") => {
    for (const f of readdirSync(dir)) {
      const p = join(dir, f);
      if (statSync(p).isDirectory()) walk(p, rel + f + "/");
      else skills[rel + f] = readFileSync(p, "utf8").replace(/\r\n/g, "\n").replaceAll("{{site}}", SITE).replaceAll("{{repo}}", REPO);
    }
  };
  walk(join(root, "skills"));
  const ref = `${READER}/references/`;
  skills[ref + "index.md"] = cardIndex;
  skills[ref + "vocabulary.md"] = vocabulary;
  skills[ref + "updates.md"] = site["updates.md"];
  skills[ref + "changelog.md"] = changelog;
  for (const c of cards) skills[`${ref}cards/${c.id}.md`] = site[`cards/${c.id}.md`];
  for (const l of Object.keys(vocab.layers)) skills[`${ref}layers/${l}.md`] = site[`layers/${l}.md`];
  for (const [f, text] of Object.entries(skills)) site["skills/" + f] = text;

  site["llms.txt"] = `${llmsHead}
## Start here

- [Guide index](${SITE}index.md): how the guide is laid out, the layer and stage definitions, and one line per card
- [Updates](${SITE}updates.md): dated events from every card's history, newest first, also as [JSON](${SITE}updates.json)
- [Changelog](${SITE}changelog.md): cards added and changed in the guide, by date

## Cards

- [All cards as Markdown](${SITE}cards.md): one file, one section per card
- [All cards as JSON](${SITE}cards.json): the same cards as structured data, with the vocabularies under "vocab"
${Object.keys(vocab.layers).map((l) => `- [Layer: ${l}](${SITE}layers/${l}.md): the cards on the ${l} layer`).join("\n")}

One card is at ${SITE}cards/<id>.md and ${SITE}cards/<id>.json. The ids are in the guide index.

## Skills and MCP

- [Field guide skill](${SITE}skills/${READER}/SKILL.md): how to answer questions from the guide, loading only the cards a question needs
- [Contributor skill](${SITE}skills/${CONTRIBUTOR}/SKILL.md): when and how to suggest a new card or a correction

An MCP server at ${SITE}mcp serves both skills with the Skills extension (io.modelcontextprotocol/skills), plus tools to search cards and list updates.

## Optional

- [Explorer](${SITE}): the list and graph view for people
- [Cards as HTML](${SITE}cards/): the same cards as plain pages
- [Source](${REPO}): the cards as Markdown files, and where corrections go
- [About the author](https://www.olahungerford.com/about/)
`;

  // HTML that reads without JavaScript: an index and a page per card.
  const inline = (s, href) =>
    esc(s)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(WIKI, (m, id, text) => `<a href="${href(id.trim())}">${esc(text || nameOf(id.trim()))}</a>`)
      .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2">$1</a>');
  const block = (text, href) => {
    const out = [];
    let list = null;
    for (const l of text.split("\n")) {
      const li = l.match(/^\s*-\s+(.*)$/);
      if (li) {
        if (!list) out.push((list = []));
        list.push(li[1]);
        continue;
      }
      list = null;
      if (l.trim()) out.push(l);
    }
    return out.map((b) => (Array.isArray(b) ? `<ul>${b.map((i) => `<li>${inline(i, href)}</li>`).join("")}</ul>` : `<p>${inline(b, href)}</p>`)).join("\n");
  };
  const page = ({ title, description, path, alternate, ld, body }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${SITE}${path}">
<link rel="alternate" type="text/markdown" href="${SITE}${alternate}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="article">
<meta property="og:url" content="${SITE}${path}">
<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>
<style>
  :root { color-scheme: light dark; }
  body { font: 16px/1.55 system-ui, sans-serif; max-width: 72ch; margin: 0 auto; padding: 24px 16px 48px; }
  nav, .meta, footer { font-size: 14px; }
  .meta { margin: 0 0 16px; }
  h1 { font-size: 26px; margin: 16px 0 8px; }
  h2 { font-size: 18px; margin: 24px 0 4px; }
  ul { padding-left: 20px; }
  li { margin: 4px 0; }
  footer { margin-top: 32px; }
</style>
</head>
<body>
<nav><a href="${SITE}">${esc(TITLE)}</a> · <a href="${SITE}cards/">All cards</a> · <a href="${SITE}updates.md">Updates</a></nav>
${body}
<footer>Compiled by <a href="https://www.olahungerford.com/about/">Ola Hungerford</a>${asOf ? ", as of " + asOf : ""}. ${esc(caveat)} Also as <a href="${SITE}${alternate}">Markdown</a>. Source on <a href="${REPO}">GitHub</a>.</footer>
</body>
</html>
`;
  const author = { "@type": "Person", name: "Ola Hungerford", url: "https://www.olahungerford.com/about/" };
  const toCard = (id) => id;
  for (const c of cards) {
    const summary = plain(c.summary);
    const rows = [
      esc(c.type) + (c.part_of ? ` · part of <a href="${c.part_of}">${esc(nameOf(c.part_of))}</a>` : "") + (c.website ? ` · <a href="${esc(c.website)}">${esc(c.website.replace(/^https?:\/\//, ""))}</a>` : ""),
      c.aliases.length ? `Also: ${esc(c.aliases.join(", "))}` : "",
      c.status ? `Status: ${inline(c.status, toCard)}${c.updated ? ` (as of ${c.updated})` : ""}` : "",
      c.participate ? `Take part: ${inline(c.participate, toCard)}` : "",
      `Tags: ${esc(c.tags.join(", "))}`,
    ].filter(Boolean);
    site[`cards/${c.id}.html`] = page({
      title: `${c.name} · ${TITLE}`,
      description: summary,
      path: `cards/${c.id}`,
      alternate: `cards/${c.id}.md`,
      ld: {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: c.name,
        description: summary,
        url: SITE + "cards/" + c.id,
        dateModified: c.updated || asOf,
        author,
        isPartOf: { "@type": "CreativeWork", name: TITLE, url: SITE },
        about: { "@type": "Thing", name: c.name, ...(c.aliases.length ? { alternateName: c.aliases } : {}), ...(c.website ? { url: c.website } : {}) },
      },
      body: [
        `<h1>${esc(c.name)}</h1>`,
        `<p class="meta">${rows.join("<br>")}</p>`,
        block(c.summary, toCard),
        ...c.sections.map((s) => `<h2>${esc(s.title)}</h2>\n${block(s.text, toCard)}`),
        c.backlinks.length ? `<h2>Linked from</h2>\n<ul>${c.backlinks.map((b) => `<li><a href="${b}">${esc(nameOf(b))}</a></li>`).join("")}</ul>` : "",
        `<p><a href="${SITE}#${c.id}">Open in the explorer</a></p>`,
      ].join("\n"),
    });
  }
  site["cards/index.html"] = page({
    title: `All cards · ${TITLE}`,
    description: blurb,
    path: "cards/",
    alternate: "index.md",
    ld: {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: TITLE,
      description: blurb,
      url: SITE,
      dateModified: asOf,
      creator: author,
      distribution: [
        { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: SITE + "cards.json" },
        { "@type": "DataDownload", encodingFormat: "text/markdown", contentUrl: SITE + "cards.md" },
      ],
    },
    body: [
      "<h1>All cards</h1>",
      `<p>${esc(blurb)}</p>`,
      `<ul>${cards.map((c) => `<li><a href="${c.id}">${esc(c.name)}</a> (${esc([c.type, ...layersOf(c)].join(", "))})${c.status ? ": " + esc(plain(c.status)) : ""}</li>`).join("\n")}</ul>`,
    ].join("\n"),
  });

  // Same preferences as olahungerford.com's robots.txt: search and answer-time use yes, training no.
  site["robots.txt"] = `User-Agent: *
Allow: /
Content-Usage: train-ai=n
Content-Signal: search=yes, ai-input=yes, ai-train=no

User-Agent: __usage_ai-training
Disallow: /

Sitemap: ${SITE}sitemap.xml
`;
  const loc = (path, date) => `<url><loc>${SITE}${path}</loc>${date ? `<lastmod>${date}</lastmod>` : ""}</url>`;
  site["sitemap.xml"] = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[loc("", asOf), loc("cards/", asOf), ...cards.map((c) => loc("cards/" + c.id, c.updated))].join("\n")}
</urlset>
`;

  const siteDir = join(root, "worker", "site");
  const genDir = join(root, "worker", "generated");
  rmSync(siteDir, { recursive: true, force: true });
  const put = (dir, f, text) => {
    mkdirSync(dirname(join(dir, f)), { recursive: true });
    writeFileSync(join(dir, f), text);
  };
  for (const [f, text] of Object.entries(site)) put(siteDir, f, text);
  for (const f of ["index.html", "data.js", "private.js"]) copyFileSync(join(root, "ui", f), join(siteDir, f));
  put(genDir, "skills.json", JSON.stringify(skills));
  put(genDir, "data.json", JSON.stringify({ site: SITE, title: TITLE, as_of: asOf, vocab, cards, updates }));
  console.log(`${Object.keys(site).length + 3} files -> worker/site, ${Object.keys(skills).length} skill files -> worker/generated`);
}

// Reads cards/*.md, vocab.json and watchlist.json, plus private/cards/*.md and private/*.private.md when present.
// Writes ui/data.js and ui/private.js for the explorer, and ui/cards.md, ui/cards.json, ui/updates.md, ui/updates.json,
// ui/watch.md, ui/watch.json, ui/topics/<topic>.md and ui/llms.txt for agents and scripts. Copies CHANGELOG.md to ui/changelog.md.
// --public ignores private/ and leaves out cards marked `publish: false`.
// --out <dir> also copies the finished site to <dir>.
// --worker also writes the site the Cloudflare Worker serves to worker/site, the skills and card data it bundles to worker/generated,
// and the same skills as an Agent Plugins package to plugin/.
// --site <url> sets the URL the output is published at.
// No dependencies. Frontmatter supports scalars, quoted strings and inline [a, b] lists.
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync, copyFileSync, rmSync, statSync } from "node:fs";
import { join, basename, resolve, dirname } from "node:path";
import { execSync } from "node:child_process";

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
// `news` and `feed` take one URL or an inline list.
const urls = (v) => (Array.isArray(v) ? v : v ? [v] : []);
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
    // A link that appears only under "## Compare" is a comparison made by the guide, not a connection a source states.
    const sec = sections(body);
    const firm = new Set(links(sec.summary).concat(...sec.sections.filter((s) => s.title !== "Compare").map((s) => links(s.text)), meta.part_of ? links(meta.part_of) : []));
    const compares = [...new Set(links(sec.sections.find((s) => s.title === "Compare")?.text || ""))].filter((l) => l !== id && !firm.has(l));
    return {
      id,
      name: meta.name || id,
      aliases: meta.aliases || [],
      type: meta.type || "",
      website: meta.website || "",
      news: urls(meta.news),
      feed: urls(meta.feed),
      part_of: meta.part_of ? links(meta.part_of)[0] : "",
      status: meta.status || "",
      // `participate` is the old name for `contribute`. Forks and open pull requests may still use it.
      contribute: meta.contribute || meta.participate || "",
      discussion: meta.discussion || "",
      meetings: meta.meetings || "",
      updated: meta.updated || "",
      tags,
      ...sec,
      links: [...new Set(out)].filter((l) => l !== id),
      compares,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));
for (const p of parsed) if (p.meta.participate) console.warn(`${p.id}: rename participate to contribute`);

const ids = new Set(cards.map((c) => c.id));
for (const c of cards) {
  c.backlinks = cards.filter((o) => o.links.includes(c.id)).map((o) => o.id);
  for (const l of c.links) if (!ids.has(l)) console.warn(`dangling link in ${c.id}: [[${l}]]`);
}

// Where each effort posts its news, plus the sources in watchlist.json that have no card. A watcher reads both from watch.json.
const watchlist = JSON.parse(readFileSync(join(root, "watchlist.json"), "utf8")).map((w) => ({ ...w, news: urls(w.news), feed: urls(w.feed) }));
for (const s of [...cards, ...watchlist]) for (const u of [...s.news, ...s.feed]) if (!/^https?:\/\/\S+$/.test(u)) console.warn(`news or feed of ${s.id} is not a URL: ${u}`);
for (const w of watchlist) if (ids.has(w.id)) console.warn(`watchlist.json: ${w.id} has a card, so its news and feed belong there`);
const watched = cards.filter((c) => c.news.length || c.feed.length);

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
// The Worker serves one file per card. The site's llms.txt points at it.
const WORKER = "https://content-provenance-field-guide.olahungerford.workers.dev/";
const READER = "content-provenance-field-guide";
const CONTRIBUTOR = "content-provenance-field-guide-contributor";
const FEEDBACK = "content-provenance-field-guide-feedback";
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
// A topic/ tag marks a subject that cards on different layers share. vocab.json defines each one.
const topics = Object.keys(vocab.topics);
const topicsOf = (c) => c.tags.filter((t) => t.startsWith("topic/")).map((t) => t.slice(6));
for (const c of cards) for (const t of topicsOf(c)) if (!topics.includes(t)) console.warn(`topic/${t} on ${c.id} has no definition in vocab.json`);
const layersOf = (c) => c.tags.filter((t) => t.startsWith("layer/")).map((t) => t.slice(6));
const line = (c, href) => `- [${c.name}](${href(c.id)}) (${[c.type, ...layersOf(c)].join(", ")})${c.status ? ": " + plain(c.status) : ""}`;
const topicFile = (t, href) =>
  [`# Topic: ${t}`, "", `${t[0].toUpperCase() + t.slice(1)}: ${vocab.topics[t]}.`, "", ...cards.filter((c) => topicsOf(c).includes(t)).map((c) => line(c, href)), ""].join("\n");
const topicDefs = ["## Topic tags", "", "Subjects that cards on different layers share.", "", ...Object.entries(vocab.topics).map(([k, v]) => `- ${k}: ${v}.`)];
// Contribute, Discussion and Meetings: the public places to take part that a card lists.
const PART = Object.keys(vocab.participation);
const partLabel = (k) => k[0].toUpperCase() + k.slice(1);
const partDefs = [
  "## Ways to take part",
  "",
  "A card lists the public places the effort itself names. A line is left out when none was found.",
  "",
  ...Object.entries(vocab.participation).map(([k, v]) => `- ${partLabel(k)}: ${v}.`),
];
const blurb = `${cards.length} cards for the organizations, working groups, specifications and proposals that decide where content came from (provenance), what may be done with it (access, licensing, payment) and whether its source gets credited (attribution), and where the Model Context Protocol fits among them.`;
const caveat = `This field guide is an early alpha, shared for feedback. Card fields, the MCP tools, the plugin layout and the published file formats may change. Send feedback as an issue or pull request at ${REPO}. One person's working notes. Status lines carry the dates the sources gave, so check upstream before relying on one.`;
// The cards and everything built from them are CC BY 4.0. The code is MIT. See the README.
const LICENCE = "https://creativecommons.org/licenses/by/4.0/";
const licence = `The cards are licensed under CC BY 4.0 (${LICENCE}): reuse them with credit to Ola Hungerford and a link to the guide.`;

function cardMd(c, href = inFile, level = 3) {
  const h = "#".repeat(level);
  const rows = [
    `- Id: ${c.id}`,
    c.aliases.length ? `- Also known as: ${c.aliases.join(", ")}` : "",
    `- Type: ${c.type}`,
    c.status ? `- Status: ${md(c.status, href)}` : "",
    c.website ? `- Website: ${c.website}` : "",
    c.news.length ? `- News: ${c.news.join(", ")}` : "",
    c.feed.length ? `- Feed: ${c.feed.join(", ")}` : "",
    c.part_of ? `- Part of: [${nameOf(c.part_of)}](${href(c.part_of)})` : "",
    ...PART.map((k) => (c[k] ? `- ${partLabel(k)}: ${c[k]}` : "")),
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

const watchLines = (s) => [s.news.length ? `  - News: ${s.news.join(", ")}` : "", s.feed.length ? `  - Feed: ${s.feed.join(", ")}` : ""].filter(Boolean);
const watchMd = (href) =>
  [
    "# Watch list",
    "",
    "Where each effort in the guide posts its blog or announcements, with a feed where it has one. For a specification that lives in a repository, this can be its releases page. A card with no entry here had no news page of its own when checked. The same list as JSON is in watch.json.",
    "",
    "## Cards",
    "",
    ...watched.flatMap((c) => [`- [${c.name}](${href(c.id)})`, ...watchLines(c)]),
    "",
    "## Other sources",
    "",
    "Sources that have no card and are worth following.",
    "",
    ...watchlist.flatMap((w) => [`- ${w.name}${w.note ? ": " + w.note : ""}`, ...watchLines(w)]),
    "",
  ].join("\n");

const cardsMd = [
  `# ${TITLE}`,
  "",
  `${blurb} Compiled by Ola Hungerford (https://www.olahungerford.com/about/)${asOf ? ", as of " + asOf : ""}. ${caveat} ${licence}`,
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
  "## Media",
  "",
  "The kind of content an effort is about, where its own material names one. A card with no medium tag is media-neutral.",
  "",
  ...Object.entries(vocab.media).map(([k, v]) => `- ${k}: ${v}.`),
  "",
  ...topicDefs,
  "",
  ...partDefs,
  "",
  "## Cards",
  "",
  ...cards.map((c) => cardMd(c)),
].join("\n");

const llmsHead = `# ${TITLE}

> ${blurb} Compiled by Ola Hungerford${asOf ? ", as of " + asOf : ""}.

${caveat} ${licence} Each card has a name, type, status, website, tags (layer, stage, medium, topic, type), a short summary, topic sections, a dated history where one is known, links to related cards and, where the effort names them, public places to take part: Contribute (issue tracker, repository or join page), Discussion (chat, forum or mailing list) and Meetings (public calendar or list of open calls). A link under a card's Compare heading is a comparison made by this guide. Every other link is a connection that a primary source states.
`;
// The per-card files come first. An agent that starts with cards.md reads every card to answer about one.
const llms = `${llmsHead}
## One card at a time

A prototype at ${WORKER} serves each card as its own file. It is experimental and its address may move.

- [Guide index](${WORKER}index.md): the layer and stage definitions and one line per card. One card is at ${WORKER}cards/<id>.md
- [Field guide skill](${WORKER}skills/${READER}/SKILL.md): how to answer questions from the guide, loading only the cards a question needs
- [More for agents](${WORKER}llms.txt): the cards by layer, the contributor and feedback skills and an MCP server
- [Plugin](${REPO}#start-here): the skills and the MCP server for Codex and Claude Code

## Updates and topics

- [Updates](${SITE}updates.md): dated events from every card's history, newest first, also as [JSON](${SITE}updates.json)
${topics.map((t) => `- [Topic: ${t}](${SITE}topics/${t}.md): the cards tagged topic/${t}`).join("\n")}

## All cards in one file

- [All cards as Markdown](${SITE}cards.md): every card in one file of about ${Math.round(Buffer.byteLength(cardsMd) / 1000)} KB, one section per card, with the layer and stage definitions first
- [All cards as JSON](${SITE}cards.json): the same cards as structured data, with the vocabularies under "vocab"

## Optional

- [Explorer](${SITE}): the list and graph view for people
- [Not connected yet](${SITE}matches.md): pairs of cards the guide compares and no primary source connects
- [Watch list](${SITE}watch.md): where each effort posts its news, with feeds, plus sources that have no card, also as [JSON](${SITE}watch.json)
- [Changelog](${SITE}changelog.md): cards added and changed in the guide, by date
- [About the author](https://www.olahungerford.com/about/)
`;

const json = {
  title: TITLE,
  description: blurb,
  author: { name: "Ola Hungerford", url: "https://www.olahungerford.com/about/" },
  license: LICENCE,
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
  license: LICENCE,
  as_of: asOf,
  cards: SITE + "cards.json",
  updates: updates.map((u) => ({ ...u, url: SITE + "#" + u.card })),
};

const watchJson = {
  title: `${TITLE}: watch list`,
  description: "Where each effort in the guide posts its blog or announcements, with a feed where it has one, and sources that have no card. A source with a card has the card's id under card.",
  license: LICENCE,
  as_of: asOf,
  cards: SITE + "cards.json",
  sources: [
    ...watched.map((c) => ({ id: c.id, name: c.name, card: c.id, url: SITE + "#" + c.id, news: c.news, feed: c.feed })),
    ...watchlist.map((w) => ({ id: w.id, name: w.name, card: null, note: w.note || "", news: w.news, feed: w.feed })),
  ],
};

// The changelog is written by hand. Its [[links]] become links into the explorer.
const changelogSrc = unlink(readFileSync(join(root, "CHANGELOG.md"), "utf8").replace(/\r\n/g, "\n"));
// Pairs whose only links sit under a Compare heading: the guide compares them and no source connects them.
const cmpOnly = (a, b) => !a.links.includes(b.id) || a.compares.includes(b.id);
const cmpLines = (c, other) =>
  (c.sections.find((s) => s.title === "Compare")?.text || "").split("\n").filter((l) => links(l).includes(other.id)).map((l) => l.replace(/^-\s+/, ""));
const matches = [];
for (const a of cards)
  for (const id of a.links) {
    const o = byId[id];
    if (!o || (a.id > o.id && o.links.includes(a.id))) continue;
    if (cmpOnly(a, o) && cmpOnly(o, a)) matches.push(a.name.localeCompare(o.name) <= 0 ? [a, o] : [o, a]);
  }
matches.sort((x, y) => x[0].name.localeCompare(y[0].name) || x[1].name.localeCompare(y[1].name));
const matchesMd = (href) =>
  [
    "# Not connected yet",
    "",
    "Pairs of cards that this guide compares and that no primary source connects: neither effort's own material names the other, and no court, regulator or standards body ties them. Each line says what was searched and when. People from the two efforts may still have talked.",
    "",
    ...matches.map(([a, o]) => `- [${a.name}](${href(a.id)}) and [${o.name}](${href(o.id)}): ${[...cmpLines(a, o), ...cmpLines(o, a)].map((l) => md(l, href)).join(" ")}`),
    "",
  ].join("\n");

// smoke/questions.json lists questions the guide should be able to answer, with the cards or pairs a good answer names.
// A "match" question expects pairs that are still unconnected. It fails when a source turns up and the link moves out of Compare.
const smokeFile = join(root, "smoke", "questions.json");
if (existsSync(smokeFile)) {
  const isMatch = (x, y) => matches.some(([a, o]) => (a.id === x && o.id === y) || (a.id === y && o.id === x));
  let bad = 0;
  const questions = JSON.parse(readFileSync(smokeFile, "utf8"));
  for (const q of questions) {
    for (const id of [...(q.cards || []), ...(q.pairs || []).flat()]) if (!ids.has(id)) (bad++, console.warn(`smoke ${q.id}: no card ${id}`));
    for (const [x, y] of q.pairs || []) if (ids.has(x) && ids.has(y) && !isMatch(x, y)) (bad++, console.warn(`smoke ${q.id}: ${x} and ${y} are no longer an unconnected pair`));
  }
  console.log(`smoke: ${questions.length} questions, ${bad} problems`);
}

for (const l of links(changelogSrc)) if (!ids.has(l)) console.warn(`dangling link in CHANGELOG.md: [[${l}]]`);
const changelog = md(changelogSrc, inExplorer);

const flat = {
  "cards.md": cardsMd,
  "cards.json": JSON.stringify(json, null, 1) + "\n",
  "updates.md": updatesMd(inExplorer),
  "updates.json": JSON.stringify(updatesJson, null, 1) + "\n",
  "matches.md": matchesMd(inExplorer),
  "watch.md": watchMd(inExplorer),
  "watch.json": JSON.stringify(watchJson, null, 1) + "\n",
  ...Object.fromEntries(topics.map((t) => [`topics/${t}.md`, topicFile(t, inExplorer)])),
  "llms.txt": llms,
  "changelog.md": changelog,
};
for (const [f, text] of Object.entries(flat)) {
  mkdirSync(dirname(join(root, "ui", f)), { recursive: true });
  writeFileSync(join(root, "ui", f), text);
}
console.log(`${cards.length} cards, ${updates.length} dated events -> ui/${Object.keys(flat).join(", ui/")}`);
console.log(`watch list: ${watched.length} of ${cards.length} cards have a news page or feed, plus ${watchlist.length} from watchlist.json`);

if (outDir) {
  if (!isPublic) throw new Error("--out only runs with --public, so private notes never leave this repo");
  mkdirSync(outDir, { recursive: true });
  for (const f of ["index.html", "data.js", "private.js", ...Object.keys(flat)]) {
    mkdirSync(dirname(join(outDir, f)), { recursive: true });
    copyFileSync(join(root, "ui", f), join(outDir, f));
  }
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
    "## Media",
    "",
    "The kind of content an effort is about, where its own material names one. A card with no medium tag is media-neutral.",
    "",
    ...Object.entries(vocab.media).map(([k, v]) => `- ${k}: ${v}.`),
    "",
    ...topicDefs,
    "",
    ...partDefs,
    "",
  ].join("\n");
  const cardIndex = ["# Cards", "", "One line per card: name, type and layers, then the current status.", "", ...cards.map((c) => line(c, fromRoot)), ""].join("\n");
  const layerFile = (l) =>
    [`# Layer: ${l}`, "", `${l[0].toUpperCase() + l.slice(1)}: ${vocab.layers[l]}.`, "", ...cards.filter((c) => layersOf(c).includes(l)).map((c) => line(c, (id) => "../cards/" + id + ".md")), ""].join("\n");

  const indexMd =
    front({ title: TITLE, description: blurb, updated: asOf, canonical: SITE }) +
    [
      `# ${TITLE}`,
      "",
      `${blurb} Compiled by Ola Hungerford (https://www.olahungerford.com/about/)${asOf ? ", as of " + asOf : ""}. ${caveat} ${licence}`,
      "",
      "## How to read this guide",
      "",
      "- One card per file: `cards/<id>.md` and `cards/<id>.json`. The ids are in the list below.",
      `- Cards by layer: ${Object.keys(vocab.layers).map((l) => `[${l}](layers/${l}.md)`).join(", ")}.`,
      `- Cards by topic tag: ${topics.map((t) => `[${t}](topics/${t}.md)`).join(", ")}.`,
      "- [Updates](updates.md): dated events across all cards, newest first. Also as [JSON](updates.json).",
      "- [Not connected yet](matches.md): pairs of cards the guide compares and no primary source connects.",
      "- [Watch list](watch.md): where each effort posts its news, with feeds, plus sources that have no card. Also as [JSON](watch.json).",
      "- [Changelog](changelog.md): cards added and changed in the guide.",
      "- Everything in one file: [cards.md](cards.md) or [cards.json](cards.json).",
      `- As an agent skill: [${READER}](skills/${READER}/SKILL.md). To suggest a change: [${CONTRIBUTOR}](skills/${CONTRIBUTOR}/SKILL.md). To report a problem: [${FEEDBACK}](skills/${FEEDBACK}/SKILL.md).`,
      `- Over MCP: ${SITE}mcp serves the skills with the Skills extension, plus tools to search cards and list updates.`,
      `- As a plugin for Codex and Claude Code, with the skills and the MCP server: ${REPO}#start-here.`,
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
      "## Media",
      "",
      "The kind of content an effort is about, where its own material names one. A card with no medium tag is media-neutral.",
      "",
      ...Object.entries(vocab.media).map(([k, v]) => `- ${k}: ${v}.`),
      "",
      ...topicDefs,
      "",
      ...partDefs,
      "",
      "## Cards",
      "",
      ...cards.map((c) => line(c, fromRoot)),
      "",
    ].join("\n");

  Object.assign(site, flat, { "index.md": indexMd, "updates.md": updatesMd(fromRoot), "matches.md": matchesMd(fromRoot), "watch.md": watchMd(fromRoot) });
  for (const c of cards) {
    site[`cards/${c.id}.md`] = cardFile(c);
    site[`cards/${c.id}.json`] = JSON.stringify({ ...c, url: SITE + "cards/" + c.id, explorer: SITE + "#" + c.id }, null, 1) + "\n";
  }
  for (const l of Object.keys(vocab.layers)) site[`layers/${l}.md`] = layerFile(l);
  for (const t of topics) site[`topics/${t}.md`] = topicFile(t, (id) => "../cards/" + id + ".md");

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
  skills[ref + "matches.md"] = site["matches.md"];
  skills[ref + "watch.md"] = site["watch.md"];
  skills[ref + "changelog.md"] = changelog;
  for (const c of cards) skills[`${ref}cards/${c.id}.md`] = site[`cards/${c.id}.md`];
  for (const l of Object.keys(vocab.layers)) skills[`${ref}layers/${l}.md`] = site[`layers/${l}.md`];
  for (const t of topics) skills[`${ref}topics/${t}.md`] = site[`topics/${t}.md`];
  for (const [f, text] of Object.entries(skills)) site["skills/" + f] = text;

  site["llms.txt"] = `${llmsHead}
## Start here

- [Guide index](${SITE}index.md): how the guide is laid out, the layer and stage definitions, and one line per card
- [Updates](${SITE}updates.md): dated events from every card's history, newest first, also as [JSON](${SITE}updates.json)
- [Not connected yet](${SITE}matches.md): pairs of cards the guide compares and no primary source connects
- [Watch list](${SITE}watch.md): where each effort posts its news, with feeds, plus sources that have no card, also as [JSON](${SITE}watch.json)
- [Changelog](${SITE}changelog.md): cards added and changed in the guide, by date

## Cards

- [All cards as Markdown](${SITE}cards.md): one file, one section per card
- [All cards as JSON](${SITE}cards.json): the same cards as structured data, with the vocabularies under "vocab"
${Object.keys(vocab.layers).map((l) => `- [Layer: ${l}](${SITE}layers/${l}.md): the cards on the ${l} layer`).join("\n")}
${topics.map((t) => `- [Topic: ${t}](${SITE}topics/${t}.md): the cards tagged topic/${t}`).join("\n")}

One card is at ${SITE}cards/<id>.md and ${SITE}cards/<id>.json. The ids are in the guide index.

## Skills and MCP

- [Field guide skill](${SITE}skills/${READER}/SKILL.md): how to answer questions from the guide, loading only the cards a question needs
- [Contributor skill](${SITE}skills/${CONTRIBUTOR}/SKILL.md): when and how to suggest a new card or a correction
- [Feedback skill](${SITE}skills/${FEEDBACK}/SKILL.md): when and how to report a wrong, stale or missing card, or a problem with the tools, as a GitHub issue

An MCP server at ${SITE}mcp serves the skills with the Skills extension (io.modelcontextprotocol/skills), plus tools to search cards and list updates.

The skills and the MCP server also install as one plugin in the Agent Plugins layout. The steps are at ${REPO}#start-here.

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
<footer>Compiled by <a href="https://www.olahungerford.com/about/">Ola Hungerford</a>${asOf ? ", as of " + asOf : ""}. ${esc(caveat)} Cards under <a rel="license" href="${LICENCE}">CC BY 4.0</a>. Also as <a href="${SITE}${alternate}">Markdown</a>. Source on <a href="${REPO}">GitHub</a>.</footer>
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
      ...PART.map((k) => (c[k] ? `<span title="${esc(vocab.participation[k])}">${partLabel(k)}</span>: ${inline(c[k], toCard)}` : "")),
      c.news.length || c.feed.length ? `News: ${[...c.news, ...c.feed].map((u) => `<a href="${esc(u)}">${esc(u.replace(/^https?:\/\//, ""))}</a>`).join(", ")}` : "",
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
        license: LICENCE,
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
      license: LICENCE,
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

  // Search and answer-time use yes. No training preference: the cards are CC BY 4.0, which allows it with credit.
  site["robots.txt"] = `User-Agent: *
Allow: /
Content-Signal: search=yes, ai-input=yes

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
  const pairs = matches.map(([a, o]) => ({ a: a.id, b: o.id, text: [...cmpLines(a, o), ...cmpLines(o, a)].join(" ") }));
  put(genDir, "data.json", JSON.stringify({ site: SITE, title: TITLE, as_of: asOf, vocab, cards, updates, matches: pairs }));
  console.log(`${Object.keys(site).length + 3} files -> worker/site, ${Object.keys(skills).length} skill files -> worker/generated`);

  // The plugin: the skills and the MCP endpoint in one directory, in the Agent Plugins layout (plugin.json, mcp.json, skills/).
  // Claude Code reads .claude-plugin/plugin.json and .mcp.json, so the package carries those as well.
  // The version is the newest date in the cards or the changelog, then the number of commits on the branch: 2026.11.17+19.
  // Codex and Claude Code keep an installed copy until the version string changes, and two publishes can share a date.
  const newest = [asOf, ...[...changelogSrc.matchAll(/^## (\d{4}-\d{2}-\d{2})$/gm)].map((m) => m[1])].sort().pop();
  let commits = "";
  try {
    commits = "+" + execSync("git rev-list --count HEAD", { cwd: root, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {}
  const about = {
    name: READER,
    version: newest.split("-").map(Number).join(".") + commits,
    description: "Cards for the standards bodies, working groups, specifications and proposals on content provenance, access, licensing, attribution and payment for AI systems. Skills for reading, contributing, reviewing and feedback, and a read-only MCP server.",
    author: { name: "Ola Hungerford", url: "https://www.olahungerford.com/about/" },
    homepage: SITE,
    repository: REPO,
    license: "CC-BY-4.0",
    keywords: ["content-provenance", "attribution", "licensing", "standards", "mcp"],
  };
  const SERVER = "field-guide";
  const pretty = (o) => JSON.stringify(o, null, 2) + "\n";
  const plugin = {
    "plugin.json": pretty({
      $schema: "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
      ...about,
      extensions: {
        "com.openai": {
          interface: { displayName: "Content Provenance Field Guide", shortDescription: about.description, developerName: about.author.name, category: "Research", websiteURL: SITE },
        },
      },
    }),
    "mcp.json": pretty({ $schema: "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json", mcpServers: { [SERVER]: { type: "streamable-http", url: SITE + "mcp" } } }),
    ".claude-plugin/plugin.json": pretty(about),
    ".mcp.json": pretty({ mcpServers: { [SERVER]: { type: "http", url: SITE + "mcp" } } }),
    LICENSE: readFileSync(join(root, "LICENSE-CC-BY-4.0"), "utf8").replace(/\r\n/g, "\n"),
    "README.md": [
      `# ${TITLE}: plugin`,
      "",
      `Generated from ${REPO} by build.mjs${asOf ? ", with cards as of " + asOf : ""}. Do not edit these files. Changes go to the cards and skills on the main branch.`,
      "",
      `Two agent skills and the MCP server at ${SITE}mcp, in the [Agent Plugins](https://agent-plugins.org/) layout. Install steps are in the [README on main](${REPO}#start-here).`,
      "",
    ].join("\n"),
    ...Object.fromEntries(Object.entries(skills).map(([f, text]) => ["skills/" + f, text])),
  };
  const pluginDir = join(root, "plugin");
  rmSync(pluginDir, { recursive: true, force: true });
  for (const [f, text] of Object.entries(plugin)) put(pluginDir, f, text);
  console.log(`${Object.keys(plugin).length} files -> plugin (version ${about.version})`);
}

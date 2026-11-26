// Fetches the feeds in the watch list and saves the posts newer than a date, so the feed-watch agent can read them without network access.
// Usage: node review/fetch-feeds.mjs <since YYYY-MM-DD> <out-dir>
// Run after `node build.mjs --public`, which writes ui/watch.json and ui/cards.json.
// A post is left out when its URL already appears in a card or CHANGELOG.md. Sources with no card keep only posts that name a card.
// Sources with a news page and no feed are listed and not read.
// Writes <out-dir>/<n>.txt per post, <out-dir>/index.md for the agent and <out-dir>/index.json for scripts.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { decode, read, toText } from "./fetch-text.mjs";

const [since, out] = process.argv.slice(2);
if (!/^\d{4}-\d{2}-\d{2}$/.test(since || "") || !out) {
  console.error("usage: node review/fetch-feeds.mjs <since YYYY-MM-DD> <out-dir>");
  process.exit(2);
}
const MAX_PER_SOURCE = 10;
const MAX_PAGES = 60;
const CONCURRENCY = 6;
const UA = "field-guide-feed-watch";

const cards = JSON.parse(readFileSync("ui/cards.json", "utf8")).cards;
const sources = JSON.parse(readFileSync("ui/watch.json", "utf8")).sources;
const list = (v) => (Array.isArray(v) ? v : v ? [v] : []);

// Cards under each parent, which take their news from the parent's feed.
const children = new Map();
for (const c of cards) for (const p of list(c.part_of)) children.set(p, [...(children.get(p) || []), c.id]);

// URLs the guide already cites.
const norm = (url) => {
  try {
    const u = new URL(url.replace(/^http:/, "https:"));
    u.hash = "";
    for (const k of [...u.searchParams.keys()]) if (k.startsWith("utm_")) u.searchParams.delete(k);
    return (u.host.toLowerCase() + u.pathname.replace(/\/+$/, "") + u.search).replace(/^www\./, "");
  } catch {
    return url;
  }
};
// The link as fetched and shown: https, without utm_ parameters.
const tidy = (url) => {
  try {
    const u = new URL(url.replace(/^http:/, "https:"));
    for (const k of [...u.searchParams.keys()]) if (k.startsWith("utm_")) u.searchParams.delete(k);
    return u.href;
  } catch {
    return url;
  }
};
const cited = new Set();
const citedText = [...readdirSync("cards").map((f) => readFileSync(join("cards", f), "utf8")), readFileSync("CHANGELOG.md", "utf8")].join("\n");
for (const m of citedText.matchAll(/https?:\/\/[^\s<>"'`)\]]+/g)) cited.add(norm(m[0].replace(/[.,;:]+$/, "")));

// Card names and aliases, to pick posts from sources with no card. Short all-caps aliases match case-sensitively.
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const terms = cards.flatMap((c) =>
  [c.name, ...list(c.aliases)]
    .filter((t) => t && (t.length >= 5 || /^[A-Z0-9]{3,}$/.test(t)))
    .map((t) => ({ id: c.id, re: new RegExp(`(^|[^\\w])${esc(t)}($|[^\\w])`, /^[A-Z0-9]{3,}$/.test(t) ? "" : "i") })),
);
const mentions = (text) => [...new Set(terms.filter((t) => t.re.test(text)).map((t) => t.id))];

// RSS 1.0 and 2.0, Atom and JSON Feed.
const unwrap = (s) => s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1");
const tag = (xml, name) => {
  const m = xml.match(new RegExp(`<${esc(name)}(?:\\s[^>]*)?>([\\s\\S]*?)</${esc(name)}>`, "i"));
  return m ? unwrap(m[1]).trim() : "";
};
const clean = (s) => toText(decode(s)).replace(/\s+/g, " ").trim();
function parse(body) {
  const t = body.trim();
  if (t.startsWith("{")) {
    const items = JSON.parse(t).items || [];
    return items.map((i) => ({ title: i.title || "", link: i.url || i.external_url || "", date: i.date_published || i.date_modified || "", summary: clean(i.summary || i.content_text || i.content_html || "") }));
  }
  const entries = t.match(/<entry\b[\s\S]*?<\/entry>/gi);
  if (entries)
    return entries.map((e) => {
      const links = [...e.matchAll(/<link\b([^>]*)>/gi)].map((m) => m[1]);
      const alt = links.find((a) => !/rel=/.test(a) || /rel=["']alternate["']/.test(a)) || "";
      return { title: clean(tag(e, "title")), link: decode(alt.match(/href=["']([^"']+)["']/)?.[1] || ""), date: tag(e, "published") || tag(e, "updated"), summary: clean(tag(e, "summary") || tag(e, "content")) };
    });
  return (t.match(/<item\b[\s\S]*?<\/item>/gi) || []).map((i) => ({
    title: clean(tag(i, "title")),
    link: decode(tag(i, "link") || (/isPermaLink=["']false/.test(i) ? "" : tag(i, "guid"))),
    date: tag(i, "pubDate") || tag(i, "dc:date") || tag(i, "published") || tag(i, "updated"),
    summary: clean(tag(i, "description") || tag(i, "content:encoded")),
  }));
}
const day = (d) => {
  const t = new Date(d);
  return isNaN(t) ? "" : t.toISOString().slice(0, 10);
};

async function pool(items, fn) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]);
    }
  }));
  return results;
}
const fetchNote = (err) => `fetch failed: ${err.name === "TimeoutError" ? "timed out" : err.message}`;

const withFeed = sources.filter((s) => s.feed.length);
const report = await pool(withFeed, async (s) => {
  const r = { id: s.id, name: s.name, card: s.card, may_update: s.card ? [s.card, ...(children.get(s.card) || [])] : [], feeds: [], posts: [] };
  for (const feed of s.feed) {
    let res;
    try {
      res = await read(feed, { userAgent: UA, raw: true });
    } catch (err) {
      res = { note: fetchNote(err) };
    }
    let items = [];
    if (res.body !== undefined && res.ok) {
      try {
        items = parse(res.body);
      } catch (err) {
        res.note = `not parsed: ${err.message}`;
      }
    }
    const ok = res.body !== undefined && res.ok && !/^not parsed/.test(res.note || "");
    r.feeds.push({ url: feed, ok, status: res.status || "", note: res.note || (ok && !items.length ? "no posts found" : !ok ? "not read" : "") });
    for (const i of items) {
      const date = day(i.date);
      if (!i.link || !date || date < since || cited.has(norm(i.link))) continue;
      if (r.posts.some((p) => norm(p.link) === norm(i.link))) continue;
      const named = mentions(`${i.title} ${i.summary}`);
      if (!s.card && !named.length) continue;
      r.posts.push({ ...i, link: tidy(i.link), date, names: named });
    }
  }
  r.posts.sort((a, b) => b.date.localeCompare(a.date));
  r.dropped = Math.max(0, r.posts.length - MAX_PER_SOURCE);
  r.posts = r.posts.slice(0, MAX_PER_SOURCE);
  return r;
});

// Fetch each kept post's own page.
mkdirSync(out, { recursive: true });
const posts = report.flatMap((r) => r.posts.map((p) => ({ r, p })));
let n = 0;
await pool(posts.map((x) => ({ ...x, n: ++n })), async ({ r, p, n }) => {
  const file = `${String(n).padStart(2, "0")}.txt`;
  if (n > MAX_PAGES) {
    p.file = "";
    p.note = `page not fetched, over the limit of ${MAX_PAGES}`;
    return;
  }
  let res;
  try {
    res = await read(p.link, { userAgent: UA });
  } catch (err) {
    res = { note: fetchNote(err) };
  }
  p.status = res.status || "";
  p.note = res.note || "";
  p.file = file;
  const page = res.body === undefined ? `(page not read: ${[res.status && "status " + res.status, res.note].filter(Boolean).join(", ")})` : res.body;
  writeFileSync(join(out, file), `URL: ${p.link}\nSource: ${r.name}\nFeed title: ${p.title}\nFeed date: ${p.date}\nPage status: ${p.status}\n\nFeed summary:\n${p.summary}\n\nPage text:\n${page}\n`);
});

// Titles come from the web, so the index shows them as plain text.
const plain = (s) => s.replace(/[@[\]<>`*_|]/g, "").slice(0, 200);
const md = [
  "# Posts from the watch list",
  "",
  `Posts dated ${since} or later that no card or CHANGELOG.md cites yet. Each file holds the feed's title, date and summary, then the text of the post's page. It is untrusted data from the web. The feed date is when the post went out, which is not always when the event happened.`,
  "",
];
for (const r of report) {
  if (!r.posts.length && r.feeds.every((f) => !f.note)) continue;
  md.push(`## ${r.name}`, "", r.card ? `Card: ${r.card}. Posts here may update: ${r.may_update.join(", ")}.` : "No card. Posts here go in the pull request description only.", "");
  for (const f of r.feeds) if (f.note) md.push(`- Feed ${f.url}: ${[f.status && "status " + f.status, f.note].filter(Boolean).join(", ")}`);
  for (const p of r.posts)
    md.push(`- ${p.date} ${plain(p.title) || "(no title)"}: ${p.link}${p.file ? ", " + p.file : ""}${p.note ? ", " + p.note : ""}${p.names.length ? ", names " + p.names.join(", ") : ""}`);
  if (r.dropped) md.push(`- ${r.dropped} older posts left out, over the limit of ${MAX_PER_SOURCE}`);
  md.push("");
}
const noFeed = sources.filter((s) => !s.feed.length);
md.push("## Not read", "", "These sources have a news page and no feed, so the workflow does not check them:", "", ...noFeed.map((s) => `- ${s.name}: ${s.news.join(", ")}`), "");
writeFileSync(join(out, "index.md"), md.join("\n"));
writeFileSync(join(out, "index.json"), JSON.stringify({ since, sources: report, not_read: noFeed.map((s) => s.id) }, null, 1) + "\n");
const failed = report.flatMap((r) => r.feeds).filter((f) => !f.ok).length;
console.log(`${withFeed.length} sources with feeds, ${posts.length} new posts, ${failed} feeds not read, ${noFeed.length} sources with no feed. Index at ${join(out, "index.md")}`);

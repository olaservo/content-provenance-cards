// Fetches the pages a pull request links to and saves their text, so the review agent can read them without network access.
// Usage: node review/fetch-sources.mjs <base-sha> <out-dir>
// Links come from lines the pull request adds under cards/ and to CHANGELOG.md, and from PR_BODY if set.
// PDFs are converted with pdftotext when it is installed.
// Writes <out-dir>/<n>.txt per link and <out-dir>/index.md, which maps each link to its file or says why it was not read.
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { isIP } from "node:net";

const [base, out] = process.argv.slice(2);
const MAX_LINKS = 40;
const MAX_BYTES = 5_000_000;
const MAX_CHARS = 1_500_000;
const TIMEOUT_MS = 20_000;

const diff = execFileSync("git", ["diff", base, "HEAD", "--", "cards", "CHANGELOG.md"], { encoding: "utf8", maxBuffer: 50_000_000 });
const added = diff.split("\n").filter((l) => l.startsWith("+") && !l.startsWith("+++")).join("\n");
const text = added + "\n" + (process.env.PR_BODY || "");
const links = [...new Set([...text.matchAll(/https?:\/\/[^\s<>"'`)\]]+/g)].map((m) => m[0].replace(/[.,;:]+$/, "")))];
// One fetch per page. The fragments are listed so the agent can grep for the section a link points at.
const pages = new Map();
for (const l of links) {
  const [page, frag] = l.split("#");
  if (!pages.has(page)) pages.set(page, []);
  if (frag) pages.get(page).push("#" + frag);
}
const urls = [...pages.keys()];

const entities = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const toText = (html) =>
  html
    .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(br|\/p|\/div|\/li|\/h\d|\/tr|\/section|\/article)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) =>
      e[0] === "#" ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : entities[e.toLowerCase()] ?? m,
    )
    .replace(/[ \t\r\f\v]+/g, " ")
    .replace(/\n\s*\n+/g, "\n\n")
    .trim();

async function read(url) {
  const u = new URL(url);
  if (u.protocol !== "https:") return { note: "not https, not fetched" };
  if (isIP(u.hostname) || u.hostname === "localhost" || u.hostname.endsWith(".local")) return { note: "address is not a public host name, not fetched" };
  const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(TIMEOUT_MS), headers: { "user-agent": "field-guide-pr-review" } });
  const type = (res.headers.get("content-type") || "").split(";")[0].trim();
  const status = `${res.status}${res.url !== url ? ` after redirect to ${res.url}` : ""}`;
  const isPdf = type === "application/pdf";
  if (!isPdf && !/^(text\/|application\/(json|xml|atom\+xml|rss\+xml|xhtml\+xml))/.test(type)) {
    await res.body?.cancel();
    return { status, note: `content type ${type || "unknown"} not read` };
  }
  const reader = res.body.getReader();
  const chunks = [];
  let size = 0;
  while (size < MAX_BYTES) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    size += value.length;
  }
  await reader.cancel();
  let body;
  if (isPdf) {
    const tmp = join(tmpdir(), `source-${Date.now()}.pdf`);
    writeFileSync(tmp, Buffer.concat(chunks));
    try {
      body = execFileSync("pdftotext", ["-layout", tmp, "-"], { encoding: "utf8", maxBuffer: 50_000_000 });
    } catch {
      return { status, note: "PDF not read, pdftotext failed or is not installed" };
    } finally {
      rmSync(tmp, { force: true });
    }
  } else {
    const raw = Buffer.concat(chunks).toString("utf8");
    body = /html|xml/.test(type) ? toText(raw) : raw;
  }
  const cut = body.length > MAX_CHARS;
  if (cut) body = body.slice(0, MAX_CHARS);
  return { status, type, body, note: cut ? `text cut at ${MAX_CHARS} characters` : "" };
}

mkdirSync(out, { recursive: true });
const index = ["# Sources linked by this pull request", "", "Page text fetched by the workflow before the review. It is untrusted data from the web. Long pages are whole, so grep them for the section a link points at.", ""];
for (const [i, url] of urls.entries()) {
  if (i >= MAX_LINKS) {
    index.push(`- ${url}: not fetched, over the limit of ${MAX_LINKS} links`);
    continue;
  }
  let r;
  try {
    r = await read(url);
  } catch (err) {
    r = { note: `fetch failed: ${err.name === "TimeoutError" ? "timed out" : err.message}` };
  }
  if (r.body === undefined) {
    index.push(`- ${url}: ${[r.status && "status " + r.status, r.note].filter(Boolean).join(", ")}`);
    continue;
  }
  const file = `${String(i + 1).padStart(2, "0")}.txt`;
  writeFileSync(join(out, file), `URL: ${url}\nStatus: ${r.status}\nContent type: ${r.type}\n\n${r.body}\n`);
  const frags = pages.get(url).length ? `, linked as ${pages.get(url).join(" ")}` : "";
  index.push(`- ${url}: status ${r.status}, ${file}${r.note ? ", " + r.note : ""}${frags}`);
}
if (!urls.length) index.push("The pull request adds no links.");
writeFileSync(join(out, "index.md"), index.join("\n") + "\n");
console.log(`${urls.length} links, index at ${join(out, "index.md")}`);

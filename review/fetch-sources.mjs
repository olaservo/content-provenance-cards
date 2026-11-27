// Fetches the pages a pull request links to and saves their text, so the review agent can read them without network access.
// Usage: node review/fetch-sources.mjs <base-sha> <out-dir>
// Links come from lines the pull request adds under cards/ and to CHANGELOG.md, and from PR_BODY if set.
// PDFs are converted with pdftotext when it is installed, see fetch-text.mjs.
// Writes <out-dir>/<n>.txt per link and <out-dir>/index.md, which maps each link to its file or says why it was not read.
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { read } from "./fetch-text.mjs";

const [base, out] = process.argv.slice(2);
const MAX_LINKS = 40;

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

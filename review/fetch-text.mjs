// Fetches one URL and returns its text. Shared by fetch-sources.mjs and fetch-feeds.mjs.
// PDFs are converted with pdftotext when it is installed. With { raw: true }, HTML and XML are returned as fetched.
import { execFileSync } from "node:child_process";
import { writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { isIP } from "node:net";

const MAX_BYTES = 5_000_000;
const MAX_CHARS = 1_500_000;
const TIMEOUT_MS = 20_000;

const entities = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
export const decode = (s) =>
  s.replace(/&(#x?[0-9a-f]+|\w+);/gi, (m, e) =>
    e[0] === "#" ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10)) : entities[e.toLowerCase()] ?? m,
  );
export const toText = (html) =>
  decode(
    html
      .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<(br|\/p|\/div|\/li|\/h\d|\/tr|\/section|\/article)\b[^>]*>/gi, "\n")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/[ \t\r\f\v]+/g, " ")
    .replace(/\n\s*\n+/g, "\n\n")
    .trim();

export async function read(url, { userAgent = "field-guide-pr-review", raw = false } = {}) {
  const u = new URL(url);
  if (u.protocol !== "https:") return { note: "not https, not fetched" };
  if (isIP(u.hostname) || u.hostname === "localhost" || u.hostname.endsWith(".local")) return { note: "address is not a public host name, not fetched" };
  const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(TIMEOUT_MS), headers: { "user-agent": userAgent } });
  const type = (res.headers.get("content-type") || "").split(";")[0].trim();
  const status = `${res.status}${res.url !== url ? ` after redirect to ${res.url}` : ""}`;
  const isPdf = type === "application/pdf";
  if (!isPdf && !/^(text\/|application\/(json|feed\+json|xml|atom\+xml|rss\+xml|xhtml\+xml))/.test(type)) {
    await res.body?.cancel();
    return { status, ok: res.ok, note: `content type ${type || "unknown"} not read` };
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
      return { status, ok: res.ok, note: "PDF not read, pdftotext failed or is not installed" };
    } finally {
      rmSync(tmp, { force: true });
    }
  } else {
    const text = Buffer.concat(chunks).toString("utf8");
    body = !raw && /html|xml/.test(type) ? toText(text) : text;
  }
  const cut = body.length > MAX_CHARS;
  if (cut) body = body.slice(0, MAX_CHARS);
  return { status, ok: res.ok, type, body, note: cut ? `text cut at ${MAX_CHARS} characters` : "" };
}

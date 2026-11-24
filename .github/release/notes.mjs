// Writes the notes for a weekly alpha release to stdout.
// Usage: node .github/release/notes.mjs [previous-tag]
// Run after `node build.mjs --public`, which writes ui/cards.json and ui/changelog.md.
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const previous = process.argv[2] || "";
const since = previous.match(/^v(\d{4}-\d{2}-\d{2})/)?.[1] ?? "";

const cards = JSON.parse(readFileSync("ui/cards.json", "utf8"));
const changelog = readFileSync("ui/changelog.md", "utf8").replace(/\r\n/g, "\n");

let plugin = "";
try {
  plugin = JSON.parse(execFileSync("git", ["show", "origin/plugin:plugin.json"], { encoding: "utf8" })).version;
} catch {}

// Keep the changelog sections dated after the previous release.
const sections = changelog.split(/^(?=## \d{4}-\d{2}-\d{2})/m).slice(1)
  .filter((s) => s.slice(3, 13) > since)
  .map((s) => s.replace(/^## /, "### ").trim());

const out = [
  "This is an alpha release of the field guide, shared for feedback. Card fields, the MCP tools, the plugin layout and the published file formats may change. Status lines carry the dates the sources gave, so check upstream before relying on one.",
  "",
  `${cards.cards.length} cards as of ${cards.as_of}.${plugin ? ` Plugin version ${plugin}.` : ""} Browse them at ${cards.explorer}. \`cards.json\` and \`cards.md\` below hold every card at this release.`,
  "",
  previous ? `## Changes since ${previous}` : "## Changes",
  "",
  sections.length ? sections.join("\n\n") : "No changelog entries.",
];
console.log(out.join("\n"));

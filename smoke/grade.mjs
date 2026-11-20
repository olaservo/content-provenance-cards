// Scores an agent's answers to smoke/questions.json without AI.
// Usage: node smoke/grade.mjs <answers.json>
// answers.json is a list of { id, answer, cards: [{ id, updated }] }, one per question.
// A question passes when the answer names at least half of its expected cards, names no card
// for a question that expects none, or names both cards of at least one expected pair.
// Every `updated` the agent reports must match the card in this checkout, which shows it read the cards over MCP.
import { readFileSync, readdirSync, appendFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const questions = JSON.parse(readFileSync(join(root, "smoke", "questions.json"), "utf8"));
const answers = JSON.parse(readFileSync(process.argv[2], "utf8"));

const updatedOf = {};
for (const f of readdirSync(join(root, "cards")).filter((f) => f.endsWith(".md"))) {
  const m = readFileSync(join(root, "cards", f), "utf8").match(/^updated:\s*(\S+)/m);
  updatedOf[f.slice(0, -3)] = m ? m[1] : null;
}
const ids = Object.keys(updatedOf);

const rows = [];
let failed = 0, datesChecked = 0, datesWrong = [];
for (const q of questions) {
  const a = answers.find((x) => x.id === q.id);
  const named = new Set();
  for (const c of a?.cards || []) {
    if (!ids.includes(c.id)) continue;
    named.add(c.id);
    datesChecked++;
    if (c.updated !== updatedOf[c.id]) datesWrong.push(`${q.id}: ${c.id} reported ${c.updated}, card has ${updatedOf[c.id]}`);
  }
  for (const id of ids) if (new RegExp(`\\b${id}\\b`).test(a?.answer || "")) named.add(id);

  let pass, detail;
  if (!a || !a.answer) {
    pass = false; detail = "no answer";
  } else if (q.pairs) {
    const hit = q.pairs.filter(([x, y]) => named.has(x) && named.has(y));
    pass = hit.length > 0; detail = `${hit.length} of ${q.pairs.length} pairs`;
  } else if (q.cards.length === 0) {
    pass = named.size === 0; detail = pass ? "named no card" : `named ${[...named].join(", ")}`;
  } else {
    const found = q.cards.filter((id) => named.has(id));
    const missing = q.cards.filter((id) => !named.has(id));
    pass = found.length >= Math.ceil(q.cards.length / 2);
    detail = `${found.length} of ${q.cards.length} cards` + (missing.length ? `, missing ${missing.join(", ")}` : "");
  }
  if (!pass) failed++;
  rows.push(`| ${pass ? "pass" : "FAIL"} | ${q.id} | ${detail} |`);
}

const summary = [
  `## MCP smoke test`,
  ``,
  `${questions.length - failed} of ${questions.length} questions passed. ${datesChecked - datesWrong.length} of ${datesChecked} reported \`updated\` dates match the cards.`,
  ``,
  `| Result | Question | Detail |`,
  `|---|---|---|`,
  ...rows,
  ...(datesWrong.length ? [``, `Dates that do not match:`, ``, ...datesWrong.map((d) => `- ${d}`)] : []),
].join("\n");
console.log(summary);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
if (failed || datesWrong.length || datesChecked === 0) process.exit(1);

---
description: Answer the smoke questions through the Worker's MCP endpoint and score the answers against smoke/questions.json.
on:
  workflow_dispatch:
permissions:
  contents: read
engine: copilot
checkout: false
network:
  allowed:
    - defaults
    - content-provenance-field-guide.olahungerford.workers.dev
mcp-servers:
  field-guide:
    type: http
    url: https://content-provenance-field-guide.olahungerford.workers.dev/mcp
    allowed: [search_cards, get_card, list_updates, list_unconnected]
tools:
  github: false
  edit:
  bash: ["cat"]
safe-outputs:
  create-issue: false
  noop:
    report-as-issue: false
  report-failure-as-issue: false
timeout-minutes: 20
max-ai-credits: 500
steps:
  - name: Write the questions without their expected answers
    run: |
      curl -fsSL "https://raw.githubusercontent.com/${GITHUB_REPOSITORY}/${GITHUB_SHA}/smoke/questions.json" \
        | jq '[.[] | {id, question}]' > "$GITHUB_WORKSPACE/questions.json"
post-steps:
  - name: Check out the cards
    if: always()
    uses: actions/checkout@v7.0.1
    with:
      path: repo
      persist-credentials: false
  - name: Score the answers
    if: always()
    run: node repo/smoke/grade.mjs "$GITHUB_WORKSPACE/smoke-answers.json"
---

# Answer the field guide's smoke questions through MCP

You are testing the field guide's MCP server, `field-guide`. Answer every question in `questions.json` in the workspace (read it with `cat questions.json`) using only the `field-guide` tools: `search_cards`, `get_card`, `list_updates` and `list_unconnected`. Do not answer from memory. If the tools do not support an answer, say so.

For each question:

1. Search for and read the cards that answer it. Use `list_updates` for questions about dates and `list_unconnected` for questions about who should talk or what is not connected.
2. Write a short answer that names the cards it relies on by their ids.
3. For every card you name, record its `updated` date exactly as `get_card` returns it in the card's frontmatter. Call `get_card` for each card you name.

When all questions are answered, use the edit tool to write `smoke-answers.json` in the workspace root. It must be a JSON array with one object per question, in this shape:

```json
[
  { "id": "opt-out", "answer": "…", "cards": [ { "id": "ietf-aipref", "updated": "2026-11-20" } ] }
]
```

Use the question ids from `questions.json`. For a question no card covers, give an answer saying so and an empty `cards` list. A later step scores the file, so write valid JSON and nothing else in it. Then call `noop` with a one-line summary. Do not produce any other output.

---
name: content-provenance-field-guide-feedback
description: Report a problem with the Content Provenance, Access and Attribution field guide as a GitHub issue on {{repo}}, filed under the user's own GitHub account with the gh CLI or a GitHub MCP server. Use when a card is out of date, wrong or confusing, a connection or an effort is missing, a field guide MCP tool fails or answers against its description, or the user asks to send feedback about the guide.
---

# Feedback on the field guide

Issues go to {{repo}}/issues. The guide never posts anything itself. You file the issue with the user's own GitHub access, so it carries their name and their client asks before it is sent.

The guide is an early alpha shared for feedback, so reports are welcome. A fix the user wants to make themselves is a pull request: see the `content-provenance-field-guide-contributor` skill.

## When to report

- A card's status, history or In use section is out of date, and you have a public source that shows it.
- A card says something its source does not, or a link is broken.
- An effort is missing, or two cards are not linked although a primary source connects them.
- A card is confusing enough that you misread it, or answered from it and the user corrected you.
- A field guide MCP tool fails, or its answer contradicts its description or the cards.
- A field guide skill tells you to do something that does not work.
- The user asks you to send feedback.

Report once per problem, not once per answer. Do not offer to report on every answer: bring it up only when one of the cases above happened in this conversation. Ask the user before filing unless they already asked you to. Do not report anything that is not public: unannounced plans, private channels, or anything the user learned in confidence.

## Writing it

Title: `[agent feedback] ` and one line naming the problem, for example `[agent feedback] ietf-aipref status predates the November 2026 draft`.

Body, from the repo's issue template `.github/ISSUE_TEMPLATE/agent-feedback.md`, with every heading kept and "Not known" where you have nothing:

```markdown
Filed by an agent with the content-provenance-field-guide-feedback skill.

**Kind:** correction | missing | tool | docs | idea
**Card or tool:** ietf-aipref

## What is wrong or missing

What the card or tool says, quoted, and what is wrong or missing.

## Source

The public URL that shows the correct information, and the date you read it. "None" for a tool problem or a confusing card.

## How it came up

The question you were answering, or the tool calls that led to it, with their arguments.

## Environment

- Guide version: the `as_of` date from the server instructions, `cards.json` or the skill's index, or the plugin version
- Client and model: your client's name and your model
```

Write only what you saw, read or were told. Kinds: `correction` is a card that is wrong or out of date, `missing` is an effort or a connection the guide does not have, `tool` is an MCP tool that fails or is hard to use, `docs` is a skill, README or explorer text that is wrong or missing, `idea` is something to add.

The issue is public. Leave out the user's own work, file paths with a user name in them, and anything personal. Write `@` names only in backticks, so no one is notified.

## Filing it

Search first, on the card id or tool name and a few words of the problem, and add a comment to an open issue that already covers it instead of opening another. Write the body to a file in a temporary folder for `--body-file`.

With the gh CLI:

```
gh issue list --repo olaservo/content-provenance-cards --state open --search "<card id or tool> <words from the problem>"
gh issue create --repo olaservo/content-provenance-cards --title "<title>" --body-file <file holding the body>
```

With a GitHub MCP server: its issue search, then its issue-creating tool (`issue_write` with method `create` in GitHub's own server) with owner `olaservo`, repo `content-provenance-cards`, the title and the body.

With neither, give the user this link, which opens the issue template with the title filled in, and the body to paste over the template:

```
{{repo}}/issues/new?template=agent-feedback.md&title=<title, URL-encoded>
```

Tell the user the issue's URL once it is filed.

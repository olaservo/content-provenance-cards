---
name: content-provenance-field-guide
description: Answer questions about who is working on content provenance, access preferences, licensing, attribution and payment for AI systems, from a maintained field guide of cards for the standards bodies, working groups, specifications and proposals involved (C2PA, IETF AIPREF, RSL, CC Signals, Content Telemetry, x402 and the MCP proposals among them). Use when asked what one of these efforts is, who owns it, how efforts relate, what changed recently, or where to take part.
---

# Content provenance field guide

A set of short cards, one per organization, working group, specification or proposal. Each card has a type, a status line, tags, a summary, topics, links to related cards and, where known, what is in use, a dated history and the public places to take part: Contribute (issue tracker, repository or join page), Discussion (chat, forum or mailing list) and Meetings (public calendar or list of open calls).

A link under a card's Compare heading is a comparison the guide makes, with no source that connects the two. Say so when you pass one on. Every other link is a connection a primary source states.

The guide is an early alpha, shared for feedback, and one person's working notes. Card fields, the MCP tools and the file formats may change. If the user is relying on the guide's shape or will build on it, tell them it is an alpha and that feedback goes to https://github.com/olaservo/content-provenance-cards/issues. Status lines carry the dates the sources gave. Tell the reader the card's `Updated` date, and check the card's website before relying on a status for a decision.

## Find the right cards

Read as little as the question needs.

1. Start with `references/index.md`. It has one line per card: name, type, layers and current status. Most "what is X" and "who is working on Y" questions can be narrowed from this file alone.
2. For a question about one layer, read `references/layers/<layer>.md`. The layers are provenance, access, licensing, attribution, payments, identity and governance. For a subject that runs across layers, read `references/topics/<topic>.md`. The topics are skills and discovery. `references/vocabulary.md` defines the layers, the stage tags, the topic tags and the three ways to take part.
3. Open `references/cards/<id>.md` for each card the question needs. Links between cards are relative, so follow them to related efforts. "Linked from" at the end of a card lists the cards that point at it.
4. For "what changed" or "what happened since a date", read `references/updates.md`. It lists dated events from every card, newest first. `references/changelog.md` lists edits to the guide itself.
5. For where an effort posts its own news, read the `News` and `Feed` lines on its card. `references/watch.md` lists them for every card, with a few sources that have no card.
6. For "how do I take part", read the `Contribute`, `Discussion` and `Meetings` lines on the card. A missing line means the guide found no public venue of that kind. Say so and do not guess one.

## Answer

- Name the card each fact came from and give its `Explorer` link so the reader can check it.
- Give the card's `Updated` date with any status you quote.
- If no card covers the question, say so. Do not fill the gap from memory as if it came from the guide.
- If something is missing or out of date, the `content-provenance-field-guide-contributor` skill explains how to suggest a change.

## Who should talk

For "who should talk", "who is working on the same thing" or "is X connected to Y", read `references/matches.md`. It lists every pair of cards the guide compares that no primary source connects, with what was searched and when.

- Give the pair, the reason the guide compares them, and the search date.
- Say this is the guide's suggestion. It is not a statement from either effort.
- Do not say the two have never talked. The guide only checked public material.
- If a card links to another outside its Compare section, a source connects them. Say what the card says the connection is.

## Without the references folder

If this skill was installed without `references/`, fetch the same paths under https://content-provenance-field-guide.olahungerford.workers.dev/skills/content-provenance-field-guide/. That copy is the current one.

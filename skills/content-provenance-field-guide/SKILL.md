---
name: content-provenance-field-guide
description: Answer questions about who is working on content provenance, access preferences, licensing, attribution and payment for AI systems, from a maintained field guide of cards for the standards bodies, working groups, specifications and proposals involved (C2PA, IETF AIPREF, RSL, CC Signals, Content Telemetry, x402 and the MCP proposals among them). Use when asked what one of these efforts is, who owns it, how efforts relate, what changed recently, or where to take part.
---

# Content provenance field guide

A set of short cards, one per organization, working group, specification or proposal. Each card has a type, a status line, tags, a summary, topics, links to related cards and, where known, a dated history and a public place to take part.

The guide is one person's working notes. Status lines carry the dates the sources gave. Tell the reader the card's `Updated` date, and check the card's website before relying on a status for a decision.

## Find the right cards

Read as little as the question needs.

1. Start with `references/index.md`. It has one line per card: name, type, layers and current status. Most "what is X" and "who is working on Y" questions can be narrowed from this file alone.
2. For a question about one layer, read `references/layers/<layer>.md`. The layers are provenance, access, licensing, attribution, payments, identity and governance. `references/vocabulary.md` defines the layers and the stage tags.
3. Open `references/cards/<id>.md` for each card the question needs. Links between cards are relative, so follow them to related efforts. "Linked from" at the end of a card lists the cards that point at it.
4. For "what changed" or "what happened since a date", read `references/updates.md`. It lists dated events from every card, newest first. `references/changelog.md` lists edits to the guide itself.

## Answer

- Name the card each fact came from and give its `Explorer` link so the reader can check it.
- Give the card's `Updated` date with any status you quote.
- If no card covers the question, say so. Do not fill the gap from memory as if it came from the guide.
- If something is missing or out of date, the `content-provenance-field-guide-contributor` skill explains how to suggest a change.

## Without the references folder

If this skill was installed without `references/`, fetch the same paths under {{site}}skills/content-provenance-field-guide/. That copy is the current one.

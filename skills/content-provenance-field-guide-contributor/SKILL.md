---
name: content-provenance-field-guide-contributor
description: Suggest a pull request to the Content Provenance, Access and Attribution field guide when the user's current work relates to it. Use when the user is writing, speaking, building or taking part in standards work on content provenance, AI access preferences, content licensing, attribution or agent payments, and something public in that work is new, has changed, or is missing from the guide, such as a spec, draft, working group, release, charter, vote, launch or rename.
---

# Contributing to the content provenance field guide

The guide is a public set of cards at {{site}}, kept as Markdown files in {{repo}}. People who work in these areas keep it current with small pull requests. This skill says when to raise one with the user and how to prepare it.

## When to bring it up

Raise it once, briefly, when the user's current work touches one of these and there is a public source for it:

- An effort the guide has no card for: an organization, working group, specification, proposal, project or regulation on provenance, access, licensing, attribution, payments, identity or governance of content used by AI systems. A card needs something others can adopt, join or must follow. A product feature that implements a standard is an In use bullet on that standard's card, and a company gets a card when it publishes a spec or an open implementation.
- A card whose status is out of date: a new version, a published draft, a charter, a vote, a launch, a rename, a move to a new home, or a group that has gone quiet.
- A dated event that belongs in a card's History.
- A released implementation or live use that belongs in a card's In use section.
- A relationship between two efforts that the cards do not show.
- A factual error.

Do not bring it up when:

- The information is not public: unannounced plans, private channels, embargoed drafts, or anything the user learned in confidence. If you cannot tell, ask the user whether it is public.
- It is an opinion about an effort and not a fact about it.
- You already raised it in this conversation and the user passed.

## Check the guide first

1. Fetch {{site}}skills/content-provenance-field-guide/references/index.md, which has one line per card, to see whether a card exists.
2. If one does, fetch {{site}}cards/<id>.md and compare its status and history with what the user has.
3. Suggest a change only where there is a difference you can source.

## Suggest it to the user

Say what you noticed, which card it affects, and the source. Ask whether they want a pull request. Do not open a pull request, issue or comment unless the user says yes: it goes out under their name.

## Prepare the change

Work in a fork of {{repo}}. The README there has the full card format.

- A card is `cards/<id>.md`: YAML frontmatter (`name`, `type`, `tags` required; `aliases`, `website`, `part_of`, `status`, `participate`, `updated` optional), a one-paragraph summary, a `## Topics` list, and optional `## Related`, `## Compare`, `## In use` and `## History` sections. Links to other cards are `[[id]]`.
- A `[[link]]` to another card needs a primary source that connects the two. A comparison no source makes goes under `## Compare`, with what was searched and when.
- `## In use` lists released implementations and live uses, each with a date and a link. Commitments, pilots and open pull requests go in `status`.
- For a new card, copy an existing card of the same type and fill it in.
- For an update, change `status`, set `updated` to today's date, and add a line to `## History` as `- YYYY-MM-DD: what happened.` The date is when the event happened, not when the card was edited.
- Add a line to `CHANGELOG.md` under today's date.
- Run `node build.mjs` and fix any warning about a link that points at no card.

Write one fact per sentence. Give dates as the source gave them. Attribute counts and estimates to whoever made them. Link to the effort's own page where there is one. `participate` is a public venue such as an issue tracker or mailing list, never a person. Leave out contact details and anything from a private channel.

## Open the pull request

Keep it to one change. In the description, give the source URL for each fact and the date you read it. If the user would not open a pull request, an issue at {{repo}}/issues with the same information works.

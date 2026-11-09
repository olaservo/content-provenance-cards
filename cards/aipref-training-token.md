---
name: Shared AI training robots.txt token
aliases: [draft-kelley-aipref-training-preference-signal, __usage_ai-training]
type: proposal
website: https://datatracker.ietf.org/doc/draft-kelley-aipref-training-preference-signal/
part_of: "[[ietf-aipref]]"
status: Individual draft posted 2026-10-30; Google, OpenAI, Microsoft and Anthropic committed to honor it
tags: [type/proposal, layer/access]
participate: "[ai-control mailing list](https://mailarchive.ietf.org/arch/browse/ai-control/)"
updated: 2026-11-03
---
A robots.txt group whose `User-Agent` is the cross-vendor token `__usage_ai-training`, using ordinary `Allow` and `Disallow` rules. No new syntax. "AI Training" takes its definition from the [[ietf-aipref]] vocab draft.

## Topics
- **One training opt-out**: a single signal every major crawler operator honors, with no new robots.txt grammar.
- **Compliance**: getting honored signals to change outputs. Prompting can still surface disallowed content.

## Related
- An alternative to the attach draft's `Content-Usage` directive in [[ietf-aipref]].

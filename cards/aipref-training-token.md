---
name: Shared AI training robots.txt token
aliases: [draft-kelley-aipref-training-preference-signal, __usage_ai-training]
type: proposal
website: https://datatracker.ietf.org/doc/draft-kelley-aipref-training-preference-signal/
part_of: "[[ietf-aipref]]"
status: Individual draft -01 posted 2026-11-16; Google, OpenAI, Microsoft and Anthropic committed to honor it; Microsoft starts 2027-02-01 and Google plans early 2027
tags: [type/proposal, layer/access]
contribute: "[ai-control mailing list](https://mailarchive.ietf.org/arch/browse/ai-control/)"
updated: 2026-11-20
---
A robots.txt group whose `User-Agent` is the cross-vendor token `__usage_ai-training`, using ordinary `Allow` and `Disallow` rules. No new syntax. "AI Training" takes its definition from the [[ietf-aipref]] vocab draft.

## Topics
- **One training opt-out**: a single signal every major crawler operator honors, with no new robots.txt grammar.
- **Compliance**: getting honored signals to change outputs. Prompting can still surface disallowed content.

## Related
- An alternative to the attach draft's `Content-Usage` directive in [[ietf-aipref]]. [Pull request 260](https://github.com/ietf-wg-aipref/drafts/pull/260) (open, 2026-11-13) proposes the cross-vendor tokens in place of a `Content-Usage` robots.txt rule in the WG drafts.

## In use
- [[ai-robots-txt]] v2.2 (2026-11-16) adds a `User-agent: __usage_ai-training` group to its generated robots.txt.

## History
- 2026-11-16: -01 posted.
- 2026-10-30: Individual draft posted.

---
title: "Shared AI training robots.txt token"
id: "aipref-training-token"
type: "proposal"
status: "Individual draft -01 posted 2026-11-16; Google, OpenAI, Microsoft and Anthropic committed to honor it; Microsoft starts 2027-02-01 and Google plans early 2027"
tags: ["type/proposal", "layer/access"]
updated: "2026-11-21"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/aipref-training-token"
---
# Shared AI training robots.txt token

- Id: aipref-training-token
- Also known as: draft-kelley-aipref-training-preference-signal, __usage_ai-training
- Type: proposal
- Status: Individual draft -01 posted 2026-11-16; Google, OpenAI, Microsoft and Anthropic committed to honor it; Microsoft starts 2027-02-01 and Google plans early 2027
- Website: https://datatracker.ietf.org/doc/draft-kelley-aipref-training-preference-signal/
- Part of: [IETF AI Preferences Working Group](ietf-aipref.md)
- Discussion: [ai-control mailing list](https://mailarchive.ietf.org/arch/browse/ai-control/)
- Tags: type/proposal, layer/access
- Updated: 2026-11-21
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#aipref-training-token

A robots.txt group whose `User-Agent` is the cross-vendor token `__usage_ai-training`, using ordinary `Allow` and `Disallow` rules. No new syntax. "AI Training" takes its definition from the [IETF AI Preferences Working Group](ietf-aipref.md) vocab draft.

## Topics

- **One training opt-out**: a single signal every major crawler operator honors, with no new robots.txt grammar.
- **Compliance**: getting honored signals to change outputs. Prompting can still surface disallowed content.

## Related

- An alternative to the attach draft's `Content-Usage` directive in [IETF AI Preferences Working Group](ietf-aipref.md). [Pull request 260](https://github.com/ietf-wg-aipref/drafts/pull/260) (open, 2026-11-13) proposes the cross-vendor tokens in place of a `Content-Usage` robots.txt rule in the WG drafts.

## In use

- [ai.robots.txt](ai-robots-txt.md) v2.2 (2026-11-16) adds a `User-agent: __usage_ai-training` group to its generated robots.txt.

## History

- 2026-11-16: -01 posted.
- 2026-10-30: Individual draft posted.

Linked from: [ai.robots.txt](ai-robots-txt.md), [EU AI Act and GPAI Code of Practice](eu-ai-act-gpai-code.md), [IETF AI Preferences Working Group](ietf-aipref.md), [Knight-Georgetown Institute](knight-georgetown-institute.md), [Microsoft training and grounding preferences](microsoft-grounding-preference.md)

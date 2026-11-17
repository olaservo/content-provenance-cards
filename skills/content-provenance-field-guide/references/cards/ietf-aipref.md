---
title: "IETF AI Preferences Working Group"
id: "ietf-aipref"
type: "working-group"
status: "vocab-08 (2026-09-13) without consensus; attach-05 (2026-08-18); IETF 127 sessions 2026-11-16 and 11-19"
tags: ["type/working-group", "layer/access", "stage/after-delivery"]
updated: "2026-11-16"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/ietf-aipref"
---
# IETF AI Preferences Working Group

- Id: ietf-aipref
- Also known as: AIPREF
- Type: working-group
- Status: vocab-08 (2026-09-13) without consensus; attach-05 (2026-08-18); IETF 127 sessions 2026-11-16 and 11-19
- Website: https://datatracker.ietf.org/wg/aipref/about/
- News: https://datatracker.ietf.org/wg/aipref/history/
- Feed: https://datatracker.ietf.org/feed/group-changes/aipref/
- Part of: [IETF](ietf.md)
- Take part: [ai-control mailing list](https://mailarchive.ietf.org/arch/browse/ai-control/), [GitHub issues](https://github.com/ietf-wg-aipref/drafts/issues)
- Tags: type/working-group, layer/access, stage/after-delivery
- Updated: 2026-11-16
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#ietf-aipref

Vocabulary for AI usage preferences and how they attach to content (`Content-Usage` header and robots.txt directive).

## Topics

- **Shared vocabulary**: defining training and other AI uses so every crawler reads a preference the same way.
- **Attachment**: binding a preference to content through a `Content-Usage` header and robots.txt directive.
- **Downstream survival**: keeping preferences intact through model redistribution, caching and embeddings ([issues 245](https://github.com/ietf-wg-aipref/drafts/issues/245) and [246](https://github.com/ietf-wg-aipref/drafts/issues/246)).
- **Inference-time use**: covering grounding and agent use, which the vocabulary does not yet do. [Microsoft training and grounding preferences](microsoft-grounding-preference.md) is the first vendor signal there. MCP has no field for a server to declare it.

## Related

- Individual drafts: [Shared AI training robots.txt token](aipref-training-token.md), [Cloudflare Content Signals](cloudflare-content-signals.md), and the [Creative Commons](creative-commons.md) exclusions and parameters drafts. The exclusions draft expired on 2026-10-24.
- Enforcement side: [IETF Web Bot Auth Working Group](ietf-web-bot-auth.md). Layered on by [CC Signals](cc-signals.md).

## History

- 2026-09-13: vocab-08 posted, without consensus.
- 2026-08-18: attach-05 posted.

Linked from: [ai.robots.txt](ai-robots-txt.md), [CC Signals](cc-signals.md), [Cloudflare Content Signals](cloudflare-content-signals.md), [Creative Commons](creative-commons.md), [Creator Assertions Working Group](cawg.md), [EU AI Act and GPAI Code of Practice](eu-ai-act-gpai-code.md), [IETF](ietf.md), [IETF Web Bot Auth Working Group](ietf-web-bot-auth.md), [Microsoft training and grounding preferences](microsoft-grounding-preference.md), [Model Context Protocol](mcp.md), [Really Simple Licensing](rsl.md), [Shared AI training robots.txt token](aipref-training-token.md)

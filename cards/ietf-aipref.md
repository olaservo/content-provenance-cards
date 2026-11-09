---
name: IETF AI Preferences Working Group
aliases: [AIPREF]
type: working-group
website: https://datatracker.ietf.org/wg/aipref/about/
part_of: "[[ietf]]"
status: vocab-08 (2026-09-13) without consensus; attach-05 (2026-08-18); IETF 127 sessions 2026-11-16 and 11-19
tags: [type/working-group, layer/access, stage/after-delivery]
participate: "[ai-control mailing list](https://mailarchive.ietf.org/arch/browse/ai-control/), [GitHub issues](https://github.com/ietf-wg-aipref/drafts/issues)"
updated: 2026-11-03
---
Vocabulary for AI usage preferences and how they attach to content (`Content-Usage` header and robots.txt directive).

## Topics
- **Shared vocabulary**: defining training and other AI uses so every crawler reads a preference the same way.
- **Attachment**: binding a preference to content through a `Content-Usage` header and robots.txt directive.
- **Downstream survival**: keeping preferences intact through model redistribution, caching and embeddings ([issues 245](https://github.com/ietf-wg-aipref/drafts/issues/245) and [246](https://github.com/ietf-wg-aipref/drafts/issues/246)).
- **Inference-time use**: covering grounding and agent use, which the vocabulary does not yet do. [[microsoft-grounding-preference]] is the first vendor signal there. MCP has no field for a server to declare it.

## Related
- Individual drafts: [[aipref-training-token]], [[cloudflare-content-signals]], and the [[creative-commons]] exclusions and parameters drafts.
- Enforcement side: [[ietf-web-bot-auth]]. Layered on by [[cc-signals]].

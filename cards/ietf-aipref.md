---
name: IETF AI Preferences Working Group
aliases: [AIPREF]
type: working-group
website: https://datatracker.ietf.org/wg/aipref/about/
news: https://datatracker.ietf.org/wg/aipref/history/
feed: https://datatracker.ietf.org/feed/group-changes/aipref/
part_of: "[[ietf]]"
status: vocab-08 (2026-09-14) without consensus; attach-05 (2026-08-19); IETF 127 sessions 2026-11-16 and 11-19; issues 245 and 246 closed 2026-11-19
tags: [type/working-group, layer/access, stage/after-delivery]
contribute: "[ai-control mailing list](https://mailarchive.ietf.org/arch/browse/ai-control/), [GitHub issues](https://github.com/ietf-wg-aipref/drafts/issues)"
updated: 2026-11-20
---
Vocabulary for AI usage preferences and how they attach to content (`Content-Usage` header and robots.txt directive).

## Topics
- **Shared vocabulary**: defining training and other AI uses so every crawler reads a preference the same way.
- **Attachment**: binding a preference to content through a `Content-Usage` header and robots.txt directive.
- **Downstream survival**: keeping preferences intact through model redistribution, caching and embeddings ([issues 245](https://github.com/ietf-wg-aipref/drafts/issues/245) and [246](https://github.com/ietf-wg-aipref/drafts/issues/246), closed 2026-11-19 with the existing draft text).
- **Inference-time use**: covering grounding and agent use. vocab-08 adds an AI Use category (`ai-use`) for input to a generative model, without consensus, and open PRs 254 and 258 revise its definition. [[cloudflare-content-signals]] `ai-input` covered grounding from 2025-09-24, and [[microsoft-grounding-preference]] adds a page-level grounding preference. MCP has no field for a server to declare it.

## Related
- Individual drafts: [[aipref-training-token]], [[cloudflare-content-signals]], and the [[creative-commons]] exclusions and parameters drafts. The exclusions draft expired on 2026-10-24.
- Enforcement side: [[ietf-web-bot-auth]]. Layered on by [[cc-signals]].

## History
- 2026-11-19: Issues 245 and 246 on downstream survival closed.
- 2026-11-17: Kevin Kelley [asked for volunteers](https://mailarchive.ietf.org/arch/msg/ai-control/mLGJnETEzXfUug-xJfjRnY27LvY/) for an attachment design team, at the chairs' request, to report before the next interim.
- 2026-09-14: vocab-08 posted, without consensus.
- 2026-08-19: attach-05 posted.

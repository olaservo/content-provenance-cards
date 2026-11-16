---
name: Cloudflare Content Signals
aliases: [draft-romm-aipref-contentsignals]
type: proposal
website: https://contentsignals.org
status: Individual AIPREF draft, shown as expired on Datatracker (read 2026-11-15); parsed by policycheck
tags: [type/proposal, layer/access]
participate: "[ai-control mailing list](https://mailarchive.ietf.org/arch/browse/ai-control/)"
updated: 2026-11-15
---
Three robots.txt categories, `search`, `ai-input` and `ai-train`, proposed as [[ietf-aipref]] vocabulary.

## Topics
- **Use categories**: separating search indexing, use as model input and training in one signal.

## In use
- Cloudflare's managed robots.txt serves the policy with `search=yes, ai-train=no` by default. Cloudflare said customers had turned managed robots.txt on for over 3.8 million domains at launch ([Cloudflare blog](https://blog.cloudflare.com/content-signals-policy/), 2025-09-24).
- [policycheck](https://github.com/openattribution-org/policycheck) v0.2.1 (2026-02-15) detects the signals in robots.txt and in `Content-Signal` headers.

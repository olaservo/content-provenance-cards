---
title: "Cloudflare Content Signals"
id: "cloudflare-content-signals"
type: "proposal"
status: "Individual AIPREF draft, shown as expired on Datatracker (read 2026-11-15); parsed by policycheck"
tags: ["type/proposal", "layer/access"]
updated: "2026-11-20"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/cloudflare-content-signals"
---
# Cloudflare Content Signals

- Id: cloudflare-content-signals
- Also known as: draft-romm-aipref-contentsignals
- Type: proposal
- Status: Individual AIPREF draft, shown as expired on Datatracker (read 2026-11-15); parsed by policycheck
- Website: https://contentsignals.org
- Take part: [ai-control mailing list](https://mailarchive.ietf.org/arch/browse/ai-control/)
- Tags: type/proposal, layer/access
- Updated: 2026-11-20
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#cloudflare-content-signals

Three robots.txt categories, `search`, `ai-input` and `ai-train`, proposed as [IETF AI Preferences Working Group](ietf-aipref.md) vocabulary.

## Topics

- **Use categories**: separating search indexing, use as model input and training in one signal.

## In use

- Cloudflare's managed robots.txt serves the policy with `search=yes, ai-train=no` by default. Cloudflare said customers had turned managed robots.txt on for over 3.8 million domains at launch ([Cloudflare blog](https://blog.cloudflare.com/content-signals-policy/), 2025-09-24).
- [policycheck](https://github.com/openattribution-org/policycheck) v0.2.1 (2026-02-15) reads `Content-Signal` lines in robots.txt.

Linked from: [IETF AI Preferences Working Group](ietf-aipref.md), [OpenAttribution.org](openattribution.md), [Really Simple Licensing](rsl.md)

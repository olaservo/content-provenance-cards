---
name: Really Simple Licensing
aliases: [RSL]
type: specification
website: https://rslstandard.org
status: RSL 1.0 published 2025-12-10; the collective behind it relaunched as the Internet Licensing Collective 2026-11-12
tags: [type/specification, layer/licensing, layer/payments]
participate: "[GitHub](https://github.com/rslstandard)"
updated: 2026-11-15
---
XML vocabulary for usage and compensation terms (per-crawl, per-inference, subscription, attribution-only), discovered from robots.txt, RSS, HTTP headers or HTML. Includes a Crawler Authorization Protocol and an Open License Protocol on OAuth 2.0. [[internet-licensing-collective]], formerly the RSL Collective, is the collecting society behind it.

## Topics
- **Machine-readable terms**: publishing usage terms and prices that crawlers and AI systems can read and accept.
- **Adoption**: getting model developers to honor it on the open web. None has committed, and [[microsoft-publisher-content-marketplace]] is reported to support it.
- **Enforcement**: supplying the lever [[content-telemetry]] manifests lack, through a SPUR profile binding drafted for the RSL WG.

## In use
- Yahoo Scout licenses content through [[internet-licensing-collective]], whose members declare their terms in RSL ([launch release](https://internetcollective.org/press/ilc-launch-2026), 2026-11-12).
- [policycheck](https://github.com/openattribution-org/policycheck) v0.2.1 (2026-02-15) reads RSL `License:` directives from robots.txt.

## History
- 2026-11-12: The RSL Collective relaunched as [[internet-licensing-collective]].
- 2025-12-10: RSL 1.0 published.

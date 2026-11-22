---
name: OpenAttribution.org
type: organization
website: https://openattribution.org
news: https://openattribution.org/blog
feed: https://openattribution.org/feed.xml
status: policycheck, commerce profile, AIMS draft
tags: [type/organization, layer/attribution, layer/identity, layer/payments]
contribute: "[GitHub](https://github.com/openattribution-org)"
updated: 2026-11-17
---
Not-for-profit that originally developed the [[content-telemetry]] SDKs, which [[spur-coalition]] now maintains. Its [Cloudflare edge worker](https://github.com/SPUR-Coalition/cloudflare-worker) is in SPUR's GitHub organization too (checked 2026-11-16). It maintains the policycheck scanner, the commerce profile and [[aims]].

## Topics
- **Multi-source credit**: crediting every source behind an agent answer when a user clicks one link. The commerce profile's `ctx_token` resolves to a click manifest, with bindings for [[acp]] and [[ucp]].
- **Signal fragmentation**: mapping the competing access signals. policycheck scans robots.txt, [[rsl]], [[cloudflare-content-signals]] and [[w3c-tdmrep]] at once.

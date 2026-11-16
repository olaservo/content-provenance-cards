---
name: OpenAttribution.org
type: organization
website: https://openattribution.org
status: SDKs, edge worker, policycheck, commerce profile, AIMS draft
tags: [type/organization, layer/attribution, layer/identity, layer/payments]
participate: "[GitHub](https://github.com/openattribution-org)"
updated: 2026-11-15
---
Not-for-profit that originally developed the [[content-telemetry]] SDKs, which [[spur-coalition]] now maintains. It maintains the policycheck scanner, the commerce profile and [[aims]].

## Topics
- **Multi-source credit**: crediting every source behind an agent answer when a user clicks one link. The commerce profile's `ctx_token` resolves to a click manifest, with bindings for [[acp]] and [[ucp]].
- **Signal fragmentation**: mapping the competing access signals. policycheck scans robots.txt, [[rsl]], [[cloudflare-content-signals]] and [[w3c-tdmrep]] at once.

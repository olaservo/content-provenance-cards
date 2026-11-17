---
title: "OpenAttribution.org"
id: "openattribution"
type: "organization"
status: "policycheck, commerce profile, AIMS draft"
tags: ["type/organization", "layer/attribution", "layer/identity", "layer/payments"]
updated: "2026-11-16"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/openattribution"
---
# OpenAttribution.org

- Id: openattribution
- Type: organization
- Status: policycheck, commerce profile, AIMS draft
- Website: https://openattribution.org
- Take part: [GitHub](https://github.com/openattribution-org)
- Tags: type/organization, layer/attribution, layer/identity, layer/payments
- Updated: 2026-11-16
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#openattribution

Not-for-profit that originally developed the [Content Telemetry](content-telemetry.md) SDKs, which [SPUR Coalition](spur-coalition.md) now maintains. Its [Cloudflare edge worker](https://github.com/SPUR-Coalition/cloudflare-worker) is in SPUR's GitHub organization too (checked 2026-11-16). It maintains the policycheck scanner, the commerce profile and [Agent Identity and Manifest Standard](aims.md).

## Topics

- **Multi-source credit**: crediting every source behind an agent answer when a user clicks one link. The commerce profile's `ctx_token` resolves to a click manifest, with bindings for [Agentic Commerce Protocol](acp.md) and [Universal Commerce Protocol](ucp.md).
- **Signal fragmentation**: mapping the competing access signals. policycheck scans robots.txt, [Really Simple Licensing](rsl.md), [Cloudflare Content Signals](cloudflare-content-signals.md) and [W3C TDM Reservation Protocol Community Group](w3c-tdmrep.md) at once.

Linked from: [Agent Identity and Manifest Standard](aims.md), [Agentic Commerce Protocol](acp.md), [Skills Marketplace](skills-marketplace.md), [SPUR Coalition](spur-coalition.md), [Universal Commerce Protocol](ucp.md)

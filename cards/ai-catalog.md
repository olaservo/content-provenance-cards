---
name: AI Catalog
aliases: [Agent-Card, ai-catalog.json]
type: specification
website: https://github.com/Agent-Card/ai-catalog
status: ADR-0028 accepted on the 2026-11-05 TSC call, opening catalog and entry objects to unrecognized members; identity-keyed trust manifests merged 2026-10-28
tags: [type/specification, layer/provenance, layer/identity, stage/at-rest, topic/discovery]
participate: "[GitHub issues](https://github.com/Agent-Card/ai-catalog/issues)"
updated: 2026-11-16
---
Catalog format for discovering agents, MCP servers and skills. A catalog is a JSON list of typed entries that a domain can serve at `/.well-known/ai-catalog.json`, and an entry can be another catalog. A four-seat Technical Steering Committee governs it, with two seats nominated by the [[mcp]] core maintainers and two by the A2A steering committee.

## Topics
- **Discovery**: finding agents, servers and skills across vendors.
- **Catalog trust**: signing catalog entries with [identity-keyed trust manifests](https://github.com/Agent-Card/ai-catalog/pull/117).
- **Publisher and operator**: the party that runs a catalog (`host`) and the party responsible for an artifact (`publisher`) are separate roles. An operator that lists an artifact it does not publish must use an identifier under its own control, and "MUST NOT infer publisher authorization from the artifact's URL or an unsigned `publisher` field" (Catalog Projection).
- **Policy links**: the Policy URLs extension carries `privacyPolicyUrl` and `termsOfServiceUrl` for an artifact. A catalog signature covers the URL strings and not the documents behind them. The spec has no field for machine-readable usage terms or for the entitlements an artifact covers (read 2026-11-16).

## Related
- Entry types include `application/mcp-server-card+json` for [[mcp-server-cards]] and `application/agent-skills+zip` for [[agent-skills]] bundles.
- [[ard]] builds its search entries on the catalog entry. The two groups agreed on 2026-07-09 to stay loosely coupled (ADR-0017): the catalog keeps thin entries with a small `extensions` map, and ARD takes JSON-LD `@context` for richer metadata.

## Compare
- A path parallel to the [[agent-skills-signing]]. Neither cites the other (searched 2026-11-15).

## History
- 2026-11-05: ADR-0028 accepted, opening catalog and entry objects to unrecognized members.
- 2026-10-28: Identity-keyed trust manifests merged.
- 2026-07-09: Loose coupling with ARD agreed.

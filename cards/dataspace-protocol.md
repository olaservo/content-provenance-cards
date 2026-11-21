---
name: Dataspace Protocol
aliases: [DSP, Eclipse Dataspace Protocol]
type: specification
website: https://eclipse-dataspace-protocol-base.github.io/DataspaceProtocol/2025-1/
news: https://github.com/eclipse-dataspace-protocol-base/DataspaceProtocol/releases
feed: https://github.com/eclipse-dataspace-protocol-base/DataspaceProtocol/releases.atom
status: 2025-1 released 2025-08-29 and considered stable; second errata tagged 2026-09-11
tags: [type/specification, layer/licensing, layer/access, medium/data]
contribute: "[GitHub issues](https://github.com/eclipse-dataspace-protocol-base/DataspaceProtocol/issues)"
updated: 2026-11-17
---
Eclipse Dataspace Working Group specification for sharing data between organizations under usage control. A provider publishes a catalog, the two sides negotiate an agreement, and then the data transfers. The International Data Spaces Association governed it up to version 2024-1.

## Topics
- **Terms agreed before access**: the spec defines "the schemas and protocols required for entities to publish data, negotiate Agreements, and access data". It has three parts: a catalog protocol, a contract negotiation protocol and a transfer process protocol.
- **Reusing web vocabularies**: catalogs reuse DCAT and policies reuse ODRL ([[w3c-odrl]]), each as a restricted profile.

## Compare
- In a [comment](https://scholarlykitchen.sspnet.org/2026/10/27/mcp-discovery/) of 2026-10-28, Matt Sonnati suggests data spaces as the model for a register of [[mcp]] connectors: connectors listed in a DCAT catalogue, with entitlements and AI terms as ODRL policies. Neither MCP's docs nor the 2025-1 spec names the other (searched 2026-11-16).

## History
- 2026-09-11: Second errata to 2025-1 tagged.
- 2025-08-29: 2025-1 released.

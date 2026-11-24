---
title: "C2PA content credentials in MCP _meta"
id: "mcp-c2pa-in-meta"
type: "proposal"
status: "Discussion closed 2026-09-25 when the spec repo limited Discussions to meeting notes; no SEP filed yet"
tags: ["type/proposal", "layer/provenance", "stage/in-transit", "venue/mcp"]
updated: "2026-11-21"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/mcp-c2pa-in-meta"
---
# C2PA content credentials in MCP _meta

- Id: mcp-c2pa-in-meta
- Also known as: #3225, org.c2pa/credential
- Type: proposal
- Status: Discussion closed 2026-09-25 when the spec repo limited Discussions to meeting notes; no SEP filed yet
- Website: https://github.com/modelcontextprotocol/modelcontextprotocol/discussions/3225
- Part of: [Model Context Protocol](mcp.md)
- Discussion: [MCP community channels](https://modelcontextprotocol.io/community/communication)
- Tags: type/proposal, layer/provenance, stage/in-transit, venue/mcp
- Updated: 2026-11-21
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#mcp-c2pa-in-meta

Carry a [C2PA](c2pa.md) credential for tool results and resources in MCP `_meta` under `org.c2pa/credential`.

## Topics

- **Provenance in transit**: keeping a credential attached as content crosses from server to client.
- **A venue**: finding an owner. The [MCP Financial Services Interest Group](mcp-fsig.md) lists data lineage and citation for its sector and the Scientific Computing IG lists provenance of computed results. No WG or IG covers content provenance in general, and [PR 3336](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/3336) requires a WG or IG thread before a SEP PR.
- **Track choice**: deciding between an `experimental-ext-` repo under SEP-3392 and a Standards Track SEP.
- **Where the field lives**: choosing between a top-level field and `_meta`.

## Compare

- [SEP-3094 Granular Citations](mcp-sep-3094-citations.md) faced the same choice between a top-level field and `_meta`. Neither thread refers to the other (searched 2026-11-15).
- A credential check could run as an interceptor validator ([MCP Interceptors WG and SEP-2624](mcp-interceptors.md)). Neither thread refers to the other (searched 2026-11-15).
- Lineage key overlap: [OpenLineage](openlineage.md). Neither names the other (searched 2026-11-15).

## History

- 2026-09-25: Discussion closed when the spec repo limited Discussions to meeting notes ([closing comment](https://github.com/modelcontextprotocol/modelcontextprotocol/discussions/3225#discussioncomment-18603053)).

Linked from: [Agent Skills at-rest signing threads](agent-skills-signing.md), [C2PA](c2pa.md), [MCP Interceptors WG and SEP-2624](mcp-interceptors.md), [Model Context Protocol](mcp.md), [OpenLineage](openlineage.md), [OpenTelemetry for MCP](otel-mcp.md)

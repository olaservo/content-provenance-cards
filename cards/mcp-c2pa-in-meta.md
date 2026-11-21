---
name: C2PA content credentials in MCP _meta
aliases: ["#3225", org.c2pa/credential]
type: proposal
website: https://github.com/modelcontextprotocol/modelcontextprotocol/discussions/3225
part_of: "[[mcp]]"
status: Discussion closed 2026-09-25 when the spec repo limited Discussions to meeting notes; no SEP filed yet
tags: [type/proposal, layer/provenance, stage/in-transit, venue/mcp]
participate: "[the discussion thread](https://github.com/modelcontextprotocol/modelcontextprotocol/discussions/3225), [MCP community channels](https://modelcontextprotocol.io/community/communication)"
updated: 2026-11-21
---
Carry a [[c2pa]] credential for tool results and resources in MCP `_meta` under `org.c2pa/credential`.

## Topics
- **Provenance in transit**: keeping a credential attached as content crosses from server to client.
- **A venue**: finding an owner. The [[mcp-fsig]] lists data lineage and citation for its sector and the Scientific Computing IG lists provenance of computed results. No WG or IG covers content provenance in general, and [PR 3336](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/3336) requires a WG or IG thread before a SEP PR.
- **Track choice**: deciding between an `experimental-ext-` repo under SEP-3392 and a Standards Track SEP.
- **Where the field lives**: choosing between a top-level field and `_meta`.

## Compare
- [[mcp-sep-3094-citations]] faced the same choice between a top-level field and `_meta`. Neither thread refers to the other (searched 2026-11-15).
- A credential check could run as an interceptor validator ([[mcp-interceptors]]). Neither thread refers to the other (searched 2026-11-15).
- Lineage key overlap: [[openlineage]]. Neither names the other (searched 2026-11-15).

## History
- 2026-09-25: Discussion closed when the spec repo limited Discussions to meeting notes ([closing comment](https://github.com/modelcontextprotocol/modelcontextprotocol/discussions/3225#discussioncomment-18603053)).

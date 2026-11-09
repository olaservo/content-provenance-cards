---
name: C2PA content credentials in MCP _meta
aliases: ["#3225", org.c2pa/credential]
type: proposal
website: https://github.com/modelcontextprotocol/modelcontextprotocol/discussions/3225
part_of: "[[mcp]]"
status: Discussion closed 2026-09-25 with all spec-repo discussions; no SEP filed yet
tags: [type/proposal, layer/provenance, stage/in-transit, venue/mcp]
participate: "[the discussion thread](https://github.com/modelcontextprotocol/modelcontextprotocol/discussions/3225), [MCP community channels](https://modelcontextprotocol.io/community/communication)"
updated: 2026-11-03
---
Carry a [[c2pa]] credential for tool results and resources in MCP `_meta` under `org.c2pa/credential`.

## Topics
- **Provenance in transit**: keeping a credential attached as content crosses from server to client.
- **A venue**: finding an owner, since no WG or IG covers content provenance and [PR 3336](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/3336) requires a WG or IG thread before a SEP PR.
- **Track choice**: deciding between an `experimental-ext-` repo under SEP-3392 and a Standards Track SEP.
- **Where the field lives**: choosing between a top-level field and `_meta`, the same question [[mcp-sep-3094-citations]] faces.

## Related
- A credential check could run as an interceptor validator ([[mcp-interceptors]]).
- Lineage key overlap: [[openlineage]].

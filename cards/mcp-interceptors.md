---
name: MCP Interceptors WG and SEP-2624
aliases: [SEP-2624, experimental-ext-interceptors]
type: working-group
website: https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2624
part_of: "[[mcp]]"
status: SEP open; chain concept removed 2026-10-27; `signature` on ValidationResult reserved
tags: [type/working-group, venue/mcp, stage/boundary]
participate: "[SEP-2624 PR](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2624), [MCP community channels](https://modelcontextprotocol.io/community/communication)"
updated: 2026-11-16
---
Context middleware for clients, servers and gateways: deterministic code that sees each request and result on the way through. The place a seal or citation validator can run without a core spec change.

## Topics
- **Checking at the boundary**: verifying provenance in a gateway or in context middleware, since most clients will not.
- **The `signature` field**: deciding what it signs and whether it ever carries content provenance.
- **Sample validator**: a citation validator for [[mcp-sep-3094-citations]], whose author named interceptors as one way to process citation metadata.

## Compare
- A seal validator for [[mcp-c2pa-in-meta]] is this guide's suggestion. Neither thread refers to the other (searched 2026-11-15).

## History
- 2026-10-27: Chain concept removed from the SEP.

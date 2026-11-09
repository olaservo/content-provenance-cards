---
name: MCP Interceptors WG and SEP-2624
aliases: [SEP-2624, experimental-ext-interceptors]
type: working-group
website: https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2624
part_of: "[[mcp]]"
status: SEP open; chain concept removed 2026-10-27; `signature` on ValidationResult reserved
tags: [type/working-group, venue/mcp, stage/boundary]
participate: "[SEP-2624 PR](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2624), [MCP community channels](https://modelcontextprotocol.io/community/communication)"
updated: 2026-11-03
---
Deterministic hooks in clients, servers and gateways. The place a seal or citation validator can run without a core spec change.

## Topics
- **Checking at the boundary**: verifying provenance in a gateway or hook, since most clients will not.
- **The `signature` field**: deciding what it signs and whether it ever carries content provenance.
- **Sample validator**: a seal or citation validator for [[mcp-c2pa-in-meta]] or [[mcp-sep-3094-citations]].

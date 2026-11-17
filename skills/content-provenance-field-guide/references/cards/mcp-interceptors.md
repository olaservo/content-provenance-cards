---
title: "MCP Interceptors WG and SEP-2624"
id: "mcp-interceptors"
type: "working-group"
status: "SEP open; chain concept removed 2026-10-27; `signature` on ValidationResult reserved"
tags: ["type/working-group", "venue/mcp", "stage/boundary"]
updated: "2026-11-15"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/mcp-interceptors"
---
# MCP Interceptors WG and SEP-2624

- Id: mcp-interceptors
- Also known as: SEP-2624, experimental-ext-interceptors
- Type: working-group
- Status: SEP open; chain concept removed 2026-10-27; `signature` on ValidationResult reserved
- Website: https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2624
- Part of: [Model Context Protocol](mcp.md)
- Take part: [SEP-2624 PR](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2624), [MCP community channels](https://modelcontextprotocol.io/community/communication)
- Tags: type/working-group, venue/mcp, stage/boundary
- Updated: 2026-11-15
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#mcp-interceptors

Context middleware for clients, servers and gateways: deterministic code that sees each request and result on the way through. The place a seal or citation validator can run without a core spec change.

## Topics

- **Checking at the boundary**: verifying provenance in a gateway or in context middleware, since most clients will not.
- **The `signature` field**: deciding what it signs and whether it ever carries content provenance.
- **Sample validator**: a citation validator for [SEP-3094 Granular Citations](mcp-sep-3094-citations.md), whose author named interceptors as one way to process citation metadata.

## Compare

- A seal validator for [C2PA content credentials in MCP _meta](mcp-c2pa-in-meta.md) is this guide's suggestion. Neither thread refers to the other (searched 2026-11-15).

## History

- 2026-10-27: Chain concept removed from the SEP.

Linked from: [C2PA content credentials in MCP _meta](mcp-c2pa-in-meta.md), [Model Context Protocol](mcp.md), [SEP-3094 Granular Citations](mcp-sep-3094-citations.md)

---
name: Model Context Protocol
aliases: [MCP]
type: specification
website: https://modelcontextprotocol.io
part_of: "[[aaif]]"
status: Next spec release moved to 2027-03-30 (SEP-3398); WG-first rule for SEPs
tags: [type/specification, venue/mcp, layer/provenance, layer/attribution]
participate: "[MCP community channels](https://modelcontextprotocol.io/community/communication), [GitHub discussions](https://github.com/modelcontextprotocol/modelcontextprotocol/discussions)"
updated: 2026-11-16
---
The protocol between agents and the tools, resources, prompts and skills they read. MCP is the hop where content provenance can be carried or lost.

## Topics
- **Content provenance ownership**: no WG or IG owns content provenance or attribution.
- **Usage declarations**: no field lets a server declare how its content may be used for training or grounding.
- **Credit reporting**: nothing reports display or credit past the last hop ([[content-telemetry]]).

## Related
- Built-in tracing and metrics in the SDKs: [[otel-mcp]].
- Threads: [[mcp-c2pa-in-meta]], [[mcp-sep-3094-citations]], [[mcp-skills-extension]], [[mcp-interceptors]].
- Groups: [[mcp-fsig]], [[mcp-security-ig]].
- Discovery and authorization: [[mcp-registry]], [[mcp-server-cards]], [[mcp-enterprise-managed-authorization]].

## Compare
- [[ietf-aipref]] defines usage preferences for the web. MCP has no equivalent field, and no MCP material names AIPREF (searched 2026-11-15).

## In use
- Silverchair's [Research Bridge](https://www.silverchair.com/news/silverchair-launches-multi-publisher-mcp-pilot/) is a shared MCP channel for seven scholarly publishers, in a six-month pilot announced 2026-10-05.
- [[getftr]] runs an MCP service that tells an AI tool whether a user is entitled to an article (docs read 2026-11-16).

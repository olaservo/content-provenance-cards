---
name: Model Context Protocol
aliases: [MCP]
type: specification
website: https://modelcontextprotocol.io
part_of: "[[aaif]]"
status: Next spec release moved to 2027-03-30 (SEP-3398); WG-first rule for SEPs
tags: [type/specification, venue/mcp, layer/provenance, layer/attribution]
participate: "[MCP community channels](https://modelcontextprotocol.io/community/communication), [GitHub discussions](https://github.com/modelcontextprotocol/modelcontextprotocol/discussions)"
updated: 2026-11-03
---
The protocol between agents and the tools, resources, prompts and skills they read. MCP is the hop where content provenance can be carried or lost.

## Topics
- **Content provenance ownership**: no WG or IG owns content provenance or attribution.
- **Usage declarations**: no field lets a server declare how its content may be used for training or grounding ([[ietf-aipref]]).
- **Credit reporting**: nothing reports display or credit past the last hop ([[content-telemetry]]).

## Related
- Built-in tracing and metrics in the SDKs: [[otel-mcp]].
- Threads: [[mcp-c2pa-in-meta]], [[mcp-sep-3094-citations]], [[mcp-skills-extension]], [[mcp-interceptors]].
- Groups: [[mcp-fsig]], [[mcp-security-ig]].

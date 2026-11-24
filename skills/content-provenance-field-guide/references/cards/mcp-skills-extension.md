---
title: "SEP-2640 Skills Extension"
id: "mcp-skills-extension"
type: "specification"
status: "Final 2026-09-13; Beta under SEP-3392; ext-skills v0.1.0 tagged 2026-11-20; agentgateway support merged 2026-11-20, not yet in a release"
tags: ["type/specification", "venue/mcp", "stage/at-rest", "topic/skills", "medium/code"]
updated: "2026-11-23"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/mcp-skills-extension"
---
# SEP-2640 Skills Extension

- Id: mcp-skills-extension
- Also known as: SEP-2640, ext-skills
- Type: specification
- Status: Final 2026-09-13; Beta under SEP-3392; ext-skills v0.1.0 tagged 2026-11-20; agentgateway support merged 2026-11-20, not yet in a release
- Website: https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2640
- Part of: [Model Context Protocol](mcp.md)
- Contribute: [ext-skills issues](https://github.com/modelcontextprotocol/ext-skills/issues)
- Discussion: [Discord #skills-over-mcp-wg](https://discord.com/channels/1358869848138059966/1464745826629976084)
- Meetings: [community calendar: skills-over-mcp-wg](https://meet.modelcontextprotocol.io/tag/skills-over-mcp-wg)
- Tags: type/specification, venue/mcp, stage/at-rest, topic/skills, medium/code
- Updated: 2026-11-23
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#mcp-skills-extension

Serves [Agent Skills](agent-skills.md) over MCP, with digests and a `_meta` slot for intermediaries.

## Topics

- **Skills over MCP**: distributing skills to clients with digests and a `_meta` slot for intermediaries.

## Related

- At-rest signing is not on the Skills WG agenda ([Agent Skills at-rest signing threads](agent-skills-signing.md)).

## In use

- [ext-skills v0.1.0](https://github.com/modelcontextprotocol/ext-skills/releases/tag/v0.1.0) (2026-11-20), a GitHub pre-release: the Beta specification with a JSON Schema and TypeScript types, against MCP base revision 2026-07-28.

## History

- 2026-11-20: agentgateway merged initial support for the extension, without multiplexing ([agentgateway#4214](https://github.com/agentgateway/agentgateway/pull/4214)).
- 2026-11-20: ext-skills v0.1.0, the first tagged release, at Beta stage.
- 2026-09-13: SEP-2640 marked Final.

Linked from: [Agent Plugins](agent-plugins.md), [Agent Skills at-rest signing threads](agent-skills-signing.md), [MCP Progressive Disclosure WG](mcp-progressive-disclosure-wg.md), [Model Context Protocol](mcp.md)

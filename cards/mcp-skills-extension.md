---
name: SEP-2640 Skills Extension
aliases: [SEP-2640, ext-skills]
type: specification
website: https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2640
part_of: "[[mcp]]"
status: Final 2026-09-13; Beta under SEP-3392; ext-skills v0.1.0 tagged 2026-11-20; agentgateway support merged 2026-11-20, not yet in a release
contribute: "[ext-skills issues](https://github.com/modelcontextprotocol/ext-skills/issues)"
discussion: "[Discord #skills-over-mcp-wg](https://discord.com/channels/1358869848138059966/1464745826629976084)"
meetings: "[community calendar: skills-over-mcp-wg](https://meet.modelcontextprotocol.io/tag/skills-over-mcp-wg)"
tags: [type/specification, venue/mcp, stage/at-rest, topic/skills, medium/code]
updated: 2026-11-23
---
Serves [[agent-skills]] over MCP, with digests and a `_meta` slot for intermediaries.

## Topics
- **Skills over MCP**: distributing skills to clients with digests and a `_meta` slot for intermediaries.

## Related
- At-rest signing is not on the Skills WG agenda ([[agent-skills-signing]]).

## In use
- [ext-skills v0.1.0](https://github.com/modelcontextprotocol/ext-skills/releases/tag/v0.1.0) (2026-11-20): the Beta specification with a JSON Schema and TypeScript types, against MCP base revision 2026-07-28.

## History
- 2026-11-20: agentgateway merged initial support for the extension, without multiplexing ([agentgateway#4214](https://github.com/agentgateway/agentgateway/pull/4214)).
- 2026-11-20: ext-skills v0.1.0, the first tagged release, at Beta stage.
- 2026-09-13: SEP-2640 marked Final.

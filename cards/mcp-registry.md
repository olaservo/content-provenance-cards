---
name: MCP Registry
aliases: [server.json, Registry WG]
type: project
website: https://modelcontextprotocol.io/registry/about
part_of: "[[mcp]]"
status: In preview since 2025-09-08; registry release v1.8.9 dated 2026-11-10
tags: [type/project, venue/mcp, layer/identity, topic/discovery]
participate: "[registry issues](https://github.com/modelcontextprotocol/registry/issues), [Registry WG charter](https://modelcontextprotocol.io/community/working-groups/registry)"
updated: 2026-11-16
---
The official metadata catalog for publicly accessible MCP servers, run by the MCP Registry Working Group. Each entry is a `server.json` with the server's name, where to find it and how to run it.

## Topics
- **Who published this server**: names are reverse-DNS and tied to a verified GitHub account or domain, so an entry shows who controls its namespace.
- **No ranking**: the charter puts "Ranking/choosing between MCP server implementations on behalf of MCP clients or end-users" out of scope. The docs call the metadata "deliberately unopinionated" and leave curation and ratings to downstream aggregators.
- **A feed for aggregators**: an unauthenticated read-only REST API with an `updated_since` filter. Aggregators are expected to pull about hourly and keep their own copy. The registry gives no uptime or durability guarantee.
- **Usage terms**: `server.json` has no field for a licence, terms of use or the entitlements a server covers (draft schema read 2026-11-16).
- **Private servers**: not supported. The docs tell organizations to run their own registry on the same OpenAPI spec.

## Related
- Server identity and remote endpoints overlap with [[mcp-server-cards]]. The two working groups coordinate to keep the schemas aligned, and the Registry charter says the registry will expose Server Cards for published entries.

## Compare
- Lisa Janicke Hinchliffe [proposes](https://scholarlykitchen.sspnet.org/2026/10/27/mcp-discovery/) (Scholarly Kitchen, 2026-10-27) that libraries keep a register of publisher connectors on the model of [[kbart]] holdings feeds, because the registry does not rank. The MCP docs do not name KBART (searched 2026-11-16).

## In use
- [registry.modelcontextprotocol.io](https://registry.modelcontextprotocol.io) is live and in preview (responding 2026-11-16).

## History
- 2025-09-08: Launched in preview.

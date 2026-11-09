---
name: Agent Plugins
aliases: [agent-plugins-spec, plugin.json]
type: specification
website: https://agent-plugins.org/
status: 1.0.0 published 2026-08-06; 1.1.0 current; steering committee from Amazon, Cursor, Microsoft, OpenAI and Vercel
participate: "[GitHub issues](https://github.com/agentplugins/agent-plugins-spec/issues), [GitHub discussions](https://github.com/agentplugins/agent-plugins-spec/discussions)"
tags: [type/specification, layer/provenance, layer/licensing, topic/skills, stage/at-rest]
updated: 2026-11-08
---
Package format that puts [[agent-skills]] and MCP server configuration in one portable directory: a `plugin.json` manifest, a `skills/` folder and an `mcp.json`. Independently governed, not an [[aaif]] project. The spec is CC BY 4.0 and the schemas Apache 2.0.

## Topics
- **Who made this, under what terms**: the manifest has `author` (name, email, url), `repository`, `homepage` and `license` (SPDX recommended), so a plugin can carry the authorship and licence that a bare `SKILL.md` cannot. Clients validate these by JSON type only, so nothing stops an empty or false value.
- **Trust left to the client**: 1.x defines no signatures, publisher identity or provenance checks. The project's future-considerations list names signature verification, trusted-publisher policies and audit trails, which is the same ground as [[agent-skills-signing]].
- **No distribution layer**: registries, marketplaces, installation and updates are each client's own, so a [[skills-marketplace]] has a package to ship but no shared channel to ship it through.

## Related
- The skills inside a plugin follow the [[agent-skills]] specification unchanged; [[mcp-skills-extension]] serves the same skills over MCP instead of on disk.

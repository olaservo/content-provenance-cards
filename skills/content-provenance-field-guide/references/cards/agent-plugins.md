---
title: "Agent Plugins"
id: "agent-plugins"
type: "specification"
status: "1.0.0 published 2026-08-06; 1.1.0 is a working draft; AAIF Technical Committee approved it as a Growth-stage project 2026-10-27, Governing Board vote pending; steering committee from Amazon, Cursor, Microsoft, OpenAI and Vercel"
tags: ["type/specification", "layer/provenance", "layer/licensing", "topic/skills", "stage/at-rest", "medium/code"]
updated: "2026-11-21"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/agent-plugins"
---
# Agent Plugins

- Id: agent-plugins
- Also known as: agent-plugins-spec, plugin.json
- Type: specification
- Status: 1.0.0 published 2026-08-06; 1.1.0 is a working draft; AAIF Technical Committee approved it as a Growth-stage project 2026-10-27, Governing Board vote pending; steering committee from Amazon, Cursor, Microsoft, OpenAI and Vercel
- Website: https://agent-plugins.org/
- Contribute: [GitHub issues](https://github.com/agentplugins/agent-plugins-spec/issues)
- Discussion: [GitHub discussions](https://github.com/agentplugins/agent-plugins-spec/discussions), [Agent Plugins Discord](https://discord.gg/692jE8wsmj)
- Tags: type/specification, layer/provenance, layer/licensing, topic/skills, stage/at-rest, medium/code
- Updated: 2026-11-21
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#agent-plugins

Package format that puts [Agent Skills](agent-skills.md) and MCP server configuration in one portable directory: a `plugin.json` manifest, a `skills/` folder and an `mcp.json`. Independently governed. The spec is CC BY 4.0 and the schemas Apache 2.0.

## Topics

- **Who made this, under what terms**: the manifest has `author` (name, email, url), `repository`, `homepage` and `license` (SPDX recommended), so a plugin carries structured authorship and repository fields. A `SKILL.md` has an optional `license` field and a free-form `metadata` map. Clients validate these by JSON type only, so nothing stops an empty or false value.
- **Trust left to the client**: 1.x defines no signatures, publisher identity or provenance checks. The project's future-considerations list names signature verification, trusted-publisher policies and audit trails.
- **No distribution layer**: registries, marketplaces, installation and updates are each client's own.

## Related

- The skills inside a plugin follow the [Agent Skills](agent-skills.md) specification unchanged.

## Compare

- Not yet an [Agentic AI Foundation](aaif.md) project. The AAIF Technical Committee approved it as a Growth-stage project, and it awaits a Governing Board vote ([proposal 56](https://github.com/aaif/project-proposals/issues/56)). The AAIF project list does not include it (read 2026-11-20).
- Its future-considerations list covers the same ground as the [Agent Skills at-rest signing threads](agent-skills-signing.md). Neither refers to the other (searched 2026-11-15).
- A [Skills Marketplace](skills-marketplace.md) would have a package to ship here and no shared channel to ship it through.
- [SEP-2640 Skills Extension](mcp-skills-extension.md) serves the same skills over MCP instead of on disk. Both build on Agent Skills, and neither names the other (searched 2026-11-15).

## History

- 2026-10-27: AAIF staff reported Technical Committee approval as a Growth-stage project. A Governing Board vote is pending.
- 2026-10-12: Proposed to [Agentic AI Foundation](aaif.md).
- 2026-08-06: 1.0.0 published.

Linked from: [Agent Skills](agent-skills.md), [Agent Skills at-rest signing threads](agent-skills-signing.md), [Skills Marketplace](skills-marketplace.md)

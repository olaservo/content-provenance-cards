---
title: "MCP Progressive Disclosure WG"
id: "mcp-progressive-disclosure-wg"
type: "working-group"
status: "Draft SEP for an `io.modelcontextprotocol/groups` extension open as a PR in the WG repository since 2026-09-28; not yet filed in the specification repository. The Core Primitives WG charter, open since 2026-11-11 (PR 3545), hands progressive discovery to this WG"
tags: ["type/working-group", "venue/mcp", "topic/skills"]
updated: "2026-11-21"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/mcp-progressive-disclosure-wg"
---
# MCP Progressive Disclosure WG

- Id: mcp-progressive-disclosure-wg
- Also known as: Progressive Disclosure Working Group, Primitive Grouping IG
- Type: working-group
- Status: Draft SEP for an `io.modelcontextprotocol/groups` extension open as a PR in the WG repository since 2026-09-28; not yet filed in the specification repository. The Core Primitives WG charter, open since 2026-11-11 (PR 3545), hands progressive discovery to this WG
- Website: https://modelcontextprotocol.io/community/working-groups/progressive-disclosure
- Part of: [Model Context Protocol](mcp.md)
- Contribute: [draft groups SEP](https://github.com/modelcontextprotocol/progressive-disclosure-wg/pull/19), [WG repository](https://github.com/modelcontextprotocol/progressive-disclosure-wg)
- Discussion: [Discord #progressive-disclosure-wg](https://discord.com/channels/1358869848138059966/1425903819186770064), [GitHub discussions](https://github.com/modelcontextprotocol/progressive-disclosure-wg/discussions)
- Meetings: [community calendar: progressive-disclosure-wg](https://meet.modelcontextprotocol.io/tag/progressive-disclosure-wg)
- Tags: type/working-group, venue/mcp, topic/skills
- Updated: 2026-11-21
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#mcp-progressive-disclosure-wg

Working group exploring how a server's tools, resources, prompts and tasks can be organized beyond flat lists, so a client loads a small entry point first and the full definitions only when it needs them. Its problem statement uses CLIs and [Agent Skills](agent-skills.md) as examples of this loading pattern. For skills, a client sees each skill's name and description, loads `SKILL.md` when the skill is activated, and loads supporting files during execution. It says MCP has no equivalent for its own primitives.

## Topics

- **Loading primitives the way skills load**: long lists of primitives fill a model's context and cost tokens. The WG supports reference extensions for several approaches, such as grouping, tool search and code mode, and feeds recommendations into the SEP process.
- **A `group` primitive**: the draft SEP defines a group as a named bundle that a server lists with `groups/list`. `groups/get` returns the group's scoped tools, prompts, resources and nested groups, with optional `instructions`, in one stateless call. Scoped primitives stay out of `tools/list`, `prompts/list` and `resources/list`.
- **Groups and skills**: a positioning draft says Groups borrows its design from Agent Skills, applied to MCP primitives. It lists three options for how Groups relates to the [SEP-2640 Skills Extension](mcp-skills-extension.md): competing standards, complementary standards, or renaming Groups to Skills as a "Skills v2". It says the complementary option got the most votes in the initial WG discussion and that renaming remains a competitive alternative ([PR 22](https://github.com/modelcontextprotocol/progressive-disclosure-wg/pull/22), open).

## Related

- The charter lists the Skills Over MCP WG and the [SEP-2640 Skills Extension](mcp-skills-extension.md) as related, saying skill discovery and progressive disclosure overlap with grouping. The Skills Over MCP charter lists this WG in return.
- Organizing MCP servers is out of scope. The charter leaves server discovery to the [MCP Registry](mcp-registry.md) WG.
- The MCP roadmap assigns "progressive discovery" of a server's tools and resources to the Core Primitives WG. The draft Core Primitives charter ([PR 3545](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/3545), open) says progressive discovery is handled by this WG.

## History

- 2026-10-30: Positioning draft on Groups and Skills over MCP opened as PR 22.
- 2026-10-26: The WG agreed to keep `group` as the primitive name, with stateless `groups/list` and `groups/get`, `description` as the "when to use" field and optional `instructions` ([meeting notes](https://github.com/modelcontextprotocol/modelcontextprotocol/discussions/3458)). The decision log recorded these the next day.
- 2026-09-28: Draft groups SEP opened as PR 19.
- 2026-09-21: Renamed from the Primitive Grouping Interest Group and converted to a Working Group.
- 2026-06-18: Initial charter, as the Primitive Grouping Interest Group.

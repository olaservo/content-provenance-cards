---
title: "Model Context Protocol"
id: "mcp"
type: "specification"
status: "Next spec release moved to 2027-03-30 (SEP-3398); WG-first rule for SEPs"
tags: ["type/specification", "venue/mcp", "layer/provenance", "layer/attribution"]
updated: "2026-11-16"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/mcp"
---
# Model Context Protocol

- Id: mcp
- Also known as: MCP
- Type: specification
- Status: Next spec release moved to 2027-03-30 (SEP-3398); WG-first rule for SEPs
- Website: https://modelcontextprotocol.io
- News: https://blog.modelcontextprotocol.io/
- Feed: https://blog.modelcontextprotocol.io/index.xml
- Part of: [Agentic AI Foundation](aaif.md)
- Take part: [MCP community channels](https://modelcontextprotocol.io/community/communication), [GitHub discussions](https://github.com/modelcontextprotocol/modelcontextprotocol/discussions)
- Tags: type/specification, venue/mcp, layer/provenance, layer/attribution
- Updated: 2026-11-16
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#mcp

The protocol between agents and the tools, resources, prompts and skills they read. MCP is the hop where content provenance can be carried or lost.

## Topics

- **Content provenance ownership**: no WG or IG owns content provenance or attribution.
- **Usage declarations**: no field lets a server declare how its content may be used for training or grounding.
- **Credit reporting**: nothing reports display or credit past the last hop ([Content Telemetry](content-telemetry.md)).

## Related

- Built-in tracing and metrics in the SDKs: [OpenTelemetry for MCP](otel-mcp.md).
- Threads: [C2PA content credentials in MCP _meta](mcp-c2pa-in-meta.md), [SEP-3094 Granular Citations](mcp-sep-3094-citations.md), [SEP-2640 Skills Extension](mcp-skills-extension.md), [MCP Interceptors WG and SEP-2624](mcp-interceptors.md).
- Groups: [MCP Financial Services Interest Group](mcp-fsig.md), [MCP Security Interest Group](mcp-security-ig.md).
- Discovery and authorization: [MCP Registry](mcp-registry.md), [SEP-2127 Server Cards](mcp-server-cards.md), [Enterprise-Managed Authorization](mcp-enterprise-managed-authorization.md).

## Compare

- [IETF AI Preferences Working Group](ietf-aipref.md) defines usage preferences for the web. MCP has no equivalent field, and no MCP material names AIPREF (searched 2026-11-15).

## In use

- Silverchair's [Research Bridge](https://www.silverchair.com/news/silverchair-launches-multi-publisher-mcp-pilot/) is a shared MCP channel for seven scholarly publishers, in a six-month pilot announced 2026-10-05.
- [GetFTR](getftr.md) runs an MCP service that tells an AI tool whether a user is entitled to an article (docs read 2026-11-16).

Linked from: [Agentic AI Foundation](aaif.md), [AI Catalog](ai-catalog.md), [C2PA content credentials in MCP _meta](mcp-c2pa-in-meta.md), [Dataspace Protocol](dataspace-protocol.md), [Enterprise-Managed Authorization](mcp-enterprise-managed-authorization.md), [GetFTR](getftr.md), [MCP Financial Services Interest Group](mcp-fsig.md), [MCP Interceptors WG and SEP-2624](mcp-interceptors.md), [MCP Registry](mcp-registry.md), [MCP Security Interest Group](mcp-security-ig.md), [OpenTelemetry for MCP](otel-mcp.md), [SEP-2127 Server Cards](mcp-server-cards.md), [SEP-2640 Skills Extension](mcp-skills-extension.md), [SEP-3094 Granular Citations](mcp-sep-3094-citations.md)

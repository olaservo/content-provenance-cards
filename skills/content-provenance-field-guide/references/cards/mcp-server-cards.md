---
title: "SEP-2127 Server Cards"
id: "mcp-server-cards"
type: "specification"
status: "SEP-2127 is Final and its PR merged 2026-10-06; the extension repository README still says Experimental"
tags: ["type/specification", "venue/mcp", "layer/identity", "topic/discovery"]
updated: "2026-11-16"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/mcp-server-cards"
---
# SEP-2127 Server Cards

- Id: mcp-server-cards
- Also known as: SEP-2127, MCP Server Card, ext-server-card
- Type: specification
- Status: SEP-2127 is Final and its PR merged 2026-10-06; the extension repository README still says Experimental
- Website: https://github.com/modelcontextprotocol/ext-server-card
- Part of: [Model Context Protocol](mcp.md)
- Take part: [ext-server-card issues](https://github.com/modelcontextprotocol/ext-server-card/issues), [Server Card WG charter](https://modelcontextprotocol.io/community/working-groups/server-card)
- Tags: type/specification, venue/mcp, layer/identity, topic/discovery
- Updated: 2026-11-16
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#mcp-server-cards

A static JSON document that describes a remote MCP server before a client connects: its name, version, transport endpoints and supported protocol versions. The extension identifier is `io.modelcontextprotocol/server-card`. A domain advertises its cards through an [AI Catalog](ai-catalog.md) entry of type `application/mcp-server-card+json`.

## Topics

- **Finding a server from a domain**: a client had no standard way to learn which MCP servers a domain offers. The domain publishes an AI Catalog at `/.well-known/ai-catalog.json` that links to or embeds its Server Cards.
- **Servers hosted by someone else**: a catalog may list cards served from another domain, such as a SaaS host that runs a server on the organization's behalf.
- **No tools, no terms**: the card leaves out tools, resources, prompts and capabilities, which vary by user and session. It has no field for a licence, usage terms or entitlements (`schema.ts` read 2026-11-16).

## Related

- [MCP Registry](mcp-registry.md) `server.json` is a separate schema owned by the Registry WG. It also covers locally installed packages, which a Server Card does not.
- The Authorization IG charter places "Server identity, provenance, and trust signalling" with the Server Card and Registry efforts.

## History

- 2026-10-06: SEP-2127 PR merged.
- 2026-01-21: SEP-2127 created.

Linked from: [AI Catalog](ai-catalog.md), [KBART](kbart.md), [MCP Registry](mcp-registry.md), [Model Context Protocol](mcp.md)

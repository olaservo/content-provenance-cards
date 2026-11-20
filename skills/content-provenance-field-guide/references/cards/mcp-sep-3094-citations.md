---
title: "SEP-3094 Granular Citations"
id: "mcp-sep-3094-citations"
type: "proposal"
status: "Closed without merging 2026-11-08; the author plans to take it to the Core Primitives WG on 2026-11-23"
tags: ["type/proposal", "venue/mcp", "layer/attribution", "stage/in-transit", "stage/after-delivery"]
updated: "2026-11-20"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/mcp-sep-3094-citations"
---
# SEP-3094 Granular Citations

- Id: mcp-sep-3094-citations
- Also known as: SEP-3094, #3094
- Type: proposal
- Status: Closed without merging 2026-11-08; the author plans to take it to the Core Primitives WG on 2026-11-23
- Website: https://github.com/modelcontextprotocol/modelcontextprotocol/pull/3094
- Part of: [Model Context Protocol](mcp.md)
- Take part: [SEP-3094 PR](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/3094), [MCP community channels](https://modelcontextprotocol.io/community/communication)
- Tags: type/proposal, venue/mcp, layer/attribution, stage/in-transit, stage/after-delivery
- Updated: 2026-11-20
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#mcp-sep-3094-citations

Citations on tool results bound by CommonMark links in the text, each a flat schema.org CreativeWork, granularity via URL fragments, integrity deferred. A `citations.render` client capability.

## Topics

- **Citations in transit**: keeping sources attached from tool result to the answer a user sees.
- **Sponsorship and venue**: finding a sponsor and a WG or IG discussion. A maintainer wrote on 2026-11-06 that "we now encourage people to go through working groups to create SEPs", and suggested the Core Primitives WG or a new interest group on citations.
- **Field placement**: choosing a top-level field or `_meta` processed by [MCP Interceptors WG and SEP-2624](mcp-interceptors.md).

## Related

- Reviewers include a [Wikimedia](wikimedia.md) contributor.
- On the [MCP Financial Services Interest Group](mcp-fsig.md) agenda on 2026-09-24 ([meeting notes](https://docs.google.com/document/d/19HwCw7i4k-omABGnRYGGuLdMJNXQc3rs_QRgJxPhQU8/edit)).

## Compare

- Reporting: the citations could map to [Open Knowledge Foundation](okfn.md)'s `sources` list and to [Content Telemetry](content-telemetry.md) events. Neither source makes the mapping (searched 2026-11-15).
- Another reviewer contributes to OKFN's MCP server. No OKFN page names the SEP (searched 2026-11-15).

## History

- 2026-11-08: Closed without merging.
- 2026-09-04: Revised.

Linked from: [C2PA content credentials in MCP _meta](mcp-c2pa-in-meta.md), [CC Signals](cc-signals.md), [Content Telemetry](content-telemetry.md), [MCP Financial Services Interest Group](mcp-fsig.md), [MCP Interceptors WG and SEP-2624](mcp-interceptors.md), [MCP Security Interest Group](mcp-security-ig.md), [Model Context Protocol](mcp.md), [Open Knowledge Foundation](okfn.md), [Wikimedia](wikimedia.md)

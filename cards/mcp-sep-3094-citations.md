---
name: SEP-3094 Granular Citations
aliases: [SEP-3094, "#3094"]
type: proposal
website: https://github.com/modelcontextprotocol/modelcontextprotocol/pull/3094
part_of: "[[mcp]]"
status: Closed without merging 2026-11-08; the author plans to take it to the Core Primitives WG on 2026-11-23
contribute: "[Core Primitives WG repository](https://github.com/modelcontextprotocol/core-primitives-wg)"
discussion: "[Discord #core-primitives-wg](https://discord.gg/modelcontextprotocol)"
meetings: "[community calendar: core-primitives-wg](https://meet.modelcontextprotocol.io/tag/core-primitives-wg)"
tags: [type/proposal, venue/mcp, layer/attribution, stage/in-transit, stage/after-delivery]
updated: 2026-11-21
---
Citations on tool results bound by CommonMark links in the text, each a flat schema.org CreativeWork, granularity via URL fragments, integrity deferred. A `citations.render` client capability.

## Topics
- **Citations in transit**: keeping sources attached from tool result to the answer a user sees.
- **Sponsorship and venue**: finding a sponsor and a WG or IG discussion. A maintainer wrote on 2026-11-06 that "we now encourage people to go through working groups to create SEPs", and suggested the Core Primitives WG or a new interest group on citations.
- **Field placement**: choosing a top-level field or `_meta` processed by [[mcp-interceptors]].

## Related
- Reviewers include a [[wikimedia]] contributor.
- On the [[mcp-fsig]] agenda on 2026-09-24 ([meeting notes](https://docs.google.com/document/d/19HwCw7i4k-omABGnRYGGuLdMJNXQc3rs_QRgJxPhQU8/edit)).

## Compare
- Reporting: the citations could map to [[okfn]]'s `sources` list and to [[content-telemetry]] events. Neither source makes the mapping (searched 2026-11-15).
- Another reviewer contributes to OKFN's MCP server. No OKFN page names the SEP (searched 2026-11-15).

## History
- 2026-11-08: Closed without merging.
- 2026-09-04: Revised.

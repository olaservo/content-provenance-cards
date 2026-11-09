---
name: SEP-3094 Granular Citations
aliases: [SEP-3094, "#3094"]
type: proposal
website: https://github.com/modelcontextprotocol/modelcontextprotocol/pull/3094
part_of: "[[mcp]]"
status: Open, no sponsor; revised 2026-09-04; an implementation PR open from Perplexity; dormancy clock to about 2027-01-15
tags: [type/proposal, venue/mcp, layer/attribution, stage/in-transit, stage/after-delivery]
participate: "[SEP-3094 PR](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/3094), [MCP community channels](https://modelcontextprotocol.io/community/communication)"
updated: 2026-11-03
---
Citations on tool results bound by CommonMark links in the text, each a flat schema.org CreativeWork, granularity via URL fragments, integrity deferred. A `citations.render` client capability.

## Topics
- **Citations in transit**: keeping sources attached from tool result to the answer a user sees.
- **Sponsorship and venue**: finding a sponsor and a WG or IG discussion.
- **Field placement**: choosing a top-level field or `_meta` processed by [[mcp-interceptors]].
- **Reporting**: mapping to [[okfn]] `sources` and [[content-telemetry]] events.

## Related
- Reviewers include [[okfn]] and [[wikimedia]] contributors.

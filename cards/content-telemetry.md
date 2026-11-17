---
name: Content Telemetry
type: specification
website: https://github.com/SPUR-Coalition/telemetry
news: https://github.com/SPUR-Coalition/telemetry/releases
feed: https://github.com/SPUR-Coalition/telemetry/releases.atom
part_of: "[[spur-coalition]]"
status: v1.0 published 2026-09-02; signed events deferred (section 8.9)
tags: [type/specification, layer/attribution, stage/after-delivery]
participate: "[GitHub issues](https://github.com/SPUR-Coalition/telemetry/issues)"
updated: 2026-11-15
---
Five reportable stages: `content_retrieved`, `content_grounded`, `content_cited`, `content_presented`, `content_engaged`. Manifest discovery at `/.well-known/content-telemetry.json`. `license_ref` joins it to the licensing layer ([[rsl]], [[iab-comp]]).

## Topics
- **Usage reporting**: reporting how AI systems use content after retrieval, in five events.
- **Demanding conformance**: a manifest cannot require a conformance level from an agent (section 8.5).
- **MCP binding**: emitting `content_cited` and `content_presented` from MCP clients.

## Related
- [[counter]] says phase two of its AI guidelines is aligned with it.

## Compare
- [[mcp-sep-3094-citations]] `citations.render` would need the `content_cited` and `content_presented` events. Neither names the other (searched 2026-11-15).
- Execution traces, which stop at the tool call: [[otel-mcp]]. Neither names the other (searched 2026-11-15).

## In use
- [telemetry-js](https://github.com/SPUR-Coalition/telemetry-js) is on npm as `@openattribution/telemetry` 0.1.3 (2026-06-12) and includes an `MCPSessionTracker`. Its 1.0.0, which implements v1.0 of the standard, is unreleased.

## History
- 2026-09-02: v1.0 published.

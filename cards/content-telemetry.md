---
name: Content Telemetry
type: specification
website: https://github.com/SPUR-Coalition/telemetry
part_of: "[[spur-coalition]]"
status: v1.0 published 2026-09-02; signed events deferred (section 8.9)
tags: [type/specification, layer/attribution, stage/after-delivery]
participate: "[GitHub issues](https://github.com/SPUR-Coalition/telemetry/issues)"
updated: 2026-11-03
---
Five reportable stages: `content_retrieved`, `content_grounded`, `content_cited`, `content_presented`, `content_engaged`. Manifest discovery at `/.well-known/content-telemetry.json`. `license_ref` joins it to the licensing layer ([[rsl]], [[iab-comp]]).

## Topics
- **Usage reporting**: reporting how AI systems use content after retrieval, in five events.
- **Demanding conformance**: a manifest cannot require a conformance level from an agent (section 8.5).
- **MCP binding**: emitting `content_cited` and `content_presented` from MCP clients, the events [[mcp-sep-3094-citations]] `citations.render` would need. telemetry-js ships an `MCPSessionTracker`.

## Related
- Execution traces, which stop at the tool call: [[otel-mcp]].
- [[counter]] plans to reference it in phase two.

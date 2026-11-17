---
title: "Content Telemetry"
id: "content-telemetry"
type: "specification"
status: "v1.0 published 2026-09-02; signed events deferred (section 8.9)"
tags: ["type/specification", "layer/attribution", "stage/after-delivery"]
updated: "2026-11-15"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/content-telemetry"
---
# Content Telemetry

- Id: content-telemetry
- Type: specification
- Status: v1.0 published 2026-09-02; signed events deferred (section 8.9)
- Website: https://github.com/SPUR-Coalition/telemetry
- Part of: [SPUR Coalition](spur-coalition.md)
- Take part: [GitHub issues](https://github.com/SPUR-Coalition/telemetry/issues)
- Tags: type/specification, layer/attribution, stage/after-delivery
- Updated: 2026-11-15
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#content-telemetry

Five reportable stages: `content_retrieved`, `content_grounded`, `content_cited`, `content_presented`, `content_engaged`. Manifest discovery at `/.well-known/content-telemetry.json`. `license_ref` joins it to the licensing layer ([Really Simple Licensing](rsl.md), [IAB Tech Lab Content Monetization Protocols](iab-comp.md)).

## Topics

- **Usage reporting**: reporting how AI systems use content after retrieval, in five events.
- **Demanding conformance**: a manifest cannot require a conformance level from an agent (section 8.5).
- **MCP binding**: emitting `content_cited` and `content_presented` from MCP clients.

## Related

- [COUNTER Metrics](counter.md) says phase two of its AI guidelines is aligned with it.

## Compare

- [SEP-3094 Granular Citations](mcp-sep-3094-citations.md) `citations.render` would need the `content_cited` and `content_presented` events. Neither names the other (searched 2026-11-15).
- Execution traces, which stop at the tool call: [OpenTelemetry for MCP](otel-mcp.md). Neither names the other (searched 2026-11-15).

## In use

- [telemetry-js](https://github.com/SPUR-Coalition/telemetry-js) is on npm as `@openattribution/telemetry` 0.1.3 (2026-06-12) and includes an `MCPSessionTracker`. Its 1.0.0, which implements v1.0 of the standard, is unreleased.

## History

- 2026-09-02: v1.0 published.

Linked from: [AAIF Observability and Traceability WG](aaif-observability-traceability-wg.md), [CC Signals](cc-signals.md), [COUNTER Metrics](counter.md), [Internet Licensing Collective](internet-licensing-collective.md), [Model Context Protocol](mcp.md), [OpenAttribution.org](openattribution.md), [OpenTelemetry for MCP](otel-mcp.md), [Really Simple Licensing](rsl.md), [SEP-3094 Granular Citations](mcp-sep-3094-citations.md), [SPUR Coalition](spur-coalition.md), [TRACE](trace.md)

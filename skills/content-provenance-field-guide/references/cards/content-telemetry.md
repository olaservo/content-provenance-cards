---
title: "Content Telemetry"
id: "content-telemetry"
type: "specification"
status: "v1.0 published 2026-09-02; per-event signing is informational (section 8.4) and manifest signing is deferred (section 8.9)"
tags: ["type/specification", "layer/attribution", "stage/after-delivery"]
updated: "2026-11-20"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/content-telemetry"
---
# Content Telemetry

- Id: content-telemetry
- Type: specification
- Status: v1.0 published 2026-09-02; per-event signing is informational (section 8.4) and manifest signing is deferred (section 8.9)
- Website: https://github.com/SPUR-Coalition/telemetry
- News: https://github.com/SPUR-Coalition/telemetry/releases
- Feed: https://github.com/SPUR-Coalition/telemetry/releases.atom
- Part of: [SPUR Coalition](spur-coalition.md)
- Contribute: [GitHub issues](https://github.com/SPUR-Coalition/telemetry/issues)
- Tags: type/specification, layer/attribution, stage/after-delivery
- Updated: 2026-11-20
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#content-telemetry

Five reportable stages: `content_retrieved`, `content_grounded`, `content_cited`, `content_presented`, `content_engaged`. Manifest discovery at `/.well-known/content-telemetry.json`. `license_ref` joins it to the licensing layer ([Really Simple Licensing](rsl.md), [IAB Tech Lab Content Monetization Protocols](iab-comp.md)).

## Topics

- **Usage reporting**: reporting how AI systems use content after retrieval, in five events.
- **Demanding conformance**: a manifest cannot require a conformance level from an agent (section 8.5).
- **Declaring coverage**: a report does not show whether every event was reported. Section 5.7.6 has an emitter declare one of four coverage modes (complete, sampled, aggregated, selected) and the scope it applies over, and says a consumer must not read a missing event as proof that nothing happened unless coverage is complete.
- **Reporting for an institution**: `access_context` names the institution a session's access rights derive from, as a claim by the emitter (section 5.1.3). `content_depth` records whether a retrieval reached metadata, an abstract or the full record (section 6.1).
- **MCP binding**: the specification defines none and lists MCP tool calls as one delivery pattern (section 7.1). telemetry-js's `MCPSessionTracker` emits retrieved, cited and presented events from MCP tool and response hooks.

## Related

- [COUNTER Metrics](counter.md) says phase two of its AI guidelines is aligned with it. It maps retrieved, cited and presented events to its metrics and counts nothing for a grounded event.
- v1.0 has no event for a retrieval that was refused (read at 7da55f2, 2026-11-17).

## Compare

- [SEP-3094 Granular Citations](mcp-sep-3094-citations.md) `citations.render` would need the `content_cited` and `content_presented` events. Neither names the other (searched 2026-11-15).
- Execution traces, which stop at the tool call: [OpenTelemetry for MCP](otel-mcp.md). Neither names the other (searched 2026-11-15).

## In use

- [telemetry-js](https://github.com/SPUR-Coalition/telemetry-js) is on npm as `@openattribution/telemetry` and includes an `MCPSessionTracker`. Its `latest` tag is 0.1.3 (2026-06-12), and versions 0.2.0 to 0.4.0 (2026-03-03 to 2026-05-28) are also published. Its 1.0.0, which implements v1.0 of the standard, is unreleased.

## History

- 2026-09-02: v1.0 published.

Linked from: [AAIF Observability and Traceability WG](aaif-observability-traceability-wg.md), [CC Signals](cc-signals.md), [COUNTER Metrics](counter.md), [Google Scholar Mediated Reading](google-scholar-mediated-reading.md), [Internet Licensing Collective](internet-licensing-collective.md), [Model Context Protocol](mcp.md), [OpenAttribution.org](openattribution.md), [OpenTelemetry for MCP](otel-mcp.md), [Really Simple Licensing](rsl.md), [SEP-3094 Granular Citations](mcp-sep-3094-citations.md), [SPUR Coalition](spur-coalition.md), [TRACE](trace.md)

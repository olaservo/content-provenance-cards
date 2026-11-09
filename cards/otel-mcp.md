---
name: OpenTelemetry for MCP
aliases: [MCP semantic conventions, SEP-414]
type: specification
website: https://github.com/open-telemetry/semantic-conventions-genai/blob/main/docs/gen-ai/mcp.md
part_of: "[[mcp]]"
status: Conventions in Development; built into the Python SDK since v2.0.0; merged for the TypeScript SDK 2026-10-31, not yet released
participate: "[semantic-conventions-genai issues](https://github.com/open-telemetry/semantic-conventions-genai/issues), [MCP community channels](https://modelcontextprotocol.io/community/communication)"
tags: [type/specification, venue/mcp, layer/provenance, stage/in-transit]
updated: 2026-11-08
---
OpenTelemetry semantic conventions for MCP spans and metrics, and the SDKs that emit them. Spans are named `{mcp.method.name} {target}`, for example `tools/call get-weather`, with `mcp.session.id`, `mcp.protocol.version` and `jsonrpc.request.id`. Trace context travels in `params._meta` under three keys that [SEP-414](https://modelcontextprotocol.io/seps/414-request-meta) proposed in April 2025 and the [2026-07-28 spec reserves](https://modelcontextprotocol.io/specification/2026-07-28/basic/index#_meta): `traceparent`, `tracestate` and `baggage`.

## Topics
- **Metadata that already travels with a tool call**: a trace id is the one piece of metadata MCP carries end to end today, client to server and back, in the same `_meta` slot that [[mcp-c2pa-in-meta]] proposes for content credentials. The propagation rules are a precedent for any other credential that has to survive the hop.
- **What a span does not say**: the conventions make tool arguments and results opt-in attributes marked as sensitive (`gen_ai.tool.call.arguments`, `gen_ai.tool.call.result`), so a trace shows which tool ran, when and for how long, and nothing about the content that came back or where it came from. That gap is where [[content-telemetry]] and the [[aaif-observability-traceability-wg]] sit.
- **SDK coverage**: the Python SDK has emitted client and server spans since v2.0.0 ([#2381](https://github.com/modelcontextprotocol/python-sdk/pull/2381), 2026-03-31, middleware form in [#2941](https://github.com/modelcontextprotocol/python-sdk/pull/2941)), with no metrics. The TypeScript SDK adds spans and `mcp.client.operation.duration` and `mcp.server.operation.duration` histograms, on by default once an OpenTelemetry SDK is registered ([#3115](https://github.com/modelcontextprotocol/typescript-sdk/pull/3115), merged 2026-10-31, not in a release as of 2026-11-08). The C# SDK has an `Experimental.ModelContextProtocol` activity source. The Go and Java SDKs have no built-in instrumentation.

## Related
- [SEP-2028](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2028), open, would forward `_meta` entries to HTTP headers for distributed tracing. [SEP-2448](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2448), server execution telemetry, closed without merging in March 2026.
- Lineage after the tool call, rather than the call itself: [[openlineage]].

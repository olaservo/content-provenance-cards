---
title: "OpenLineage"
id: "openlineage"
type: "project"
status: "RFC 4484 open (updated 2026-10-07); BearingNode proposed an MCP `_meta` lineage key to the FSIG 2026-10-08"
tags: ["type/project", "layer/provenance", "stage/in-transit", "medium/data", "topic/lineage"]
updated: "2026-11-22"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/openlineage"
---
# OpenLineage

- Id: openlineage
- Type: project
- Status: RFC 4484 open (updated 2026-10-07); BearingNode proposed an MCP `_meta` lineage key to the FSIG 2026-10-08
- Website: https://openlineage.io
- News: https://openlineage.io/blog/
- Feed: https://openlineage.io/blog/feed.json
- Contribute: [GitHub issues](https://github.com/OpenLineage/OpenLineage/issues)
- Discussion: [Slack](https://openlineage.io/community/), [mailing list](https://lists.lfaidata.foundation/g/openlineage-tsc), [GitHub Discussions](https://github.com/OpenLineage/OpenLineage/discussions)
- Meetings: [TSC meetings](https://openlineage.io/meetings/), [community calendar](https://zoom-lfx.platform.linuxfoundation.org/meetings/open-lineage?view=week)
- Tags: type/project, layer/provenance, stage/in-transit, medium/data, topic/lineage
- Updated: 2026-11-22
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#openlineage

Open standard for data lineage events. [RFC 4484](https://github.com/OpenLineage/OpenLineage/issues/4484) and BearingNode's proposed MCP `_meta` lineage key ([FSIG issue 16](https://github.com/modelcontextprotocol/financial-services-interest-group/issues/16)) carry lineage identity across the tool-call boundary.

## Topics

- **Lineage across tool calls**: tracing data handed to an agent back to its source.

## Related

- Presented to [MCP Financial Services Interest Group](mcp-fsig.md) on 2026-09-24 ([meeting notes](https://docs.google.com/document/d/19HwCw7i4k-omABGnRYGGuLdMJNXQc3rs_QRgJxPhQU8/edit)). The proposal was filed there as issue 16 on 2026-10-08.

## Compare

- Overlaps [C2PA content credentials in MCP _meta](mcp-c2pa-in-meta.md) on lineage keys. Neither names the other (searched 2026-11-15).

## History

- 2026-10-08: BearingNode filed the `_meta` lineage key proposal as FSIG issue 16.
- 2026-10-07: RFC 4484 updated.
- 2026-09-24: Presented to the MCP Financial Services Interest Group.

Linked from: [C2PA content credentials in MCP _meta](mcp-c2pa-in-meta.md), [MCP Financial Services Interest Group](mcp-fsig.md), [OpenTelemetry for MCP](otel-mcp.md)

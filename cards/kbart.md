---
name: KBART
aliases: [Knowledge Bases and Related Tools, NISO RP-9-2026, KBART Automation]
type: specification
website: https://www.niso.org/standards-committees/kbart
part_of: "[[niso]]"
status: Phase III (NISO RP-9-2026) published 2026-08-26
tags: [type/specification, layer/access, medium/text]
participate: "[KBART Standing Committee](https://www.niso.org/standards-committees/kbart)"
updated: 2026-11-17
---
NISO recommended practice for sending title lists and coverage data from content providers to knowledge bases and libraries. KBART Automation (NISO RP-26-2019) adds library-specific holdings reports, exchanged by API.

## Topics
- **What a library has licensed**: a link resolver can send a reader to full text only if it knows the institution's holdings. A KBART file lists a provider's titles and coverage, and KBART Automation delivers the list for one institution.
- **Keeping holdings current**: Phase III adds new content types, a file manifest and file-level guidance for KBART Automation.

## Compare
- Lisa Janicke Hinchliffe [proposes](https://scholarlykitchen.sspnet.org/2026/10/27/mcp-discovery/) the same model for MCP connectors: providers supply a machine-readable feed and libraries keep the register. Her fields include the entitlements covered, terms on AI use and training, and usage reporting. [[mcp-registry]] `server.json`, [[mcp-server-cards]] and [[ai-catalog]] have no field for entitlements (schemas read 2026-11-16), and none of the three names KBART (searched 2026-11-16).

## History
- 2026-08-26: [Phase III](https://www.niso.org/publications/rp-9-2026-kbart) published.
- 2019-06-18: KBART Automation published.
- 2014-03-27: Phase II (NISO RP-9-2014) published.

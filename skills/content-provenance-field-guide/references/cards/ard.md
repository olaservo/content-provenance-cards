---
title: "Agentic Resource Discovery"
id: "ard"
type: "specification"
status: "v0.91 dated 2026-08-26, marked Proposal"
tags: ["type/specification", "layer/identity", "topic/discovery"]
updated: "2026-11-16"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/ard"
---
# Agentic Resource Discovery

- Id: ard
- Also known as: ARD, ard-spec, ard.json
- Type: specification
- Status: v0.91 dated 2026-08-26, marked Proposal
- Website: https://agenticresourcediscovery.org/spec/
- Take part: [GitHub issues](https://github.com/ards-project/ard-spec/issues)
- Tags: type/specification, layer/identity, topic/discovery
- Updated: 2026-11-16
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#ard

A federated search layer for agentic resources: MCP servers, A2A agents, skills and APIs. Publishers list entries on their own domain, registries index them and answer `POST /search`, and a registry can refer a query to other registries. Google announced it on 2026-06-17 under Apache 2.0. The v0.91 authors are from Google and Hugging Face, with R.V. Guha.

## Topics

- **Choosing tools outside the context window**: putting every tool description in the prompt does not scale. ARD moves selection into a search service that can use representative queries, publisher identity and compliance metadata.
- **Richer descriptions**: v0.91 makes an entry a JSON-LD node. A publisher can add terms from other namespaces through `@context`, and a registry can filter on them with no change to the spec.
- **Publisher authority**: identifiers take the form `urn:air:<publisher>:...`, and the identity in an entry's trust manifest must match the publisher domain.
- **Usage terms**: the spec defines no term for a licence, usage terms or entitlements (v0.91 read 2026-11-16).

## Related

- Built on the [AI Catalog](ai-catalog.md) entry. The two groups agreed on 2026-07-09 to stay loosely coupled (ADR-0010 here, ADR-0017 there): the catalog entry stays thin, and ARD adds namespaced terms.
- v0.91 has publishers serve entries at `/.well-known/ard.json` and says a publisher on `/.well-known/ai-catalog.json` should move.

## In use

- Hugging Face's [hf-discover](https://github.com/huggingface/hf-discover) is an ARD client and server, with search at `huggingface-hf-discover.hf.space` (responding 2026-11-16). The spec copy in that repository is v0.5.

## History

- 2026-08-26: v0.91.
- 2026-07-09: Loose coupling with AI Catalog agreed.
- 2026-06-17: Announced by Google.
- 2026-05-28: v0.5.

Linked from: [AI Catalog](ai-catalog.md)

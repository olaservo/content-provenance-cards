---
title: "C2PA"
id: "c2pa"
type: "organization"
status: "Spec 2.5 published October 2026"
tags: ["type/organization", "layer/provenance", "stage/at-rest", "stage/in-transit", "stage/trust", "medium/image", "medium/video", "medium/audio", "medium/text"]
updated: "2026-11-21"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/c2pa"
---
# C2PA

- Id: c2pa
- Also known as: Coalition for Content Provenance and Authenticity
- Type: organization
- Status: Spec 2.5 published October 2026
- Website: https://c2pa.org
- News: https://c2pa.org/news/, https://c2pa.org/blog/
- Feed: https://c2pa.org/feed/
- Take part: [membership](https://c2pa.org/membership/), [spec issues](https://github.com/c2pa-org/specifications/issues)
- Tags: type/organization, layer/provenance, stage/at-rest, stage/in-transit, stage/trust, medium/image, medium/video, medium/audio, medium/text
- Updated: 2026-11-21
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#c2pa

Standards body for content credentials: signed manifests (claims and assertions) bound to an asset, with ingredients for derived works. Reference code is maintained by the [Content Authenticity Initiative](content-authenticity-initiative.md).

## Topics

- **Asset provenance**: proving where an asset came from and what was done to it, with the record cryptographically bound to the asset.
- **Text and JSON provenance**: binding a credential to formats with no metadata slot. Appendix A.8 carries a manifest in unstructured text as invisible Unicode variation selectors. The spec says the method "remains under review", and partially copied text counts as having no manifest. [Encypher](encypher.md) sells sentence-level marking on top of it. 2.5 added [Appendix A.9.3](https://spec.c2pa.org/specifications/specifications/2.5/specs/C2PA_Specification.html#_guidance_for_json_based_formats), "Guidance for JSON-Based Formats", which says a JSON format "can define their own extension point" and gives a `c2pa_credential` root member as an example (read 2026-11-21). [C2PA content credentials in MCP _meta](mcp-c2pa-in-meta.md) relies on it, and the spec does not name MCP. The conformance text rubric has no JSON group yet.
- **Front matter**: carrying a manifest reference in a file that already has YAML front matter. Appendix A.9.4.2 puts the two delimiters and the reference on three lines inside it. PyYAML 6.0.3 rejects the spec's own example in A.9.4.3.3 (run 2026-11-17). [Agent Skills discussion 651](https://github.com/agentskills/agentskills/discussions/651) reports the same from PyYAML, strictyaml and js-yaml and uses a single `#` comment line. Its author says they have proposed that form to C2PA.
- **Stripped metadata**: recovering provenance after the manifest is removed, through watermarks and fingerprints on the soft-binding algorithm list (79 entries on 2026-11-16: 60 watermarks and 19 fingerprints). 26 of them list an audio media type, 20 watermarks and 6 fingerprints (read 2026-11-20).
- **Signer trust**: deciding who may sign, through a trust list and a conformance program.

## Related

- Identity and consent assertions come from [Creator Assertions Working Group](cawg.md).
- Signing skill folders: [Agent Skills at-rest signing threads](agent-skills-signing.md).
- [SPUR Coalition](spur-coalition.md)'s Content Telemetry accepts a C2PA manifest hash as a content identifier.

## Compare

- Its trust list answers the same question as the [AAIF Identity and Trust WG](aaif-identity-trust-wg.md): who may sign. Neither names the other (searched 2026-11-15).

## In use

- The [conforming products list](https://github.com/c2pa-org/conformance-public/blob/main/conforming-products/conforming-products-list.json) had 349 records from 222 applicants on 2026-11-19: 307 generators and 42 validators. 262 generators sign images, 201 sign video and 109 sign audio. One lists a plain-text format and none lists HTML. The [Conformance Explorer](https://spec.c2pa.org/conformance-explorer/) shows the same data.
- Appendix A.8 has two published libraries: [c2pa-text](https://pypi.org/project/c2pa-text/) from [Encypher](encypher.md) (3.0.0, 2026-06-19) and [c2pa-unstructured-text](https://crates.io/crates/c2pa-unstructured-text) from WritersLogic (0.2.0, 2026-08-02).
- News publishers that sign images and video are listed on [IPTC](iptc.md).

## History

- 2026-10: Spec 2.5 published.

Linked from: [Agent Skills at-rest signing threads](agent-skills-signing.md), [C2PA content credentials in MCP _meta](mcp-c2pa-in-meta.md), [Content Authenticity Initiative](content-authenticity-initiative.md), [Creator Assertions Working Group](cawg.md), [Croissant](croissant.md), [DDEX](ddex.md), [Encypher](encypher.md), [EU AI Act and GPAI Code of Practice](eu-ai-act-gpai-code.md), [IPTC](iptc.md), [NISO](niso.md), [Skills Marketplace](skills-marketplace.md)

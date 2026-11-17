---
name: C2PA
aliases: [Coalition for Content Provenance and Authenticity]
type: organization
website: https://c2pa.org
news: [https://c2pa.org/news/, https://c2pa.org/blog/]
feed: https://c2pa.org/feed/
status: Spec 2.5 published October 2026
tags: [type/organization, layer/provenance, stage/at-rest, stage/in-transit, stage/trust, medium/image, medium/video, medium/audio, medium/text]
participate: "[membership](https://c2pa.org/membership/), [spec issues](https://github.com/c2pa-org/specifications/issues)"
updated: 2026-11-15
---
Standards body for content credentials: signed manifests (claims and assertions) bound to an asset, with ingredients for derived works. Reference code is maintained by the [[content-authenticity-initiative]].

## Topics
- **Asset provenance**: proving where an asset came from and what was done to it, with the record cryptographically bound to the asset.
- **Text and JSON provenance**: binding a credential to formats with no metadata slot. Appendix A.8 carries a manifest in unstructured text as invisible Unicode variation selectors. The spec says the method "remains under review", and partially copied text counts as having no manifest. [[encypher]] sells sentence-level marking on top of it. 2.5 added Appendix A.9.3 guidance for JSON, which [[mcp-c2pa-in-meta]] relies on. The conformance text rubric has no JSON group yet.
- **Stripped metadata**: recovering provenance after the manifest is removed, through watermarks and fingerprints on the soft-binding algorithm list (60 entries by 2026-10-28). 22 of them list an audio media type, 18 watermarks and 4 fingerprints (read 2026-11-15).
- **Signer trust**: deciding who may sign, through a trust list and a conformance program.

## Related
- Identity and consent assertions come from [[cawg]].
- Signing skill folders: [[agent-skills-signing]].
- [[spur-coalition]]'s Content Telemetry accepts a C2PA manifest hash as a content identifier.

## Compare
- Its trust list answers the same question as the [[aaif-identity-trust-wg]]: who may sign. Neither names the other (searched 2026-11-15).

## In use
- The [conforming products list](https://github.com/c2pa-org/conformance-public/blob/main/conforming-products/conforming-products-list.json) had 342 records from 216 applicants on 2026-11-14: 300 generators and 42 validators. Most sign images, video and audio. One lists a plain-text format and none lists HTML. The [Conformance Explorer](https://spec.c2pa.org/conformance-explorer/) shows the same data.
- Appendix A.8 has two published libraries: [c2pa-text](https://pypi.org/project/c2pa-text/) from [[encypher]] (3.0.0, 2026-06-19) and [c2pa-unstructured-text](https://crates.io/crates/c2pa-unstructured-text) from WritersLogic (0.2.0, 2026-08-02).
- News publishers that sign images and video are listed on [[iptc]].

## History
- 2026-10: Spec 2.5 published.

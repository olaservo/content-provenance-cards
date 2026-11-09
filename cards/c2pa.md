---
name: C2PA
aliases: [Coalition for Content Provenance and Authenticity]
type: organization
website: https://c2pa.org
status: Spec 2.5 published October 2026
tags: [type/organization, layer/provenance, stage/at-rest, stage/in-transit, stage/trust]
participate: "[membership](https://c2pa.org/membership/), [spec issues](https://github.com/c2pa-org/specifications/issues)"
updated: 2026-11-03
---
Standards body for content credentials: signed manifests (claims and assertions) bound to an asset, with ingredients for derived works. Reference code is maintained by the [[content-authenticity-initiative]].

## Topics
- **Asset provenance**: proving where an asset came from and what was done to it, with the record cryptographically bound to the asset.
- **Text and JSON provenance**: binding a credential to formats with no metadata slot. 2.5 added Appendix A.9.3 guidance for JSON, which [[mcp-c2pa-in-meta]] relies on. The conformance text rubric has no JSON group yet.
- **Stripped metadata**: recovering provenance after the manifest is removed, through watermarks and fingerprints on the soft-binding algorithm list (60 entries by 2026-10-28).
- **Signer trust**: deciding who may sign, through a trust list and a conformance program.

## Related
- Identity and consent assertions come from [[cawg]].
- Signing skill folders: [[agent-skills-signing]].
- Its trust layer is compared with [[aaif-identity-trust-wg]] and [[spur-coalition]].

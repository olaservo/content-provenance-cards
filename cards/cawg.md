---
name: Creator Assertions Working Group
aliases: [CAWG]
type: working-group
website: https://cawg.io
part_of: "[[dif]]"
status: Plans to become independent of DIF, with the DIF Steering Committee's support (November 2026); consent assertion started as a placeholder draft 2026-07-12
contribute: "[spec repositories](https://github.com/orgs/decentralized-identity/repositories?q=cawg), [membership](https://cawg.io/membership/)"
discussion: "[cawg mailing list](https://lists.identity.foundation/g/cawg)"
tags: [type/working-group, layer/provenance, layer/identity, layer/access]
updated: 2026-11-27
---
Assertion specs that ride inside [[c2pa]] manifests: identity, training and data mining, consent, metadata, endorsement, certificate policy.

## Topics
- **Signer identity**: naming the actor behind a credential, the identity upgrade path for [[agent-skills-signing]].
- **Training and data mining opt-out**: letting an opt-out travel with the asset.
- **Consent**: recording consent as a signed assertion.

## Related
- Its metadata assertion binds metadata from other standards, [[iptc]] among them, to the manifest.

## Compare
- The training and data mining assertion is the asset-side counterpart to [[ietf-aipref]] and [[w3c-tdmrep]], which attach an opt-out to a location. The specs do not cite each other (searched 2026-11-15).

## History
- 2026-11: The DIF Steering Committee is aware of the plan for CAWG to become independent ([DIF Newsletter #67](https://blog.identity.foundation/dif-newsletter-67/)). The committee supports transferring the standards and helping with the transition. The newsletter says naming the new organization remains the main obstacle to forming it. CAWG's Trust Task Force agreed to extend the interim S/MIME trust-list sunset to 31 December 2027.
- 2026-07-12: Consent assertion repository created with a placeholder 1.0 draft.

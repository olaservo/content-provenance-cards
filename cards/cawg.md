---
name: Creator Assertions Working Group
aliases: [CAWG]
type: working-group
website: https://cawg.io
part_of: "[[dif]]"
status: Moved under DIF; consent assertion added 2026-07
tags: [type/working-group, layer/provenance, layer/identity, layer/access]
participate: "[GitHub](https://github.com/creator-assertions), via DIF membership"
updated: 2026-11-15
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
- 2026-07: Consent assertion added.

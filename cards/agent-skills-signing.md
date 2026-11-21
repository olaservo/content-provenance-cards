---
name: Agent Skills at-rest signing threads
aliases: ["#252", "#393", "#588", "#564", "#620", "#643", "#651"]
type: proposal
website: https://github.com/agentskills/agentskills/discussions/393
part_of: "[[agent-skills]]"
status: Seven open discussions in Ideas, none answered by a listed maintainer, no convergence
tags: [type/proposal, layer/provenance, stage/at-rest, topic/skills, medium/code]
contribute: "[GitHub discussions](https://github.com/agentskills/agentskills/discussions)"
updated: 2026-11-20
---
Proposals for signing, lockfiles and lineage of SKILL.md folders: signature in frontmatter ([#252](https://github.com/agentskills/agentskills/discussions/252)), SKILL.sig sidecar ([#393](https://github.com/agentskills/agentskills/discussions/393)), skills-lock.json ([#588](https://github.com/agentskills/agentskills/discussions/588)), `metadata.source` ([#564](https://github.com/agentskills/agentskills/discussions/564)), `metadata.derived-from` ([#620](https://github.com/agentskills/agentskills/discussions/620)), skill-evidence documents keyed by digest ([#643](https://github.com/agentskills/agentskills/discussions/643)), a [[c2pa]] manifest reference in a frontmatter comment with a digest of the other files in `metadata` ([#651](https://github.com/agentskills/agentskills/discussions/651)).

## Topics
- **Copy sprawl**: tracking copies of a skill. The GitSkills dataset reports that half of SKILL.md files on GitHub are verbatim copies. [Skill Constellations](https://arxiv.org/abs/2610.11169) finds that only 11.1% of changes to a clone group reach every copy.
- **Field ownership**: separating identity (digest), lineage (source, derived-from), authorship (signature) and evidence (keyed by digest) so each thread owns one field.
- **Retraction and signer identity**: withdrawing a bad skill and naming who signed it. [#252](https://github.com/agentskills/agentskills/discussions/252) names the signer by domain and suggests a `.well-known/skills-revoked` endpoint. [#393](https://github.com/agentskills/agentskills/discussions/393) carries a publisher block and a `revocation_url`. [Discussion 651](https://github.com/agentskills/agentskills/discussions/651) (2026-11-05) proposes [[c2pa]] content credentials for skills and names the [[cawg]] identity assertion for the signer. Its example repository has no identity assertion yet.
- **Whole-folder coverage**: signing the scripts and other files, when a C2PA manifest binds to one file. Discussion 651 signs SKILL.md and puts a digest of every other file in `metadata.directory-digest`, which the signature covers. In its tests a generic C2PA validator passes a skill with an edited script, and a verifier that recomputes the digest fails it.
- **Removed credentials**: telling a skill whose manifest line was removed from one that was never signed. The bytes are the same. The author of discussion 651 says the expectation of a signature has to come from outside the skill, through publisher pinning, trust on first use or a distribution-layer policy. On 2026-11-16 they proposed four verifier results: `verified`, `invalid`, `unreachable` and `absent`.

## Related
- [Cognitive-Proof/c2pa-skill-example](https://github.com/Cognitive-Proof/c2pa-skill-example) signs and verifies a sample skill as discussion 651 describes, with public test certificates and c2pa-rs from the [[content-authenticity-initiative]]. It pins a commit from [c2pa-rs pull request 3029](https://github.com/contentauth/c2pa-rs/pull/3029), which was open on 2026-11-17.
- The discussion says the example's files do not follow the published C2PA 2.5 text. They follow a change the author proposed to C2PA in a repository that is not public.

## Compare
- The same problem is being worked on elsewhere: digests in [[mcp-skills-extension]], catalog-side signing in [[ai-catalog]] and verification tiers in [[aaif-security-privacy-wg]]. None of them cites these threads (searched 2026-11-15).
- [[agent-plugins]] carries author and licence in its manifest and lists signing as future work. Neither refers to the other (searched 2026-11-15).
- [[mcp-c2pa-in-meta]] has the same author as discussion 651 and applies C2PA to MCP results. Neither thread refers to the other (read 2026-11-17).

## History
- 2026-11-05: Discussion 651 proposed C2PA content credentials for skills, with an example repository the same day.

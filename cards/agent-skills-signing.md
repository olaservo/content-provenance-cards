---
name: Agent Skills at-rest signing threads
aliases: ["#252", "#393", "#588", "#564", "#620", "#643", "#651"]
type: proposal
website: https://github.com/agentskills/agentskills/discussions/393
part_of: "[[agent-skills]]"
status: Seven open discussions in Ideas, one maintainer, no convergence
tags: [type/proposal, layer/provenance, stage/at-rest, topic/skills, medium/code]
participate: "[GitHub discussions](https://github.com/agentskills/agentskills/discussions)"
updated: 2026-11-16
---
Proposals for signing, lockfiles and lineage of SKILL.md folders: signature in frontmatter ([#252](https://github.com/agentskills/agentskills/discussions/252)), SKILL.sig sidecar ([#393](https://github.com/agentskills/agentskills/discussions/393)), skills-lock.json ([#588](https://github.com/agentskills/agentskills/discussions/588)), `metadata.source` ([#564](https://github.com/agentskills/agentskills/discussions/564)), `metadata.derived-from` ([#620](https://github.com/agentskills/agentskills/discussions/620)), skill-evidence documents keyed by digest ([#643](https://github.com/agentskills/agentskills/discussions/643)).

## Topics
- **Copy sprawl**: tracking copies, which outnumber originals. One dataset has half of SKILL.md files as verbatim copies, and only 11.1% of fixes reach every copy.
- **Field ownership**: separating identity (digest), lineage (source, derived-from), authorship (signature) and evidence (keyed by digest) so each thread owns one field.
- **Retraction and signer identity**: withdrawing a bad skill and naming who signed it. The six earlier threads cover neither. [Discussion 651](https://github.com/agentskills/agentskills/discussions/651) (2026-11-05) proposes [[c2pa]] content credentials for skills and names the [[cawg]] identity assertion for the signer.

## Compare
- The same problem is being worked on elsewhere: digests in [[mcp-skills-extension]], catalog-side signing in [[ai-catalog]] and verification tiers in [[aaif-security-privacy-wg]]. None of them cites these threads (searched 2026-11-15).
- [[agent-plugins]] carries author and licence in its manifest and lists signing as future work. Neither refers to the other (searched 2026-11-15).

## History
- 2026-11-05: Discussion 651 proposed C2PA content credentials for skills.

---
name: Agent Skills at-rest signing threads
aliases: ["#252", "#393", "#588", "#564", "#620", "#643"]
type: proposal
website: https://github.com/agentskills/agentskills/discussions/393
part_of: "[[agent-skills]]"
status: Six open discussions in Ideas, one maintainer, no convergence
tags: [type/proposal, layer/provenance, stage/at-rest, topic/skills]
participate: "[GitHub discussions](https://github.com/agentskills/agentskills/discussions)"
updated: 2026-11-03
---
Proposals for signing, lockfiles and lineage of SKILL.md folders: signature in frontmatter ([#252](https://github.com/agentskills/agentskills/discussions/252)), SKILL.sig sidecar ([#393](https://github.com/agentskills/agentskills/discussions/393)), skills-lock.json ([#588](https://github.com/agentskills/agentskills/discussions/588)), `metadata.source` ([#564](https://github.com/agentskills/agentskills/discussions/564)), `metadata.derived-from` ([#620](https://github.com/agentskills/agentskills/discussions/620)), skill-evidence documents keyed by digest ([#643](https://github.com/agentskills/agentskills/discussions/643)).

## Topics
- **Copy sprawl**: tracking copies, which outnumber originals. One dataset has half of SKILL.md files as verbatim copies, and only 11.1% of fixes reach every copy.
- **Field ownership**: separating identity (digest), lineage (source, derived-from), authorship (signature) and evidence (keyed by digest) so each thread owns one field.
- **Retraction and signer identity**: withdrawing a bad skill and naming who signed it ([[cawg]]). No thread covers either.

## Related
- [[agent-plugins]] carries author and licence in its manifest and lists signing as future work.
- Digests from [[mcp-skills-extension]], catalog-side signing in [[ai-catalog]], sidecars from [[c2pa]], verification tiers in [[aaif-security-privacy-wg]].

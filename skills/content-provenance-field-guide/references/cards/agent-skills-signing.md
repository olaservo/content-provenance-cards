---
title: "Agent Skills at-rest signing threads"
id: "agent-skills-signing"
type: "proposal"
status: "Seven open discussions in Ideas, one maintainer, no convergence"
tags: ["type/proposal", "layer/provenance", "stage/at-rest", "topic/skills", "medium/code"]
updated: "2026-11-16"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/agent-skills-signing"
---
# Agent Skills at-rest signing threads

- Id: agent-skills-signing
- Also known as: #252, #393, #588, #564, #620, #643, #651
- Type: proposal
- Status: Seven open discussions in Ideas, one maintainer, no convergence
- Website: https://github.com/agentskills/agentskills/discussions/393
- Part of: [Agent Skills](agent-skills.md)
- Take part: [GitHub discussions](https://github.com/agentskills/agentskills/discussions)
- Tags: type/proposal, layer/provenance, stage/at-rest, topic/skills, medium/code
- Updated: 2026-11-16
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#agent-skills-signing

Proposals for signing, lockfiles and lineage of SKILL.md folders: signature in frontmatter ([#252](https://github.com/agentskills/agentskills/discussions/252)), SKILL.sig sidecar ([#393](https://github.com/agentskills/agentskills/discussions/393)), skills-lock.json ([#588](https://github.com/agentskills/agentskills/discussions/588)), `metadata.source` ([#564](https://github.com/agentskills/agentskills/discussions/564)), `metadata.derived-from` ([#620](https://github.com/agentskills/agentskills/discussions/620)), skill-evidence documents keyed by digest ([#643](https://github.com/agentskills/agentskills/discussions/643)).

## Topics

- **Copy sprawl**: tracking copies, which outnumber originals. One dataset has half of SKILL.md files as verbatim copies, and only 11.1% of fixes reach every copy.
- **Field ownership**: separating identity (digest), lineage (source, derived-from), authorship (signature) and evidence (keyed by digest) so each thread owns one field.
- **Retraction and signer identity**: withdrawing a bad skill and naming who signed it. The six earlier threads cover neither. [Discussion 651](https://github.com/agentskills/agentskills/discussions/651) (2026-11-05) proposes [C2PA](c2pa.md) content credentials for skills and names the [Creator Assertions Working Group](cawg.md) identity assertion for the signer.

## Compare

- The same problem is being worked on elsewhere: digests in [SEP-2640 Skills Extension](mcp-skills-extension.md), catalog-side signing in [AI Catalog](ai-catalog.md) and verification tiers in [AAIF Security and Privacy WG](aaif-security-privacy-wg.md). None of them cites these threads (searched 2026-11-15).
- [Agent Plugins](agent-plugins.md) carries author and licence in its manifest and lists signing as future work. Neither refers to the other (searched 2026-11-15).

## History

- 2026-11-05: Discussion 651 proposed C2PA content credentials for skills.

Linked from: [AAIF Security and Privacy WG](aaif-security-privacy-wg.md), [Agent Plugins](agent-plugins.md), [Agent Skills](agent-skills.md), [AI Catalog](ai-catalog.md), [C2PA](c2pa.md), [Creator Assertions Working Group](cawg.md), [SEP-2640 Skills Extension](mcp-skills-extension.md), [Skills Marketplace](skills-marketplace.md)

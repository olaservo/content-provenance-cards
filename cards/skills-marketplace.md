---
name: Skills Marketplace
aliases: [skill-cards, skillproof]
type: project
website: https://ai-disclosures.org/prototypes.html
part_of: "[[ai-disclosures-project]]"
status: Work in progress with O'Reilly Media and Miso.ai; initial testing with O'Reilly Media authors
tags: [type/project, layer/licensing, layer/attribution, layer/payments, topic/skills, medium/code]
participate: "[Skill Cards issues](https://github.com/SrulyRosenblat/skill-cards/issues), [SkillProof issues](https://github.com/SrulyRosenblat/skillproof/issues)"
updated: 2026-11-20
---
A marketplace for modular, interoperable, rights-protected skills with monetization for their authors, built with O'Reilly Media and Miso.ai. Two public tools so far: [Skill Cards](https://github.com/SrulyRosenblat/skill-cards) measures how well a skill covers its source documentation, and [SkillProof](https://srulyrosenblat.github.io/skillproof/) benchmarks the uplift a skill gives an agent.

## Topics
- **Paying skill authors**: choosing a payout basis for skills, measured contribution or invocation count.
- **Multi-source skills**: crediting every source behind a skill.
- **Missing metadata**: [[agent-skills]] frontmatter has an optional `license` field and a free-form `metadata` map, with no defined author or source field.

## Related
- The author of Skill Cards and SkillProof also publishes a [Book-to-skill pipeline](https://github.com/SrulyRosenblat/Book-to-skill-pipieline). Its benchmark of a book-derived FastAPI skill reports 13 pairwise wins with the skill and 7 without over 20 tasks, each run once. Public tests passed on 18 of 20 tasks with the skill and 20 of 20 without.

## Compare
- [[openattribution]] and [[c2pa]] are possible ways to credit every source behind a skill. The prototypes use neither (searched 2026-11-15).
- The [[agent-skills-signing]] would add author and source to a skill. The prototypes do not refer to them (searched 2026-11-15).
- [[agent-plugins]] gives a package format but defines no marketplace or distribution. Neither names the other (searched 2026-11-15).

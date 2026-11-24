---
title: "Skills Marketplace"
id: "skills-marketplace"
type: "project"
status: "Work in progress with O'Reilly Media and Miso.ai; initial testing with O'Reilly Media authors"
tags: ["type/project", "layer/licensing", "layer/attribution", "layer/payments", "topic/skills", "topic/quality", "medium/code"]
updated: "2026-11-24"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/skills-marketplace"
---
# Skills Marketplace

- Id: skills-marketplace
- Also known as: skill-cards, skillproof
- Type: project
- Status: Work in progress with O'Reilly Media and Miso.ai; initial testing with O'Reilly Media authors
- Website: https://ai-disclosures.org/prototypes.html
- Part of: [AI Disclosures Project](ai-disclosures-project.md)
- Contribute: [Skill Cards issues](https://github.com/SrulyRosenblat/skill-cards/issues), [SkillProof issues](https://github.com/SrulyRosenblat/skillproof/issues)
- Tags: type/project, layer/licensing, layer/attribution, layer/payments, topic/skills, topic/quality, medium/code
- Updated: 2026-11-24
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#skills-marketplace

A marketplace for modular, interoperable, rights-protected skills with monetization for their authors, built with O'Reilly Media and Miso.ai. Two public tools so far: [Skill Cards](https://github.com/SrulyRosenblat/skill-cards) measures how well a skill covers its source documentation, and [SkillProof](https://srulyrosenblat.github.io/skillproof/) benchmarks the uplift a skill gives an agent.

## Topics

- **Paying skill authors**: choosing a payout basis for skills, measured contribution or invocation count.
- **Multi-source skills**: crediting every source behind a skill.
- **Missing metadata**: [Agent Skills](agent-skills.md) frontmatter has an optional `license` field and a free-form `metadata` map, with no defined author or source field.

## Related

- The author of Skill Cards and SkillProof also publishes a [Book-to-skill pipeline](https://github.com/SrulyRosenblat/Book-to-skill-pipieline). Its benchmark of a book-derived FastAPI skill reports 13 pairwise wins with the skill and 7 without over 20 tasks, each run once. Public tests passed on 18 of 20 tasks with the skill and 20 of 20 without.

## Compare

- [OpenAttribution.org](openattribution.md) and [C2PA](c2pa.md) are possible ways to credit every source behind a skill. The prototypes use neither (searched 2026-11-15).
- The [Agent Skills at-rest signing threads](agent-skills-signing.md) would add author and source to a skill. The prototypes do not refer to them (searched 2026-11-15).
- [Agent Plugins](agent-plugins.md) gives a package format but defines no marketplace or distribution. Neither names the other (searched 2026-11-15).

Linked from: [Agent Plugins](agent-plugins.md), [Agent Skills](agent-skills.md), [AI Disclosures Project](ai-disclosures-project.md)

---
name: COUNTER Metrics
type: organization
website: https://www.countermetrics.org
news: https://www.countermetrics.org/news/
status: Phase two of its AI best practice published 2026-10-23; it says the guidelines are aligned with the SPUR telemetry framework
contribute: "[membership](https://www.countermetrics.org/members/)"
discussion: "[Community listserv](https://groups.google.com/a/countermetrics.org/g/Community/)"
tags: [type/organization, layer/attribution]
updated: 2026-11-21
---
Usage-metrics standard for scholarly publishers and libraries.

## Topics
- **AI usage metrics**: counting usage when the reader is an AI system. Phase two references [[content-telemetry]]. The [best practice](https://www.countermetrics.org/code-of-practice/best-practice/bp-ai/) says the AI metric types "are all OPTIONAL extensions to the Code of Practice" and that "AI reporting is not subject to formal audits" (read 2026-11-17).
- **Counting retrievals apart from use**: phase two adds retrieval metrics, which count an excerpt an AI system pulls even when it is not used in the answer. AI activity is tagged with the Agent access method, which appears in a report only when requested.
- **Mapping telemetry events to metrics**: a [[content-telemetry]] retrieved event counts toward Total_Retrieved_Investigations, and toward Total_Retrieved_Requests where the AI system has full text. A cited or presented event counts as 1 Total_AI_Investigation, and as 1 Total_AI_Request where the AI system has full text. The guidance's scenario gives "no COUNTER metrics" for grounded excerpts and calls engagement "usage activity covered by standard publisher reporting".
- **Usage reported by a third party**: an AI system that sends usage to the publisher is reported under a `SYNDICATED:` namespace. The guidance has a section on [[google-scholar-mediated-reading]], reported as `SYNDICATED:Google_MERU`.
- **Refused reads**: "There are no denial metrics associated specifically with Access_Method Agent" (read 2026-11-17).

## Related
- [[trace]] participants part-fund its API and JSON Schema work for the AI metrics ([Introducing TRACE](https://www.countermetrics.org/trace-project/), 2026-10-06).

- Steve Smith and Josh Nicholson of Research Solutions [propose](https://scholarlykitchen.sspnet.org/2026/11/16/guest-post-beyond-the-download-what-counts-as-scholarly-content-use-in-the-age-of-ai/) keeping AI activity in four ledgers (usage, demand, contribution, engagement) built on these metrics. They report that from 2026-10-07 to 2026-11-06, 3.7 million of 7.2 million attempted reads of publisher content through Scite were refused full text for want of AI-access permission. They describe the figures as gateway-specific and unaudited.

## History
- 2026-10-23: [Phase two](https://www.countermetrics.org/ai-phase-two/) of the AI best practice published.
- 2026-10-06: TRACE funding announced.

---
name: Google Scholar Mediated Reading
aliases: [MERU, MEdiated Reading Usage protocol]
type: project
website: https://scholar.google.com/intl/en/scholar/publishers.html
status: Policies on Google's publisher page, with no public description of the MERU message format (read 2026-11-17); COUNTER mapped MERU to its AI metrics on 2026-10-23
tags: [type/project, layer/attribution, layer/access, stage/after-delivery, medium/text]
updated: 2026-11-17
---
A Google Scholar program that publishers opt journals or collections into, with a usage protocol, MERU, for the publishers that take part. Google's publisher page gives it six sentences of policy. It does not say what a reader sees, how a publisher joins, or what a MERU message contains (read 2026-11-17). [[counter]] calls it "an example of a third party AI system which delivers usage information to participating publishers".

## Topics
- **Reporting AI-mediated reading to the publisher**: participating publishers "can use the MEdiated Reading Usage (MERU) protocol to measure and report Mediated Reading related usage of subscribed collections". [[counter]]'s guidance says it works like Google's Subscriber Links, which sends the publisher a usage message with the user's IP address, the time of the request and the URL of the content, and that a MERU message carries one extra marker.
- **Counting it in a COUNTER report**: [[counter]] says each MERU message counts as 1 Total_AI_Investigation and 1 Total_AI_Request for the item, under the namespace `SYNDICATED:Google_MERU`.
- **Publisher control over participation**: publishers select the journals or collections to include and can withdraw "at any time and for any reason", completely or partially. Participation "enables user experiences only on Google Scholar".
- **Training**: participation "does not enable use of the participating URLs for training Gemini large language models".

## Related
- Google's page does not name COUNTER (read 2026-11-17).
- In a [comment](https://scholarlykitchen.sspnet.org/2026/11/16/guest-post-beyond-the-download-what-counts-as-scholarly-content-use-in-the-age-of-ai/) of 2026-11-16, Cambridge University Press's policy director gave MERU as an example of AI-mediated reading building on existing usage infrastructure.

## Compare
- [[content-telemetry]] also reports AI use of content to its owner, as five event types with a published schema. Neither names the other (searched 2026-11-17).

## History
- 2026-10-23: COUNTER's [phase two](https://www.countermetrics.org/ai-phase-two/) announcement says "We've also mapped Google Scholar's new MERU tool to our metrics."
- 2026-09: COUNTER's [update](https://www.countermetrics.org/ai-update-sept26/) on phase two says it has mapped how MERU messages should be reported.

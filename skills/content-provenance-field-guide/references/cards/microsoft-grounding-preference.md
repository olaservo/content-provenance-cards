---
title: "Microsoft training and grounding preferences"
id: "microsoft-grounding-preference"
type: "proposal"
status: "Announced 2026-10-30; effective 2027-02-01; NoArchive and NoCache stop being read as preferences after 2027-03-01"
tags: ["type/proposal", "layer/access", "stage/after-delivery"]
updated: "2026-11-20"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/microsoft-grounding-preference"
---
# Microsoft training and grounding preferences

- Id: microsoft-grounding-preference
- Also known as: ai-grounding:disallow
- Type: proposal
- Status: Announced 2026-10-30; effective 2027-02-01; NoArchive and NoCache stop being read as preferences after 2027-03-01
- Website: https://blogs.bing.com/search/2026/10/your-content-your-choice-clearer-preferences-for-training-and-grounding/
- News: https://blogs.bing.com/search/
- Feed: https://blogs.bing.com/search/feed/
- Tags: type/proposal, layer/access, stage/after-delivery
- Updated: 2026-11-20
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#microsoft-grounding-preference

Training via [Shared AI training robots.txt token](aipref-training-token.md) or a page-level `ai-training:disallow`, plus a separate page-level grounding preference (`ai-grounding:disallow`, or `ai-grounding:disallowextended` to limit grounding to Microsoft-operated experiences) with no robots.txt form. Replaces `NoArchive` and `NoCache`.

## Topics

- **Inference-time preferences**: letting a page opt out of grounding. Microsoft says it first offered grounding controls in 2023, through `NoArchive` and `NoCache`. Google-Extended also covers grounding in Gemini Apps and Vertex AI. The closest [IETF AI Preferences Working Group](ietf-aipref.md) category is `ai-use` in vocab-08, using an asset as input to a generative AI model.

## Related

- Microsoft says the preferences do not establish licensing or payment.

## History

- 2026-10-30: Microsoft [announced](https://blogs.bing.com/search/2026/10/your-content-your-choice-clearer-preferences-for-training-and-grounding/) the training and grounding preferences. Grounding settings in Bing Webmaster Tools open 2026-12-15, and the temporary grounding preferences expire 2027-09-30.

Linked from: [IETF AI Preferences Working Group](ietf-aipref.md)

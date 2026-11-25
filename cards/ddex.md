---
name: DDEX
aliases: [Digital Data Exchange]
type: organization
website: https://ddex.net
feed: https://ddex.net/feed/
status: Generative AI Declaration Standard (GAI-D) committee draft finished member comments and goes to peer review next, with publication expected in early 2027 (announced 2026-11-05)
contribute: "[working groups](https://ddex.net/about-ddex/working-groups/), for Charter and Full Members"
tags: [type/organization, layer/provenance, layer/attribution, layer/licensing, medium/audio]
updated: 2026-11-25
---
Not-for-profit membership organisation, set up in 2006, that writes the message standards labels, distributors and streaming services use to exchange release data, credits and sales reports. It says the standards are free to implement and that implementers do not need to be members.

## Topics
- **Release metadata**: telling a streaming service what a release is and who is credited on it, in one message format, the Electronic Release Notification (ERN).
- **AI disclosure**: saying that a recording, or one contributor's part in it, was made with generative AI. The [ERN release notes](https://ern.ddex.net/electronic-release-notification-message-suite-part-1-definitions-of-messages/annex-a-(informative)-release-notes/) list both under version 4.3.1. A sound recording, image, text, video or release can carry [`ContainsAI`](https://service.ddex.net/dd/DD-ERN-432/dd/ddex_ContainsAI.html), and a contributor can carry [`AiContribution`](https://service.ddex.net/dd/DD-ERN-432/dd/ddex_AiContribution.html). The data dictionary's rules use the values All, Partly and None.
- **Declared, not checked**: the disclosure is what the sender of the message declares. Spotify's [help page](https://support.spotify.com/us/article/ai-credits/) says "AI credits are optional for artists to share" and "The absence of AI credits doesn't mean AI wasn't used on a song."
- **AI as a use type**: naming AI training among the uses a message can refer to. The [allowed value sets](https://kb.ddex.net/reference-material/current-allowed-value-sets/) include `UseForGenerativeAI`, `UseForTrainingGenerativeAI` and `UseForTrainingNonGenerativeAI`.
- **A standard for AI declarations**: its Artificial Intelligence group is set up "to investigate the metadata requirements for the communication of AI-generated music", including musical works. The group's Generative AI Declaration Standard (GAI-D) has finished member comments on its committee draft and goes to peer review next, with publication expected in early 2027.

## Related
- [[c2pa]]'s music guidance, [Applying Content Credentials to Music Assets](https://spec.c2pa.org/specifications/specifications/2.4/music/guidance_applying_content_credential_music_assets.html), has an annex, [DDEX and Metadata Alignment](https://spec.c2pa.org/specifications/specifications/2.4/music/guidance_applying_content_credential_music_assets.html#_ddex_and_metadata_alignment). It says Content Credentials act as "an upstream provenance layer" for DDEX metadata and that "DDEX remains the exchange format for structured music metadata". Labels may use what a credential records "to populate, validate, or support DDEX metadata" (read 2026-11-25).

## In use
- ERN 4.3.2 is the latest published version, and DDEX [advises implementing it](https://kb.ddex.net/implementing-each-standard/electronic-release-notification-message-suite-(ern)/). Its data dictionary is dated 2025-06-26. The allowed value sets are at version 012 (2026-09-16).
- Spotify launched AI Credits in April 2026 and [said on 2026-10-20](https://newsroom.spotify.com/2026-10-20/prioritizing-human-artistry/) that artists submit "tens of thousands of credits every day". Its [support page](https://support.spotify.com/us/artists/article/ai-credits/) calls the feature a beta, shown in song credits on mobile and available through certain distributors (read 2026-11-15). The support page does not mention DDEX.

## History
- 2026-11-05: [Announced](https://ddex.net/ddex-announces-elevenlabs-as-first-ai-company-to-join-membership/) ElevenLabs as the first AI company among its members, and said GAI-D would go through peer review before publication in early 2027.
- 2025-11: At its 45th plenary in Toronto, DDEX members present agreed to engage further with [[c2pa]] and [[cawg]] to describe music-specific metadata, starting with what is released to the public. The [readout](https://cawg.io/meeting-notes/2025/2025-11-24-media-identifiers-tf/) at CAWG's Media Identifiers Task Force on 2025-11-24 also says DDEX will send more representatives to CAWG.
- 2025-09-25: Spotify [said](https://newsroom.spotify.com/2025-09-25/spotify-strengthens-ai-protections/) it would support "the new industry standard for AI disclosures in music credits, developed through DDEX", and named 19 labels and distributors working on it.
- 2024-08-09: Date of the ERN 4.3.1 data dictionary, which includes `ContainsAI` and `AiContribution`.
- 2006: Founded.

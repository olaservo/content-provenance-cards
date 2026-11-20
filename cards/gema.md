---
name: GEMA
type: organization
website: https://www.gema.de
news: https://www.gema.de/en/news
status: Won at Munich Regional Court against OpenAI (2025-11-11, under appeal) and Suno (2026-07-31, not final)
tags: [type/organization, layer/licensing, layer/payments, medium/audio]
updated: 2026-11-20
---
German collecting society for composers, lyricists and music publishers, and [a member](https://www.gema.de/de/die-gema/organisation) of [[cisac]]. It has sued two AI companies and won both cases at first instance. It has also published a licensing model for generative AI and sells a licensed training dataset.

## Topics
- **Pricing generative AI**: setting a fee for training on its repertoire and generating from it. The [model](https://www.gema.de/de/w/generative-ki-lizenzmodell-zwei-saeulen) it presented in September 2024 asks for 30% of the net revenue of the AI model or system, with a minimum fee tied to the volume of output. A second part covers later uses of the generated music. Its [AI page](https://www.gema.de/de/aktuelles/ki-und-musik) names no generative AI provider that has taken the license (read 2026-11-15).
- **Works stored in a model**: whether a model that can reproduce a work is itself a copy of it. In the [OpenAI case](https://www.justiz.bayern.de/gerichte-und-behoerden/landgericht/muenchen-1/presse/2025/11.php) the court found the lyrics of nine songs "reproduzierbar" in models 4 and 4o, called this memorisation, and held that the text and data mining exception does not cover it. In the [Suno case](https://www.justiz.bayern.de/gerichte-und-behoerden/landgericht/muenchen-1/presse/2026/16.php) it found the same for six musical works in Suno's v3.5 and v4 models, which were stored on servers in Germany.
- **Who answers for the output**: whether the user's prompt or the provider is responsible when a work comes back out. In both cases the court held the provider responsible, because the prompts were simple and the provider chose the training data and built the model.
- **Training done abroad**: whether a claim reaches training that happened in the United States. In the Suno case the court applied US law to the copies made there and held that fair use did not cover them, because the works reappeared in the outputs. Its press release says Suno took the works from YouTube by stream-ripping.
- **Licensed training data**: offering AI developers a dataset with the rights already cleared. [PLAI by GEMA](https://www.gema.de/de/w/plai-by-gema-musikdatensatz) bundles sound files, metadata, authors' rights and master rights, for AI tools whose output does not compete with the works. GEMA says it leaves open whether generative AI providers need a license.
- **Training transparency**: its [AI Charter](https://www.gema.de/de/aktuelles/ki-und-musik/ki-charta-der-gema) of ten principles says it must be clear which works were used for training.

## Related
- The accounts of both rulings here come from the court's press releases. The judgments were not read.
- Koda, the Danish society, sued Suno in November 2025. It [says](https://koda.dk/en/about-koda/news/pressure-mounts-on-ai-music-service-suno-new-lawsuit-filed) its case has been referred to the Eastern High Court. A [second post](https://koda.dk/en/about-koda/news/suno-found-to-have-unlawfully-used-copyright-protected-music) says the Munich ruling "could have major implications for similar cases, including Koda's own lawsuit against Suno" (both read 2026-11-16).

## Compare
- A revenue-share license for AI use of web publishers' content: [[internet-licensing-collective]]. Neither names the other (searched 2026-11-15).
- Both court press releases list Article 4 of the DSM Directive among the provisions applied, the one [[w3c-tdmrep]] reservations rely on. Neither the court nor TDMRep names the other.

## In use
- PLAI by GEMA has one named customer, Klangio, which trains music transcription tools on about 178,000 sound files ([press release](https://www.gema.de/de/w/plai-by-gema-musikdatensatz), 2026-07-23).

## History
- 2026-07-31: Munich Regional Court [largely granted](https://www.justiz.bayern.de/gerichte-und-behoerden/landgericht/muenchen-1/presse/2026/16.php) GEMA's claims against Suno for an injunction, information and damages (42 O 763/25). The court's press release says the judgment is not final.
- 2026-07-23: Launched PLAI by GEMA with Klangio as first customer.
- 2025-11-11: Munich Regional Court [largely granted](https://www.justiz.bayern.de/gerichte-und-behoerden/landgericht/muenchen-1/presse/2025/11.php) GEMA's claims against OpenAI over song lyrics in ChatGPT (42 O 14139/24). GEMA [says](https://www.gema.de/en/w/suno-entscheidung-2026) OpenAI has appealed to the Munich Higher Regional Court.
- 2025-01-21: Sued Suno.
- 2024-11-13: Sued OpenAI.
- 2024-11: Published its AI Charter.
- 2024-09: Presented its licensing model for generative AI.

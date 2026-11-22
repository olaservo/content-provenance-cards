---
name: Podcast Namespace
aliases: [Podcasting 2.0, podcast namespace]
type: specification
website: https://github.com/Podcastindex-org/podcast-namespace
status: 27 tags formalized in seven phases from 2020 to 2024; Phase 8 open
contribute: "[GitHub issues](https://github.com/Podcastindex-org/podcast-namespace/issues)"
discussion: "[GitHub Discussions](https://github.com/Podcastindex-org/podcast-namespace/discussions), [podcastindex.social](https://podcastindex.social)"
tags: [type/specification, layer/payments, layer/licensing, layer/attribution, layer/access, medium/audio]
updated: 2026-11-22
---
RSS namespace for podcast feeds, written in the open as part of the Podcasting 2.0 project. Its tags let a feed carry funding links, payment recipients, a licence, credits and platform blocking. The [README](https://github.com/Podcastindex-org/podcast-namespace#readme) says "We are not a 'standards body'". A tag is adopted when there is consensus and at least one host and one app commit to it, or it is already in use.

## Topics
- **Direct support**: giving a listener a way to pay the creator. [`<podcast:funding>`](https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/tags/funding.md) carries a donation or membership URL and the text an app shows beside it.
- **Payment recipients**: [`<podcast:value>`](https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/tags/value.md) names a cryptocurrency or payment layer, a transport and a suggested amount, and holds one or more `<podcast:valueRecipient>` elements. Its example uses Lightning with keysend.
- **Licence**: [`<podcast:license>`](https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/tags/license.md) holds an identifier from the namespace's [licence list](https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/examples/license/licenses.json) or a custom name with a URL to the full text. The list had five entries on 2026-11-22: all rights reserved, three [[creative-commons]] licences and a value-for-value licence.
- **Credits**: [`<podcast:person>`](https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/tags/person.md) names hosts, guests and other contributors for a show or an episode, with roles from the Podcast Taxonomy Project.
- **Platform access**: [`<podcast:block>`](https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/tags/block.md) says which platforms may ingest a feed for public display, by service slug. `<podcast:locked>` says whether another hosting platform may import the feed. Neither is about AI training or crawling.
- **AI disclosure**: [`<podcast:txt purpose="ai-content">`](https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/tags/txt.md) holds `true` or `false` for whether AI-generated content was used in a podcast or episode. The tag doc points to shouldidisclose.ai for when to set it.
- **Integrity and alternate sources**: `<podcast:integrity>` carries a Subresource Integrity string or a PGP signature for an alternate enclosure. The `<podcast:source>` examples include an IPFS URI and a BitTorrent file.

## Compare
- GitHub's [`FUNDING.yml`](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/displaying-a-sponsor-button-in-your-repository) and the npm [`funding`](https://docs.npmjs.com/cli/configuring-npm/package-json#funding) field in `package.json` carry funding links for a repository and a package. The namespace repository mentions neither (searched 2026-11-22).
- [[c2pa]] signs what `ai-content` states unsigned and what `<podcast:integrity>` states as a hash or a PGP signature. The namespace repository does not mention C2PA (searched 2026-11-22).
- [[x402]] and the other machine payment specs pay per request. `<podcast:funding>` is a link a person follows.

## In use
- The repository's [support list](https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/element-support.md) names 23 hosts and apps for `<podcast:funding>`, 17 for `<podcast:locked>`, 8 for `<podcast:value>`, 7 for `<podcast:person>` and 6 for `<podcast:txt>`. The file last changed on 2026-03-14 (read 2026-11-22).

## History
- 2026-03-05: `ai-content` added to the known purposes of `<podcast:txt>` ([PR 757](https://github.com/Podcastindex-org/podcast-namespace/pull/757)).
- 2024-07-01: Phase 7 comment period closed.
- 2023-06-01: Phase 6 closed. `<podcast:txt>` was among the six tags formalized.
- 2022-07-15: Phase 5 closed. `<podcast:block>` formalized.
- 2021-06-01: Phase 3 closed. `<podcast:license>` and `<podcast:integrity>` formalized.
- 2021-01-31: Phase 2 closed. `<podcast:person>` formalized.
- 2020-11-15: Phase 1 closed. `<podcast:funding>` and `<podcast:locked>` were among the five tags formalized.

---
name: Encypher
aliases: [Encypher Corporation, EncypherAI, c2pa-text]
type: organization
website: https://encypher.com
news: https://encypher.com/blog
feed: https://encypher.com/feed.xml
status: The Atlantic plans to implement its text marking, announced 2026-11-11 with no rollout date
tags: [type/organization, layer/provenance, layer/licensing, stage/at-rest, medium/text, medium/image, medium/audio, medium/video]
participate: "[c2pa-text issues](https://github.com/encypherai/c2pa-text/issues)"
updated: 2026-11-15
---
Company that sells text provenance built on [[c2pa]]. Signing is free for publishers, and AI companies pay for verification and usage reporting. It says it wrote the C2PA text appendix (A.8) and co-chairs the Text Provenance Task Force. The spec names no authors.

## Topics
- **Text embedding**: carrying a signed manifest inside text that has no metadata slot, as invisible Unicode variation selectors. This part is the C2PA appendix, and its [c2pa-text](https://github.com/encypherai/c2pa-text) library is MIT-licensed.
- **Excerpts**: checking a quoted passage against the signed original. C2PA treats partially copied text as having no manifest, so Encypher adds a marker per sentence and a Merkle assertion in its own namespace. Its glossary calls sentence-level attribution "patent-pending".
- **Identity and terms**: tying the record to a publisher and to stated reuse terms. Its posts cite the [[cawg]] identity and metadata assertions and the [[iptc]] verified publishers list, and its site refers to [[rsl]] and [[w3c-odrl]] for terms.

## Related
- Its 2026-11-11 post carries one C2PA manifest and 66 sentence markers. Seven of the manifest's eleven assertions are in Encypher's namespace, and none is a CAWG identity assertion or a licensing assertion (decoded 2026-11-15, signature not checked).
- [WritersLogic](https://github.com/writerslogic/c2pa-unstructured-text) publishes a separate implementation of the same appendix.

## In use
- [c2pa-text](https://pypi.org/project/c2pa-text/) is at 3.0.0 on PyPI (2026-06-19), with TypeScript, Rust and Go versions in the same repository.
- It is a conformant generator on the [C2PA conforming products list](https://github.com/c2pa-org/conformance-public/blob/main/conforming-products/conforming-products-list.json) since 2026-05-26, against spec 2.2, for image, audio, video and PDF formats. The record lists no text format.
- Its own blog is signed with it. The [post announcing The Atlantic](https://encypher.com/blog/the-atlantic-and-encypher-verifiable-journalism) carries the marks (2026-11-11).

## History
- 2026-11-11: Announced that The Atlantic plans to implement its provenance technology.
- 2026-05-26: Listed by C2PA as a conformant generator product.

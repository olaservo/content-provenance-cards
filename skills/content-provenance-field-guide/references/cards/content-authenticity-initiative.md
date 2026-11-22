---
title: "Content Authenticity Initiative"
id: "content-authenticity-initiative"
type: "project"
status: "Maintains c2pa-rs, c2pa-python, c2pa-js and c2patool"
tags: ["type/project", "layer/provenance"]
updated: "2026-11-21"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/content-authenticity-initiative"
---
# Content Authenticity Initiative

- Id: content-authenticity-initiative
- Also known as: CAI, contentauth
- Type: project
- Status: Maintains c2pa-rs, c2pa-python, c2pa-js and c2patool
- Website: https://contentauthenticity.org
- News: https://contentauthenticity.org/blog
- Contribute: [GitHub](https://github.com/contentauth)
- Discussion: [Discord](https://opensource.contentauthenticity.org/docs/community-resources#discussions-on-discord)
- Tags: type/project, layer/provenance
- Updated: 2026-11-21
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#content-authenticity-initiative

Adobe-led initiative that maintains the open-source reference implementations of [C2PA](c2pa.md). It is a separate body, and C2PA lists it among its partner organizations.

## Topics

- **Reference SDKs**: giving developers one implementation for signing and verifying manifests, with a Rust core and Python and JS bindings.
- **Text handlers**: signing plain and structured text in practice. Structured-text and plain-text A.8 handlers merged in c2pa-rs behind an experimental flag (2026-09); HTML, XML and TTML handlers are open. [Pull request 3029](https://github.com/contentauth/c2pa-rs/pull/3029), opened 2026-11-05, lets the structured-text handler sign and read a manifest held at a URL. It was open on 2026-11-17, and the [Agent Skills at-rest signing threads](agent-skills-signing.md) example depends on it.

Linked from: [Agent Skills at-rest signing threads](agent-skills-signing.md), [C2PA](c2pa.md)

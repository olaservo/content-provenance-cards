---
name: Content Authenticity Initiative
aliases: [CAI, contentauth]
type: project
website: https://contentauthenticity.org
news: https://contentauthenticity.org/blog
status: Maintains c2pa-rs, c2pa-python, c2pa-js and c2patool
contribute: "[GitHub](https://github.com/contentauth)"
discussion: "[Discord](https://opensource.contentauthenticity.org/docs/community-resources#discussions-on-discord)"
tags: [type/project, layer/provenance]
updated: 2026-11-21
---
Adobe-led initiative that maintains the open-source reference implementations of [[c2pa]]. It is a separate body, and C2PA lists it among its partner organizations.

## Topics
- **Reference SDKs**: giving developers one implementation for signing and verifying manifests, with a Rust core and Python and JS bindings.
- **Text handlers**: signing plain and structured text in practice. Structured-text and plain-text A.8 handlers merged in c2pa-rs behind an experimental flag (2026-09); HTML, XML and TTML handlers are open. [Pull request 3029](https://github.com/contentauth/c2pa-rs/pull/3029), opened 2026-11-05, lets the structured-text handler sign and read a manifest held at a URL. It was open on 2026-11-17, and the [[agent-skills-signing]] example depends on it.

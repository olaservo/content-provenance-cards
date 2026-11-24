---
title: "IETF Web Bot Auth Working Group"
id: "ietf-web-bot-auth"
type: "working-group"
status: "WG draft httpsig-protocol-01 (2026-10-29); met at IETF 127 on 2026-11-17; Cloudflare libraries"
tags: ["type/working-group", "layer/identity", "layer/access"]
updated: "2026-11-24"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/ietf-web-bot-auth"
---
# IETF Web Bot Auth Working Group

- Id: ietf-web-bot-auth
- Also known as: webbotauth
- Type: working-group
- Status: WG draft httpsig-protocol-01 (2026-10-29); met at IETF 127 on 2026-11-17; Cloudflare libraries
- Website: https://datatracker.ietf.org/wg/webbotauth/about/
- News: https://datatracker.ietf.org/wg/webbotauth/history/
- Feed: https://datatracker.ietf.org/feed/group-changes/webbotauth/
- Part of: [IETF](ietf.md)
- Contribute: [GitHub issues](https://github.com/webbotauth/draft-ietf-webbotauth-httpsig-protocol/issues)
- Discussion: [web-bot-auth mailing list](https://mailarchive.ietf.org/arch/browse/web-bot-auth/), [Zulip](https://zulip.ietf.org/#narrow/stream/webbotauth)
- Meetings: [meetings](https://datatracker.ietf.org/wg/webbotauth/meetings/)
- Tags: type/working-group, layer/identity, layer/access
- Updated: 2026-11-24
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#ietf-web-bot-auth

Signed bot traffic with RFC 9421 HTTP message signatures and a key directory at `/.well-known/http-message-signatures-directory`.

## Topics

- **Bot identity**: proving who a crawler or agent is. The preference ([IETF AI Preferences Working Group](ietf-aipref.md)) says what is allowed, bot auth says who is asking.

## Related

- The draft charter for the [W3C Agentic Web Working Group (proposed)](w3c-agentic-web-wg.md) says its Agent Identity work will build on this WG's mechanisms and coordinate on how HTTP-level agent identity relates to identity exposed to web pages ([draft charter](https://w3c.github.io/charter-drafts/2026/agenticweb-wg.html), checked 2026-11-24).

## Compare

- Pairs with [Agent Identity and Manifest Standard](aims.md) and with [Wikimedia](wikimedia.md)'s ask that agents be easy to identify. Neither names Web Bot Auth (searched 2026-11-15).

## In use

- [cloudflare/web-bot-auth](https://github.com/cloudflare/web-bot-auth) publishes libraries for signing and verifying requests. `web-bot-auth` on npm is at 0.2.0 (2026-08-31) and was first published on 2025-04-14.

## History

- 2026-11-17: At IETF 127 ([session](https://datatracker.ietf.org/meeting/127/session/webbotauth), 16:30 in San Francisco, 00:30 UTC on 2026-11-18) the WG re-confirmed that tracking or reputation for sub-agents, sessions or end users is out of scope under the charter, in discussion of the Signed Agent Metadata and PACE proposals. The authors will update the httpsig-protocol draft to replace the `tag` parameter, define a minimal set of signed components and add signature-failure response headers ([minutes](https://datatracker.ietf.org/meeting/127/materials/minutes-127-webbotauth-00)).

Linked from: [AAIF Identity and Trust WG](aaif-identity-trust-wg.md), [Agent Identity and Manifest Standard](aims.md), [IETF](ietf.md), [IETF AI Preferences Working Group](ietf-aipref.md), [W3C Agentic Web Working Group (proposed)](w3c-agentic-web-wg.md), [Wikimedia](wikimedia.md)

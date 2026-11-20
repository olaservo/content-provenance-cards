---
title: "IETF Web Bot Auth Working Group"
id: "ietf-web-bot-auth"
type: "working-group"
status: "WG draft httpsig-protocol-01 (2026-10-29); Cloudflare libraries"
tags: ["type/working-group", "layer/identity", "layer/access"]
updated: "2026-11-20"
canonical: "https://content-provenance-field-guide.olahungerford.workers.dev/cards/ietf-web-bot-auth"
---
# IETF Web Bot Auth Working Group

- Id: ietf-web-bot-auth
- Also known as: webbotauth
- Type: working-group
- Status: WG draft httpsig-protocol-01 (2026-10-29); Cloudflare libraries
- Website: https://datatracker.ietf.org/wg/webbotauth/about/
- News: https://datatracker.ietf.org/wg/webbotauth/history/
- Feed: https://datatracker.ietf.org/feed/group-changes/webbotauth/
- Part of: [IETF](ietf.md)
- Take part: [web-bot-auth mailing list](https://mailarchive.ietf.org/arch/browse/web-bot-auth/)
- Tags: type/working-group, layer/identity, layer/access
- Updated: 2026-11-20
- Explorer: https://content-provenance-field-guide.olahungerford.workers.dev/#ietf-web-bot-auth

Signed bot traffic with RFC 9421 HTTP message signatures and a key directory at `/.well-known/http-message-signatures-directory`.

## Topics

- **Bot identity**: proving who a crawler or agent is. The preference ([IETF AI Preferences Working Group](ietf-aipref.md)) says what is allowed, bot auth says who is asking.

## Compare

- Pairs with [Agent Identity and Manifest Standard](aims.md) and with [Wikimedia](wikimedia.md)'s ask that agents be easy to identify. Neither names Web Bot Auth (searched 2026-11-15).

## In use

- [cloudflare/web-bot-auth](https://github.com/cloudflare/web-bot-auth) publishes libraries for signing and verifying requests. `web-bot-auth` on npm is at 0.2.0 (2026-08-31) and was first published on 2025-04-14.

Linked from: [AAIF Identity and Trust WG](aaif-identity-trust-wg.md), [Agent Identity and Manifest Standard](aims.md), [IETF](ietf.md), [IETF AI Preferences Working Group](ietf-aipref.md), [Wikimedia](wikimedia.md)

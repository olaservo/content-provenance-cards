---
name: IETF Web Bot Auth Working Group
aliases: [webbotauth]
type: working-group
website: https://datatracker.ietf.org/wg/webbotauth/about/
part_of: "[[ietf]]"
status: httpsig-protocol draft; Cloudflare libraries
tags: [type/working-group, layer/identity, layer/access]
participate: "[web-bot-auth mailing list](https://mailarchive.ietf.org/arch/browse/web-bot-auth/)"
updated: 2026-11-15
---
Signed bot traffic with RFC 9421 HTTP message signatures and a key directory at `/.well-known/http-message-signatures-directory`.

## Topics
- **Bot identity**: proving who a crawler or agent is. The preference ([[ietf-aipref]]) says what is allowed, bot auth says who is asking.

## Related
- Pairs with [[aims]] and the agent identifiability asks from [[wikimedia]].

## In use
- [cloudflare/web-bot-auth](https://github.com/cloudflare/web-bot-auth) publishes libraries for signing and verifying requests. `web-bot-auth` on npm is at 0.2.0 (2026-08-31) and was first published on 2025-04-14.

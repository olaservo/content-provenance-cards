---
name: IETF Web Bot Auth Working Group
aliases: [webbotauth]
type: working-group
website: https://datatracker.ietf.org/wg/webbotauth/about/
news: https://datatracker.ietf.org/wg/webbotauth/history/
feed: https://datatracker.ietf.org/feed/group-changes/webbotauth/
part_of: "[[ietf]]"
status: WG draft httpsig-protocol-01 (2026-10-29); Cloudflare libraries
contribute: "[GitHub issues](https://github.com/webbotauth/draft-ietf-webbotauth-httpsig-protocol/issues)"
discussion: "[web-bot-auth mailing list](https://mailarchive.ietf.org/arch/browse/web-bot-auth/), [Zulip](https://zulip.ietf.org/#narrow/stream/webbotauth)"
meetings: "[meetings](https://datatracker.ietf.org/wg/webbotauth/meetings/)"
tags: [type/working-group, layer/identity, layer/access]
updated: 2026-11-21
---
Signed bot traffic with RFC 9421 HTTP message signatures and a key directory at `/.well-known/http-message-signatures-directory`.

## Topics
- **Bot identity**: proving who a crawler or agent is. The preference ([[ietf-aipref]]) says what is allowed, bot auth says who is asking.

## Compare
- Pairs with [[aims]] and with [[wikimedia]]'s ask that agents be easy to identify. Neither names Web Bot Auth (searched 2026-11-15).

## In use
- [cloudflare/web-bot-auth](https://github.com/cloudflare/web-bot-auth) publishes libraries for signing and verifying requests. `web-bot-auth` on npm is at 0.2.0 (2026-08-31) and was first published on 2025-04-14.

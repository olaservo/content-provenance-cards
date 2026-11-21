---
name: Enterprise-Managed Authorization
aliases: [SEP-990, EMA, ID-JAG]
type: specification
website: https://modelcontextprotocol.io/extensions/auth/enterprise-managed-authorization
part_of: "[[mcp]]"
status: Stable since 2026-06-18; its interest group was folded into the Authorization IG on 2026-08-17
tags: [type/specification, venue/mcp, layer/identity, layer/access]
contribute: "[ext-auth issues](https://github.com/modelcontextprotocol/ext-auth/issues), [Authorization IG charter](https://modelcontextprotocol.io/community/interest-groups/auth)"
updated: 2026-11-17
---
An MCP authorization extension (`io.modelcontextprotocol/enterprise-managed-authorization`) that lets an organization's identity provider decide which MCP servers its users can reach. The user signs in once. The client exchanges that sign-in at the identity provider for an Identity Assertion JWT Authorization Grant (ID-JAG), and the MCP server's authorization server exchanges the grant for an access token.

## Topics
- **One sign-in for many servers**: standard MCP authorization has each user authorize each server. Here the identity provider evaluates policy and issues the grant, with no per-server consent step.
- **Admin control**: the spec gives administrators "visibility and control over which MCP Servers are able to be used within the organization."
- **Three parties**: the identity provider, the MCP client and the server's authorization server all have to support it. The interest group charter says the flow "only delivers value" when the three interoperate end to end.
- **Identity without entitlements**: the spec does not mention licences or entitlements (2026-07-28 revision read 2026-11-16). Which content a user's institution has licensed is left to the server.

## Related
- Written for corporate identity providers. The Authorization IG charter lists Okta, Entra ID, Ping and Keycloak.
- The 2026-06-18 announcement names Anthropic, Microsoft and Okta as adopters.

## Compare
- [[getftr]] answers whether a user's institution is entitled to an article, which this extension leaves to the server. Its MCP service authenticates with an API key (docs read 2026-11-16). Neither names the other (searched 2026-11-16).

## History
- 2026-08-17: Interest group folded into the Authorization IG.
- 2026-06-18: Extension announced as stable.
- 2025-06-04: SEP-990 created.

---
name: GetFTR
aliases: [Get Full Text Research]
type: project
website: https://www.getfulltextresearch.com
news: https://www.getfulltextresearch.com/blog
feed: https://www.getfulltextresearch.com/feed
status: MCP service available to partners and developers since January 2026
tags: [type/project, layer/access, medium/text]
participate: "[integrator documentation](https://docs.getfulltextresearch.com/latest/integrators/mcp-service), [publishers](https://www.getfulltextresearch.com/why-publishers-should-join)"
updated: 2026-11-16
---
A service that asks the publisher whether a given user is entitled to a given article and returns a link to the right version. It is funded by participating publishers and free for discovery tools to integrate. Since January 2026 AI tools can call it over [[mcp]].

## Topics
- **Is this user entitled to this article**: `get_entitlements` takes up to 20 DOIs and optional organization context (an IP address or entity ID) and returns `entitled` and `accessType` for each. `get_centralised_entitlements` checks DOIs against journal-level institutional subscriptions.
- **Sending the reader to the version of record**: the launch post describes "smart links" that route a user "to the correct version of record based on their entitlements".
- **Which entitlements a shared connector recognises**: in a [comment](https://scholarlykitchen.sspnet.org/2026/10/27/mcp-discovery/) of 2026-10-28, GetFTR's product director said it wants to help libraries confirm this and invited AI tools and publishers to pilot it.

## Related
- Its FAQ recommends that service providers use it alongside [[kbart]] "to increase the number of links available through real-time, DOI level checks."

## In use
- The [MCP service](https://docs.getfulltextresearch.com/latest/integrators/mcp-service) is at `https://mcp.prod.getft.io/mcp` and needs a GetFTR API key. Both tools are marked Available (docs read 2026-11-16).

## History
- 2026-01: [MCP capability](https://www.getfulltextresearch.com/getftr-enables-ai-tools-to-check-access-rights-for-academic-content) announced for AI tools.

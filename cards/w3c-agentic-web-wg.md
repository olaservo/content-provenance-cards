---
name: W3C Agentic Web Working Group (proposed)
aliases: [Agentic Web WG, WebMCP]
type: working-group
website: https://w3c.github.io/charter-drafts/2026/agenticweb-wg.html
news: https://github.com/webmachinelearning/webmcp
feed: https://github.com/webmachinelearning/webmcp/commits/main.atom
part_of: "[[w3c]]"
status: Draft charter in charter refinement ([w3c/strategy#576](https://github.com/w3c/strategy/issues/576), updated 2026-11-23); Agent Identity, Agent Delegation and Agent Interaction Measurement explainers assigned 2026-11-12 for the end of November; WebMCP in origin trials
contribute: "[WebMCP issues](https://github.com/webmachinelearning/webmcp/issues), [Web Machine Learning Community Group](https://www.w3.org/community/webmachinelearning/)"
discussion: "[charter review issue](https://github.com/w3c/strategy/issues/576)"
tags: [type/working-group, layer/identity]
updated: 2026-11-24
---
Proposed W3C working group on how AI agents interact with the web. Its Agent Identity deliverable would tell a page that an agent is acting for a user, and where appropriate which agent and for whom, building on [[ietf-web-bot-auth]] and OAuth without duplicating them. Its first draft is WebMCP, a browser API (`document.modelContext`) that lets a page expose tools to agents, incubated in the Web Machine Learning Community Group. WebMCP is a W3C effort, separate from the [[mcp]] project. The draft charter names Heather Flanagan, Liad Yosef and Yoav Weiss as chairs.

## Topics
- **Telling a site an agent is acting**: conveying that an interaction comes from an agent on a user's behalf, so a site can decide which actions need the user directly. The draft puts detecting agents that do not disclose themselves, and cryptographic authentication, out of scope.
- **Measuring agent use**: Agent Interaction Measurement would let a page measure capability invocations, interaction timing and coarse outcomes such as user feedback, through the Performance Timeline and Reporting API. It must not expose the user's conversation with the agent.
- **Site capabilities**: describing a page's functions as tools with input and output schemas and hints such as read-only or needing user acknowledgement. WebMCP is the starting draft.

## Related
- The draft charter lists crawler controls and content provenance as out of scope, and names [[ietf-aipref]] and [[c2pa]] as liaisons. It also names [[ietf-web-bot-auth]] and [[aaif]], and says it will coordinate with AAIF on how its specifications relate to MCP.

## In use
- WebMCP origin trials in Chrome 149 and Edge 150 ([implementation status](https://github.com/webmachinelearning/webmcp/blob/main/implementation-status.md), checked 2026-11-24).
- [@w3c/webmcp-polyfill](https://www.npmjs.com/package/@w3c/webmcp-polyfill) 0.2.0 on npm (checked 2026-11-24).

## History
- 2026-11-19: WebMCP replaced the `RegisteredTool` dictionary with a `Tool` interface keyed by a UUID, a breaking change ([webmcp#348](https://github.com/webmachinelearning/webmcp/pull/348)).
- 2026-11-12: The Web Machine Learning Community Group assigned explainers for Agent Identity, Agent Delegation and Agent Interaction Measurement, due by the end of November so the charter can go to Advisory Committee review ([minutes](https://www.w3.org/2026/11/12-webmachinelearning-minutes.html)).
- 2026-09-28: Charter review issue opened ([w3c/strategy#576](https://github.com/w3c/strategy/issues/576)).

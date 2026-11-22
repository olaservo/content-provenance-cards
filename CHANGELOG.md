# Changelog

Changes to the cards and the explorer, newest first. Dates are when the change was made in the source repo. The site is rebuilt from it afterwards.

## 2026-11-22

- The guide now says it is an early alpha, shared for feedback, in the README, the explorer intro, `cards.md`, `cards.json`, `llms.txt`, the guide index, the reader skill and the MCP server instructions. Card fields, the MCP tools, the plugin layout and the published file formats may change.
- New card: [[podcast-namespace]], the Podcasting 2.0 RSS namespace. It is the guide's first card on paying a creator directly: `<podcast:funding>` carries a donation or membership link. It also has tags for a licence, credits, platform blocking and an `ai-content` disclosure.
- New topic: `topic/lineage`, for how a work or dataset records what it was made from. It is on [[c2pa]], [[agent-skills-signing]], [[openlineage]] and [[mcp-fsig]].
- [[c2pa]]: new topic on derived works and packages, with the three ingredient relationships (`parentOf`, `componentOf`, `inputTo`) and the appendices for ZIP-based files and HTML.
- [[ai-disclosures-project]]: the Open Memory Protocol Initiative and the Open Alpha Registry link to their pages.

## 2026-11-21

- New card: [[mcp-progressive-disclosure-wg]], the MCP working group exploring how a server's primitives can load progressively, the way [[agent-skills]] load. Its charter names [[mcp-skills-extension]] as related.
- Cards list three ways to take part: Contribute (issue tracker, repository or join page), Discussion (chat, forum or mailing list) and Meetings (public calendar or list of open calls). `participate` is renamed `contribute`. The definitions are in `vocab.json` and appear in the explorer intro, `cards.md`, the guide index and the skill's vocabulary file.
- Every card was checked for public venues on 2026-11-21. 51 cards now list a discussion venue and 24 a meeting calendar or schedule, among them the IETF Zulip streams, the AAIF and MCP group Discord channels and calendars, the [[creative-commons]] Zulip, and the [[openlineage]] and [[croissant]] community calls. Links for adopting or signing on to an effort were removed from [[stim]], [[getftr]], [[fairly-trained]], [[rights-and-ai]], [[internet-licensing-collective]] and [[content-authenticity-initiative]]. Meeting calendars that were empty, cancelled or for members only were left out, and so were closed threads and merged PRs.
- [[mcp-fsig]]: the charter was amended on 2026-11-21. The group now collects problems and routes gaps to Working Groups, and does not sponsor SEPs. "Data lineage and citation" and "Data handling" stay in scope. [[mcp]] and [[mcp-c2pa-in-meta]] quoted the earlier charter text and now quote the current one.
- [[c2pa]]: the JSON guidance in Appendix A.9.3 now links the section and quotes it.
- [[mcp-c2pa-in-meta]]: the 2026-09-25 closure links the maintainer comment that gives the reason.

## 2026-11-20

- A GitHub agentic workflow, `mcp-smoke`, tests the Worker's MCP endpoint after each publish. A Copilot agent answers the 24 smoke questions with only the four MCP tools, and a script scores which cards each answer names and checks the `updated` dates it read.
- Every card was checked claim by claim against primary sources, and each correction was checked again by a second pass. `updated` now moves with any edit to a card, frontmatter included.
- Corrections: [[ietf-aipref]] draft dates (vocab-08 2026-09-14, attach-05 2026-08-19). [[microsoft-grounding-preference]] is not the first vendor grounding signal, and vocab-08 has an `ai-use` category. [[w3c-tdmrep]] is a Final Community Group Report. [[content-telemetry]] and [[spur-coalition]]: v1.0 makes per-event signing optional and defers manifest signing. [[eu-ai-act-gpai-code]]: signatories "identify and comply with" other protocols, not "best efforts". [[c2pa]] soft-binding and conformance counts. [[encypher]] pricing. [[agent-skills-signing]]: discussions 252 and 393 already propose a signer and revocation. [[agent-plugins]] and [[skills-marketplace]]: Agent Skills has a `license` field. [[mcp]] and [[mcp-c2pa-in-meta]]: the Financial Services IG charter covers provenance for its sector. [[cloudflare-content-signals]]: policycheck reads robots.txt only. [[ai-disclosures-project]]: the Open Memory Protocol Initiative. [[okfn]]: an unsourced plan removed. [[microsoft-publisher-content-marketplace]] and [[rsl]]: only a vendor blog links the two. [[ai-catalog]] trust manifests and [[ard]] entries reworded to match the specs.
- New events: [[iab-comp]] 1.0 final, [[acp]] adds Meta, [[ucp]] council and release, [[x402]] executive director and repository move, [[agent-plugins]] approved by the AAIF Technical Committee, [[aipref-training-token]] -01 and its use in [[ai-robots-txt]] v2.2, [[ietf-aipref]] design team call, [[socan]] amended claim, [[cc-signals]] and [[creative-commons]] alpha plans, the [[rsl]] `<reporting>` element, new [[spur-coalition]] members, [[eu-ai-act-gpai-code]] Article 50 dates, [[mcp-registry]] v1.8.10, [[mcp-server-cards]] classed Beta, the [[niso]] pilot timeline and [[croissant]] 1.1 dates.
- Links fixed on [[x402]], [[cawg]], [[counter]], [[creative-commons]], [[w3c]], [[project-nanda]] and [[aaif-observability-traceability-wg]]. [[ddex]] drops a stale news page.
- The watch list gains the Google Search Central Blog and OpenAI News. Neither has a card. OpenAI's feed covers all of its announcements. Anthropic has no feed, and Perplexity's pages refused scripted requests, so neither is listed.
- A `Build` workflow runs `node build.mjs` on every pull request. It fails on a warning or a smoke problem.

## 2026-11-17

- `llms.txt` on olahungerford.com now lists the per-card files first and gives the size of `cards.md`, about 160 KB. In a test on 2026-11-17, five of six Claude Code sessions that started from `llms.txt` read `cards.md`, in two fetches each.
- The Worker's `robots.txt` no longer asks crawlers not to train on the cards. The cards are under CC BY 4.0, which allows any use with credit. It still says yes to search and to answer-time use. olahungerford.com's own `robots.txt` is unchanged.
- `llms.txt` on olahungerford.com now points at the prototype that serves one file per card, with its index, the reader skill and the plugin. It listed only `cards.md`, which holds every card in one file.
- [[agent-skills-signing]]: discussion 651's mechanism, its example repository, and topics on covering the whole folder and on a removed credential. [[c2pa]]: a topic on YAML front matter, where the spec's own example does not parse in PyYAML. [[content-authenticity-initiative]] notes the open c2pa-rs pull request the example depends on.
- The watch list gains Internet Exchange, a weekly newsletter on Internet governance and digital rights. It has no card.
- Cards can now say where an effort posts its news. `news` is its blog or announcements page and `feed` is the RSS, Atom or JSON feed. 42 cards have one or both, read on 2026-11-17. A new watch list, `watch.md` and `watch.json`, collects them for feed readers and scripts. It also lists sources with no card, kept in `watchlist.json`: The Scholarly Kitchen, MLCommons, IAB Tech Lab, the OpenTelemetry blog and the Bing Webmaster blog.
- The two skills and the MCP endpoint now install as one plugin in the [[agent-plugins]] layout. The README has the steps for Codex and Claude Code.
- The cards are now under CC BY 4.0 and the code under MIT. `cards.json`, `updates.json`, `watch.json`, the plugin and the Worker's pages name the licence, and the README says which files each one covers.
- The plugin's version now changes with every publish, written as `2026.11.17+20`. A copy installed on 2026-11-17 kept its first set of cards after a second publish that day, and updates from this one on.
- Topic tags now have definitions and their own lists. `topics/skills.md` and `topics/discovery.md` list the cards with each tag, and the reader skill carries both. The explorer has a Topic filter row, and its front page defines the two topics. [[project-nanda]] gains the `topic/discovery` tag.
- Added [[google-scholar-mediated-reading]]: Google Scholar's Mediated Reading program and its MERU usage protocol, which [[counter]] reports as `SYNDICATED:Google_MERU`. Google's page gives policies and no message format.
- [[counter]]: new topics on retrieval metrics and the Agent access method, how [[content-telemetry]] events map to metrics, third-party reporting, and the absence of a denial metric for AI access. It notes that the AI metrics are optional and not audited.
- [[content-telemetry]]: new topics on coverage declarations and on reporting for an institution. v1.0 has no event for a refused retrieval.
- [[niso]]: Journal Article Versions RP-8-2026, published 2026-10-05.

## 2026-11-16

- Added nine cards on how an agent finds a server and who may reach it. Three are MCP work: [[mcp-registry]], [[mcp-server-cards]] and [[mcp-enterprise-managed-authorization]]. [[ard]] is the federated search layer built on AI Catalog entries. [[niso]], [[kbart]], [[getftr]] and [[trace]] come from scholarly publishing, where libraries already keep holdings feeds and entitlement checks. [[dataspace-protocol]] negotiates ODRL terms before data moves. They carry a new `topic/discovery` tag.
- [[ai-catalog]]: new topics on the split between a catalog's operator and an artifact's publisher, and on the Policy URLs extension. It links [[mcp-server-cards]], [[ard]] and [[agent-skills]], and its status notes ADR-0028.
- None of the registry `server.json`, the Server Card, the AI Catalog entry or the ARD entry has a field for usage terms or for the entitlements a server covers. Each card says so with the date read. `matches.md` lists 59 pairs.
- [[mcp]] gains an In use section with Silverchair's Research Bridge and the [[getftr]] MCP service. [[counter]] notes its [[trace]] funding.
- [[otel-mcp]]: SEP-2448 closed on 2026-09-22. The card said March 2026.
- [[skills-marketplace]]: notes the Book-to-skill pipeline and its benchmark.
- Added three music cards: [[stim]], [[socan]] and [[rights-and-ai]]. STIM offers a license for AI services that requires attribution technology. SOCAN registers works made with AI tools, has named an attribution partner and is suing Suno. Rights & AI is the music publishers' declaration reserving rights against AI training, with a file of the companies behind it.
- [[cisac]]: the STIM license and its attribution requirement moved to [[stim]]. [[gema]]: notes Koda's case against Suno and its referral to the Eastern High Court.
- Checked the findings the link audit left open. [[mcp-security-ig]]: the restructure is dated 2026-08-26 in the charter changelog and was merged on 2026-10-31. [[mpp]]: the current draft is `draft-httpauth-payment`, which is active, and the earlier `draft-ryan-httpauth-payment` expired. [[counter]] published phase two on 2026-10-23. [[creative-commons]]: the AIPREF exclusions draft expired on 2026-10-24. [[rsl]]: the SPUR binding links its source.
- [[mcp-fsig]]: the 2026-09-24 meeting notes show the [[openlineage]] lineage key presented and [[mcp-sep-3094-citations]] on the agenda. That pair is now connected by a source, and `matches.md` lists 48 pairs. BearingNode filed the lineage key as FSIG issue 16 on 2026-10-08.
- [[openattribution]]: the status no longer lists the SDKs and the edge worker, which are in the [[spur-coalition]] GitHub organization. [[agent-skills-signing]] counts seven discussions.
- The MCP endpoint has a fourth tool, `list_unconnected`, which lists the pairs in `matches.md` and can filter by card or layer. A client that only uses tools had no way to reach that list.
- [[rsl]]: a Training opt-out topic names the `ai-train` usage token, and the spec's references to [[cloudflare-content-signals]] and [[ietf-aipref]].
- [[otel-mcp]] is no longer marked as part of [[mcp]]. The conventions are an OpenTelemetry document. A Related bullet says what MCP contributes: the reserved `_meta` trace keys and the SDKs that emit the spans.
- Explorer: the Medium filter row says how many cards are media-neutral and have no medium tag. Those cards do not match a medium filter. A medium tag's tooltip gives its definition.
- The README says what gets a card: something others can adopt, join or must follow. A product feature that implements a standard goes under that standard's In use section, and a company gets a card when it publishes a spec or an open implementation.

## 2026-11-15

- Every link between cards was audited twice, by two independent passes, against primary sources. A link now means a primary source connects the two efforts. A comparison that only this guide makes sits under a card's `## Compare` heading, and the graph draws it as a dotted line. Of 141 linked pairs, 92 are connected by a source and 49 are comparisons. `matches.md` lists the 49.
- Corrections from the audit: [[mcp-sep-3094-citations]] was closed without merging on 2026-11-08. [[content-authenticity-initiative]] is a partner of C2PA and not part of it. The [[iptc]] Data Mining property is not maintained with [[cawg]]. [[counter]] has published phase two. The [[content-telemetry]] SDKs are maintained by [[spur-coalition]]. [[agent-plugins]] 1.1.0 is a working draft. The [[mpp]] and [[cloudflare-content-signals]] drafts show as expired on Datatracker. [[agent-skills-signing]] gains discussion 651, which proposes C2PA credentials for skills.
- The `medium/` tag has six values: text, image, audio, video, code and data. Eleven more cards carry one, where the card's own text names the medium.
- Added `smoke/questions.json`: 17 questions the guide should be able to answer, five of them about which efforts are not connected yet. The build checks them.
- Added four music cards: [[ddex]], [[cisac]], [[gema]] and [[fairly-trained]]. The first three carry a new `medium/` tag, which the explorer shows as its own filter row.
- [[c2pa]]: the Stripped metadata topic counts the soft-binding algorithms that list audio.
- [[w3c-tdmrep]]: notes that record companies reserve Article 4 rights by written declaration, with IFPI's list of them.
- [[rsl]]: the status line now mentions the 2026-11-12 relaunch of the collective behind it. The build warns when a card's newest History date is later than every date in its status.
- [[internet-licensing-collective]]: added the ten Publisher Steering Committee members shown on its About page, and the co-founder named in the launch release.
- The `search_cards` tool on the MCP endpoint lists cards with the words in their name or aliases first, and says when the rest only mention them.
- Cards can carry a `## In use` section of released implementations and live uses, each with a date and a link. Twelve cards have one, including [[c2pa]], [[rsl]], [[croissant]] and [[cloudflare-content-signals]]. Commitments, pilots and open pull requests stay in the status line.
- Added [[encypher]]. [[iptc]] gains the Origin Verified News Publishers List, and [[c2pa]] describes the text appendix (A.8).
- [[microsoft-publisher-content-marketplace]] is described as a pilot, as Microsoft's 2026-02-03 post describes it. The card said "launched".
- Cards can carry a `## History` section of dated events. 27 cards have one, restating the dates their status lines already gave, including [[rsl]], [[ietf-aipref]] and [[c2pa]]. The build collects them into `updates.md` and `updates.json`.
- Added a prototype for agents at https://content-provenance-field-guide.olahungerford.workers.dev: a Markdown and JSON file per card, pages that read without JavaScript, and Markdown on request.
- Added two agent skills, one for answering from the guide and one for suggesting pull requests to it, served as files and over MCP at `/mcp` with the Skills extension.

## 2026-11-14

- Added this changelog. The site serves it as `changelog.md`, linked from the explorer footer, `llms.txt` and `cards.json`.

## 2026-11-13

- Added [[internet-licensing-collective]]. The RSL Collective relaunched under that name on 2026-11-12 with Yahoo Scout as its first commercial licensee.
- [[rsl]]: the collecting society behind it is now [[internet-licensing-collective]], and the Adoption topic notes the Yahoo Scout license.

## 2026-11-09

- The site is titled a field guide, and the title links to the intro.

## 2026-11-08

- Source moved to the public repo [olaservo/content-provenance-cards](https://github.com/olaservo/content-provenance-cards).
- Added [[agent-plugins]]. [[mcp-interceptors]] says "context middleware" where it said "hooks".
- [[skills-marketplace]] and [[ai-disclosures-project]] reworded to match the project's own pages.
- Added agent-readable copies of the cards: `cards.md`, `cards.json` and `llms.txt`.
- Renamed the `station/*` tags to `stage/*`.

## 2026-11-05

- First published at https://www.olahungerford.com/content-provenance/.

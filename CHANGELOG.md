# Changelog

Changes to the cards and the explorer, newest first. Dates are when the change was made in the source repo. The site is rebuilt from it afterwards.

## 2026-11-15

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

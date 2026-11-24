# Content Provenance, Access and Attribution: A Field Guide

Cards for the standards orgs, working groups, specs and proposals that decide where content came from (provenance), what may be done with it (access, preferences, licensing, payment), and whether its source gets credited (attribution), and where the Model Context Protocol fits among them. One markdown file per card, Obsidian-compatible, with a small static explorer and plain Markdown and JSON copies for agents.

This field guide is an early alpha, shared for feedback, and these are one person's working notes. Card fields, the MCP tools, the plugin layout and the published file formats may change. Status lines carry the dates the sources gave, so check upstream before relying on one. Corrections and new cards are welcome as [issues](https://github.com/olaservo/content-provenance-cards/issues) or pull requests, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Start here

To read the guide, browse https://www.olahungerford.com/content-provenance/.

To ask an agent about it, install the plugin locally from GitHub, in an agent that supports plugins. It adds the skills below and a read-only MCP server.

In Claude Code:

```sh
claude plugin marketplace add olaservo/content-provenance-cards
claude plugin install content-provenance-field-guide@content-provenance-cards
```

In Codex:

```sh
codex plugin marketplace add olaservo/content-provenance-cards
codex plugin add content-provenance-field-guide@content-provenance-cards
```

Then ask a question, for example "Which efforts let a publisher say whether AI may train on its content?" or "Is DDEX connected to C2PA?". `smoke/questions.json` has more.

To add or correct a card, see [CONTRIBUTING.md](CONTRIBUTING.md). To build the explorer or run the Worker, see [docs/maintaining.md](docs/maintaining.md).

## For agents

A prototype at https://content-provenance-field-guide.olahungerford.workers.dev serves the guide to agents. It is public, read-only and needs no sign-in. Cloudflare's Workers Logs record requests to it. It is experimental: the `workers.dev` address may move, the tools may change, and there is no uptime promise.

### MCP endpoint

```sh
claude mcp add --transport http field-guide https://content-provenance-field-guide.olahungerford.workers.dev/mcp
```

Other clients take the same URL as a Streamable HTTP server. A client with the [Skills over MCP extension](https://modelcontextprotocol.io/extensions/skills/overview) (`io.modelcontextprotocol/skills`) reads the [skills](#skills) from the server and needs only this URL, with no local install. Clients that don't support the extension yet use the four read-only tools, which every client gets:

| Tool | Returns |
|---|---|
| `search_cards` | Cards that match words in the name, aliases, status, summary or topics, optionally limited to one layer or type. |
| `get_card` | One card as Markdown, by id. |
| `list_updates` | Dated events from the cards' histories, newest first, optionally limited by date range, card or layer. |
| `list_unconnected` | The pairs in `matches.md`: cards the guide compares that no primary source connects. |

### Skills

- `content-provenance-field-guide` answers questions from the cards, loading the index first and then only the cards a question needs.
- `content-provenance-field-guide-contributor` suggests a pull request here when your work touches something the guide covers.
- `content-provenance-field-guide-feedback` files an issue with your own GitHub account when a card is wrong, stale or missing. The guide never posts anything itself.
- `content-provenance-field-guide-reviewer` checks a card change against [CONTRIBUTING.md](CONTRIBUTING.md). The `pr-review` workflow runs it on pull requests.

They come with the plugin, over the MCP endpoint, or as plain files at `skills/<name>/` on the Worker.

### Plain files

- [cards.md](https://www.olahungerford.com/content-provenance/cards.md) and [cards.json](https://www.olahungerford.com/content-provenance/cards.json): every card in one file, with the vocabularies.
- [llms.txt](https://www.olahungerford.com/content-provenance/llms.txt): where an agent should start.
- [updates.md](https://www.olahungerford.com/content-provenance/updates.md) and [watch.md](https://www.olahungerford.com/content-provenance/watch.md): dated events from every card, and where each effort posts its news. Both also come as JSON.
- On the Worker: `cards/<id>.md` and `cards/<id>.json` for one card, `index.md` with one line per card, `layers/<layer>.md` and `topics/<topic>.md`. `/` and `/cards/<id>` answer `Accept: text/markdown` with Markdown.

## Licence

The cards, the skills, the data files (`vocab.json`, `watchlist.json`, `smoke/questions.json`), the changelog and the docs are under [CC BY 4.0](LICENSE-CC-BY-4.0), and so is every file the build makes from them. Reuse them with credit to Ola Hungerford and a link to https://www.olahungerford.com/content-provenance/. `cards.json`, the plugin manifests and the Worker's pages name the licence.

The code is under the [MIT licence](LICENSE): `build.mjs`, `worker/`, `ui/index.html`, `.github/release/notes.mjs` and the scripts under `.claude/skills/`.

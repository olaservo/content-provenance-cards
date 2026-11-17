# Content Provenance, Access and Attribution: A Field Guide

Cards for the standards orgs, working groups, specs and proposals that decide where content came from (provenance), what may be done with it (access, preferences, licensing, payment), and whether its source gets credited (attribution), and where the Model Context Protocol fits among them. One markdown file per card, Obsidian-compatible, with a small static explorer and plain Markdown and JSON copies for agents.

Browse it at https://www.olahungerford.com/content-provenance/. The same cards are at [cards.md](https://www.olahungerford.com/content-provenance/cards.md) and [cards.json](https://www.olahungerford.com/content-provenance/cards.json).

A prototype for agents runs at https://content-provenance-field-guide.olahungerford.workers.dev: one Markdown and JSON file per card, pages that read without JavaScript, a dated list of updates, two agent skills, and an MCP endpoint at `/mcp`. The skills and the endpoint also install as one plugin. See [For agents](#for-agents).

These are one person's working notes. Status lines carry the dates the sources gave, so check upstream before relying on one. Corrections and new cards are welcome as issues or pull requests.

## Layout

| Path | What |
|---|---|
| `cards/<id>.md` | One card per org, group, spec or proposal. The filename is the id used in `[[links]]`. |
| `watchlist.json` | Blogs and other sources worth following that have no card, each with a `name`, a `news` page, a `feed` and a `note`. |
| `vocab.json` | The layer, stage and medium definitions shown in the explorer intro and in the agent files, plus display labels for tags whose id does not read well. |
| `build.mjs` | Reads the cards and `vocab.json`, writes `ui/data.js` for the explorer and `ui/cards.md`, `ui/cards.json`, `ui/updates.md`, `ui/updates.json`, `ui/matches.md`, `ui/watch.md`, `ui/watch.json` and `ui/llms.txt` for agents and scripts. With `--worker` it also writes the Worker's site and the plugin. No dependencies. |
| `CHANGELOG.md` | Cards added and changed, by date, newest first. The build copies it to `ui/changelog.md` with its `[[links]]` pointing at the explorer. |
| `ui/index.html` | The explorer. List and graph views, search, tag filters, wikilinks, backlinks. |
| `smoke/questions.json` | Questions the guide should be able to answer, each with the cards or unconnected pairs a good answer names. The build checks that the cards exist and that each pair is still unconnected. |
| `skills/<name>/SKILL.md` | Two agent skills, written by hand. `content-provenance-field-guide` tells an agent how to answer from the cards. `content-provenance-field-guide-contributor` tells it when and how to suggest a pull request here. |
| `worker/` | A Cloudflare Worker that serves the guide to agents, see [For agents](#for-agents). |
| `.claude-plugin/marketplace.json` | Lists the plugin for Codex and Claude Code, see [As a plugin](#as-a-plugin). |
| `notes/metro-mockup.svg` | Hand-laid mockup of a metro-map view, two of seven lines. |
| `private/` | Optional and gitignored. Personal notes per card and cards not yet public, see below. |

## Card format

Obsidian properties in YAML frontmatter, then a markdown body.

```markdown
---
name: C2PA
aliases: [Coalition for Content Provenance and Authenticity]
type: organization
website: https://c2pa.org
news: https://c2pa.org/news/
feed: https://c2pa.org/feed/
part_of: "[[some-parent]]"
status: Spec 2.5 published October 2026
participate: "[membership](https://c2pa.org/membership/)"
tags: [type/organization, layer/provenance, stage/at-rest]
updated: 2026-11-03
---
One-paragraph summary, with [[other-card]] links.

## Topics
- **Short topic label**: the problem being solved, in one or two sentences.

## Related
- Optional extra links and facts that are not problems (overlaps, demos, who references whom).

## Compare
- Optional comparisons with other cards that no source makes. Say what was searched and when.

## In use
- Optional released implementations and live uses, each with a date and a link.

## History
- 2026-10-14: Optional dated events, newest first: a release, a charter, a launch, a rename.
```

Required: `name`, `type`, `tags`, and a `## Topics` section. Each topic bullet starts with a bold label, then a colon, then the problem it solves. Everything else is optional. A `[[link]]` to another card says a primary source connects the two: the effort's own material names the other, or a court, regulator or standards body does. A comparison that only this guide makes goes under `## Compare`, and the explorer draws it as a dotted line. An In use bullet names something a reader can use or observe today: a released version, a live service, or a license or requirement in effect. It gives the date of the release or of the last check, and a link. A registry kept by the effort is a better link than a list of names. Commitments, pilots and open pull requests belong in `status`. Remove a bullet when it stops being true. A History bullet starts with the date the event happened, as `YYYY`, `YYYY-MM` or `YYYY-MM-DD`, then a colon. The build collects these from every card into `updates.md` and `updates.json`, and warns about a bullet with no date. Lists use the inline `[a, b]` form, which is what `build.mjs` parses. Inline `#tags` in the body are also picked up.

`participate` is where a reader can take part, as one or more markdown links in a quoted string. Use the effort's own public venue (issue tracker, mailing list, join page), not a contact person. Leave it out when there is no public venue.

`news` is the page where the effort posts its blog or announcements, and `feed` is that page's RSS, Atom or JSON feed. Each takes one URL or an inline list. Use the effort's own page, not a social media account. For a specification that lives in a repository, the releases page and its `releases.atom` count. A card whose news appears only on its parent's blog leaves both out, and the parent's card carries them. See [Watch list](#watch-list).

`type` is one of `organization`, `working-group`, `interest-group`, `community-group`, `specification`, `proposal`, `project`, `regulation`. Tags are nested Obsidian tags:

- `type/...` mirrors `type` so it shows in the tag pane.
- `layer/provenance`, `layer/access`, `layer/licensing`, `layer/attribution`, `layer/payments`, `layer/identity`, `layer/governance`.
- `stage/at-rest`, `stage/in-transit`, `stage/boundary`, `stage/after-delivery`, `stage/trust`: where a card sits on the path content takes through an agent, from the Attribution by Design talk (which calls them stations), used only where a card clearly sits at one. Trust is the exception: it is the question of who may sign or report, which every other stage depends on.
- `medium/text`, `medium/image`, `medium/audio`, `medium/video`, `medium/code`, `medium/data`: the kind of content an effort is about, used only where its own material names the medium. A card with no medium tag is media-neutral.
- `venue/mcp` for MCP threads and groups.
- `topic/skills`, `topic/discovery`: a subject that cards on different layers share. Each topic has a definition under `topics` in `vocab.json`, and the build warns about a `topic/` tag that has none.

## Using it

```sh
node build.mjs           # cards, plus private/ if present
node build.mjs --public  # cards only
node build.mjs --public --out ../olaservo.github.io/content-provenance  # publish copy for olahungerford.com
```

Then open `ui/index.html` directly in a browser. The generated files are gitignored. `topics/<topic>.md` lists the cards with one topic tag. The maintainer's steps for merging a change, rebuilding the site copy and deploying the Worker are in `.claude/skills/publish/SKILL.md`, which Claude Code runs as `/publish`. `cards.md` is one Markdown file with the vocabularies first and a section per card, wikilinks resolved to links within the file. `cards.json` is the same cards as structured data under `cards`, each with its `links` and the subset that are `compares`, with the vocabularies under `vocab`. `llms.txt` describes both for an agent that lands on the section. The Graph button draws cards as nodes and `[[links]]` as edges, dotted where the only links between two cards are under Compare, coloured by the first `layer/` tag and sized by link count: hover to see neighbours, click to open a card, drag to move nodes or pan, scroll to zoom. Tag filters and search fade out cards that do not match. To use it in Obsidian, open this folder as a vault; Dataview can query the frontmatter, for example `TABLE status FROM #layer/attribution`.

## Adding a card

A card is for something other people can adopt, join or must follow, such as a published spec or draft, a registry, a licence, a certification, a group that is writing one of these, or a law or ruling on provenance, access or attribution. A product feature that implements a standard goes under that standard's In use section. A company gets a card when it publishes a spec or an open implementation.

Copy an existing card, rename it to the new id, and fill in the fields. Run `node build.mjs`; it warns about `[[links]]` that point at no card. Add a line to `CHANGELOG.md` under the day's date for a new card or a change a reader would want to know about.

When something happens to an effort that already has a card, change its `status`, set `updated`, and add a History bullet dated when it happened. The build warns when a card's newest History date is later than every date in its status, which usually means the status was not updated. The changelog records edits to the guide. History records what happened to the efforts the cards describe. In use lists what is released or running now, so a launch can appear in both: the dated event in History, the current state with its link in In use.

## Watch list

The build collects every card's `news` and `feed` into `watch.md` and `watch.json`, and adds the entries in `watchlist.json`. That file is for sources with no card: a blog that covers the field and belongs to no single effort, or an effort that has not earned a card yet. When one of them gets a card, move its `news` and `feed` to the card. The build warns when an id is in both places.

`watch.json` has one entry per source under `sources`, each with `id`, `name`, `news` and `feed` as lists, and `card`, which is the card's id or `null`. It is the list a feed watcher reads. Fetching the feeds and analysing the posts happen outside this repo.

## For agents

`node build.mjs --public --worker --site <url>` writes `worker/site/`, `worker/generated/` and `plugin/`, and `worker/` serves the first two from Cloudflare. `wrangler dev` and `wrangler deploy` run that build first, so the Worker never serves a build that includes `private/`.

```sh
cd worker
npm install
npx wrangler dev      # http://127.0.0.1:8787
npx wrangler deploy
```

What it serves, beyond the explorer and the flat files:

- `cards/<id>.md` and `cards/<id>.json`, one card each, and `cards/<id>` as a plain HTML page. `index.md` lists every card in one line each, `layers/<layer>.md` lists the cards on one layer, and `topics/<topic>.md` lists the cards with one topic tag.
- Markdown on request: `/` and `/cards/<id>` answer `Accept: text/markdown` with the Markdown file.
- `updates.md` and `updates.json`, the dated events from every card's History.
- `watch.md` and `watch.json`, the [watch list](#watch-list).
- `skills/<name>/`, the two skills as plain files. The reader skill carries the index, the layer and topic lists, every card, the updates, the watch list and the changelog under `references/`, so an agent loads the index first and then only the cards a question needs.
- `/mcp`, an MCP server built on the TypeScript SDK. It serves both skills with the Skills extension (`io.modelcontextprotocol/skills`, SEP-2640), including `resources/directory/read`, and has four read-only tools for clients without skill support: `search_cards`, `get_card`, `list_updates` and `list_unconnected`, which lists the pairs in `matches.md`.
- `robots.txt` and `sitemap.xml` for its own origin.

### Trying the MCP endpoint

The endpoint is experimental. It runs on a `workers.dev` address that may move, the tool names and their output may change, and there is no uptime promise. It is public and read-only and needs no sign-in. The Worker has Cloudflare's Workers Logs turned on, which record requests.

In Claude Code:

```sh
claude mcp add --transport http field-guide https://content-provenance-field-guide.olahungerford.workers.dev/mcp
```

In a client that reads `.mcp.json`:

```json
{
  "mcpServers": {
    "field-guide": { "type": "http", "url": "https://content-provenance-field-guide.olahungerford.workers.dev/mcp" }
  }
}
```

Other clients take the same URL as a Streamable HTTP server.

What a client gets depends on what it supports:

- A client with the Skills extension lists two skills, `content-provenance-field-guide` and `content-provenance-field-guide-contributor`, and reads their files as it needs them.
- Any other client gets the four tools, and can read the same files as `skill://` resources.

Checked as of 2026-11-16: requests on protocol versions 2026-07-28 and 2025-11-25 from a script, and Claude Code 2.1.325 in headless mode, which answered the questions in `smoke/questions.json` from the tools. No client with the Skills extension has been tried against it yet. Problems and requests go to [issues](https://github.com/olaservo/content-provenance-cards/issues).

### As a plugin

The two skills and the MCP endpoint also come as one plugin in the [Agent Plugins](https://agent-plugins.org/) 1.0.0 layout: a root `plugin.json`, an `mcp.json` and a `skills/` folder. The same folder carries `.claude-plugin/plugin.json` and `.mcp.json`, which Claude Code reads. The `--worker` build writes it to `plugin/`, which is gitignored. The published copy is the `plugin` branch, and `.claude-plugin/marketplace.json` on `main` points at that branch.

In Codex:

```sh
codex plugin marketplace add olaservo/content-provenance-cards
codex plugin add content-provenance-field-guide@content-provenance-cards
```

In Claude Code:

```sh
claude plugin marketplace add olaservo/content-provenance-cards
claude plugin install content-provenance-field-guide@content-provenance-cards
```

The reader skill in the plugin carries the cards as they were at the last publish. The MCP tools read the Worker's copy. The plugin's version is the newest date in the cards or the changelog, written as `2026.11.17`.

Checked as of 2026-11-17 with Codex CLI 0.169.0 and Claude Code 2.1.326, each installing from GitHub with the commands above. Both listed the plugin at its version and its MCP server. Claude Code in headless mode answered one question from `smoke/questions.json` through the MCP tools and, with those tools blocked, a second through the reader skill and its references. Codex in `codex exec` answered one. It read the reader skill's `SKILL.md` and `references/index.md` from its installed copy and called three of the MCP tools.

The copy on olahungerford.com gets the flat files only. Jekyll renders any Markdown file that starts with frontmatter and stops serving the raw file, so the per-card files live on the Worker.

## Private notes

`private/` is gitignored, so it can hold a separate repository. `private/<id>.private.md` is a personal note for a card, with one property, `card: "[[id]]"`, and free sections such as `## Contacts` and `## Notes`. Naming it `<id>.private.md` keeps `[[id]]` resolving to the card in Obsidian. `private/cards/<id>.md` holds cards that are not public yet, in the same format. A build without `--public` includes both and turns on a private-notes toggle in the explorer. `--public` ignores the folder, and `--out` refuses to run without `--public`, so nothing in it reaches the site. A card anywhere can also carry `publish: false`; the `--public` build leaves it out and removes sentences in other cards that link to it.

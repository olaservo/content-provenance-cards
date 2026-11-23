# Maintaining the field guide

How the repo is laid out, how it builds, and where it is published. The steps for merging a change, rebuilding the site copy and deploying the Worker are in `.claude/skills/publish/SKILL.md`, which Claude Code runs as `/publish`.

## Layout

| Path | What |
|---|---|
| `cards/<id>.md` | One card per org, group, spec or proposal. The filename is the id used in `[[links]]`. |
| `watchlist.json` | Blogs and other sources worth following that have no card, each with an `id`, a `name`, a `news` page, a `feed` and a `note`. |
| `vocab.json` | The layer, stage, medium and topic definitions and the ways to take part (contribute, discussion, meetings), shown in the explorer intro and in the agent files, plus display labels for tags whose id does not read well. |
| `build.mjs` | Reads the cards and `vocab.json`, writes `ui/data.js` for the explorer and `ui/cards.md`, `ui/cards.json`, `ui/updates.md`, `ui/updates.json`, `ui/matches.md`, `ui/watch.md`, `ui/watch.json`, `ui/topics/<topic>.md` and `ui/llms.txt` for agents and scripts. With `--worker` it also writes the Worker's site and the plugin. No dependencies. |
| `CHANGELOG.md` | Cards added and changed, by date, newest first. The build copies it to `ui/changelog.md` with its `[[links]]` pointing at the explorer. |
| `ui/index.html` | The explorer. List and graph views, search, tag filters, wikilinks, backlinks. |
| `smoke/questions.json` | Questions the guide should be able to answer, each with the cards or unconnected pairs a good answer names. The build checks that the cards exist and that each pair is still unconnected. |
| `.github/workflows/mcp-smoke.md` | An agentic workflow ([gh-aw](https://github.com/github/gh-aw)) run after each publish. A Copilot agent answers the smoke questions using only the Worker's MCP tools, and `smoke/grade.mjs` scores the answers without AI. It fails when an answer names fewer than half its expected cards, or when an `updated` date the agent reports does not match the card. `mcp-smoke.lock.yml` is compiled from it with `gh aw compile`. |
| `.github/workflows/pr-review.md` | An agentic workflow that runs the reviewer skill on pull requests from branches in this repo and posts a comment-only review. A step before the agent runs `review/fetch-sources.mjs`, which saves the text of each page the pull request links to, so the agent can check sources without network access. |
| `skills/<name>/SKILL.md` | The agent skills, written by hand, see [Skills](../README.md#skills). |
| `worker/` | A Cloudflare Worker that serves the guide to agents, see [The Worker](#the-worker). |
| `.claude-plugin/marketplace.json` | Lists the plugin for Codex and Claude Code, see [The plugin](#the-plugin). |
| `notes/metro-mockup.svg` | Hand-laid mockup of a metro-map view, two of seven lines. |
| `private/` | Optional and gitignored. Personal notes per card and cards not yet public, see [Private notes](#private-notes). |
| `LICENSE`, `LICENSE-CC-BY-4.0` | MIT for the code and CC BY 4.0 for the cards and other content, see [Licence](../README.md#licence). |

## Building

```sh
node build.mjs           # cards, plus private/ if present
node build.mjs --public  # cards only
node build.mjs --public --out ../olaservo.github.io/content-provenance  # publish copy for olahungerford.com
```

Then open `ui/index.html` directly in a browser. The generated files are gitignored.

In the explorer, the Graph button draws cards as nodes and `[[links]]` as edges, dotted where the only links between two cards are under Compare, coloured by the first `layer/` tag and sized by link count. Hover to see neighbours, click to open a card, drag to move nodes or pan, scroll to zoom. Tag filters and search fade out cards that do not match.

To use the cards in Obsidian, open this folder as a vault. Dataview can query the frontmatter, for example `TABLE status FROM #layer/attribution`.

The copy on olahungerford.com gets the flat files only. Jekyll renders any Markdown file that starts with frontmatter and stops serving the raw file, so the per-card files live on the Worker.

## The Worker

`node build.mjs --public --worker --site <url>` writes `worker/site/`, `worker/generated/` and `plugin/`, and `worker/` serves the first two from Cloudflare. `plugin/` is gitignored. `wrangler dev` and `wrangler deploy` run that build first, so the Worker never serves a build that includes `private/`. The Worker has Cloudflare's Workers Logs turned on, which record requests.

```sh
cd worker
npm install
npx wrangler dev      # http://127.0.0.1:8787
npx wrangler deploy
```

The files under `skills/` contain `{{site}}` and `{{repo}}`, which the `--worker` build replaces with the site and repository URLs.

## The plugin

The plugin holds the skills and the MCP endpoint in the [Agent Plugins](https://agent-plugins.org/) 1.0.0 layout: a root `plugin.json`, an `mcp.json` and a `skills/` folder. The same folder carries `.claude-plugin/plugin.json` and `.mcp.json`, which Claude Code reads. The published copy is the `plugin` branch, and `.claude-plugin/marketplace.json` on `main` points at that branch.

The reader skill in the plugin carries the cards as they were at the last publish. The MCP tools read the Worker's copy. The plugin's version is the newest date in the cards or the changelog, then the number of commits on `main`, written as `2026.11.17+19`. Codex and Claude Code keep an installed copy until that string changes.

## Client checks

- 2026-11-17: Codex CLI 0.169.0 and Claude Code 2.1.326 each installed the plugin from GitHub and listed it at its version with its MCP server. Claude Code in headless mode answered one question from `smoke/questions.json` through the MCP tools and, with those tools blocked, a second through the reader skill and its references. Codex in `codex exec` answered one. It read the reader skill's `SKILL.md` and `references/index.md` from its installed copy and called three of the MCP tools.
- 2026-11-16: the MCP endpoint answered requests on protocol versions 2026-07-28 and 2025-11-25 from a script, and Claude Code 2.1.325 in headless mode answered the questions in `smoke/questions.json` from the tools.
- No client with the Skills extension has been tried against the endpoint yet.

## Private notes

`private/` is gitignored, so it can hold a separate repository. `private/<id>.private.md` is a personal note for a card, with one property, `card: "[[id]]"`, and free sections such as `## Contacts` and `## Notes`. Naming it `<id>.private.md` keeps `[[id]]` resolving to the card in Obsidian. `private/cards/<id>.md` holds cards that are not public yet, in the same format. A build without `--public` includes both and turns on a private-notes toggle in the explorer. `--public` ignores the folder, and `--out` refuses to run without `--public`, so nothing in it reaches the site. A card anywhere can also carry `publish: false`; the `--public` build leaves it out and removes sentences in other cards that link to it.

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
| `.github/workflows/feed-watch.md` | An agentic workflow run each Tuesday, see [Feed watch](#feed-watch). |
| `review/fetch-feeds.mjs` | Fetches the feeds in `watch.json` and saves the posts newer than a date that no card cites, with each post's page text. `review/fetch-text.mjs` holds the fetch code it shares with `fetch-sources.mjs`. |
| `.github/workflows/weekly-release.yml` | Cuts an alpha pre-release each Monday, see [Releases](#releases). `.github/release/notes.mjs` writes its notes. |
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

In the explorer, the Graph button draws cards as nodes and `[[links]]` as edges, dotted where the only links between two cards are under Compare, coloured by the first `layer/` tag and sized by the number of solid edges. Hover to see neighbours, click to open a card, drag to move nodes or pan, scroll to zoom. Tag filters and search fade out cards that do not match.

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

The plugin holds the MCP endpoint in the [Agent Plugins](https://agent-plugins.org/) 1.0.0 layout: a root `plugin.json` and an `mcp.json`. It carries no skills. The endpoint serves them with the Skills over MCP extension, and as `skill://` resources to clients without it. The same folder carries `.claude-plugin/plugin.json` and `.mcp.json`, which Claude Code reads. The published copy is the `plugin` branch, and `.claude-plugin/marketplace.json` on `main` points at that branch.

The plugin's version is the newest date in the cards or the changelog, then the number of commits on `main`, written as `2026.11.17+19`. Codex and Claude Code keep an installed copy until that string changes.

## Releases

The `weekly-release` workflow runs each Monday at 16:00 UTC and can be started by hand. When `main` has changed since the last release, it builds with `--public` and creates a GitHub pre-release tagged `vYYYY-MM-DD-alpha`. The notes open with the alpha caveat, give the card count and the plugin version, and copy the changelog sections dated after the previous tag. `cards.json` and `cards.md` are attached. Releases are pre-releases while the guide is in alpha, so none shows as Latest. The plugin keeps its own version, which changes on every publish.

## Feed watch

The `feed-watch` workflow runs each Tuesday and can be started by hand. A step before the agent runs `review/fetch-feeds.mjs` from three days before the last run whose agent finished, or from 14 days back. A manual run can set the start date with `gh workflow run feed-watch.lock.yml -f since=YYYY-MM-DD`. The agent runs on Claude Opus 5.5 through Copilot, set by `engine.model`, and has no network access. It reads the saved posts and edits only the cards whose own feed, or whose parent's feed, carried a post. It opens a draft pull request labelled `feed-watch`, and gh-aw refuses any file outside `cards/`. The description holds the changelog lines to add under the merge date, and lists posts from sources with no card under `## Not done`. The run summary lists every post the step found. The workflow does not run while a `feed-watch` pull request is open.

gh-aw replaces links in the description with `(redacted)` unless their host is in `safe-outputs.allowed-domains` in `feed-watch.md`. The list holds the hosts of the watch list's news and feed URLs. `node build.mjs` warns when one is missing. Add the host and recompile with `gh aw compile feed-watch`.

The pull request is opened with `GITHUB_TOKEN`, so `build` and `pr-review` do not run when it opens. Marking it ready for review starts `pr-review`, and a push from the maintainer starts `build`. To have them run on open, add a `GH_AW_CI_TRIGGER_TOKEN` secret, see [Triggering CI](https://github.github.com/gh-aw/reference/triggering-ci/).

To read the posts locally, run `node build.mjs --public`, then `node review/fetch-feeds.mjs <YYYY-MM-DD> feeds`. `feeds/` is gitignored.

## Client checks

- 2026-11-23: from a script, the MCP endpoint listed the four skills as `skill://` resources and returned the reader skill's `SKILL.md`, and answered tool calls on protocol versions 2025-11-25 and 2026-07-28. Claude Code updated the installed plugin to 2026.11.23+48 and answered a question through the reader skill and its references.
- 2026-11-17: Codex CLI 0.169.0 and Claude Code 2.1.326 each installed the plugin from GitHub and listed it at its version with its MCP server. Claude Code in headless mode answered one question from `smoke/questions.json` through the MCP tools and, with those tools blocked, a second through the reader skill and its references. Codex in `codex exec` answered one. It read the reader skill's `SKILL.md` and `references/index.md` from its installed copy and called three of the MCP tools.
- 2026-11-16: the MCP endpoint answered requests on protocol versions 2026-07-28 and 2025-11-25 from a script, and Claude Code 2.1.325 in headless mode answered the questions in `smoke/questions.json` from the tools.
- No client with the Skills extension has been tried against the endpoint yet.

## Private notes

`private/` is gitignored, so it can hold a separate repository. `private/<id>.private.md` is a personal note for a card, with one property, `card: "[[id]]"`, and free sections such as `## Contacts` and `## Notes`. Naming it `<id>.private.md` keeps `[[id]]` resolving to the card in Obsidian. `private/cards/<id>.md` holds cards that are not public yet, in the same format. A build without `--public` includes both and turns on a private-notes toggle in the explorer. `--public` ignores the folder, and `--out` refuses to run without `--public`, so nothing in it reaches the site. A card anywhere can also carry `publish: false`; the `--public` build leaves it out and removes sentences in other cards that link to it.

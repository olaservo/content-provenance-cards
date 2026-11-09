# Content Provenance, Access and Attribution

Cards for the standards orgs, working groups, specs and proposals that decide where content came from (provenance), what may be done with it (access, preferences, licensing, payment), and whether its source gets credited (attribution), and where the Model Context Protocol fits among them. One markdown file per card, Obsidian-compatible, with a small static explorer and plain Markdown and JSON copies for agents.

Browse it at https://www.olahungerford.com/content-provenance/. The same cards are at [cards.md](https://www.olahungerford.com/content-provenance/cards.md) and [cards.json](https://www.olahungerford.com/content-provenance/cards.json).

These are one person's working notes. Status lines carry the dates the sources gave, so check upstream before relying on one. Corrections and new cards are welcome as issues or pull requests.

## Layout

| Path | What |
|---|---|
| `cards/<id>.md` | One card per org, group, spec or proposal. The filename is the id used in `[[links]]`. |
| `vocab.json` | The layer and stage definitions shown in the explorer intro and in the agent files, plus display labels for tags whose id does not read well. |
| `build.mjs` | Reads the cards and `vocab.json`, writes `ui/data.js` for the explorer and `ui/cards.md`, `ui/cards.json` and `ui/llms.txt` for agents and scripts. No dependencies. |
| `ui/index.html` | The explorer. List and graph views, search, tag filters, wikilinks, backlinks. |
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
```

Required: `name`, `type`, `tags`, and a `## Topics` section. Each topic bullet starts with a bold label, then a colon, then the problem it solves. Everything else is optional. Lists use the inline `[a, b]` form, which is what `build.mjs` parses. Inline `#tags` in the body are also picked up.

`participate` is where a reader can take part, as one or more markdown links in a quoted string. Use the effort's own public venue (issue tracker, mailing list, join page), not a contact person. Leave it out when there is no public venue.

`type` is one of `organization`, `working-group`, `interest-group`, `community-group`, `specification`, `proposal`, `project`, `regulation`. Tags are nested Obsidian tags:

- `type/...` mirrors `type` so it shows in the tag pane.
- `layer/provenance`, `layer/access`, `layer/licensing`, `layer/attribution`, `layer/payments`, `layer/identity`, `layer/governance`.
- `stage/at-rest`, `stage/in-transit`, `stage/boundary`, `stage/after-delivery`, `stage/trust`: where a card sits on the path content takes through an agent, from the Attribution by Design talk (which calls them stations), used only where a card clearly sits at one. Trust is the exception: it is the question of who may sign or report, which every other stage depends on.
- `venue/mcp` for MCP threads and groups, `topic/skills` for skills work.

## Using it

```sh
node build.mjs           # cards, plus private/ if present
node build.mjs --public  # cards only
node build.mjs --public --out ../olaservo.github.io/content-provenance  # publish copy for olahungerford.com
```

Then open `ui/index.html` directly in a browser. The generated files are gitignored. `cards.md` is one Markdown file with the vocabularies first and a section per card, wikilinks resolved to links within the file. `cards.json` is the same cards as structured data under `cards`, with the vocabularies under `vocab`. `llms.txt` describes both for an agent that lands on the section. The Graph button draws cards as nodes and `[[links]]` as edges, coloured by the first `layer/` tag and sized by link count: hover to see neighbours, click to open a card, drag to move nodes or pan, scroll to zoom. Tag filters and search fade out cards that do not match. To use it in Obsidian, open this folder as a vault; Dataview can query the frontmatter, for example `TABLE status FROM #layer/attribution`.

## Adding a card

Copy an existing card, rename it to the new id, and fill in the fields. Run `node build.mjs`; it warns about `[[links]]` that point at no card.

## Private notes

`private/` is gitignored, so it can hold a separate repository. `private/<id>.private.md` is a personal note for a card, with one property, `card: "[[id]]"`, and free sections such as `## Contacts` and `## Notes`. Naming it `<id>.private.md` keeps `[[id]]` resolving to the card in Obsidian. `private/cards/<id>.md` holds cards that are not public yet, in the same format. A build without `--public` includes both and turns on a private-notes toggle in the explorer. `--public` ignores the folder, and `--out` refuses to run without `--public`, so nothing in it reaches the site. A card anywhere can also carry `publish: false`; the `--public` build leaves it out and removes sentences in other cards that link to it.

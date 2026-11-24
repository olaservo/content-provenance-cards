# Contributing

Corrections and new cards are welcome as [issues](https://github.com/olaservo/content-provenance-cards/issues) or as pull requests from a fork. A pull request from a branch in this repo gets a review from the `pr-review` workflow, which checks the change against the rules below and its sources. An agent with the plugin installed can use the `content-provenance-field-guide-contributor` skill to prepare a pull request, or `content-provenance-field-guide-feedback` to file an issue.

## Adding a card

A card is about content that AI systems read, train on, act on or pass along. Its tags name at least one layer (provenance, access, licensing, attribution, payments, identity or governance, defined under `layers` in `vocab.json`), and its summary says what the effort does on that layer. A card is for something other people can adopt, join or must follow, such as a published spec or draft, a registry, a licence, a certification, a group that is writing one of these, or a law or ruling. A product feature that implements a standard goes under that standard's In use section. A company gets a card when it publishes a spec or an open implementation.

An effort in the MCP project qualifies the same way, or when it is the place in MCP where work on a layer happens, such as a group whose scope covers it or an extension point where a check can run. Its summary names the layer, and the card links or compares at least one card outside MCP on that layer. An effort named after MCP but outside the MCP project takes the same test as any other card. An effort that does not qualify yet goes on the [watch list](#watch-list).

Copy an existing card, rename it to the new id, and fill in the fields. Run `node build.mjs`; it warns about `[[links]]` that point at no card. Add a line to `CHANGELOG.md` under the day's date for a new card or a change a reader would want to know about.

When something happens to an effort that already has a card, change its `status`, set `updated`, and add a History bullet dated when it happened. Set `updated` on any edit to a card, frontmatter included. The build warns when a card's newest History date is later than every date in its status, which usually means the status was not updated. The changelog records edits to the guide. History records what happened to the efforts the cards describe. In use lists what is released or running now, so a launch can appear in both: the dated event in History, the current state with its link in In use.

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
contribute: "[membership](https://c2pa.org/membership/), [spec issues](https://github.com/c2pa-org/specifications/issues)"
discussion: "[mailing list](https://example.org/list)"
meetings: "[meeting calendar](https://example.org/calendar)"
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

Required: `name`, `type`, `tags`, and a `## Topics` section. Everything else is optional. Lists use the inline `[a, b]` form, which is what `build.mjs` parses. Inline `#tags` in the body are also picked up.

- Topics: each bullet starts with a bold label, then a colon, then the problem it solves.
- `[[link]]`: a link to another card says a primary source connects the two. The effort's own material names the other, or a court, regulator or standards body does.
- Compare: a comparison that only this guide makes goes here, and the explorer draws it as a dotted line.
- In use: each bullet names something a reader can use or observe today, such as a released version, a live service, or a license or requirement in effect. It gives the date of the release or of the last check, and a link. A registry kept by the effort is a better link than a list of names. Commitments, pilots and open pull requests belong in `status`. Remove a bullet when it stops being true.
- History: each bullet starts with the date the event happened, as `YYYY`, `YYYY-MM` or `YYYY-MM-DD`, then a colon. The build collects these from every card into `updates.md` and `updates.json`, and warns about a bullet with no date.
- `contribute`, `discussion` and `meetings`: the public places to take part, each as one or more markdown links in a quoted string. `contribute` is how to work on the effort itself: its issue tracker or specification repository, or the membership, join page or committee you have to be part of before you can contribute. `discussion` is where people talk about the effort in public: a chat space such as Zulip, Discord or Slack, a forum, a mailing list or GitHub Discussions. `meetings` is a public calendar of the effort's meetings, or its own page that lists open calls and how to join them. Use only venues the effort or its parent names on its own pages, never a contact person or a social media account. A page about adopting, licensing or signing on to an effort belongs in `## In use` or `status`. Leave a field out when there is no public venue. The definitions are under `participation` in `vocab.json`, and the explorer and agent files show them. The build still reads the old name `participate` as `contribute` and warns about it.
- `news` and `feed`: `news` is the page where the effort posts its blog or announcements, and `feed` is that page's RSS, Atom or JSON feed. Each takes one URL or an inline list. Use the effort's own page, not a social media account. For a specification that lives in a repository, the releases page and its `releases.atom` count. A card whose news appears only on its parent's blog leaves both out, and the parent's card carries them. See [Watch list](#watch-list).

`type` is one of `organization`, `working-group`, `interest-group`, `community-group`, `specification`, `proposal`, `project`, `regulation`. Tags are nested Obsidian tags:

- `type/...` mirrors `type` so it shows in the tag pane.
- `layer/provenance`, `layer/access`, `layer/licensing`, `layer/attribution`, `layer/payments`, `layer/identity`, `layer/governance`.
- `stage/at-rest`, `stage/in-transit`, `stage/boundary`, `stage/after-delivery`, `stage/trust`: where a card sits on the path content takes through an agent, from the Attribution by Design talk (which calls them stations), used only where a card clearly sits at one. Trust is the exception: it is the question of who may sign or report, which every other stage depends on.
- `medium/text`, `medium/image`, `medium/audio`, `medium/video`, `medium/code`, `medium/data`: the kind of content an effort is about, used only where its own material names the medium. A card with no medium tag is media-neutral.
- `venue/mcp` for MCP threads and groups.
- `topic/skills`, `topic/discovery`, `topic/lineage`, `topic/quality`: a subject that cards on different layers share. Each topic has a definition under `topics` in `vocab.json`, and the build warns about a `topic/` tag that has none.

## Watch list

The build collects every card's `news` and `feed` into `watch.md` and `watch.json`, and adds the entries in `watchlist.json`. That file is for sources with no card: a blog that covers the field and belongs to no single effort, or an effort that has not earned a card yet. When one of them gets a card, move its `news` and `feed` to the card. The build warns when an id is in both places.

`watch.json` has one entry per source under `sources`, each with `id`, `name`, `news` and `feed` as lists, and `card`, which is the card's id or `null`. It is the list a feed watcher reads. Fetching the feeds and analysing the posts happen outside this repo.

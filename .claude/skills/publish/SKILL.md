---
name: publish
description: Maintainer steps to ship field guide changes end to end. Opens and merges the cards repo PR, rebuilds the Jekyll copy in olaservo.github.io through its own PR, deploys the Cloudflare Worker and pushes the plugin branch, with a private-notes check before each publish. Use when the maintainer asks to publish, ship or deploy the guide.
disable-model-invocation: true
---

# Publish the field guide

A change goes to four places, in this order:

1. `main` in this repo.
2. The Jekyll copy in `olaservo/olaservo.github.io` under `content-provenance/`, served at https://www.olahungerford.com/content-provenance/.
3. The Worker at https://content-provenance-field-guide.olahungerford.workers.dev.
4. The `plugin` branch in this repo, which `.claude-plugin/marketplace.json` points at.

Running this skill is the request to open and merge both PRs, deploy the Worker and push the plugin branch. If the request names a narrower scope, such as "open the PR" or "site only", do that part and stop. Stop and report when a check fails. Do not work around it.

## 1. Cards repo

1. Work on a branch off `main`. Run `git fetch` and confirm the branch contains `origin/main`.
2. Run `node build.mjs`. It must print no warnings and end the smoke line with `0 problems`. Note the card count from `node build.mjs --public`.
3. `CHANGELOG.md` needs a bullet under today's date for each change a reader would want to know about.
4. Commit, push the branch and open a PR. Follow the last merged PR for the body (`gh pr list --state merged --limit 1 --json body`): a one-line summary, then `## Cards` or `## Changes`, `## Checked`, `## Not done` and `## If asked`.
5. Squash-merge, delete the branch, check out `main` and pull. Note the short hash of the merge commit.

## 2. Site copy

1. In `../olaservo.github.io`, check out `master`, pull, and create a branch named `content-provenance-<slug>`.
2. From this repo on the merged `main`, run `node build.mjs --public --out ../olaservo.github.io/content-provenance`.
3. Run `bash .claude/skills/publish/check-private.sh ../olaservo.github.io/content-provenance`. It must exit 0.
4. In the site repo, commit `content-provenance/` as "Rebuild content-provenance explorer: <what changed>", push and open a PR. The body names the cards repo commit, the changes a reader will see, the files that changed and the result of the private-notes check. The last merged rebuild PR shows the shape.
5. Merge with a merge commit and delete the branch. The `jekyll.yml` workflow publishes the site.
6. When the workflow finishes, fetch https://www.olahungerford.com/content-provenance/cards.json and confirm the card count and `as_of` match the build.

## 3. Worker

1. From `worker/`, run the `build.command` in `wrangler.jsonc`. It is the same build `wrangler deploy` runs. It also writes `plugin/` in the repo root.
2. Run `bash ../.claude/skills/publish/check-private.sh site generated ../plugin`. It must exit 0.
3. Run `npx wrangler deploy`.
4. Fetch `index.md` from the Worker and confirm the card count. If cards were added, fetch one of them at `cards/<id>.md`.

## 4. Plugin

1. Use the `plugin/` folder from step 3, after its private-notes check passed. Do not rebuild in between.
2. From the repo root, run `bash .claude/skills/publish/push-plugin.sh`. It commits `plugin/` to the `plugin` branch with the version and the `main` commit in the message, and pushes it. It prints a line and stops when the branch already matches.
3. Run `git ls-remote origin plugin` and confirm the branch moved.

The version in `plugin/plugin.json` is the newest date in the cards or the changelog. A second publish on the same day keeps the same version.

## 5. Afterwards

- Run `node build.mjs` in this repo so the local explorer has the private notes again.
- Report the two PR links, the merge commits, the Worker version, the plugin version and branch commit, what was verified and what was not.

## The private-notes check

`check-private.sh` looks in the folders it is given for every line of 30 or more characters from `private/*.md` and `private/cards/*.md`, and for each private card id. It exits 1 and lists the files when it finds one. Run it as its own step and read the result before the next command. Do not chain it to a push or a deploy.

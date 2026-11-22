---
description: Review a pull request against the card rules in the README, using the reviewer skill, and post the findings as a pull request review.
on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]
    paths: ["cards/**", "CHANGELOG.md", "vocab.json", "watchlist.json", "smoke/questions.json"]
permissions:
  contents: read
  pull-requests: read
engine:
  id: copilot
  copilot-sdk: true
network:
  allowed:
    - defaults
    - node
tools:
  github:
    toolsets: [pull_requests, repos]
  bash: ["cat", "ls", "node build.mjs", "git diff:*", "git log:*"]
safe-outputs:
  create-pull-request-review-comment:
    max: 20
  submit-pull-request-review:
    max: 1
    allowed-events: [COMMENT]
  noop:
    report-as-issue: false
  report-failure-as-issue: false
timeout-minutes: 20
max-ai-credits: 500
steps:
  - name: Check the links the pull request adds
    env:
      BASE: ${{ github.event.pull_request.base.sha }}
    run: |
      git fetch --no-tags --depth=1 origin "$BASE"
      git diff "$BASE" HEAD -- cards CHANGELOG.md         | grep '^+' | grep -oE 'https?://[^] )>"`]+' | sed 's/[.,;:]$//' | sort -u > /tmp/links.txt || true
      while read -r url; do
        code=$(curl -s -o /dev/null -L --max-time 20 -w '%{http_code}' -A 'field-guide-pr-review' "$url" || echo 000)
        echo "$code $url"
      done < /tmp/links.txt > "$GITHUB_WORKSPACE/link-check.txt"
---

# Review a field guide pull request

You are reviewing pull request #${{ github.event.pull_request.number }} in ${{ github.repository }}. The pull request branch is checked out in the workspace.

Read `skills/content-provenance-field-guide-reviewer/SKILL.md` with `cat` and follow it. Get the changed files with `git diff ${{ github.event.pull_request.base.sha }}...HEAD` or the GitHub tools. `link-check.txt` in the workspace has the HTTP status of each link the pull request adds, one per line. A status other than 2xx is a finding, except 403 and 429, which some sites return to scripts: report those as unchecked. You cannot fetch pages, so do not say a source supports or contradicts a claim. Note any claim that has no link. Run `node build.mjs` once and include any warning it prints.

Post each finding as a review comment on the line it concerns with `create_pull_request_review_comment`. Then call `submit_pull_request_review` once with event `COMMENT` and a body that lists the links that were not checked and any finding that has no single line. If there are no findings, submit the review with a one-line body saying so.

Do not approve or request changes. Do not post anything other than this one review.

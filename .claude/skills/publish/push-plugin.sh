#!/usr/bin/env bash
# Commits the built plugin/ folder to the `plugin` branch and pushes it.
# The branch holds only the generated plugin, which is what .claude-plugin/marketplace.json points at.
# usage: push-plugin.sh [remote]
set -euo pipefail

root="$(cd "$(dirname "$0")/../../.." && pwd)"
remote="${1:-origin}"
[ -f "$root/plugin/plugin.json" ] || { echo "no plugin/ folder, run the Worker build first" >&2; exit 2; }
version="$(sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' "$root/plugin/plugin.json" | head -1)"
from="$(git -C "$root" rev-parse --short HEAD)"

tmp="$(mktemp -d)"
trap 'git -C "$root" worktree remove --force "$tmp" 2>/dev/null || true' EXIT
if git -C "$root" fetch -q "$remote" plugin 2>/dev/null; then
  git -C "$root" worktree add -q -B plugin "$tmp" FETCH_HEAD
else
  git -C "$root" worktree add -q --orphan -B plugin "$tmp"
fi

git -C "$tmp" rm -rq --ignore-unmatch .
cp -r "$root/plugin/." "$tmp/"
git -C "$tmp" -c core.safecrlf=false add -A
if git -C "$tmp" diff --cached --quiet; then
  echo "plugin branch already matches plugin/ (version $version)"
  exit 0
fi
git -C "$tmp" commit -q -m "Plugin $version from $from"
git -C "$tmp" push -q "$remote" plugin
echo "pushed plugin $version from $from to $remote/plugin"

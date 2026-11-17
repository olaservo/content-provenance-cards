#!/usr/bin/env bash
# Fails if a build output folder contains text from private/.
# Looks for every line of 30 or more characters in private/*.md and private/cards/*.md, and for each private card id.
# usage: check-private.sh <output folder>...
set -euo pipefail

root="$(cd "$(dirname "$0")/../../.." && pwd)"
[ $# -gt 0 ] || { echo "usage: check-private.sh <output folder>..." >&2; exit 2; }
for d in "$@"; do [ -e "$d" ] || { echo "no such folder: $d" >&2; exit 2; }; done
[ -d "$root/private" ] || { echo "no private/ folder, nothing to look for"; exit 0; }

pat="$(mktemp)"
trap 'rm -f "$pat"' EXIT
find "$root/private" -maxdepth 2 -name '*.md' -exec cat {} + | tr -d '\r' | sed 's/^[[:space:]]*//; s/[[:space:]]*$//' | awk 'length >= 30' | sort -u > "$pat"
for f in "$root"/private/cards/*.md; do [ -e "$f" ] && basename "$f" .md >> "$pat"; done
[ -s "$pat" ] || { echo "private/ has no text to look for"; exit 0; }

hits="$(grep -rlF -f "$pat" "$@" || true)"
if [ -n "$hits" ]; then
  echo "private text found in:"
  echo "$hits"
  exit 1
fi
echo "0 hits for $(wc -l < "$pat" | tr -d ' ') private lines and ids in: $*"

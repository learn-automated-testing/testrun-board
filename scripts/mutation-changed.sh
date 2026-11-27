#!/usr/bin/env bash
# Mutation testing on the source files changed against a base branch (default: origin/main).
# Usage: npm run mutation:changed [-- <base>]
set -euo pipefail
base="${1:-origin/main}"
files=$(git diff --name-only "$base"...HEAD -- 'src/lib/*.ts' | grep -v 'src/lib/types.ts' || true)
if [ -z "$files" ]; then
  echo "No changed files in src/lib since $base, nothing to mutate."
  exit 0
fi
echo "Mutating: $files"
npx stryker run --mutate "$(echo "$files" | paste -sd, -)"

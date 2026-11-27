#!/usr/bin/env bash
# Agent policy checks (lesson 17). Run in CI on pull requests and locally:
#   bash scripts/agent-policy.sh [base]          (default base: origin/main)
# Set ALLOW_NEW_DEPS=true when the PR has the "new-dependency" label.
set -euo pipefail
base="${1:-origin/main}"
fail=0
changed=$(git diff --name-only "$base"...HEAD)

# 1. Generated code must match the contract
npm run --silent generate:api >/dev/null
if ! git diff --quiet -- src/generated; then
  echo "✗ src/generated/ does not match docs/api.yaml. Run npm run generate:api and commit the result."
  git checkout -- src/generated
  fail=1
else
  echo "✓ generated types match docs/api.yaml"
fi

# 2. No new dependencies without approval
if echo "$changed" | grep -qx 'package.json'; then
  added=$(git diff "$base"...HEAD -- package.json | grep -E '^\+\s+"[^"]+": "\^?[0-9~]' || true)
  if [ -n "$added" ] && [ "${ALLOW_NEW_DEPS:-false}" != "true" ]; then
    echo "✗ dependencies changed without the new-dependency label:"; echo "$added"; fail=1
  else
    echo "✓ dependencies"
  fi
else
  echo "✓ dependencies unchanged"
fi

# 3. No focused or skipped tests added
if git diff "$base"...HEAD -- tests | grep -E '^\+' | grep -Eq '\.(only|skip)\('; then
  echo "✗ .only or .skip added in tests"; fail=1
else
  echo "✓ no focused or skipped tests added"
fi

exit $fail

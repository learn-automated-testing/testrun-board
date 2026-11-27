# TestRun Board

Dashboard that shows the test runs of the latest CI pipeline run.
React 19 + Vite + TypeScript. No real backend: the API is mocked with MSW.

This file holds the instructions for every coding agent (Claude Code, OpenCode, Pi, ...).
Claude Code loads it through the `@AGENTS.md` import in CLAUDE.md.

## Commands
- `npm run dev`            start on http://localhost:5173 (API served by MSW)
- `npm test`               unit + component tests (Vitest)
- `npm run e2e`            Playwright end-to-end tests (starts the dev server)
- `npm run check`          lint + typecheck + test. Run before you say you are done
- `npm run mutation`       mutation testing with Stryker on src/lib
- `npm run generate:api`   regenerate src/generated/api-types.ts from docs/api.yaml

## Architecture
- `src/lib/`        business logic as pure functions, each with unit tests in `tests/lib/`
- `src/lib/api.ts`  the only place that calls fetch(); one typed function per endpoint
- `src/components/` presentational components, they never fetch data
- `src/pages/`      pages load data via src/lib/api.ts and handle loading, error and empty states
- `src/generated/`  generated from docs/api.yaml, never edit by hand
- `tests/mocks/`    MSW handlers and fixtures, shared by Vitest and the dev server
- `tests/e2e/`      Playwright tests, role-based locators only
- `docs/specs/`     feature specs; `docs/api.yaml` is the API contract

## Rules
- Write or update a test for every behaviour change
- Fix the code, not the test. Never use .only or .skip, never loosen an assertion to make a test pass.
  If a test is really wrong, change it and explain why in your summary
- Never edit files in src/generated/; change docs/api.yaml and run `npm run generate:api`
- Ask before adding a dependency
- Do not refactor code that is unrelated to the task; mention it as a suggestion instead
- For features larger than one file, write or ask for a spec in docs/specs/ first (template: docs/specs/_template.md)

## Definition of done
- `npm run check` is green
- New behaviour has tests that fail without the change
- `git diff --stat` only contains files that belong to the task
- Your summary lists any decision you made that was not asked for

## Communication
- Lead with the outcome, then the changed files, then open questions
- Keep answers under 15 lines unless asked for detail

## Writing in this repo
- Commit messages: imperative mood, max 72 characters, e.g. "Add status filter to runs page"
- UI text: English (UK), sentence case for buttons ("Clear filters")
- Say "test run", never "execution" or "job", in UI and docs

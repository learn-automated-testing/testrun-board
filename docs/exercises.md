# Exercises

Work on a branch per exercise (`git switch -c my/lesson-02`) or in a separate worktree (lesson 14).
Each exercise ends with `npm run check` green.

| Lesson | Exercise | Starting point |
|---|---|---|
| 1 | Ask the agent to explain the project and run the tests. Compare its answer with AGENTS.md | `main` |
| 2 | Build the status filter | `docs/specs/status-filter.md` · solution: `solution/lesson-02-status-filter` |
| 3 | Remove the import from CLAUDE.md, ask "what must you do before you are done?" in a new session, then restore it and ask again | `CLAUDE.md` |
| 4 | Plan the pass-rate column in plan mode; review the plan before any edit | `docs/specs/pass-rate-column.md` |
| 5 | Ask for three commit messages with and without the "Writing in this repo" section | `AGENTS.md` |
| 6 | Give the agent a 20-minute task with a definition of done; check which permission prompts appear | `.claude/settings.json` |
| 8 | Add a step to the add-api-endpoint skill and observe the change in behaviour | `.claude/skills/` |
| 9 | Let the agent verify the runs page through Playwright MCP, then codify it as an e2e test | `.mcp.json` |
| 12 | Break `formatDuration`, ask the agent to "make the tests pass", review with the checklist | `docs/review-checklist.md` |
| 13 | Write tests first for a `passRate()` function, confirm red, then implement | `tests/lib/` |
| 14 | Build the history API and the panel in two worktrees, in parallel | `docs/specs/flaky-history.md` |
| 15 | Try to edit `src/generated/api-types.ts` with the agent and read the hook message | `.claude/hooks/` |
| 16 | Lab: deliver the pass-rate column with all gates green | `docs/specs/pass-rate-column.md` |
| 17 | Open a PR and see the four CI jobs; add a dependency without the label and watch the policy fail | `.github/workflows/checks.yml` |
| 18 | Run the lesson 13 task on a local model and compare | - |
| 21 | Run `npm run mutation`, look at the surviving mutants and add tests that kill them | `stryker.config.json` |
| 22 | Final project: the flaky history panel, end to end | `docs/specs/flaky-history.md` |

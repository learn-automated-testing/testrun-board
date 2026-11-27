# Spec: Flaky history panel

Course exercise: lesson 20 (Spec-driven development) and lesson 22 (final project).

## Goal
Testers can see why a test is marked flaky without leaving the board.

## Acceptance criteria
1. Clicking a Flaky status pill opens a panel with the last 20 runs of that test
2. Each run is a dot: green passed, red failed, with the date in its accessible name ("passed on 26 Nov 2026")
3. The panel shows the pass rate (one decimal) and the date of the last failure
4. Empty history shows "No runs recorded yet"
5. The panel closes with Esc and with the close button, and focus returns to the pill

## Out of scope
- Retrying a run from the panel
- Histories longer than 20 runs

## Done when
- Unit tests cover criteria 3 and 4, e2e covers 1, 2 and 5
- `npm run check` is green and the PR has one human approval

## Open questions
- Endpoint shape: `GET /api/tests/{file}/history?limit=20`? Agree it in docs/api.yaml first

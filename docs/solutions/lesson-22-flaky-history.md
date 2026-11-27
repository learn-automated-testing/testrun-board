# Solution: lesson 22, final project: flaky history panel

Spec: `docs/specs/flaky-history.md`. Branch: `solution/lesson-22-flaky-history`, built on `solution/lesson-16-pass-rate-column`
(it reuses `GET /api/history`, `passRate()` and `formatPassRate()`).

## Open question from the spec, and the answer

> Endpoint shape: `GET /api/tests/{file}/history?limit=20`?

No new endpoint was needed: `GET /api/history?limit=20` from lesson 16 already returns the runs per file. One request for the
whole table is simpler than one request per panel, and the data is already loaded when the panel opens.

## Acceptance criteria mapped to tests

| # | Criterion | Unit | Component (`tests/history-panel.test.tsx`) | E2E (`tests/e2e/flaky-history.spec.ts`) |
|---|---|---|---|---|
| 1 | Clicking a Flaky pill opens a panel with the last 20 runs | | opens from a flaky pill…; only flaky pills open the history | ✓ |
| 2 | Dots with "passed on 26 Nov 2026" as accessible name | `formatRunDate` | …shows the last 20 runs as dots | ✓ |
| 3 | Pass rate (one decimal) and date of last failure | `passRate`, `formatPassRate`, `lastFailure` | shows the pass rate and the date of the last failure | ✓ (pass rate) |
| 4 | Empty history shows "No runs recorded yet" | `lastFailure([])` | shows "No runs recorded yet" | |
| 5 | Closes with Esc and close button; focus returns to the pill | | closes with Esc…; closes with the close button… | ✓ (Esc) |

## Design decisions

- **The flaky pill becomes a button** only for flaky runs, with the accessible name "flaky, show history of login.spec.ts", so screen reader users know what it does and the tests can find it by role.
- **Dots are `role="img"` with an accessible name**, not colour alone: a test (and a screen reader) can read "failed on 25 Nov 2026".
- **Dates are formatted in UTC** with `Intl.DateTimeFormat('en-GB')`, so the result is the same on every machine and in CI.
- **Focus returns to the pill** after closing, found through `data-history-trigger`, because the table may have re-rendered.

## Demo script (lesson 22)

1. Show the spec and criterion 5, then `tests/history-panel.test.tsx` "closes with Esc and returns focus to the pill", then the code in `RunsPage.tsx` (`closeHistory`), then the green CI run.
2. Show one moment where the agent went wrong and how you caught it (for example a first version that returned focus to `document.body`).
3. Show what you turned into a rule, skill or hook because of this project.

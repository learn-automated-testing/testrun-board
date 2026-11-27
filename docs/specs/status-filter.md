# Spec: Status filter on the runs page

Course exercise: lesson 2 (Build your first feature with an agent).
Solution branch: `solution/lesson-02-status-filter`.

## Goal
Testers can focus on the runs that need attention without scrolling through the whole table.

## Acceptance criteria
1. Above the table there is a "Status" filter with the options All, Passed, Failed and Flaky
2. Each option shows the number of runs with that status, e.g. "Flaky (2)"; All shows the total
3. Selecting an option shows only runs with that status; All shows every run
4. The selected filter is stored in the URL as `?status=flaky`, so the link can be shared
5. An unknown value in the URL (e.g. `?status=foo`) falls back to All
6. When a filter has no runs, the table area shows "No test runs found."

## Out of scope
- Filtering on suite or file name
- Multi-select

## Done when
- Filtering and counting are pure functions in src/lib/runs.ts with unit tests (criteria 2, 3, 5)
- A component test covers selecting a filter and the empty result (criteria 1, 3, 6)
- An e2e test covers selecting Flaky and the URL (criteria 3, 4)
- `npm run check` is green

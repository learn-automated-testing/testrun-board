# Spec: Pass rate column

Course exercise: lesson 16 (Lab: your first quality feature).

## Goal
As a tester I want to see the pass rate of each test over its last 20 runs,
so I can tell a flaky test from a broken one.

## Acceptance criteria
1. The table has a "Pass rate" column after "Status"
2. Pass rate = passed runs / all runs over the last 20 runs, shown as a percentage with one decimal ("85.0%")
3. A test with fewer than 3 runs shows "n/a"
4. Clicking the column header sorts by pass rate, lowest first; clicking again reverses; "n/a" is always last

## Out of scope
- Configuring the window of 20 runs

## Done when
- The calculation is a pure function with unit tests, including rounding and the "fewer than 3" case
- An e2e test covers sorting
- Mutation score on the changed files is at least 75%

## Open questions
- The API does not return history yet: add an endpoint (use the add-api-endpoint skill)

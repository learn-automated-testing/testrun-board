# Solution: lesson 13, test-first with an agent

Exercise: write tests first for a `passRate()` function, confirm they fail for the right reason, then implement.
Branch: `solution/lesson-13-pass-rate-tdd` (starts from `main`).

## Step 1: tests first (prompt)

```text
Write tests for passRate(runs) and formatPassRate(rate) in tests/lib/history.test.ts.
passRate is the share of passed runs over the latest 20 runs (newest first), null with fewer than 3 runs.
formatPassRate shows one decimal ("85.0%") or "n/a". Add a stub in src/lib/history.ts that throws
"Not implemented", run the tests and show me the failures. Do not implement yet.
```

## Step 2: the red run

All six tests fail, and they fail for the right reason: the behaviour does not exist yet (not a typo or import error).

```text
 RUN  v5.1.2 /sessions/rcw-01ltymhgwfh9rt3ufmn9glyn/trb
 ❯ tests/lib/history.test.ts (6 tests | 6 failed) 6ms
   ❯ passRate (4)
     × is the share of passed runs 2ms
     × is 1 when every run passed and 0 when every run failed 0ms
     × is null with fewer than 3 runs 0ms
     × only uses the latest 20 runs (newest first) 0ms
   ❯ formatPassRate (2)
     × shows a percentage with one decimal 0ms
     × shows n/a when there is no pass rate 0ms
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 6 ⎯⎯⎯⎯⎯⎯⎯
 FAIL  tests/lib/history.test.ts > passRate > is the share of passed runs
Error: Not implemented
```

## Step 3: minimal implementation (prompt)

```text
Implement passRate and formatPassRate so the tests pass. Do not modify anything under tests/.
```

## Step 4: the green run

```text
 RUN  v5.1.2 /sessions/rcw-01ltymhgwfh9rt3ufmn9glyn/trb
 ✓ tests/lib/history.test.ts (6 tests) 4ms
 Test Files  1 passed (1)
      Tests  6 passed (6)
   Start at  08:41:54
   Duration  361ms (environment 75%, setup 17%, transform 5%, tests 1%, worker 1%)
```

`git diff` on `tests/` between the red and the green run is empty: the tests were not changed to pass.

## Check that the tests are worth something

Break the code on purpose and run the tests again, for example change `< MIN_RUNS_FOR_PASS_RATE` into `<=`, or `toFixed(1)` into `toFixed(0)`.
A test must fail each time. `npm run mutation:changed -- main` does the same automatically.

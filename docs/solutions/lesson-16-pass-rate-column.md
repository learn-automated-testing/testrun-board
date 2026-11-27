# Solution: lesson 16, lab: your first quality feature

Spec: `docs/specs/pass-rate-column.md`. Branch: `solution/lesson-16-pass-rate-column`, built on `solution/lesson-13-pass-rate-tdd`
(it reuses `passRate()` and `formatPassRate()` from lesson 13).

## Decisions made while building

| Question from the spec | Decision |
|---|---|
| The API has no history | New endpoint `GET /api/history?limit=20`: the latest runs per test file, newest first. Added to `docs/api.yaml` first, then `npm run generate:api` (the add-api-endpoint skill) |
| What if the history call fails? | The table still shows, with "n/a" pass rates. The runs are the main information; history is extra |
| Ties when sorting | Keep the existing order (stable sort) |

## The flow, step by step

1. **Plan mode**: ask for a plan from the spec. Check that logic and tests come before UI, and answer the open question about the endpoint.
2. **Contract**: `docs/api.yaml` gets `/api/history` and the `HistoryEntry` and `TestHistory` schemas; `npm run generate:api` updates `src/generated/`.
3. **Tests first** for `sortByPassRate()` and `passRatesByFile()` in `tests/lib/history.test.ts`: lowest first, highest first, n/a always last, no mutation of the input.
4. **Implementation** in `src/lib/history.ts`, `src/lib/api.ts` (`fetchHistory`), the mock handler and fixture (`tests/mocks/`).
5. **UI**: the "Pass rate" column with a sort button and `aria-sort` in `src/components/RunsTable.tsx`.
6. **Component tests** in `tests/runs-page.test.tsx` and an **e2e test** in `tests/e2e/pass-rate.spec.ts`, verified first through Playwright MCP.
7. **Review**: the `test-reviewer` subagent, then `docs/review-checklist.md`.
8. **Gates**: `npm run check`, `npm run mutation:changed`, `bash scripts/agent-policy.sh`.

## Fixture

`tests/mocks/data.ts` describes each history as a pattern (P passed, F failed, newest first), so you can see the expected pass rate at a glance:

| Test file | Pattern | Pass rate |
|---|---|---|
| profile.spec.ts | `PFPFPPFPPFPPPPFPPPPF` | 70.0% |
| search.spec.ts | `FFFFFPPPPPPPPPPPPPPP` | 75.0% |
| login.spec.ts | `PFPPPPFPPPPPFPPPPPPP` | 85.0% |
| api-orders.test.ts | `PPPPPPPPPPPPPPPPPPPF` | 95.0% |
| checkout.spec.ts, cart-totals.test.ts | all P | 100.0% |
| pricing.test.ts | `PP` | n/a |

## Self-assessment from the lesson

- Every acceptance criterion maps to a test: 1 and 2 (component test), 3 (unit + component), 4 (unit + component + e2e)
- `git diff --stat` against lesson 13 only contains the contract, generated types, history logic, API, mocks, table, page, styles and tests

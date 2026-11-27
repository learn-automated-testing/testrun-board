import type { TestRun } from '../../src/lib/types'

/** Fixture used by the mock API, the unit tests and the e2e tests. */
export const runs: TestRun[] = [
  { id: 'r1', file: 'checkout.spec.ts', suite: 'e2e', status: 'passed', durationMs: 42_000, startedAt: '2026-11-26T09:12:00Z' },
  { id: 'r2', file: 'login.spec.ts', suite: 'e2e', status: 'flaky', durationMs: 63_000, startedAt: '2026-11-26T09:13:00Z' },
  { id: 'r3', file: 'cart-totals.test.ts', suite: 'unit', status: 'passed', durationMs: 800, startedAt: '2026-11-26T09:14:00Z' },
  { id: 'r4', file: 'search.spec.ts', suite: 'e2e', status: 'failed', durationMs: 37_000, startedAt: '2026-11-26T09:15:00Z' },
  { id: 'r5', file: 'api-orders.test.ts', suite: 'api', status: 'passed', durationMs: 6_000, startedAt: '2026-11-26T09:16:00Z' },
  { id: 'r6', file: 'profile.spec.ts', suite: 'e2e', status: 'flaky', durationMs: 55_000, startedAt: '2026-11-26T09:17:00Z' },
  { id: 'r7', file: 'pricing.test.ts', suite: 'unit', status: 'passed', durationMs: 400, startedAt: '2026-11-26T09:18:00Z' },
]

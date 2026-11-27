/** How many of the latest runs count for the pass rate. */
export const HISTORY_WINDOW = 20

/** Fewer runs than this give no meaningful pass rate. */
export const MIN_RUNS_FOR_PASS_RATE = 3

/**
 * Share of passed runs over the latest HISTORY_WINDOW runs (newest first),
 * or null when there are fewer than MIN_RUNS_FOR_PASS_RATE runs.
 */
export function passRate(runs: readonly { status: 'passed' | 'failed' }[]): number | null {
  const window = runs.slice(0, HISTORY_WINDOW)
  if (window.length < MIN_RUNS_FOR_PASS_RATE) return null
  const passed = window.filter((run) => run.status === 'passed').length
  return passed / window.length
}

/** Formats a pass rate as a percentage with one decimal ("85.0%"), or "n/a". */
export function formatPassRate(rate: number | null): string {
  return rate === null ? 'n/a' : `${(rate * 100).toFixed(1)}%`
}

export type SortDirection = 'ascending' | 'descending'

/**
 * Sorts runs by pass rate. Ascending puts the lowest pass rate first.
 * Runs without a pass rate (null or unknown) always come last. Ties keep their order.
 */
export function sortByPassRate<T extends { file: string }>(
  runs: readonly T[],
  rates: Readonly<Record<string, number | null>>,
  direction: SortDirection,
): T[] {
  const sign = direction === 'ascending' ? 1 : -1
  return [...runs].sort((a, b) => {
    const ra = rates[a.file] ?? null
    const rb = rates[b.file] ?? null
    if (ra === null && rb === null) return 0
    if (ra === null) return 1
    if (rb === null) return -1
    return sign * (ra - rb)
  })
}

/** Pass rate per test file. */
export function passRatesByFile(histories: readonly { file: string; runs: readonly { status: 'passed' | 'failed' }[] }[]): Record<string, number | null> {
  return Object.fromEntries(histories.map((h) => [h.file, passRate(h.runs)]))
}

/** Start time of the most recent failed run (runs newest first), or null. */
export function lastFailure(runs: readonly { status: 'passed' | 'failed'; startedAt: string }[]): string | null {
  return runs.slice(0, HISTORY_WINDOW).find((run) => run.status === 'failed')?.startedAt ?? null
}

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

/** Formats an ISO timestamp as a date, e.g. "26 Nov 2026" (UTC). */
export function formatRunDate(iso: string): string {
  return dateFormat.format(new Date(iso))
}

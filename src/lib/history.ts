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

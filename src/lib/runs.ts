import type { RunStatus, TestRun } from './types'

/** Formats a duration for the table: 0.4s, 42s, 1m 03s. */
export function formatDuration(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) {
    throw new RangeError(`Invalid duration: ${ms}`)
  }
  if (ms < 10_000) {
    return `${Math.round(ms / 100) / 10}s`
  }
  const totalSeconds = Math.round(ms / 1000)
  if (totalSeconds < 60) {
    return `${totalSeconds}s`
  }
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}m ${String(seconds).padStart(2, '0')}s`
}

/** Formats an ISO timestamp as HH:MM in UTC, e.g. 09:12. */
export function formatStartTime(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) {
    throw new RangeError(`Invalid timestamp: ${iso}`)
  }
  return date.toISOString().slice(11, 16)
}

/** Returns a new array, oldest run first. Does not mutate the input. */
export function sortByStartedAt(runs: readonly TestRun[]): TestRun[] {
  return [...runs].sort((a, b) => a.startedAt.localeCompare(b.startedAt))
}

export type StatusFilter = 'all' | RunStatus

/** Filter options in display order. */
export const STATUS_FILTERS: readonly StatusFilter[] = ['all', 'passed', 'failed', 'flaky']

/** Reads a filter from a URL value; anything unknown falls back to 'all'. */
export function parseStatusFilter(value: string | null): StatusFilter {
  return STATUS_FILTERS.includes(value as StatusFilter) ? (value as StatusFilter) : 'all'
}

/** Returns the runs with the given status; 'all' returns every run. */
export function filterByStatus(runs: readonly TestRun[], filter: StatusFilter): TestRun[] {
  return filter === 'all' ? [...runs] : runs.filter((run) => run.status === filter)
}

/** Number of runs per filter option; 'all' is the total. */
export function countByStatus(runs: readonly TestRun[]): Record<StatusFilter, number> {
  const counts: Record<StatusFilter, number> = { all: runs.length, passed: 0, failed: 0, flaky: 0 }
  for (const run of runs) counts[run.status] += 1
  return counts
}

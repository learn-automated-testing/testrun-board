import type { TestRun } from './types'

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

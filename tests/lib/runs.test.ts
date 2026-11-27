import { describe, expect, it } from 'vitest'
import {
  countByStatus,
  filterByStatus,
  formatDuration,
  formatStartTime,
  parseStatusFilter,
  sortByStartedAt,
} from '../../src/lib/runs'
import { runs } from '../mocks/data'

describe('formatDuration', () => {
  it('shows tenths of a second below 10 seconds', () => {
    expect(formatDuration(400)).toBe('0.4s')
    expect(formatDuration(6_000)).toBe('6s')
  })

  it('shows whole seconds below a minute', () => {
    expect(formatDuration(42_000)).toBe('42s')
  })

  it('shows minutes and zero-padded seconds from one minute', () => {
    expect(formatDuration(63_000)).toBe('1m 03s')
    expect(formatDuration(600_000)).toBe('10m 00s')
  })

  it('rejects negative and non-finite durations', () => {
    expect(() => formatDuration(-1)).toThrow(RangeError)
    expect(() => formatDuration(Number.NaN)).toThrow(RangeError)
  })
})

describe('formatStartTime', () => {
  it('formats an ISO timestamp as HH:MM in UTC', () => {
    expect(formatStartTime('2026-11-26T09:12:00Z')).toBe('09:12')
  })

  it('rejects an invalid timestamp', () => {
    expect(() => formatStartTime('yesterday')).toThrow(RangeError)
  })
})

describe('sortByStartedAt', () => {
  it('puts the oldest run first without mutating the input', () => {
    const shuffled = [runs[3], runs[0], runs[6]]
    const sorted = sortByStartedAt(shuffled)
    expect(sorted.map((r) => r.id)).toEqual(['r1', 'r4', 'r7'])
    expect(shuffled.map((r) => r.id)).toEqual(['r4', 'r1', 'r7'])
  })
})

describe('filterByStatus', () => {
  it('returns only runs with the selected status', () => {
    expect(filterByStatus(runs, 'flaky').map((r) => r.file)).toEqual(['login.spec.ts', 'profile.spec.ts'])
  })

  it('returns every run for all', () => {
    expect(filterByStatus(runs, 'all')).toHaveLength(7)
  })

  it('returns an empty list when no run has the status', () => {
    expect(filterByStatus(runs.filter((r) => r.status === 'passed'), 'failed')).toEqual([])
  })
})

describe('countByStatus', () => {
  it('counts runs per status with the total under all', () => {
    expect(countByStatus(runs)).toEqual({ all: 7, passed: 4, failed: 1, flaky: 2 })
  })

  it('returns zeros for no runs', () => {
    expect(countByStatus([])).toEqual({ all: 0, passed: 0, failed: 0, flaky: 0 })
  })
})

describe('parseStatusFilter', () => {
  it('accepts every known filter', () => {
    expect(['all', 'passed', 'failed', 'flaky'].map(parseStatusFilter)).toEqual(['all', 'passed', 'failed', 'flaky'])
  })

  it('falls back to all for an unknown or missing value', () => {
    expect(parseStatusFilter('foo')).toBe('all')
    expect(parseStatusFilter(null)).toBe('all')
  })
})

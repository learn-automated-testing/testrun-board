import { describe, expect, it } from 'vitest'
import { formatDuration, formatStartTime, sortByStartedAt } from '../../src/lib/runs'
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

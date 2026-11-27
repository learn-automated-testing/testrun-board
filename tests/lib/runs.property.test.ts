import { describe, expect, it } from 'vitest'
import fc from 'fast-check'
import { formatDuration } from '../../src/lib/runs'

// Property-based tests (lesson 21): invariants over many generated inputs.
describe('formatDuration properties', () => {
  it('always returns a value ending in s', () => {
    fc.assert(
      fc.property(fc.integer({ min: 0, max: 24 * 60 * 60 * 1000 }), (ms) => {
        expect(formatDuration(ms)).toMatch(/s$/)
      }),
    )
  })

  it('never shows 60 or more seconds in the seconds part', () => {
    fc.assert(
      fc.property(fc.integer({ min: 60_000, max: 10 * 60 * 60 * 1000 }), (ms) => {
        const seconds = Number(formatDuration(ms).split(' ')[1].replace('s', ''))
        expect(seconds).toBeLessThan(60)
      }),
    )
  })
})

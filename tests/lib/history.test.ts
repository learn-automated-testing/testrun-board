import { describe, expect, it } from 'vitest'
import { formatPassRate, passRate, passRatesByFile, sortByPassRate } from '../../src/lib/history'
import { history } from '../mocks/data'

const runs = (pattern: string) =>
  [...pattern].map((c) => ({ status: c === 'P' ? ('passed' as const) : ('failed' as const) }))

describe('passRate', () => {
  it('is the share of passed runs', () => {
    expect(passRate(runs('PPPPPPPPPPPPPPPPPFFF'))).toBe(0.85)
  })

  it('is 1 when every run passed and 0 when every run failed', () => {
    expect(passRate(runs('PPP'))).toBe(1)
    expect(passRate(runs('FFF'))).toBe(0)
  })

  it('is null with fewer than 3 runs', () => {
    expect(passRate(runs(''))).toBeNull()
    expect(passRate(runs('P'))).toBeNull()
    expect(passRate(runs('PF'))).toBeNull()
  })

  it('only uses the latest 20 runs (newest first)', () => {
    expect(passRate(runs('PPPPPPPPPPPPPPPPPPPP' + 'FFFFF'))).toBe(1)
  })
})

describe('formatPassRate', () => {
  it('shows a percentage with one decimal', () => {
    expect(formatPassRate(0.85)).toBe('85.0%')
    expect(formatPassRate(2 / 3)).toBe('66.7%')
    expect(formatPassRate(1)).toBe('100.0%')
    expect(formatPassRate(0)).toBe('0.0%')
  })

  it('shows n/a when there is no pass rate', () => {
    expect(formatPassRate(null)).toBe('n/a')
  })
})

describe('sortByPassRate', () => {
  const rows = [{ file: 'a' }, { file: 'b' }, { file: 'c' }, { file: 'd' }, { file: 'e' }]
  const rates = { a: 1, b: 0.7, c: null, d: 0.85, e: 1 }

  it('puts the lowest pass rate first and n/a last when ascending', () => {
    expect(sortByPassRate(rows, rates, 'ascending').map((r) => r.file)).toEqual(['b', 'd', 'a', 'e', 'c'])
  })

  it('puts the highest pass rate first and still n/a last when descending', () => {
    expect(sortByPassRate(rows, rates, 'descending').map((r) => r.file)).toEqual(['a', 'e', 'd', 'b', 'c'])
  })

  it('treats files without history as n/a and does not mutate the input', () => {
    const input = [{ file: 'unknown' }, { file: 'b' }]
    expect(sortByPassRate(input, rates, 'ascending').map((r) => r.file)).toEqual(['b', 'unknown'])
    expect(input.map((r) => r.file)).toEqual(['unknown', 'b'])
  })
})

describe('passRatesByFile', () => {
  it('calculates the pass rate for every test file in the fixture', () => {
    expect(passRatesByFile(history)).toEqual({
      'checkout.spec.ts': 1,
      'login.spec.ts': 0.85,
      'cart-totals.test.ts': 1,
      'search.spec.ts': 0.75,
      'api-orders.test.ts': 0.95,
      'profile.spec.ts': 0.7,
      'pricing.test.ts': null,
    })
  })
})

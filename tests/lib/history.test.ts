import { describe, expect, it } from 'vitest'
import { formatPassRate, passRate } from '../../src/lib/history'

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

import { useEffect, useState } from 'react'
import { fetchHistory, fetchRuns } from '../lib/api'
import { sortByStartedAt } from '../lib/runs'
import { passRatesByFile, sortByPassRate, type SortDirection } from '../lib/history'
import type { TestRun } from '../lib/types'
import { RunsTable } from '../components/RunsTable'

type State =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'loaded'; runs: TestRun[]; passRates: Record<string, number | null> }

export function RunsPage() {
  const [state, setState] = useState<State>({ kind: 'loading' })
  const [sort, setSort] = useState<SortDirection | null>(null)

  useEffect(() => {
    let cancelled = false
    // History is extra information: if it fails, the table still shows with "n/a" pass rates.
    Promise.all([fetchRuns(), fetchHistory().catch(() => [])])
      .then(([runs, history]) => {
        if (!cancelled) setState({ kind: 'loaded', runs: sortByStartedAt(runs), passRates: passRatesByFile(history) })
      })
      .catch((error: Error) => !cancelled && setState({ kind: 'error', message: error.message }))
    return () => {
      cancelled = true
    }
  }, [])

  const toggleSort = () => setSort((current) => (current === 'ascending' ? 'descending' : 'ascending'))

  return (
    <main>
      <h1>TestRun Board</h1>
      <p className="subtitle">Latest pipeline run · main</p>
      {state.kind === 'loading' && <p role="status">Loading test runs…</p>}
      {state.kind === 'error' && <p role="alert">Could not load test runs: {state.message}</p>}
      {state.kind === 'loaded' && (
        <RunsTable
          runs={sort ? sortByPassRate(state.runs, state.passRates, sort) : state.runs}
          passRates={state.passRates}
          passRateSort={sort}
          onSortPassRate={toggleSort}
        />
      )}
    </main>
  )
}

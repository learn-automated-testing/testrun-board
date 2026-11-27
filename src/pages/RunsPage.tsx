import { useEffect, useState } from 'react'
import { fetchRuns } from '../lib/api'
import { countByStatus, filterByStatus, parseStatusFilter, sortByStartedAt, type StatusFilter as Filter } from '../lib/runs'
import type { TestRun } from '../lib/types'
import { RunsTable } from '../components/RunsTable'
import { StatusFilter } from '../components/StatusFilter'

type State =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'loaded'; runs: TestRun[] }

export function RunsPage() {
  const [state, setState] = useState<State>({ kind: 'loading' })
  const [filter, setFilter] = useState<Filter>(() =>
    parseStatusFilter(new URLSearchParams(window.location.search).get('status')),
  )

  function changeFilter(next: Filter) {
    setFilter(next)
    const url = new URL(window.location.href)
    if (next === 'all') url.searchParams.delete('status')
    else url.searchParams.set('status', next)
    window.history.replaceState(null, '', url)
  }

  useEffect(() => {
    let cancelled = false
    fetchRuns()
      .then((runs) => !cancelled && setState({ kind: 'loaded', runs: sortByStartedAt(runs) }))
      .catch((error: Error) => !cancelled && setState({ kind: 'error', message: error.message }))
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <main>
      <h1>TestRun Board</h1>
      <p className="subtitle">Latest pipeline run · main</p>
      {state.kind === 'loading' && <p role="status">Loading test runs…</p>}
      {state.kind === 'error' && <p role="alert">Could not load test runs: {state.message}</p>}
      {state.kind === 'loaded' && (
        <>
          <StatusFilter value={filter} counts={countByStatus(state.runs)} onChange={changeFilter} />
          <RunsTable runs={filterByStatus(state.runs, filter)} />
        </>
      )}
    </main>
  )
}

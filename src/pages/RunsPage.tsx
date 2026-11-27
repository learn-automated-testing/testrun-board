import { useEffect, useState } from 'react'
import { fetchRuns } from '../lib/api'
import { sortByStartedAt } from '../lib/runs'
import type { TestRun } from '../lib/types'
import { RunsTable } from '../components/RunsTable'

type State =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'loaded'; runs: TestRun[] }

export function RunsPage() {
  const [state, setState] = useState<State>({ kind: 'loading' })

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
      {state.kind === 'loaded' && <RunsTable runs={state.runs} />}
    </main>
  )
}

import { useCallback, useEffect, useState } from 'react'
import { fetchHistory, fetchRuns } from '../lib/api'
import { sortByStartedAt } from '../lib/runs'
import { passRatesByFile, sortByPassRate, type SortDirection } from '../lib/history'
import type { HistoryEntry, TestRun } from '../lib/types'
import { RunsTable } from '../components/RunsTable'
import { HistoryPanel } from '../components/HistoryPanel'

type State =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'loaded'; runs: TestRun[]; passRates: Record<string, number | null>; history: Record<string, HistoryEntry[]> }

export function RunsPage() {
  const [state, setState] = useState<State>({ kind: 'loading' })
  const [sort, setSort] = useState<SortDirection | null>(null)

  useEffect(() => {
    let cancelled = false
    // History is extra information: if it fails, the table still shows with "n/a" pass rates.
    Promise.all([fetchRuns(), fetchHistory().catch(() => [])])
      .then(([runs, history]) => {
        if (!cancelled)
          setState({
            kind: 'loaded',
            runs: sortByStartedAt(runs),
            passRates: passRatesByFile(history),
            history: Object.fromEntries(history.map((h) => [h.file, h.runs])),
          })
      })
      .catch((error: Error) => !cancelled && setState({ kind: 'error', message: error.message }))
    return () => {
      cancelled = true
    }
  }, [])

  const [openFile, setOpenFile] = useState<string | null>(null)

  const closeHistory = useCallback(() => {
    const file = openFile
    setOpenFile(null)
    // Return focus to the pill that opened the panel (acceptance criterion 5).
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(`[data-history-trigger="${CSS.escape(file ?? '')}"]`)?.focus()
    })
  }, [openFile])

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
          onOpenHistory={setOpenFile}
        />
      )}
      {state.kind === 'loaded' && openFile && (
        <HistoryPanel file={openFile} runs={state.history[openFile] ?? []} onClose={closeHistory} />
      )}
    </main>
  )
}

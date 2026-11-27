import type { TestRun } from '../lib/types'
import { formatDuration, formatStartTime } from '../lib/runs'
import { formatPassRate, type SortDirection } from '../lib/history'
import { StatusPill } from './StatusPill'

interface Props {
  runs: readonly TestRun[]
  passRates?: Readonly<Record<string, number | null>>
  passRateSort?: SortDirection | null
  onSortPassRate?: () => void
  onOpenHistory?: (file: string) => void
}

export function RunsTable({ runs, passRates = {}, passRateSort = null, onSortPassRate, onOpenHistory }: Props) {
  if (runs.length === 0) {
    return <p role="status">No test runs found.</p>
  }
  return (
    <table aria-label="Test runs">
      <thead>
        <tr>
          <th scope="col">Test file</th>
          <th scope="col">Suite</th>
          <th scope="col">Status</th>
          <th scope="col" aria-sort={passRateSort ?? 'none'}>
            <button type="button" className="sort-button" onClick={onSortPassRate}>
              Pass rate{passRateSort === 'ascending' ? ' ▲' : passRateSort === 'descending' ? ' ▼' : ''}
            </button>
          </th>
          <th scope="col">Duration</th>
          <th scope="col">Started</th>
        </tr>
      </thead>
      <tbody>
        {runs.map((run) => (
          <tr key={run.id}>
            <td>{run.file}</td>
            <td>{run.suite}</td>
            <td>
              <StatusPill
                status={run.status}
                historyFor={run.file}
                onOpenHistory={onOpenHistory ? () => onOpenHistory(run.file) : undefined}
              />
            </td>
            <td>{formatPassRate(passRates[run.file] ?? null)}</td>
            <td>{formatDuration(run.durationMs)}</td>
            <td>{formatStartTime(run.startedAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

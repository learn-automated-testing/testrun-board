import type { TestRun } from '../lib/types'
import { formatDuration, formatStartTime } from '../lib/runs'
import { StatusPill } from './StatusPill'

export function RunsTable({ runs }: { runs: readonly TestRun[] }) {
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
          <th scope="col">Duration</th>
          <th scope="col">Started</th>
        </tr>
      </thead>
      <tbody>
        {runs.map((run) => (
          <tr key={run.id}>
            <td>{run.file}</td>
            <td>{run.suite}</td>
            <td><StatusPill status={run.status} /></td>
            <td>{formatDuration(run.durationMs)}</td>
            <td>{formatStartTime(run.startedAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

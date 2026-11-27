import type { RunStatus } from '../lib/types'

const LABELS: Record<RunStatus, string> = {
  passed: 'passed',
  failed: 'failed',
  flaky: 'flaky',
}

interface Props {
  status: RunStatus
  /** When set, a flaky pill becomes a button that opens the history. */
  onOpenHistory?: () => void
  historyFor?: string
}

export function StatusPill({ status, onOpenHistory, historyFor }: Props) {
  if (status === 'flaky' && onOpenHistory) {
    return (
      <button
        type="button"
        className={`pill pill-${status} pill-button`}
        onClick={onOpenHistory}
        data-history-trigger={historyFor}
        aria-label={`flaky, show history of ${historyFor}`}
      >
        {LABELS[status]}
      </button>
    )
  }
  return <span className={`pill pill-${status}`}>{LABELS[status]}</span>
}

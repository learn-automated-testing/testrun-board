import type { RunStatus } from '../lib/types'

const LABELS: Record<RunStatus, string> = {
  passed: 'passed',
  failed: 'failed',
  flaky: 'flaky',
}

export function StatusPill({ status }: { status: RunStatus }) {
  return <span className={`pill pill-${status}`}>{LABELS[status]}</span>
}

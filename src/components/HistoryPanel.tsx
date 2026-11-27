import { useEffect, useRef } from 'react'
import type { HistoryEntry } from '../lib/types'
import { HISTORY_WINDOW, formatPassRate, formatRunDate, lastFailure, passRate } from '../lib/history'

interface Props {
  file: string
  runs: readonly HistoryEntry[]
  onClose: () => void
}

export function HistoryPanel({ file, runs, onClose }: Props) {
  const closeButton = useRef<HTMLButtonElement>(null)
  const latest = runs.slice(0, HISTORY_WINDOW)
  const failure = lastFailure(latest)
  const titleId = 'history-panel-title'

  useEffect(() => {
    closeButton.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="panel-backdrop">
      <section role="dialog" aria-modal="true" aria-labelledby={titleId} className="panel">
        <header className="panel-header">
          <h2 id={titleId}>History of {file}</h2>
          <button ref={closeButton} type="button" className="panel-close" onClick={onClose}>
            Close
          </button>
        </header>
        {latest.length === 0 ? (
          <p>No runs recorded yet</p>
        ) : (
          <>
            <ol className="dots" aria-label={`Last ${latest.length} runs, newest first`}>
              {latest.map((run) => (
                <li key={run.runId}>
                  <span
                    role="img"
                    className={`dot dot-${run.status}`}
                    aria-label={`${run.status} on ${formatRunDate(run.startedAt)}`}
                    title={`${run.status} on ${formatRunDate(run.startedAt)}`}
                  />
                </li>
              ))}
            </ol>
            <dl className="panel-stats">
              <dt>Pass rate</dt>
              <dd>{formatPassRate(passRate(latest))}</dd>
              <dt>Last failure</dt>
              <dd>{failure ? formatRunDate(failure) : 'none'}</dd>
            </dl>
          </>
        )}
      </section>
    </div>
  )
}

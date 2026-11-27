import { STATUS_FILTERS, type StatusFilter as Filter } from '../lib/runs'

const LABELS: Record<Filter, string> = { all: 'All', passed: 'Passed', failed: 'Failed', flaky: 'Flaky' }

interface Props {
  value: Filter
  counts: Record<Filter, number>
  onChange: (value: Filter) => void
}

export function StatusFilter({ value, counts, onChange }: Props) {
  return (
    <div role="group" aria-label="Status" className="filters">
      <span className="filters-label">Status</span>
      {STATUS_FILTERS.map((option) => (
        <button
          key={option}
          type="button"
          className={option === value ? 'chip chip-on' : 'chip'}
          aria-pressed={option === value}
          onClick={() => onChange(option)}
        >
          {LABELS[option]} ({counts[option]})
        </button>
      ))}
    </div>
  )
}

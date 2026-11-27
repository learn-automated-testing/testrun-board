import { afterEach, describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { RunsPage } from '../src/pages/RunsPage'
import userEvent from '@testing-library/user-event'
import { server } from './mocks/server'
import { runs } from './mocks/data'

describe('RunsPage', () => {
  it('shows every run of the latest pipeline, oldest first', async () => {
    render(<RunsPage />)
    const table = await screen.findByRole('table', { name: 'Test runs' })
    const rows = within(table).getAllByRole('row').slice(1)
    expect(rows).toHaveLength(7)
    expect(within(rows[0]).getByText('checkout.spec.ts')).toBeInTheDocument()
    expect(within(rows[1]).getByText('flaky')).toBeInTheDocument()
    expect(within(rows[1]).getByText('1m 03s')).toBeInTheDocument()
  })

  it('shows a loading message first', () => {
    render(<RunsPage />)
    expect(screen.getByRole('status')).toHaveTextContent('Loading test runs')
  })

  it('shows an error when the API fails', async () => {
    server.use(http.get('/api/runs', () => new HttpResponse(null, { status: 500 })))
    render(<RunsPage />)
    expect(await screen.findByRole('alert')).toHaveTextContent('failed with 500')
  })

  it('shows an empty state when there are no runs', async () => {
    server.use(http.get('/api/runs', () => HttpResponse.json([])))
    render(<RunsPage />)
    expect(await screen.findByText('No test runs found.')).toBeInTheDocument()
  })
})

describe('RunsPage status filter', () => {
  afterEach(() => window.history.replaceState(null, '', '/'))

  it('shows a filter with the count per status', async () => {
    render(<RunsPage />)
    const group = await screen.findByRole('group', { name: 'Status' })
    expect(within(group).getAllByRole('button').map((b) => b.textContent)).toEqual([
      'All (7)', 'Passed (4)', 'Failed (1)', 'Flaky (2)',
    ])
  })

  it('shows only flaky runs and stores the filter in the URL', async () => {
    render(<RunsPage />)
    await userEvent.click(await screen.findByRole('button', { name: 'Flaky (2)' }))
    const rows = within(screen.getByRole('table', { name: 'Test runs' })).getAllByRole('row').slice(1)
    expect(rows.map((r) => within(r).getAllByRole('cell')[0].textContent)).toEqual(['login.spec.ts', 'profile.spec.ts'])
    expect(window.location.search).toBe('?status=flaky')
    expect(screen.getByRole('button', { name: 'Flaky (2)' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('reads the filter from the URL and falls back to all for unknown values', async () => {
    window.history.replaceState(null, '', '/?status=foo')
    render(<RunsPage />)
    expect(await screen.findByRole('button', { name: 'All (7)' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('shows the empty message when a filter has no runs', async () => {
    server.use(http.get('/api/runs', () => HttpResponse.json(runs.filter((r) => r.status === 'passed'))))
    render(<RunsPage />)
    await userEvent.click(await screen.findByRole('button', { name: 'Failed (0)' }))
    expect(screen.getByText('No test runs found.')).toBeInTheDocument()
  })
})

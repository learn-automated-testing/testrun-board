import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { RunsPage } from '../src/pages/RunsPage'
import userEvent from '@testing-library/user-event'
import { server } from './mocks/server'

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

describe('RunsPage pass rate column', () => {
  const firstColumn = () =>
    within(screen.getByRole('table', { name: 'Test runs' }))
      .getAllByRole('row')
      .slice(1)
      .map((row) => within(row).getAllByRole('cell')[0].textContent)

  it('shows the pass rate over the last 20 runs, and n/a with fewer than 3 runs', async () => {
    render(<RunsPage />)
    const table = await screen.findByRole('table', { name: 'Test runs' })
    expect(within(within(table).getByRole('row', { name: /login\.spec\.ts/ })).getByText('85.0%')).toBeInTheDocument()
    expect(within(within(table).getByRole('row', { name: /pricing\.test\.ts/ })).getByText('n/a')).toBeInTheDocument()
  })

  it('sorts lowest first, then highest first, with n/a always last', async () => {
    render(<RunsPage />)
    const header = await screen.findByRole('button', { name: /Pass rate/ })
    await userEvent.click(header)
    expect(firstColumn()).toEqual([
      'profile.spec.ts', 'search.spec.ts', 'login.spec.ts', 'api-orders.test.ts', 'checkout.spec.ts', 'cart-totals.test.ts', 'pricing.test.ts',
    ])
    expect(screen.getByRole('columnheader', { name: /Pass rate/ })).toHaveAttribute('aria-sort', 'ascending')
    await userEvent.click(header)
    expect(firstColumn()).toEqual([
      'checkout.spec.ts', 'cart-totals.test.ts', 'api-orders.test.ts', 'login.spec.ts', 'search.spec.ts', 'profile.spec.ts', 'pricing.test.ts',
    ])
  })

  it('still shows the runs with n/a when the history API fails', async () => {
    server.use(http.get('/api/history', () => new HttpResponse(null, { status: 500 })))
    render(<RunsPage />)
    const table = await screen.findByRole('table', { name: 'Test runs' })
    expect(within(table).getAllByText('n/a')).toHaveLength(7)
  })
})

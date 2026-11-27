import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { RunsPage } from '../src/pages/RunsPage'
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

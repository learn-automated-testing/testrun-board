import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { RunsPage } from '../src/pages/RunsPage'
import { server } from './mocks/server'
import { history } from './mocks/data'

async function openLoginHistory() {
  render(<RunsPage />)
  const pill = await screen.findByRole('button', { name: 'flaky, show history of login.spec.ts' })
  await userEvent.click(pill)
  return { pill, dialog: screen.getByRole('dialog', { name: 'History of login.spec.ts' }) }
}

describe('Flaky history panel', () => {
  it('opens from a flaky pill and shows the last 20 runs as dots, newest first', async () => {
    const { dialog } = await openLoginHistory()
    const dots = within(dialog).getAllByRole('img')
    expect(dots).toHaveLength(20)
    expect(dots[0]).toHaveAccessibleName('passed on 26 Nov 2026')
    expect(dots[1]).toHaveAccessibleName('failed on 25 Nov 2026')
  })

  it('shows the pass rate and the date of the last failure', async () => {
    const { dialog } = await openLoginHistory()
    expect(within(dialog).getByText('Pass rate').nextElementSibling).toHaveTextContent('85.0%')
    expect(within(dialog).getByText('Last failure').nextElementSibling).toHaveTextContent('25 Nov 2026')
  })

  it('only flaky pills open the history', async () => {
    render(<RunsPage />)
    await screen.findByRole('table', { name: 'Test runs' })
    expect(screen.getAllByRole('button', { name: /show history of/ })).toHaveLength(2)
  })

  it('closes with Esc and returns focus to the pill', async () => {
    const { pill } = await openLoginHistory()
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await new Promise((resolve) => requestAnimationFrame(resolve))
    expect(pill).toHaveFocus()
  })

  it('closes with the close button and returns focus to the pill', async () => {
    const { pill, dialog } = await openLoginHistory()
    await userEvent.click(within(dialog).getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    await new Promise((resolve) => requestAnimationFrame(resolve))
    expect(pill).toHaveFocus()
  })

  it('shows "No runs recorded yet" for an empty history', async () => {
    server.use(
      http.get('/api/history', () =>
        HttpResponse.json(history.map((h) => (h.file === 'login.spec.ts' ? { ...h, runs: [] } : h))),
      ),
    )
    const { dialog } = await openLoginHistory()
    expect(within(dialog).getByText('No runs recorded yet')).toBeInTheDocument()
    expect(within(dialog).queryAllByRole('img')).toHaveLength(0)
  })
})

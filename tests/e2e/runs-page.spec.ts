import { expect, test } from '@playwright/test'

test('shows the latest test runs with their status', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'TestRun Board' })).toBeVisible()

  const table = page.getByRole('table', { name: 'Test runs' })
  await expect(table.getByRole('row')).toHaveCount(8) // header + 7 runs
  await expect(table.getByRole('row', { name: /login\.spec\.ts/ })).toContainText('flaky')
})

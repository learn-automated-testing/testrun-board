import { expect, test } from '@playwright/test'

test('shows only flaky runs and keeps the filter in the URL', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Flaky (2)' }).click()

  const rows = page.getByRole('table', { name: 'Test runs' }).getByRole('row')
  await expect(rows).toHaveCount(3) // header + 2 flaky runs
  await expect(rows.nth(1)).toContainText('login.spec.ts')
  await expect(rows.nth(2)).toContainText('profile.spec.ts')
  await expect(page).toHaveURL(/\?status=flaky$/)

  await page.reload()
  await expect(page.getByRole('button', { name: 'Flaky (2)' })).toHaveAttribute('aria-pressed', 'true')
})

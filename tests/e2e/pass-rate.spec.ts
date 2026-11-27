import { expect, test } from '@playwright/test'

test('sorts the runs by pass rate, lowest first, with n/a last', async ({ page }) => {
  await page.goto('/')
  const rows = page.getByRole('table', { name: 'Test runs' }).getByRole('row')
  await expect(rows.filter({ hasText: 'login.spec.ts' })).toContainText('85.0%')

  await page.getByRole('button', { name: /Pass rate/ }).click()
  await expect(rows.nth(1)).toContainText('profile.spec.ts')
  await expect(rows.nth(1)).toContainText('70.0%')
  await expect(rows.last()).toContainText('pricing.test.ts')
  await expect(rows.last()).toContainText('n/a')

  await page.getByRole('button', { name: /Pass rate/ }).click()
  await expect(rows.nth(1)).toContainText('100.0%')
  await expect(rows.last()).toContainText('n/a')
})

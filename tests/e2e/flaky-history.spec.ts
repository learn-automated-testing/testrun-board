import { expect, test } from '@playwright/test'

test('shows the history of a flaky test and closes with Esc', async ({ page }) => {
  await page.goto('/')
  const pill = page.getByRole('button', { name: 'flaky, show history of login.spec.ts' })
  await pill.click()

  const dialog = page.getByRole('dialog', { name: 'History of login.spec.ts' })
  await expect(dialog.getByRole('img')).toHaveCount(20)
  await expect(dialog.getByRole('img').first()).toHaveAccessibleName('passed on 26 Nov 2026')
  await expect(dialog).toContainText('85.0%')

  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(pill).toBeFocused()
})

import { expect, test } from '../fixtures/test'
import { mockSettings } from '../fixtures/settings'

test.describe('Language & Time settings', () => {
    test.beforeEach(async ({ authenticatedPage: page }) => {
        await mockSettings(page)
        await page.goto('/settings')
    })

    test('updates language and timezone preferences successfully', async ({
        authenticatedPage: page,
    }) => {
        const languageTime = page.locator('form').filter({
            has: page.getByLabel('Select Language'),
        })

        const languageSelect = languageTime.getByLabel('Select Language')
        const timezoneSelect = languageTime.getByLabel('Select Timezone')

        await expect(languageSelect).toHaveValue('en')
        await expect(timezoneSelect).toHaveValue('America/New_York')

        await languageSelect.selectOption('pt-BR')
        await timezoneSelect.selectOption('America/Sao_Paulo')

        await page.route('**/api/settings/preferences', async (route) => {
            if (route.request().method() !== 'PUT') {
                await route.fallback()
                return
            }

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    language: 'pt-BR',
                    timezone: 'America/Sao_Paulo',
                }),
            })
        })

        await languageTime.getByRole('button', { name: 'Update' }).click()

        await expect(languageSelect).toHaveValue('pt-BR')
        await expect(timezoneSelect).toHaveValue('America/Sao_Paulo')
    })
})

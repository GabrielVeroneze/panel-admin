import { expect, test } from '../fixtures/test'
import { mockSettings } from '../fixtures/settings'

test.describe('Connected accounts settings', () => {
    test.beforeEach(async ({ authenticatedPage: page }) => {
        await mockSettings(page)
        await page.goto('/settings')
    })

    test('displays connected accounts successfully', async ({
        authenticatedPage: page,
    }) => {
        const connectedAccounts = page
            .getByRole('heading', { name: 'Connected accounts' })
            .locator('..')
            .locator('..')

        await expect(connectedAccounts.getByText('Sarah Johnson')).toBeVisible()

        await expect(connectedAccounts.getByText('Daniel Moore')).toBeVisible()

        await expect(
            connectedAccounts.getByRole('button', { name: 'Disconnect' }),
        ).toHaveCount(2)
    })

    test('disconnects an account successfully', async ({
        authenticatedPage: page,
    }) => {
        const connectedAccounts = page
            .getByRole('heading', { name: 'Connected accounts' })
            .locator('..')
            .locator('..')

        await page.route(
            '**/api/settings/connected-accounts/1',
            async (route) => {
                if (route.request().method() !== 'DELETE') {
                    await route.fallback()
                    return
                }

                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        message: 'Account disconnected successfully',
                    }),
                })
            },
        )

        await connectedAccounts
            .getByRole('button', { name: 'Disconnect' })
            .nth(0)
            .click()

        await expect(
            connectedAccounts.getByText('Sarah Johnson'),
        ).not.toBeVisible()

        await expect(connectedAccounts.getByText('Daniel Moore')).toBeVisible()

        await expect(
            connectedAccounts.getByRole('button', { name: 'Disconnect' }),
        ).toHaveCount(1)
    })
})

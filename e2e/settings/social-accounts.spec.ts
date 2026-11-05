import { expect, test } from '../fixtures/test'
import { mockSettings, testSettings } from '../fixtures/settings'

test.describe('Social accounts settings', () => {
    test.beforeEach(async ({ authenticatedPage: page }) => {
        await mockSettings(page)
        await page.goto('/settings')
    })

    test('displays social accounts successfully', async ({
        authenticatedPage: page,
    }) => {
        const socialAccounts = page
            .getByRole('heading', { name: 'Social accounts' })
            .locator('..')
            .locator('..')

        await expect(
            socialAccounts.getByRole('button', {
                name: 'Disconnect',
                exact: true,
            }),
        ).toHaveCount(2)

        await expect(
            socialAccounts.getByRole('button', {
                name: 'Connect',
                exact: true,
            }),
        ).toHaveCount(1)
    })

    test('connects and disconnects social accounts successfully', async ({
        authenticatedPage: page,
    }) => {
        const socialAccounts = page
            .getByRole('heading', { name: 'Social accounts' })
            .locator('..')
            .locator('..')

        await page.route(
            '**/api/settings/social-accounts/twitter/connect',
            async (route) => {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        id: 3,
                        platform: 'twitter',
                        connected: true,
                        url: testSettings.socialAccounts[2].url,
                    }),
                })
            },
        )

        await socialAccounts
            .getByRole('button', { name: 'Connect', exact: true })
            .click()

        await expect(
            socialAccounts.getByRole('button', {
                name: 'Connect',
                exact: true,
            }),
        ).toHaveCount(0)

        await expect(
            socialAccounts.getByRole('button', {
                name: 'Disconnect',
                exact: true,
            }),
        ).toHaveCount(3)

        await page.route(
            '**/api/settings/social-accounts/github/disconnect',
            async (route) => {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        id: 1,
                        platform: 'github',
                        connected: false,
                        url: testSettings.socialAccounts[0].url,
                    }),
                })
            },
        )

        const disconnectButtons = socialAccounts.getByRole('button', {
            name: 'Disconnect',
            exact: true,
        })

        await disconnectButtons.nth(0).click()

        await expect(
            socialAccounts.getByRole('button', {
                name: 'Connect',
                exact: true,
            }),
        ).toHaveCount(1)

        await expect(
            socialAccounts.getByRole('button', {
                name: 'Disconnect',
                exact: true,
            }),
        ).toHaveCount(2)
    })
})

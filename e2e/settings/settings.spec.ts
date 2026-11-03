import { test, expect } from '../fixtures/test'
import { mockSettings, testSettings } from '../fixtures/settings'

test.describe('Settings', () => {
    test.beforeEach(async ({ authenticatedPage: page }) => {
        await mockSettings(page)

        await page.goto('/settings')
    })

    test('displays settings information successfully', async ({
        authenticatedPage: page,
    }) => {
        await expect(
            page.getByRole('heading', {
                name: 'General information',
            }),
        ).toBeVisible()

        await expect(
            page.getByRole('heading', {
                name: 'Language & Time',
            }),
        ).toBeVisible()

        await expect(
            page.getByRole('heading', {
                name: 'Social accounts',
            }),
        ).toBeVisible()

        await expect(
            page.getByRole('heading', {
                name: 'Connected accounts',
            }),
        ).toBeVisible()

        await expect(
            page.getByRole('heading', {
                name: 'Recent Devices',
            }),
        ).toBeVisible()

        await expect(
            page.getByRole('textbox', { name: 'First Name' }),
        ).toHaveValue(testSettings.generalInformation.firstName)

        await expect(
            page.getByRole('textbox', { name: 'Last Name' }),
        ).toHaveValue(testSettings.generalInformation.lastName)

        await expect(page.getByRole('textbox', { name: 'Email' })).toHaveValue(
            testSettings.generalInformation.email,
        )

        await expect(page.getByText('Neil Sims')).toBeVisible()

        await expect(page.getByText('Sarah Johnson')).toBeVisible()

        await expect(page.getByText('Daniel Moore')).toBeVisible()
    })

    test('displays an error state when settings cannot be loaded', async ({
        authenticatedPage: page,
    }) => {
        await page.unroute('**/api/settings')

        await page.route('**/api/settings', async (route) => {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'Internal server error',
                }),
            })
        })

        await page.reload()

        await expect(
            page.getByRole('heading', {
                name: 'Settings unavailable',
            }),
        ).toBeVisible()

        await expect(
            page.getByText(
                "We couldn't load your account settings. Please try again later.",
            ),
        ).toBeVisible()
    })
})

import { expect, test } from '../fixtures/test'
import { mockSettings } from '../fixtures/settings'

test.describe('Password settings', () => {
    test.beforeEach(async ({ authenticatedPage: page }) => {
        await mockSettings(page)
        await page.goto('/settings')
    })

    test('updates password successfully', async ({
        authenticatedPage: page,
    }) => {
        const passwordSettings = page
            .getByRole('heading', { name: 'Password information' })
            .locator('..')
            .locator('..')

        await passwordSettings
            .getByLabel('Current Password')
            .fill('CurrentPassword123!')

        await passwordSettings
            .getByLabel('New Password')
            .fill('NewPassword123!')

        await passwordSettings
            .getByLabel('Confirm Password')
            .fill('NewPassword123!')

        await page.route('**/api/settings/password', async (route) => {
            if (route.request().method() !== 'PUT') {
                await route.fallback()
                return
            }

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'Password updated successfully',
                }),
            })
        })

        await passwordSettings.getByRole('button', { name: 'Update' }).click()

        await expect(
            passwordSettings.getByLabel('Current Password'),
        ).toHaveValue('')

        await expect(passwordSettings.getByLabel('New Password')).toHaveValue(
            '',
        )

        await expect(
            passwordSettings.getByLabel('Confirm Password'),
        ).toHaveValue('')
    })

    test('displays validation errors for invalid password information', async ({
        authenticatedPage: page,
    }) => {
        const passwordSettings = page
            .getByRole('heading', { name: 'Password information' })
            .locator('..')
            .locator('..')

        await passwordSettings.getByLabel('Current Password').fill('')

        await passwordSettings.getByLabel('New Password').fill('weak')

        await passwordSettings.getByLabel('Confirm Password').fill('different')

        await passwordSettings.getByRole('button', { name: 'Update' }).click()

        await expect(
            passwordSettings.getByText('Current password is required'),
        ).toBeVisible()

        await expect(
            passwordSettings.getByText(
                'Password must be at least 8 characters',
            ),
        ).toBeVisible()

        await expect(
            passwordSettings.getByText('Passwords do not match'),
        ).toBeVisible()
    })
})

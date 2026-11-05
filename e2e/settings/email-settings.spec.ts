import { expect, test } from '../fixtures/test'
import { mockSettings, testSettings } from '../fixtures/settings'

test.describe('Email settings', () => {
    test.beforeEach(async ({ authenticatedPage: page }) => {
        await mockSettings(page)
        await page.goto('/settings')
    })

    test('displays email preferences successfully', async ({
        authenticatedPage: page,
    }) => {
        const emailSettings = page
            .getByRole('heading', { name: 'Email Settings' })
            .locator('..')
            .locator('..')

        const ratingReminders = emailSettings
            .getByText('Rating reminders', { exact: true })
            .locator('..')
            .locator('..')
            .getByRole('checkbox')

        await expect(ratingReminders).toBeChecked()

        const itemUpdateNotifications = emailSettings
            .getByText('Item update notifications', { exact: true })
            .locator('..')
            .locator('..')
            .getByRole('checkbox')

        await expect(itemUpdateNotifications).not.toBeChecked()

        const itemCommentNotifications = emailSettings
            .getByText('Item comment notifications', { exact: true })
            .locator('..')
            .locator('..')
            .getByRole('checkbox')

        await expect(itemCommentNotifications).toBeChecked()

        const buyerReviewNotifications = emailSettings
            .getByText('Buyer review notifications', { exact: true })
            .locator('..')
            .locator('..')
            .getByRole('checkbox')

        await expect(buyerReviewNotifications).not.toBeChecked()
    })

    test('updates email preferences successfully', async ({
        authenticatedPage: page,
    }) => {
        const emailSettings = page
            .getByRole('heading', { name: 'Email Settings' })
            .locator('..')
            .locator('..')

        const updatedEmailSettings = {
            ...testSettings.emailSettings,
            ratingReminders: false,
        }

        await page.route(
            '**/api/settings/email-notifications',
            async (route) => {
                if (route.request().method() !== 'PUT') {
                    await route.fallback()
                    return
                }

                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(updatedEmailSettings),
                })
            },
        )

        const ratingReminders = emailSettings
            .getByText('Rating reminders', { exact: true })
            .locator('..')
            .locator('..')
            .getByRole('checkbox')

        await ratingReminders.locator('..').click()

        await expect(ratingReminders).not.toBeChecked()
    })
})

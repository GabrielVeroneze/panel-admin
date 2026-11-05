import { expect, test } from '../fixtures/test'
import { mockSettings, testSettings } from '../fixtures/settings'

test.describe('Notification settings', () => {
    test.beforeEach(async ({ authenticatedPage: page }) => {
        await mockSettings(page)

        await page.goto('/settings')
    })

    test('displays notification preferences successfully', async ({
        authenticatedPage: page,
    }) => {
        const notifications = page
            .getByRole('heading', { name: 'Alerts & Notifications' })
            .locator('..')
            .locator('..')

        const companyNews = notifications
            .getByText('Company News', { exact: true })
            .locator('..')
            .locator('..')
            .getByRole('checkbox')

        await expect(companyNews).toBeChecked()

        const accountActivity = notifications
            .getByText('Account Activity', { exact: true })
            .locator('..')
            .locator('..')
            .getByRole('checkbox')

        await expect(accountActivity).toBeChecked()

        const meetupsNearYou = notifications
            .getByText('Meetups Near You', { exact: true })
            .locator('..')
            .locator('..')
            .getByRole('checkbox')

        await expect(meetupsNearYou).not.toBeChecked()

        const newMessages = notifications
            .getByText('New Messages', { exact: true })
            .locator('..')
            .locator('..')
            .getByRole('checkbox')

        await expect(newMessages).toBeChecked()
    })

    test('updates notification preferences successfully', async ({
        authenticatedPage: page,
    }) => {
        const updatedNotifications = {
            ...testSettings.notifications,
            companyNews: false,
            meetupsNearYou: true,
        }

        let requestCount = 0

        await page.route('**/api/settings/notifications', async (route) => {
            if (route.request().method() !== 'PUT') {
                await route.fallback()
                return
            }

            requestCount++

            const notifications =
                requestCount === 1
                    ? {
                          ...testSettings.notifications,
                          companyNews: false,
                      }
                    : updatedNotifications

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(notifications),
            })
        })

        const notifications = page
            .getByRole('heading', { name: 'Alerts & Notifications' })
            .locator('..')
            .locator('..')

        const companyNews = notifications
            .getByText('Company News', { exact: true })
            .locator('..')
            .locator('..')
            .getByRole('checkbox')

        await expect(companyNews).toBeChecked()

        await companyNews.locator('..').click()

        await expect(companyNews).not.toBeChecked()

        const meetupsNearYou = notifications
            .getByText('Meetups Near You', { exact: true })
            .locator('..')
            .locator('..')
            .getByRole('checkbox')

        await expect(meetupsNearYou).not.toBeChecked()

        await meetupsNearYou.locator('..').click()

        await expect(meetupsNearYou).toBeChecked()
    })
})

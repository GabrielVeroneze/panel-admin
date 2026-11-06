import { expect, test } from '../fixtures/test'
import { mockSettings } from '../fixtures/settings'

test.describe('Recent devices settings', () => {
    test.beforeEach(async ({ authenticatedPage: page }) => {
        await mockSettings(page)
        await page.goto('/settings')
    })

    test('displays recent devices successfully', async ({
        authenticatedPage: page,
    }) => {
        const recentDevices = page
            .getByRole('heading', { name: 'Recent Devices' })
            .locator('..')
            .locator('..')

        await expect(recentDevices.getByText('Chrome')).toBeVisible()
        await expect(recentDevices.getByText('Safari')).toBeVisible()

        await expect(recentDevices.getByText('Desktop')).toBeVisible()
        await expect(recentDevices.getByText('Laptop')).toBeVisible()

        await expect(
            recentDevices.getByRole('button', { name: 'Disconnect' }),
        ).toHaveCount(2)
    })

    test('disconnects a device successfully', async ({
        authenticatedPage: page,
    }) => {
        const recentDevices = page
            .getByRole('heading', { name: 'Recent Devices' })
            .locator('..')
            .locator('..')

        await page.route('**/api/settings/devices/1', async (route) => {
            if (route.request().method() !== 'DELETE') {
                await route.fallback()
                return
            }

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'Device disconnected successfully',
                }),
            })
        })

        await recentDevices
            .getByRole('button', { name: 'Disconnect' })
            .nth(0)
            .click()

        await expect(recentDevices.getByText('Chrome')).not.toBeVisible()
        await expect(recentDevices.getByText('Safari')).toBeVisible()

        await expect(
            recentDevices.getByRole('button', { name: 'Disconnect' }),
        ).toHaveCount(1)
    })
})

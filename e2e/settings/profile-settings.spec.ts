import { expect, test } from '../fixtures/test'
import { mockSettings, testSettings } from '../fixtures/settings'

test.describe('Profile settings', () => {
    test.beforeEach(async ({ authenticatedPage: page }) => {
        await mockSettings(page)
        await page.goto('/settings')
    })

    test('displays profile information successfully', async ({
        authenticatedPage: page,
    }) => {
        const avatar = page.getByRole('img', {
            name: testSettings.profile.name,
        })

        await expect(avatar).toBeVisible()
        await expect(avatar).toHaveAttribute('src', testSettings.profile.avatar)

        await expect(
            page.getByRole('heading', {
                name: testSettings.profile.name,
            }),
        ).toBeVisible()

        await expect(
            page.getByText(testSettings.profile.role, { exact: true }),
        ).toBeVisible()

        await expect(
            page.getByRole('button', { name: 'Change Picture' }),
        ).toBeVisible()
    })

    test('updates profile avatar successfully', async ({
        authenticatedPage: page,
    }) => {
        const updatedProfile = {
            ...testSettings.profile,
            avatar: '/images/updated-avatar.png',
        }

        await page.route('**/api/settings/profile', async (route) => {
            if (route.request().method() !== 'PUT') {
                await route.fallback()
                return
            }

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(updatedProfile),
            })
        })

        await page.locator('input[type="file"]').setInputFiles({
            name: 'avatar.png',
            mimeType: 'image/png',
            buffer: Buffer.from('test image'),
        })

        await expect(
            page.getByRole('img', {
                name: testSettings.profile.name,
            }),
        ).toHaveAttribute('src', updatedProfile.avatar)
    })
})

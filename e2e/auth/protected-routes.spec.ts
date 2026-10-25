import { expect, test } from '@playwright/test'
import { testSession, testUser } from '../fixtures/auth'

test.describe('Protected routes', () => {
    test('redirects unauthenticated users to sign in', async ({ page }) => {
        await page.goto('/users')

        await expect(page).toHaveURL('/auth/sign-in')
        await expect(
            page.getByRole('button', { name: 'Sign In' }),
        ).toBeVisible()
    })

    test('allows authenticated users to access protected routes', async ({
        page,
    }) => {
        await page.route('**/api/auth/me', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(testUser),
            })
        })

        await page.addInitScript((session) => {
            localStorage.setItem('auth-session', JSON.stringify(session))
        }, testSession)

        await page.goto('/users')

        await expect(page).toHaveURL('/users')
    })
})

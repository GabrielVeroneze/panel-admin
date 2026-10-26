import { expect, test } from '@playwright/test'
import { createAuthenticatedContext, testUser } from '../fixtures/auth'

test.describe('Logout', () => {
    test('logs out and prevents access to protected routes', async ({
        browser,
    }) => {
        const context = await createAuthenticatedContext(browser)
        const page = await context.newPage()

        await page.route('**/api/auth/me', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(testUser),
            })
        })

        await page.route('**/api/auth/sign-out', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'Signed out successfully',
                }),
            })
        })

        await page.goto('/')

        await expect(
            page.getByRole('button', { name: 'Avatar do usuário' }),
        ).toBeVisible()

        await page.getByRole('button', { name: 'Avatar do usuário' }).click()
        await page.getByText('Sign out', { exact: true }).click()

        await expect(page).toHaveURL('/auth/sign-in')
        await expect(
            page.getByRole('button', { name: 'Sign In' }),
        ).toBeVisible()

        const storedSession = await page.evaluate(() => {
            return (
                localStorage.getItem('auth-session') ??
                sessionStorage.getItem('auth-session')
            )
        })

        expect(storedSession).toBeNull()

        await page.goto('/users')
        await expect(page).toHaveURL('/auth/sign-in')

        await context.close()
    })
})

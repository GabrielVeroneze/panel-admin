import type { Page } from '@playwright/test'

export const testUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: 'admin',
    avatar: '/images/test-avatar.png',
} as const

export const testSession = {
    token: 'e2e-test-token',
    userId: testUser.id,
}

export const mockSuccessfulSignIn = async (page: Page) => {
    await page.route('**/api/auth/sign-in', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                token: testSession.token,
                user: testUser,
            }),
        })
    })
}

export const mockFailedSignIn = async (page: Page) => {
    await page.route('**/api/auth/sign-in', async (route) => {
        await route.fulfill({
            status: 401,
            contentType: 'application/json',
            body: JSON.stringify({
                message: 'Invalid credentials',
            }),
        })
    })
}

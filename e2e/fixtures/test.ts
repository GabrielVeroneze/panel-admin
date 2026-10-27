import { test as base, expect, type Page } from '@playwright/test'
import { testSession, testUser } from './auth'

type Fixtures = {
    authenticatedPage: Page
}

export const test = base.extend<Fixtures>({
    authenticatedPage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: {
                cookies: [],
                origins: [
                    {
                        origin: 'http://localhost:5173',
                        localStorage: [
                            {
                                name: 'auth-session',
                                value: JSON.stringify(testSession),
                            },
                        ],
                    },
                ],
            },
        })

        await context.route('**/api/auth/me', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(testUser),
            })
        })

        const page = await context.newPage()

        try {
            await use(page)
        } finally {
            await context.close()
        }
    },
})

export { expect }

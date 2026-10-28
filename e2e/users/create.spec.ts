import { expect, test } from '../fixtures/test'
import { createTestUser } from '../fixtures/users'

test.describe('Users creation', () => {
    test('creates a user successfully', async ({ authenticatedPage: page }) => {
        const createdUser = {
            ...createTestUser(17),
            name: 'Test Created User',
            email: 'e2e.created@example.com',
            phone: '+14155552671',
            company: 'E2E Company',
            department: 'Engineering',
        }

        const users = [createdUser]

        await page.route(/\/api\/users\/?(?:\?.*)?$/, async (route) => {
            const request = route.request()
            const url = new URL(request.url())

            if (request.method() === 'POST' && url.pathname === '/api/users') {
                await route.fulfill({
                    status: 201,
                    contentType: 'application/json',
                    body: JSON.stringify(createdUser),
                })
                return
            }

            if (request.method() === 'GET' && url.pathname === '/api/users') {
                const pageNumber = Number(url.searchParams.get('page') ?? 1)
                const pageSize = Number(url.searchParams.get('pageSize') ?? 15)
                const start = (pageNumber - 1) * pageSize

                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        list: users.slice(start, start + pageSize),
                        total: users.length,
                        page: pageNumber,
                        pageSize,
                    }),
                })
                return
            }

            await route.fallback()
        })

        await page.goto('/users')

        await page.getByRole('button', { name: 'Add User' }).click()

        await expect(
            page.getByText('Create user', { exact: true }),
        ).toBeVisible()

        await page.getByPlaceholder('Enter first name').fill('Test')
        await page.getByPlaceholder('Enter last name').fill('Created User')
        await page
            .getByPlaceholder('Enter email address')
            .fill('e2e.created@example.com')

        await page.locator('input[type="tel"]').fill('+14155552671')

        await page.getByPlaceholder('Enter company name').fill('E2E Company')
        await page.getByPlaceholder('Enter department name').fill('Engineering')

        await page.getByPlaceholder('Enter password').fill('TestPass123!')
        await page
            .getByPlaceholder('Enter confirm password')
            .fill('TestPass123!')

        const createRequest = page.waitForRequest(
            (request) =>
                request.method() === 'POST' &&
                new URL(request.url()).pathname === '/api/users',
        )

        await page.getByRole('button', { name: 'Save' }).click()

        await createRequest

        await expect(
            page.getByText('Create user', { exact: true }),
        ).not.toBeVisible()
    })
})

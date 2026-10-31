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

        const users: (typeof createdUser)[] = []

        await page.route(/\/api\/users\/?(?:\?.*)?$/, async (route) => {
            const request = route.request()
            const url = new URL(request.url())

            if (request.method() === 'POST' && url.pathname === '/api/users') {
                users.push(createdUser)

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
            .fill(createdUser.email)

        await page.locator('input[type="tel"]').fill(createdUser.phone)

        await page
            .getByPlaceholder('Enter company name')
            .fill(createdUser.company)
        await page
            .getByPlaceholder('Enter department name')
            .fill(createdUser.department)

        await page.getByPlaceholder('Enter password').fill('TestPass123!')
        await page
            .getByPlaceholder('Enter confirm password')
            .fill('TestPass123!')

        const createResponsePromise = page.waitForResponse(
            (response) =>
                response.request().method() === 'POST' &&
                new URL(response.url()).pathname === '/api/users',
        )

        await page.getByRole('button', { name: 'Save' }).click()

        const createResponse = await createResponsePromise

        expect(createResponse.status()).toBe(201)
        expect(await createResponse.json()).toMatchObject(createdUser)

        await expect(
            page.getByText('Create user', { exact: true }),
        ).not.toBeVisible()

        const createdUserRow = page
            .getByRole('row')
            .filter({ hasText: createdUser.email })

        await expect(createdUserRow).toBeVisible()
        await expect(createdUserRow).toContainText(createdUser.name)
        await expect(createdUserRow).toContainText(createdUser.email)
        await expect(createdUserRow).toContainText(createdUser.department)
        await expect(createdUserRow).toContainText(createdUser.country)
    })
})

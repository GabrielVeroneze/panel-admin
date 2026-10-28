import { expect, test } from '../fixtures/test'
import { mockUsersList, createTestUser } from '../fixtures/users'

test.describe('Users editing', () => {
    test('edits a user successfully', async ({ authenticatedPage: page }) => {
        const user = {
            ...createTestUser(1),
            name: 'Marina Costa',
            email: 'marina.costa@example.com',
        }

        const updatedUser = {
            ...user,
            name: 'Marina Oliveira',
            email: 'marina.oliveira@example.com',
            company: 'Updated Company',
            department: 'Design',
        }

        await mockUsersList(page, [user])

        await page.route(/\/api\/users\/1\/?$/, async (route) => {
            if (route.request().method() === 'PUT') {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(updatedUser),
                })
                return
            }

            await route.fallback()
        })

        await page.goto('/users')

        await expect(
            page.getByText('Marina Costa', { exact: true }),
        ).toBeVisible()

        await page
            .getByRole('button', { name: 'Edit user Marina Costa' })
            .click()

        await expect(page.getByText('Edit user', { exact: true })).toBeVisible()

        await expect(page.getByPlaceholder('Enter first name')).toHaveValue(
            'Marina',
        )

        await expect(page.getByPlaceholder('Enter last name')).toHaveValue(
            'Costa',
        )

        await page.getByPlaceholder('Enter first name').fill('Marina')
        await page.getByPlaceholder('Enter last name').fill('Oliveira')
        await page
            .getByPlaceholder('Enter email address')
            .fill('marina.oliveira@example.com')

        await page
            .getByPlaceholder('Enter company name')
            .fill('Updated Company')
        await page.getByPlaceholder('Enter department name').fill('Design')

        const updateRequest = page.waitForRequest(
            (request) =>
                request.method() === 'PUT' &&
                new URL(request.url()).pathname === '/api/users/1',
        )

        await page.getByRole('button', { name: 'Save' }).click()

        const request = await updateRequest

        expect(request.method()).toBe('PUT')
        expect(new URL(request.url()).pathname).toBe('/api/users/1')

        await expect(
            page.getByText('Edit user', { exact: true }),
        ).not.toBeVisible()
    })
})

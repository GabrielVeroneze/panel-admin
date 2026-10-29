import { expect, test } from '../fixtures/test'
import { mockUsersList, createTestUser } from '../fixtures/users'

test.describe('Users deletion', () => {
    test('deletes a user successfully', async ({ authenticatedPage: page }) => {
        const user = {
            ...createTestUser(1),
            name: 'Marina Costa',
            email: 'marina.costa@example.com',
        }

        await mockUsersList(page, [user])

        await page.route(/\/api\/users\/1\/?$/, async (route) => {
            if (route.request().method() === 'DELETE') {
                await route.fulfill({ status: 204 })
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

        const deleteRequest = page.waitForRequest(
            (request) =>
                request.method() === 'DELETE' &&
                new URL(request.url()).pathname === '/api/users/1',
        )

        await page.getByRole('button', { name: 'Delete account' }).click()

        const request = await deleteRequest

        expect(request.method()).toBe('DELETE')
        expect(new URL(request.url()).pathname).toBe('/api/users/1')

        await expect(
            page.getByText('Edit user', { exact: true }),
        ).not.toBeVisible()

        await expect(
            page.getByText('Marina Costa', { exact: true }),
        ).not.toBeVisible()
    })
})

import { expect, test } from '../fixtures/test'
import { createTestUser, mockUsersList } from '../fixtures/users'

test.describe('Bulk users deletion', () => {
    test('deletes selected users and keeps the remaining users', async ({
        authenticatedPage: page,
    }) => {
        const users = [
            {
                ...createTestUser(1),
                name: 'Marina Costa',
                email: 'marina@example.com',
            },
            {
                ...createTestUser(2),
                name: 'Carlos Souza',
                email: 'carlos@example.com',
            },
            {
                ...createTestUser(3),
                name: 'Ana Lima',
                email: 'ana@example.com',
            },
        ]

        await mockUsersList(page, users)

        await page.route(/\/api\/users\/?$/, async (route) => {
            if (route.request().method() === 'DELETE') {
                await route.fulfill({ status: 204 })
                return
            }

            await route.fallback()
        })

        await page.goto('/users')

        const deleteButton = page.getByRole('button', {
            name: 'Delete selected users',
        })

        await expect(deleteButton).toBeDisabled()

        await expect(
            page.getByText('Marina Costa', { exact: true }),
        ).toBeVisible()

        await expect(
            page.getByText('Carlos Souza', { exact: true }),
        ).toBeVisible()

        await expect(page.getByText('Ana Lima', { exact: true })).toBeVisible()

        const checkboxes = page.getByRole('checkbox')

        await checkboxes.nth(1).locator('xpath=..').click()
        await checkboxes.nth(2).locator('xpath=..').click()

        await expect(deleteButton).toBeEnabled()

        const deleteRequestPromise = page.waitForRequest(
            (request) =>
                request.method() === 'DELETE' &&
                new URL(request.url()).pathname === '/api/users',
        )

        await deleteButton.click()

        const deleteRequest = await deleteRequestPromise

        expect(deleteRequest.postDataJSON()).toEqual({
            ids: [1, 2],
        })

        await expect(
            page.getByText('Marina Costa', { exact: true }),
        ).not.toBeVisible()

        await expect(
            page.getByText('Carlos Souza', { exact: true }),
        ).not.toBeVisible()

        await expect(page.getByText('Ana Lima', { exact: true })).toBeVisible()

        await expect(page.getByText('Showing 1-1 of 1 users')).toBeVisible()

        await expect(deleteButton).toBeDisabled()
    })
})

import { expect, test } from '../fixtures/test'
import { mockUsersList, testUsers } from '../fixtures/users'

test.describe('Users list', () => {
    test('displays users and pagination information', async ({
        authenticatedPage: page,
    }) => {
        await mockUsersList(page)
        await page.goto('/users')

        await expect(
            page.getByText(testUsers[0].name, { exact: true }),
        ).toBeVisible()

        await expect(
            page.getByText(testUsers[14].name, { exact: true }),
        ).toBeVisible()

        await expect(page.getByText('Showing 1-15 of 16 users')).toBeVisible()
    })

    test('searches for users by name', async ({ authenticatedPage: page }) => {
        await mockUsersList(page)
        await page.goto('/users')

        const search = page.getByPlaceholder('Search for users')

        await search.fill('Test User 1')

        await expect(page.getByText('user1@example.com')).toBeVisible()

        await expect(page.getByText('user2@example.com')).not.toBeVisible()
    })

    test('navigates between pages', async ({ authenticatedPage: page }) => {
        await mockUsersList(page)
        await page.goto('/users')

        await expect(page.getByText('Showing 1-15 of 16 users')).toBeVisible()

        await page.getByRole('button', { name: 'Next page' }).click()

        await expect(page.getByText('Showing 16-16 of 16 users')).toBeVisible()

        await expect(page.getByText(testUsers[15].name)).toBeVisible()

        await page.getByRole('button', { name: 'Previous page' }).click()

        await expect(page.getByText('Showing 1-15 of 16 users')).toBeVisible()
    })

    test('displays the empty state when no users match the search', async ({
        authenticatedPage: page,
    }) => {
        await mockUsersList(page)
        await page.goto('/users')

        await page.getByPlaceholder('Search for users').fill('no-such-user')

        await expect(page.getByText('No users', { exact: true })).toBeVisible()

        await expect(
            page.getByText('There are no users to display.'),
        ).toBeVisible()
    })
})

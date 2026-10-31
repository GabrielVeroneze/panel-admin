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

        const users = [user]

        await mockUsersList(page, users)

        await page.route(/\/api\/users\/1\/?$/, async (route) => {
            if (route.request().method() === 'PUT') {
                users[0] = updatedUser

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
            .fill(updatedUser.email)

        await page
            .getByPlaceholder('Enter company name')
            .fill(updatedUser.company)

        await page
            .getByPlaceholder('Enter department name')
            .fill(updatedUser.department)

        const updateResponsePromise = page.waitForResponse(
            (response) =>
                response.request().method() === 'PUT' &&
                new URL(response.url()).pathname === '/api/users/1',
        )

        await page.getByRole('button', { name: 'Save' }).click()

        const updateResponse = await updateResponsePromise

        expect(updateResponse.status()).toBe(200)
        expect(await updateResponse.json()).toMatchObject(updatedUser)

        await expect(
            page.getByText('Edit user', { exact: true }),
        ).not.toBeVisible()

        const updatedUserRow = page
            .getByRole('row')
            .filter({ hasText: updatedUser.email })

        await expect(updatedUserRow).toBeVisible()
        await expect(updatedUserRow).toContainText(updatedUser.name)
        await expect(updatedUserRow).toContainText(updatedUser.email)
        await expect(updatedUserRow).toContainText(updatedUser.department)
        await expect(updatedUserRow).toContainText(updatedUser.country)

        await expect(
            page.getByText(user.email, { exact: true }),
        ).not.toBeVisible()
    })
})

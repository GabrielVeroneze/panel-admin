import { expect, test } from '../fixtures/test'
import { mockProductsList } from '../fixtures/products'

test.describe('Products deletion', () => {
    test.beforeEach(async ({ authenticatedPage: page }) => {
        await mockProductsList(page)
        await page.goto('/products')
    })

    test('deletes a product successfully', async ({
        authenticatedPage: page,
    }) => {
        await page.getByRole('button', { name: 'Edit Item' }).first().click()

        await expect(
            page.getByRole('heading', { name: 'Edit product' }),
        ).toBeVisible()

        const deleteRequest = page.waitForRequest(
            (request) =>
                /\/api\/products\/1\/?$/.test(request.url()) &&
                request.method() === 'DELETE',
        )

        await page.getByRole('button', { name: 'Delete product' }).click()

        const request = await deleteRequest

        expect(request.method()).toBe('DELETE')

        await expect(
            page.getByRole('heading', { name: 'Edit product' }),
        ).not.toBeVisible()
    })

    test('deletes selected products and keeps the remaining products', async ({
        authenticatedPage: page,
    }) => {
        const deleteRequest = page.waitForRequest(
            (request) =>
                /\/api\/products\/?$/.test(request.url()) &&
                request.method() === 'DELETE',
        )

        const checkboxes = page.getByRole('checkbox')

        await checkboxes.nth(1).locator('..').click()
        await checkboxes.nth(2).locator('..').click()

        await page
            .getByRole('button', { name: 'Delete selected users' })
            .click()

        const request = await deleteRequest

        expect(request.postDataJSON()).toEqual({
            ids: [1, 2],
        })
    })
})

import { expect, test } from '../fixtures/test'
import { mockProductsList, testProducts } from '../fixtures/products'

test.describe('Products deletion', () => {
    test('deletes a product successfully', async ({
        authenticatedPage: page,
    }) => {
        const products = [...testProducts]

        await mockProductsList(page, products)

        await page.route(/\/api\/products\/1\/?$/, async (route) => {
            if (route.request().method() === 'DELETE') {
                const productIndex = products.findIndex(
                    (product) => product.id === 1,
                )

                if (productIndex !== -1) {
                    products.splice(productIndex, 1)
                }

                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({ success: true }),
                })
                return
            }

            await route.fallback()
        })

        await page.goto('/products')

        const deletedProduct = products[0]
        const remainingProduct = products[1]

        await page.getByRole('button', { name: 'Edit Item' }).first().click()

        await expect(
            page.getByRole('heading', { name: 'Edit product' }),
        ).toBeVisible()

        const deleteResponsePromise = page.waitForResponse(
            (response) =>
                response.request().method() === 'DELETE' &&
                new URL(response.url()).pathname === '/api/products/1',
        )

        await page.getByRole('button', { name: 'Delete product' }).click()

        const deleteResponse = await deleteResponsePromise

        expect(deleteResponse.status()).toBe(200)

        await expect(
            page.getByRole('heading', { name: 'Edit product' }),
        ).not.toBeVisible()

        const deletedProductRow = page.getByRole('row', {
            name: new RegExp(`^${deletedProduct.name}\\s`),
        })

        await expect(deletedProductRow).toHaveCount(0)

        const remainingProductRow = page.getByRole('row', {
            name: new RegExp(`^${remainingProduct.name}\\s`),
        })

        await expect(remainingProductRow).toBeVisible()
    })

    test('deletes selected products and keeps the remaining products', async ({
        authenticatedPage: page,
    }) => {
        const products = [...testProducts]

        await mockProductsList(page, products)

        await page.route(/\/api\/products\/?$/, async (route) => {
            if (route.request().method() === 'DELETE') {
                const { ids } = route.request().postDataJSON() as {
                    ids: number[]
                }

                for (const id of ids) {
                    const productIndex = products.findIndex(
                        (product) => product.id === id,
                    )

                    if (productIndex !== -1) {
                        products.splice(productIndex, 1)
                    }
                }

                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({ success: true }),
                })
                return
            }

            await route.fallback()
        })

        await page.goto('/products')

        const deletedProducts = products.slice(0, 2)
        const remainingProduct = products[2]

        const checkboxes = page.getByRole('checkbox')

        await checkboxes.nth(1).locator('..').click()
        await checkboxes.nth(2).locator('..').click()

        const deleteResponsePromise = page.waitForResponse(
            (response) =>
                response.request().method() === 'DELETE' &&
                new URL(response.url()).pathname === '/api/products',
        )

        await page
            .getByRole('button', { name: 'Delete selected users' })
            .click()

        const deleteResponse = await deleteResponsePromise

        expect(deleteResponse.status()).toBe(200)
        expect(deleteResponse.request().postDataJSON()).toEqual({
            ids: [1, 2],
        })

        for (const product of deletedProducts) {
            const productRow = page.getByRole('row', {
                name: new RegExp(`^${product.name}\\s`),
            })

            await expect(productRow).toHaveCount(0)
        }

        const remainingProductRow = page.getByRole('row', {
            name: new RegExp(`^${remainingProduct.name}\\s`),
        })

        await expect(remainingProductRow).toBeVisible()
    })
})

import { expect, test } from '../fixtures/test'
import { mockProductsList, testProducts } from '../fixtures/products'

test.describe('Products editing', () => {
    test.beforeEach(async ({ authenticatedPage: page }) => {
        await mockProductsList(page)
        await page.goto('/products')

        await page.getByRole('button', { name: 'Edit Item' }).first().click()

        await expect(
            page.getByRole('heading', { name: 'Edit product' }),
        ).toBeVisible()
    })

    test('prefills the form with existing product data', async ({
        authenticatedPage: page,
    }) => {
        const product = testProducts[0]

        await expect(page.getByPlaceholder('Enter product name')).toHaveValue(
            product.name,
        )

        await expect(page.getByPlaceholder('Enter category')).toHaveValue(
            product.category,
        )

        await expect(page.getByPlaceholder('Enter brand')).toHaveValue(
            product.brand,
        )

        await expect(page.getByPlaceholder('Enter price')).toHaveValue('$99.99')

        await expect(
            page.getByPlaceholder('Enter product details'),
        ).toHaveValue(product.description)
    })

    test('edits a product successfully', async ({
        authenticatedPage: page,
    }) => {
        const updateRequest = page.waitForRequest(
            (request) =>
                /\/api\/products\/1\/?$/.test(request.url()) &&
                request.method() === 'PUT',
        )

        await page
            .getByPlaceholder('Enter product name')
            .fill('Updated Product')

        await page.getByPlaceholder('Enter category').fill('Updated Category')

        await page.getByPlaceholder('Enter brand').fill('Updated Brand')

        await page.getByPlaceholder('Enter price').fill('199.99')

        await page
            .getByPlaceholder('Enter product details')
            .fill('Updated product description')

        await page.getByRole('button', { name: 'Save' }).click()

        const request = await updateRequest

        expect(request.headers()['content-type']).toContain(
            'multipart/form-data',
        )

        const requestBody = request.postData() ?? ''

        expect(requestBody).toContain('Updated Product')
        expect(requestBody).toContain('Updated Category')
        expect(requestBody).toContain('Updated Brand')
        expect(requestBody).toContain('199.99')
        expect(requestBody).toContain('Updated product description')

        await expect(
            page.getByRole('heading', { name: 'Edit product' }),
        ).not.toBeVisible()
    })

    test('edits a product without replacing its image', async ({
        authenticatedPage: page,
    }) => {
        const updateRequest = page.waitForRequest(
            (request) =>
                /\/api\/products\/1\/?$/.test(request.url()) &&
                request.method() === 'PUT',
        )

        await page
            .getByPlaceholder('Enter product name')
            .fill('Updated Product')

        await page.getByRole('button', { name: 'Save' }).click()

        const request = await updateRequest
        const requestBody = request.postData() ?? ''

        expect(requestBody).toContain('Updated Product')
        expect(requestBody).not.toContain('name="images"')
    })

    test('replaces the product image', async ({ authenticatedPage: page }) => {
        const updateRequest = page.waitForRequest(
            (request) =>
                /\/api\/products\/1\/?$/.test(request.url()) &&
                request.method() === 'PUT',
        )

        await page.getByLabel('File upload').setInputFiles({
            name: 'updated-product-image.png',
            mimeType: 'image/png',
            buffer: Buffer.from(
                'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/WioAAAAASUVORK5CYII=',
                'base64',
            ),
        })

        await expect(
            page.getByRole('img', { name: 'updated-product-image.png' }),
        ).toBeVisible()

        await page.getByRole('button', { name: 'Save' }).click()

        const request = await updateRequest
        const requestBody = request.postData() ?? ''

        expect(requestBody).toContain('updated-product-image.png')
        expect(request.headers()['content-type']).toContain(
            'multipart/form-data',
        )
    })
})

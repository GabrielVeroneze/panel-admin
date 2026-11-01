import { expect, test } from '../fixtures/test'
import { mockProductsList, testProducts } from '../fixtures/products'

test.describe('Products editing', () => {
    let products: typeof testProducts

    test.beforeEach(async ({ authenticatedPage: page }) => {
        products = [...testProducts]

        await mockProductsList(page, products)
        await page.goto('/products')

        await page.getByRole('button', { name: 'Edit Item' }).first().click()

        await expect(
            page.getByRole('heading', { name: 'Edit product' }),
        ).toBeVisible()
    })

    test('prefills the form with existing product data', async ({
        authenticatedPage: page,
    }) => {
        const product = products[0]

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
        const product = products[0]

        const updatedProduct = {
            ...product,
            name: 'Updated Product',
            category: 'Updated Category',
            brand: 'Updated Brand',
            price: 199.99,
            description: 'Updated product description',
        }

        await page.route(/\/api\/products\/1\/?$/, async (route) => {
            if (route.request().method() === 'PUT') {
                products[0] = updatedProduct

                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(updatedProduct),
                })
                return
            }

            await route.fallback()
        })

        await page
            .getByPlaceholder('Enter product name')
            .fill(updatedProduct.name)

        await page
            .getByPlaceholder('Enter category')
            .fill(updatedProduct.category)

        await page.getByPlaceholder('Enter brand').fill(updatedProduct.brand)

        await page.getByPlaceholder('Enter price').fill('199.99')

        await page
            .getByPlaceholder('Enter product details')
            .fill(updatedProduct.description)

        const updateResponsePromise = page.waitForResponse(
            (response) =>
                response.request().method() === 'PUT' &&
                new URL(response.url()).pathname === '/api/products/1',
        )

        await page.getByRole('button', { name: 'Save' }).click()

        const updateResponse = await updateResponsePromise

        expect(updateResponse.status()).toBe(200)
        expect(await updateResponse.json()).toMatchObject(updatedProduct)

        expect(updateResponse.headers()['content-type']).toContain(
            'application/json',
        )

        const request = updateResponse.request()

        expect(request.headers()['content-type']).toContain(
            'multipart/form-data',
        )

        const requestBody = request.postData() ?? ''

        expect(requestBody).toContain(updatedProduct.name)
        expect(requestBody).toContain(updatedProduct.category)
        expect(requestBody).toContain(updatedProduct.brand)
        expect(requestBody).toContain('199.99')
        expect(requestBody).toContain(updatedProduct.description)
        expect(requestBody).not.toContain('name="images"')

        await expect(
            page.getByRole('heading', { name: 'Edit product' }),
        ).not.toBeVisible()

        const updatedProductRow = page
            .getByRole('row')
            .filter({ hasText: updatedProduct.name })

        await expect(updatedProductRow).toBeVisible()
        await expect(updatedProductRow).toContainText(updatedProduct.name)
        await expect(updatedProductRow).toContainText(updatedProduct.category)
        await expect(updatedProductRow).toContainText(updatedProduct.brand)
        await expect(updatedProductRow).toContainText('$200')

        await expect(
            page.getByText(product.name, { exact: true }),
        ).not.toBeVisible()
    })

    test('replaces the product image', async ({ authenticatedPage: page }) => {
        const product = products[0]

        const updatedProduct = {
            ...product,
            images: ['/images/updated-product-image.png'],
        }

        await page.route(/\/api\/products\/1\/?$/, async (route) => {
            if (route.request().method() === 'PUT') {
                products[0] = updatedProduct

                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(updatedProduct),
                })
                return
            }

            await route.fallback()
        })

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

        const updateResponsePromise = page.waitForResponse(
            (response) =>
                response.request().method() === 'PUT' &&
                new URL(response.url()).pathname === '/api/products/1',
        )

        await page.getByRole('button', { name: 'Save' }).click()

        const updateResponse = await updateResponsePromise

        expect(updateResponse.status()).toBe(200)
        expect(await updateResponse.json()).toMatchObject(updatedProduct)

        const request = updateResponse.request()

        expect(request.headers()['content-type']).toContain(
            'multipart/form-data',
        )

        expect(request.postData()).toContain('updated-product-image.png')

        await expect(
            page.getByRole('heading', { name: 'Edit product' }),
        ).not.toBeVisible()

        const updatedProductRow = page.getByRole('row', {
            name: new RegExp(`^${updatedProduct.name}\\s`),
        })

        await expect(updatedProductRow).toBeVisible()
        await expect(updatedProductRow).toContainText(product.name)
        await expect(updatedProductRow).toContainText(product.category)
        await expect(updatedProductRow).toContainText(product.brand)
        await expect(updatedProductRow).toContainText('$100')
    })
})

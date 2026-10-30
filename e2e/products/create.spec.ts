import { expect, test } from '../fixtures/test'
import { mockProductsList } from '../fixtures/products'

test.describe('Products creation', () => {
    test.beforeEach(async ({ authenticatedPage: page }) => {
        await mockProductsList(page)
        await page.goto('/products')
        await page.getByRole('button', { name: 'Add Product' }).click()

        await expect(
            page.getByRole('heading', { name: 'Create product' }),
        ).toBeVisible()
    })

    test('creates a product successfully', async ({
        authenticatedPage: page,
    }) => {
        const createRequest = page.waitForRequest(
            (request) =>
                request.url().includes('/api/products') &&
                request.method() === 'POST',
        )

        await page.getByPlaceholder('Enter product name').fill('New Product')
        await page.getByPlaceholder('Enter category').fill('Electronics')
        await page.getByPlaceholder('Enter brand').fill('Test Brand')
        await page.getByPlaceholder('Enter price').fill('149.99')
        await page
            .getByPlaceholder('Enter product details')
            .fill('Description for the new product')

        await page.getByLabel('File upload').setInputFiles({
            name: 'product-image.png',
            mimeType: 'image/png',
            buffer: Buffer.from(
                'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/WioAAAAASUVORK5CYII=',
                'base64',
            ),
        })

        await expect(
            page.getByRole('img', { name: 'product-image.png' }),
        ).toBeVisible()

        await page.getByRole('button', { name: 'Save' }).click()

        const request = await createRequest

        expect(request.headers()['content-type']).toContain(
            'multipart/form-data',
        )

        const requestBody = request.postData() ?? ''

        expect(requestBody).toContain('New Product')
        expect(requestBody).toContain('Electronics')
        expect(requestBody).toContain('Test Brand')
        expect(requestBody).toContain('149.99')
        expect(requestBody).toContain('Description for the new product')
        expect(requestBody).toContain('product-image.png')

        await expect(
            page.getByRole('heading', { name: 'Create product' }),
        ).not.toBeVisible()
    })

    test('validates required fields', async ({ authenticatedPage: page }) => {
        await page.getByRole('button', { name: 'Save' }).click()

        await expect(page.getByPlaceholder('Enter product name')).toBeVisible()

        await expect(page.getByPlaceholder('Enter category')).toBeVisible()

        await expect(page.getByPlaceholder('Enter brand')).toBeVisible()

        await expect(
            page.getByPlaceholder('Enter product details'),
        ).toBeVisible()

        await expect(page.locator('[aria-label="Upload files"]')).toBeVisible()

        await expect(
            page.getByRole('heading', { name: 'Create product' }),
        ).toBeVisible()
    })

    test('requires at least one image', async ({ authenticatedPage: page }) => {
        await page.getByPlaceholder('Enter product name').fill('New Product')
        await page.getByPlaceholder('Enter category').fill('Electronics')
        await page.getByPlaceholder('Enter brand').fill('Test Brand')
        await page.getByPlaceholder('Enter price').fill('149.99')
        await page
            .getByPlaceholder('Enter product details')
            .fill('Description for the new product')

        await page.getByRole('button', { name: 'Save' }).click()

        await expect(
            page.getByRole('heading', { name: 'Create product' }),
        ).toBeVisible()

        await expect(page.locator('[aria-label="Upload files"]')).toBeVisible()
    })

    test('rejects invalid image formats', async ({
        authenticatedPage: page,
    }) => {
        await page.getByLabel('File upload').setInputFiles({
            name: 'invalid-image.gif',
            mimeType: 'image/gif',
            buffer: Buffer.from('invalid image content'),
        })

        await page.getByPlaceholder('Enter product name').fill('New Product')
        await page.getByPlaceholder('Enter category').fill('Electronics')
        await page.getByPlaceholder('Enter brand').fill('Test Brand')
        await page.getByPlaceholder('Enter price').fill('149.99')
        await page
            .getByPlaceholder('Enter product details')
            .fill('Description for the new product')

        await page.getByRole('button', { name: 'Save' }).click()

        await expect(
            page.getByRole('heading', { name: 'Create product' }),
        ).toBeVisible()
    })

    test('rejects images larger than 5 MB', async ({
        authenticatedPage: page,
    }) => {
        await page.getByLabel('File upload').setInputFiles({
            name: 'large-image.png',
            mimeType: 'image/png',
            buffer: Buffer.alloc(5 * 1024 * 1024 + 1),
        })

        await page.getByPlaceholder('Enter product name').fill('New Product')
        await page.getByPlaceholder('Enter category').fill('Electronics')
        await page.getByPlaceholder('Enter brand').fill('Test Brand')
        await page.getByPlaceholder('Enter price').fill('149.99')
        await page
            .getByPlaceholder('Enter product details')
            .fill('Description for the new product')

        await page.getByRole('button', { name: 'Save' }).click()

        await expect(
            page.getByRole('heading', { name: 'Create product' }),
        ).toBeVisible()
    })
})

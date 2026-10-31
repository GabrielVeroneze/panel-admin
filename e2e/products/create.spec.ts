import { expect, test } from '../fixtures/test'
import {
    createTestProduct,
    mockProductsList,
    testProducts,
} from '../fixtures/products'

test.describe('Products creation', () => {
    test.beforeEach(async ({ authenticatedPage: page }) => {
        await mockProductsList(page, testProducts)
        await page.goto('/products')
        await page.getByRole('button', { name: 'Add Product' }).click()

        await expect(
            page.getByRole('heading', { name: 'Create product' }),
        ).toBeVisible()
    })

    test('creates a product successfully', async ({
        authenticatedPage: page,
    }) => {
        const createdProduct = {
            ...createTestProduct(17),
            name: 'New Product',
            category: 'Electronics',
            brand: 'Test Brand',
            price: 149.99,
            description: 'Description for the new product',
            images: ['/images/product-image.png'],
        }

        const products = [...testProducts]

        await page.route(/\/api\/products\/?(?:\?.*)?$/, async (route) => {
            const request = route.request()

            if (request.method() === 'POST') {
                products.unshift(createdProduct)

                await route.fulfill({
                    status: 201,
                    contentType: 'application/json',
                    body: JSON.stringify(createdProduct),
                })
                return
            }

            await route.fallback()
        })

        const createRequest = page.waitForRequest(
            (request) =>
                new URL(request.url()).pathname === '/api/products' &&
                request.method() === 'POST',
        )

        await page
            .getByPlaceholder('Enter product name')
            .fill(createdProduct.name)
        await page
            .getByPlaceholder('Enter category')
            .fill(createdProduct.category)
        await page.getByPlaceholder('Enter brand').fill(createdProduct.brand)
        await page.getByPlaceholder('Enter price').fill('149.99')
        await page
            .getByPlaceholder('Enter product details')
            .fill(createdProduct.description)

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

        expect(requestBody).toContain(createdProduct.name)
        expect(requestBody).toContain(createdProduct.category)
        expect(requestBody).toContain(createdProduct.brand)
        expect(requestBody).toContain('149.99')
        expect(requestBody).toContain(createdProduct.description)
        expect(requestBody).toContain('product-image.png')

        await expect(
            page.getByRole('heading', { name: 'Create product' }),
        ).not.toBeVisible()

        const createdProductRow = page
            .getByRole('row')
            .filter({ hasText: createdProduct.name })

        await expect(createdProductRow).toBeVisible()
        await expect(createdProductRow).toContainText(createdProduct.name)
        await expect(createdProductRow).toContainText(createdProduct.category)
        await expect(createdProductRow).toContainText(createdProduct.brand)
        await expect(createdProductRow).toContainText('$150')
    })

    test('validates required fields', async ({ authenticatedPage: page }) => {
        await page.getByRole('button', { name: 'Save' }).click()

        await expect(
            page.getByText('Product name must have at least 2 characters'),
        ).toBeVisible()

        await expect(
            page.getByText('Category must have at least 2 characters'),
        ).toBeVisible()

        await expect(
            page.getByText('Brand must have at least 2 characters'),
        ).toBeVisible()

        await expect(
            page.getByText('Details must have at least 5 characters'),
        ).toBeVisible()

        await expect(
            page.getByText('At least one image is required'),
        ).toBeVisible()

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
            page.getByText('At least one image is required'),
        ).toBeVisible()

        await expect(
            page.getByRole('heading', { name: 'Create product' }),
        ).toBeVisible()
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

        await expect(page.getByText('Invalid image format')).toBeVisible()

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
            page.getByText('Image must be smaller than 5MB'),
        ).toBeVisible()

        await expect(
            page.getByRole('heading', { name: 'Create product' }),
        ).toBeVisible()
    })
})

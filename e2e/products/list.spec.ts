import { expect, test } from '../fixtures/test'
import { mockProductsList } from '../fixtures/products'

test.describe('Products list', () => {
    test.beforeEach(async ({ authenticatedPage: page }) => {
        await mockProductsList(page)
        await page.goto('/products')
    })

    test('displays products and pagination information', async ({
        authenticatedPage: page,
    }) => {
        await expect(
            page.getByText('Test Product 1', { exact: true }),
        ).toBeVisible()

        await expect(
            page.getByText('Test Product 15', { exact: true }),
        ).toBeVisible()

        await expect(
            page.getByText('Test Product 16', { exact: true }),
        ).not.toBeVisible()

        await expect(page.getByText('Electronics').first()).toBeVisible()

        await expect(page.getByText('Test Brand').first()).toBeVisible()

        await expect(page.getByText('$100').first()).toBeVisible()

        await expect(
            page.getByText('Showing 1-15 of 16 products'),
        ).toBeVisible()
    })

    test('searches for products by name', async ({
        authenticatedPage: page,
    }) => {
        const searchInput = page.getByPlaceholder('Search for products')

        await searchInput.fill('Test Product 3')

        await expect(
            page.getByText('Test Product 3', { exact: true }),
        ).toBeVisible()

        await expect(
            page.getByText('Test Product 1', { exact: true }),
        ).not.toBeVisible()

        await expect(page.getByText('Showing 1-1 of 1 products')).toBeVisible()
    })

    test('navigates between pages', async ({ authenticatedPage: page }) => {
        await page.getByRole('button', { name: 'Next page' }).click()

        await expect(
            page.getByText('Test Product 16', { exact: true }),
        ).toBeVisible()

        await expect(
            page.getByText('Test Product 1', { exact: true }),
        ).not.toBeVisible()

        await expect(
            page.getByText('Showing 16-16 of 16 products'),
        ).toBeVisible()

        await page.getByRole('button', { name: 'Previous page' }).click()

        await expect(
            page.getByText('Test Product 1', { exact: true }),
        ).toBeVisible()

        await expect(
            page.getByText('Showing 1-15 of 16 products'),
        ).toBeVisible()
    })

    test('displays the empty state when no products match the search', async ({
        authenticatedPage: page,
    }) => {
        await page
            .getByPlaceholder('Search for products')
            .fill('Unknown Product')

        await expect(
            page.getByText('No products', { exact: true }),
        ).toBeVisible()

        await expect(
            page.getByText('There are no products to display.'),
        ).toBeVisible()
    })
})

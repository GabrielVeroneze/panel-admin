import type { Page } from '@playwright/test'

export const createTestProduct = (id: number) => ({
    id,
    name: `Test Product ${id}`,
    category: 'Electronics',
    brand: 'Test Brand',
    price: 99.99,
    description: `Description for test product ${id}`,
    images: ['/images/test-product.png'],
})

export const testProducts = Array.from({ length: 16 }, (_, index) =>
    createTestProduct(index + 1),
)

export const mockProductsList = async (page: Page, products = testProducts) => {
    await page.route(/\/api\/products\/?(?:\?.*)?$/, async (route) => {
        if (route.request().method() !== 'GET') {
            await route.fallback()
            return
        }

        const url = new URL(route.request().url())
        const pageNumber = Number(url.searchParams.get('page') ?? 1)
        const pageSize = Number(url.searchParams.get('pageSize') ?? 15)
        const search = (url.searchParams.get('search') ?? '').toLowerCase()

        const filteredProducts = products.filter(
            (product) =>
                product.name.toLowerCase().includes(search) ||
                product.category.toLowerCase().includes(search) ||
                product.brand.toLowerCase().includes(search),
        )

        const start = (pageNumber - 1) * pageSize

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                list: filteredProducts.slice(start, start + pageSize),
                total: filteredProducts.length,
                page: pageNumber,
                pageSize,
            }),
        })
    })
}

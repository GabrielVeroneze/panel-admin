import type { Page } from '@playwright/test'

export const createTestUser = (id: number) => ({
    id,
    name: `Test User ${id}`,
    email: `user${id}@example.com`,
    phone: '+14155552671',
    image: '/images/test-avatar.png',
    department: 'Engineering',
    company: 'Test Company',
    country: 'Brazil',
    status: 'active' as const,
})

export const testUsers = Array.from({ length: 16 }, (_, index) =>
    createTestUser(index + 1),
)

export const mockUsersList = async (page: Page, users = testUsers) => {
    await page.route(/\/api\/users\/?(?:\?.*)?$/, async (route) => {
        if (route.request().method() !== 'GET') {
            await route.fallback()
            return
        }

        const url = new URL(route.request().url())
        const pageNumber = Number(url.searchParams.get('page') ?? 1)
        const pageSize = Number(url.searchParams.get('pageSize') ?? 15)
        const search = (url.searchParams.get('search') ?? '').toLowerCase()

        const filteredUsers = users.filter(
            (user) =>
                user.name.toLowerCase().includes(search) ||
                user.email.toLowerCase().includes(search) ||
                user.company.toLowerCase().includes(search),
        )

        const start = (pageNumber - 1) * pageSize

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                list: filteredUsers.slice(start, start + pageSize),
                total: filteredUsers.length,
                page: pageNumber,
                pageSize,
            }),
        })
    })
}

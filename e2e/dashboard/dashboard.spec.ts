import { expect, test } from '../fixtures/test'
import { dashboardData, emptyDashboardData } from '../fixtures/dashboard'

test.describe('Dashboard', () => {
    test('displays dashboard data successfully', async ({
        authenticatedPage: page,
    }) => {
        await page.route(/\/api\/dashboard\/?$/, async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(dashboardData),
            })
        })

        await page.goto('/')

        // Dashboard sections
        await expect(
            page.getByRole('heading', { name: 'Sales', exact: true }),
        ).toBeVisible()

        await expect(page.getByText('Today Sales')).toBeVisible()

        await expect(page.getByText('Today Visitors')).toBeVisible()

        await expect(page.getByText('This Week Visitors')).toBeVisible()

        await expect(
            page.getByRole('heading', { name: 'Sessions by Country' }),
        ).toBeVisible()

        await expect(
            page.getByRole('heading', { name: 'Latest Customers' }),
        ).toBeVisible()

        await expect(
            page.getByRole('heading', { name: 'Sessions by Device' }),
        ).toBeVisible()

        await expect(
            page.getByRole('heading', { name: 'Transactions' }),
        ).toBeVisible()

        // Representative data from the sections
        await expect(page.getByText('Ethan Walker')).toBeVisible()

        await expect(page.getByText('ethan.walker@example.com')).toBeVisible()

        await expect(
            page.locator('strong').filter({ hasText: 'United States' }),
        ).toBeVisible()

        await expect(page.getByText('Bonnie Green')).toBeVisible()

        await expect(page.getByText('Completed')).toBeVisible()

        await expect(page.getByText('Cancelled')).toBeVisible()
    })

    test('displays loading state while fetching dashboard data', async ({
        authenticatedPage: page,
    }) => {
        let releaseResponse!: () => void

        const responseGate = new Promise<void>((resolve) => {
            releaseResponse = resolve
        })

        await page.route(/\/api\/dashboard\/?$/, async (route) => {
            await responseGate

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(dashboardData),
            })
        })

        try {
            const requestPromise = page.waitForRequest(
                (request) =>
                    request.url().includes('/api/dashboard') &&
                    request.method() === 'GET',
            )

            await page.goto('/')
            await requestPromise

            // The response is still pending, so dashboard data must not be visible.
            await expect(page.getByText('Ethan Walker')).not.toBeVisible()

            await expect(page.getByText('No customers')).not.toBeVisible()

            releaseResponse()

            await expect(page.getByText('Ethan Walker')).toBeVisible()

            await expect(
                page.getByRole('heading', { name: 'Transactions' }),
            ).toBeVisible()
        } finally {
            releaseResponse()
        }
    })

    test('displays empty states when dashboard has no data', async ({
        authenticatedPage: page,
    }) => {
        await page.route(/\/api\/dashboard\/?$/, async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(emptyDashboardData),
            })
        })

        await page.goto('/')

        await expect(page.getByText('No sales data')).toBeVisible()
        await expect(page.getByText('No sales today.')).toBeVisible()
        await expect(page.getByText('No visitors recorded.')).toBeVisible()
        await expect(page.getByText('No visitors this week.')).toBeVisible()
        await expect(
            page.getByText('No country sessions available.'),
        ).toBeVisible()
        await expect(page.getByText('No recent customers found.')).toBeVisible()
        await expect(page.getByText('No sessions by device.')).toBeVisible()
        await expect(
            page.getByText('There are no transactions yet.'),
        ).toBeVisible()
    })
})

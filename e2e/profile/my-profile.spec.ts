import { test, expect } from '../fixtures/test'
import { mockMyProfile, testProfile } from '../fixtures/profile'

test.describe('My profile', () => {
    test('displays profile data successfully', async ({
        authenticatedPage: page,
    }) => {
        await mockMyProfile(page)

        await page.goto('/profile')

        await expect(
            page.getByRole('heading', {
                name: testProfile.name,
            }),
        ).toBeVisible()

        await expect(
            page.getByText(testProfile.role, { exact: true }),
        ).toBeVisible()

        await expect(
            page.getByText(testProfile.country, { exact: true }),
        ).toBeVisible()

        await expect(page.getByText(testProfile.contact.email)).toBeVisible()

        await expect(page.getByText('About me')).toBeVisible()

        await expect(page.getByText('Admin Dashboard')).toBeVisible()

        await expect(page.getByText('Developer Laptop')).toBeVisible()

        await expect(page.getByText('Senior Front End Developer')).toBeVisible()

        await expect(
            page.getByText('Master of Software Engineering'),
        ).toBeVisible()
    })

    test('displays loading state while fetching profile data', async ({
        authenticatedPage: page,
    }) => {
        let resolveResponse!: () => void

        const responsePromise = new Promise<void>((resolve) => {
            resolveResponse = resolve
        })

        await page.route(/\/api\/me\/?$/, async (route) => {
            await responsePromise

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(testProfile),
            })
        })

        const requestPromise = page.waitForRequest(
            (request) =>
                request.url().includes('/api/me') && request.method() === 'GET',
        )

        await page.goto('/profile')
        await requestPromise

        await expect(
            page.getByRole('heading', {
                name: testProfile.name,
            }),
        ).not.toBeVisible()

        resolveResponse()

        await expect(
            page.getByRole('heading', {
                name: testProfile.name,
            }),
        ).toBeVisible()
    })

    test('displays unavailable states when profile request fails', async ({
        authenticatedPage: page,
    }) => {
        await page.route(/\/api\/me\/?$/, async (route) => {
            await route.fulfill({
                status: 404,
                contentType: 'application/json',
                body: JSON.stringify(null),
            })
        })

        await page.goto('/profile')

        await expect(
            page.getByText('Profile details unavailable'),
        ).toBeVisible()

        await expect(page.getByText('Activity data unavailable')).toBeVisible()

        await expect(page.getByText('Timeline unavailable')).toBeVisible()
    })
})

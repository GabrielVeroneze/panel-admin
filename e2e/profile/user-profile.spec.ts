import { test, expect } from '../fixtures/test'
import { mockUserProfile, testUserProfile } from '../fixtures/profile'

test.describe('User profile', () => {
    test('displays user profile data successfully', async ({
        authenticatedPage: page,
    }) => {
        await mockUserProfile(page, testUserProfile.id)

        await page.goto(`/users/${testUserProfile.id}`)

        await expect(
            page.getByRole('heading', {
                name: testUserProfile.name,
            }),
        ).toBeVisible()

        await expect(
            page.getByText(testUserProfile.role, {
                exact: true,
            }),
        ).toBeVisible()

        await expect(
            page.getByText(testUserProfile.country, {
                exact: true,
            }),
        ).toBeVisible()

        await expect(
            page.getByText(testUserProfile.contact.email),
        ).toBeVisible()

        await expect(page.getByText('About me')).toBeVisible()

        await expect(page.getByText('Design System Kit')).toBeVisible()

        await expect(page.getByText('Design System Template')).toBeVisible()

        await expect(
            page.getByRole('heading', {
                name: 'Lead Designer',
                exact: true,
            }),
        ).toBeVisible()

        await expect(
            page.getByText('Master of Visual Communication'),
        ).toBeVisible()
    })

    test('displays loading state while fetching user profile data', async ({
        authenticatedPage: page,
    }) => {
        let resolveResponse!: () => void

        const responsePromise = new Promise<void>((resolve) => {
            resolveResponse = resolve
        })

        await page.route(
            new RegExp(`/api/users/${testUserProfile.id}/?$`),
            async (route) => {
                await responsePromise

                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify(testUserProfile),
                })
            },
        )

        const requestPromise = page.waitForRequest(
            (request) =>
                request.url().includes(`/api/users/${testUserProfile.id}`) &&
                request.method() === 'GET',
        )

        await page.goto(`/users/${testUserProfile.id}`)
        await requestPromise

        await expect(
            page.getByRole('heading', {
                name: testUserProfile.name,
            }),
        ).not.toBeVisible()

        resolveResponse()

        await expect(
            page.getByRole('heading', {
                name: testUserProfile.name,
            }),
        ).toBeVisible()
    })

    test('displays unavailable states when user does not exist', async ({
        authenticatedPage: page,
    }) => {
        const userId = 999

        await mockUserProfile(page, userId, null)

        await page.goto(`/users/${userId}`)

        await expect(
            page.getByText('Profile details unavailable'),
        ).toBeVisible()

        await expect(page.getByText('Activity data unavailable')).toBeVisible()

        await expect(page.getByText('Timeline unavailable')).toBeVisible()
    })
})

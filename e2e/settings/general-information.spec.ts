import { expect, test } from '../fixtures/test'
import { mockSettings, testSettings } from '../fixtures/settings'

test.describe('General information settings', () => {
    test.beforeEach(async ({ authenticatedPage: page }) => {
        await mockSettings(page)
        await page.goto('/settings')
    })

    test('updates general information successfully', async ({
        authenticatedPage: page,
    }) => {
        const generalInformation = page
            .getByRole('heading', { name: 'General information' })
            .locator('..')
            .locator('..')

        const updatedInformation = {
            ...testSettings.generalInformation,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            role: 'Software Engineer',
        }

        await page.route('**/api/settings/general', async (route) => {
            if (route.request().method() !== 'PUT') {
                await route.fallback()
                return
            }

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(updatedInformation),
            })
        })

        await generalInformation
            .getByRole('textbox', { name: 'First Name' })
            .fill(updatedInformation.firstName)

        await generalInformation
            .getByRole('textbox', { name: 'Last Name' })
            .fill(updatedInformation.lastName)

        await generalInformation
            .getByRole('textbox', { name: 'Email' })
            .fill(updatedInformation.email)

        await generalInformation
            .getByRole('textbox', { name: 'Role' })
            .fill(updatedInformation.role)

        await generalInformation.getByRole('button', { name: 'Update' }).click()

        await expect(
            generalInformation.getByRole('textbox', { name: 'First Name' }),
        ).toHaveValue(updatedInformation.firstName)

        await expect(
            generalInformation.getByRole('textbox', { name: 'Last Name' }),
        ).toHaveValue(updatedInformation.lastName)

        await expect(
            generalInformation.getByRole('textbox', { name: 'Email' }),
        ).toHaveValue(updatedInformation.email)

        await expect(
            generalInformation.getByRole('textbox', { name: 'Role' }),
        ).toHaveValue(updatedInformation.role)

        await expect(
            page.getByRole('heading', { name: 'John Doe' }),
        ).toBeVisible()

        await expect(
            page.getByText('Software Engineer', { exact: true }),
        ).toBeVisible()
    })

    test('displays validation errors for invalid information', async ({
        authenticatedPage: page,
    }) => {
        const generalInformation = page
            .getByRole('heading', { name: 'General information' })
            .locator('..')
            .locator('..')

        await generalInformation
            .getByRole('textbox', { name: 'First Name' })
            .fill('J')

        await generalInformation
            .getByRole('textbox', { name: 'Email' })
            .fill('invalid-email')

        await generalInformation.getByRole('button', { name: 'Update' }).click()

        await expect(
            generalInformation.getByText(
                'First name must have at least 2 characters',
            ),
        ).toBeVisible()

        await expect(
            generalInformation.getByText('Invalid email format'),
        ).toBeVisible()
    })
})

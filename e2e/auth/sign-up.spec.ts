import { expect, test } from '../fixtures/test'
import type { SignUpPayload } from '@/features/auth/types'

test.describe('Sign up', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/auth/sign-up')
    })

    test('signs up successfully and navigates to sign in', async ({ page }) => {
        let requestBody: SignUpPayload | undefined

        await page.route('**/api/auth/sign-up', async (route) => {
            requestBody = route.request().postDataJSON()

            await route.fulfill({
                status: 201,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'User created successfully',
                }),
            })
        })

        await page.getByLabel('Full Name').fill('John Doe')
        await page.getByLabel('Your Email').fill('john.doe@example.com')
        await page.getByLabel('Password', { exact: true }).fill('Password123!')
        await page.getByLabel('Confirm Password').fill('Password123!')

        const termsCheckbox = page.getByRole('checkbox', {
            name: 'I accept the Terms & Conditions',
        })

        await termsCheckbox.locator('..').click()

        await page.getByRole('button', { name: 'Create account' }).click()

        await expect(page).toHaveURL('/auth/sign-in')

        expect(requestBody).toEqual({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: 'Password123!',
        })
    })

    test('displays validation errors for invalid information', async ({
        page,
    }) => {
        await page.getByLabel('Full Name').fill('A')
        await page.getByLabel('Your Email').fill('invalid-email')
        await page.getByLabel('Password', { exact: true }).fill('weak')
        await page.getByLabel('Confirm Password').fill('different')

        await page.getByRole('button', { name: 'Create account' }).click()

        await expect(
            page.getByText('Name must have at least 2 characters'),
        ).toBeVisible()

        await expect(page.getByText('Invalid email format')).toBeVisible()

        await expect(
            page.getByText('Password must be at least 8 characters'),
        ).toBeVisible()

        await expect(page.getByText('Passwords do not match')).toBeVisible()

        await expect(page).toHaveURL('/auth/sign-up')
    })

    test('displays an error when the email is already registered', async ({
        page,
    }) => {
        await page.route('**/api/auth/sign-up', async (route) => {
            await route.fulfill({
                status: 409,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'Email already registered',
                }),
            })
        })

        await page.getByLabel('Full Name').fill('John Doe')
        await page.getByLabel('Your Email').fill('john.doe@example.com')
        await page.getByLabel('Password', { exact: true }).fill('Password123!')
        await page.getByLabel('Confirm Password').fill('Password123!')

        const termsCheckbox = page.getByRole('checkbox', {
            name: 'I accept the Terms & Conditions',
        })

        await termsCheckbox.locator('..').click()

        await page.getByRole('button', { name: 'Create account' }).click()

        await expect(page.getByText('Unable to create account')).toBeVisible()

        await expect(page).toHaveURL('/auth/sign-up')
    })
})

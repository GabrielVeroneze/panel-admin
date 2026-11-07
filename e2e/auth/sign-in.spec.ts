import { expect, test } from '@playwright/test'
import {
    mockFailedSignIn,
    mockSuccessfulSignIn,
    testSession,
} from '../fixtures/auth'

test.describe('Sign in', () => {
    test('signs in successfully and navigates to the dashboard', async ({
        page,
    }) => {
        await mockSuccessfulSignIn(page)

        await page.goto('/auth/sign-in')

        await page.getByLabel('Your Email').fill('test@example.com')
        await page.getByLabel('Password').fill('ValidPassword123!')
        await page.getByRole('button', { name: 'Sign In' }).click()

        await expect(page).toHaveURL('/')

        const storedSession = await page.evaluate(() => {
            return (
                localStorage.getItem('auth-session') ??
                sessionStorage.getItem('auth-session')
            )
        })

        expect(storedSession).not.toBeNull()
        expect(JSON.parse(storedSession!)).toEqual(testSession)
    })

    test('displays an error when credentials are invalid', async ({ page }) => {
        await mockFailedSignIn(page)

        await page.goto('/auth/sign-in')

        await page.getByLabel('Your Email').fill('test@example.com')
        await page.getByLabel('Password').fill('WrongPassword123!')
        await page.getByRole('button', { name: 'Sign In' }).click()

        await expect(page.getByText('Invalid credentials')).toBeVisible()
        await expect(page).toHaveURL('/auth/sign-in')
    })

    test('displays validation errors when required fields are empty', async ({
        page,
    }) => {
        await page.goto('/auth/sign-in')

        await page.getByRole('button', { name: 'Sign In' }).click()

        await expect(page.getByText('Email is required')).toBeVisible()
        await expect(page.getByText('Password is required')).toBeVisible()
        await expect(page).toHaveURL('/auth/sign-in')
    })
})

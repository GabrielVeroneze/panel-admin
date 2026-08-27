import { describe, expect, it } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import { SignInPage } from '@/features/auth/pages/SignInPage/SignInPage'
import { renderWithProviders } from '@/tests/test-utils'
import { setupStore } from '@/tests/setupStore'
import userEvent from '@testing-library/user-event'

describe('Auth - login integration', () => {
    it('authenticates the user with valid credentials', async () => {
        const user = userEvent.setup()
        const store = setupStore()

        renderWithProviders(<SignInPage />, {
            store,
        })

        const emailInput = screen.getByPlaceholderText('Enter your email')

        const passwordInput = screen.getByPlaceholderText('Enter your password')

        const submitButton = screen.getByRole('button', {
            name: 'Sign In',
        })

        await user.type(emailInput, 'neil.sims1@example.com')

        await user.type(passwordInput, 'Password123*')

        await user.click(submitButton)

        await waitFor(() => {
            const state = store.getState().auth

            expect(state.authenticated).toBe(true)
            expect(state.loading).toBe(false)
            expect(state.error).toBeNull()
            expect(state.user?.email).toBe('neil.sims1@example.com')
            expect(state.token).not.toBeNull()
        })
    })

    it('shows an error when credentials are invalid', async () => {
        const user = userEvent.setup()
        const store = setupStore()

        renderWithProviders(<SignInPage />, {
            store,
        })

        const emailInput = screen.getByPlaceholderText('Enter your email')

        const passwordInput = screen.getByPlaceholderText('Enter your password')

        const submitButton = screen.getByRole('button', {
            name: 'Sign In',
        })

        await user.type(emailInput, 'invalid@example.com')

        await user.type(passwordInput, 'WrongPassword123*')

        await user.click(submitButton)

        expect(
            await screen.findByText('Invalid credentials'),
        ).toBeInTheDocument()

        await waitFor(() => {
            const state = store.getState().auth

            expect(state.loading).toBe(false)
            expect(state.error).toBe('Invalid credentials')
        })
    })
})

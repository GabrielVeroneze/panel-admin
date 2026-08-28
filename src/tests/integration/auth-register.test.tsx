import { describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor } from '@testing-library/react'
import { SignUpPage } from '@/features/auth'
import { setupStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'
import userEvent from '@testing-library/user-event'

describe('Auth - register integration', () => {
    it('creates an account successfully with valid data', async () => {
        const user = userEvent.setup()
        const store = setupStore()

        renderWithProviders(<SignUpPage />, {
            store,
        })

        await user.type(screen.getByLabelText('Full Name'), 'John Doe')

        await user.type(screen.getByLabelText('Your Email'), 'john@example.com')

        await user.type(screen.getByLabelText('Password'), 'Password123!')

        await user.type(
            screen.getByLabelText('Confirm Password'),
            'Password123!',
        )

        await user.click(
            screen.getByRole('checkbox', {
                name: 'I accept the Terms & Conditions',
            }),
        )

        await user.click(
            screen.getByRole('button', {
                name: 'Create account',
            }),
        )

        await waitFor(() => {
            const state = store.getState().auth

            expect(state.loading).toBe(false)
            expect(state.error).toBeNull()
        })

        expect(
            screen.getByRole('button', {
                name: 'Create account',
            }),
        ).toBeInTheDocument()
    })

    it('shows an error when account creation fails', async () => {
        const user = userEvent.setup()

        server.use(
            http.post('/auth/sign-up', () => {
                return HttpResponse.json(
                    {
                        message: 'Unable to create account',
                    },
                    {
                        status: 400,
                    },
                )
            }),
        )

        const store = setupStore()

        renderWithProviders(<SignUpPage />, {
            store,
        })

        await user.type(screen.getByLabelText('Full Name'), 'John Doe')

        await user.type(screen.getByLabelText('Your Email'), 'john@example.com')

        await user.type(screen.getByLabelText('Password'), 'Password123!')

        await user.type(
            screen.getByLabelText('Confirm Password'),
            'Password123!',
        )

        await user.click(
            screen.getByRole('checkbox', {
                name: 'I accept the Terms & Conditions',
            }),
        )

        await user.click(
            screen.getByRole('button', {
                name: 'Create account',
            }),
        )

        await waitFor(() => {
            const state = store.getState().auth

            expect(state.loading).toBe(false)
            expect(state.error).toBe('Unable to create account')
        })

        expect(screen.getByText('Unable to create account')).toBeInTheDocument()
    })
})

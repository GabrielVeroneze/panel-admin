import { describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor } from '@testing-library/react'
import { AuthenticatedHeader } from '@/shared/layout'
import { getSession } from '@/shared/utils'
import { signInThunk } from '@/features/auth/store'
import { setupStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'
import userEvent from '@testing-library/user-event'

describe('Auth - logout integration', () => {
    it('logs out successfully and clears the session', async () => {
        const store = setupStore()

        await store
            .dispatch(
                signInThunk({
                    email: 'neil.sims1@example.com',
                    password: 'Password123*',
                    rememberMe: true,
                }),
            )
            .unwrap()

        const session = getSession()

        expect(session).not.toBeNull()

        const user = store.getState().auth.user

        expect(user).not.toBeNull()

        renderWithProviders(<AuthenticatedHeader user={user!} />, { store })

        const userEventSetup = userEvent.setup()

        await userEventSetup.click(
            screen.getByRole('button', {
                name: 'Avatar do usuário',
            }),
        )

        await userEventSetup.click(
            screen.getByRole('button', {
                name: 'Sign out',
            }),
        )

        await waitFor(() => {
            const state = store.getState().auth

            expect(state.loading).toBe(false)
            expect(state.authenticated).toBe(false)
            expect(state.token).toBeNull()
            expect(state.user).toBeNull()
            expect(state.error).toBeNull()
        })

        expect(getSession()).toBeNull()
    })

    it('shows an error and keeps the session when logout fails', async () => {
        const store = setupStore()

        await store
            .dispatch(
                signInThunk({
                    email: 'neil.sims1@example.com',
                    password: 'Password123*',
                    rememberMe: true,
                }),
            )
            .unwrap()

        const session = getSession()

        expect(session).not.toBeNull()

        const user = store.getState().auth.user

        expect(user).not.toBeNull()

        server.use(
            http.post('/api/auth/sign-out', () => {
                return HttpResponse.json(
                    {
                        message: 'Unable to logout',
                    },
                    {
                        status: 500,
                    },
                )
            }),
        )

        renderWithProviders(<AuthenticatedHeader user={user!} />, { store })

        const userEventSetup = userEvent.setup()

        await userEventSetup.click(
            screen.getByRole('button', {
                name: 'Avatar do usuário',
            }),
        )

        await userEventSetup.click(
            screen.getByRole('button', {
                name: 'Sign out',
            }),
        )

        await waitFor(() => {
            const state = store.getState().auth

            expect(state.loading).toBe(false)
            expect(state.authenticated).toBe(true)
            expect(state.token).toBe(session!.token)
            expect(state.user).not.toBeNull()
            expect(state.error).toBe('Unable to logout')
        })

        expect(getSession()).toEqual(session)
    })
})

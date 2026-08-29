import { describe, expect, it } from 'vitest'
import { waitFor } from '@testing-library/react'
import { AppInitializer } from '@/app'
import { renderWithProviders } from '@/tests/test-utils'
import { setupStore } from '@/tests/setupStore'
import { clearSessionStorage, getSession } from '@/shared/utils'
import { signInThunk } from '@/features/auth/store'

describe('Auth - current user integration', () => {
    it('loads the current user when an active session exists', async () => {
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

        renderWithProviders(
            <AppInitializer>
                <div>Application</div>
            </AppInitializer>,
            { store },
        )

        await waitFor(() => {
            const state = store.getState().auth

            expect(state.loading).toBe(false)
            expect(state.authenticated).toBe(true)
            expect(state.user).not.toBeNull()
            expect(state.user?.id).toBe(1)
            expect(state.error).toBeNull()
        })

        expect(getSession()).not.toBeNull()
    })

    it('clears the session when the current user request fails', async () => {
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

        expect(getSession()).not.toBeNull()

        const { server } = await import('@/mocks/server')
        const { http, HttpResponse } = await import('msw')

        server.use(
            http.get('/api/auth/me', () => {
                return HttpResponse.json(
                    {
                        message: 'Unauthorized',
                    },
                    {
                        status: 401,
                    },
                )
            }),
        )

        renderWithProviders(
            <AppInitializer>
                <div>Application</div>
            </AppInitializer>,
            { store },
        )

        await waitFor(() => {
            const state = store.getState().auth

            expect(state.loading).toBe(false)
            expect(state.authenticated).toBe(false)
            expect(state.user).toBeNull()
            expect(state.token).toBeNull()
        })

        expect(getSession()).toBeNull()
    })

    it('does not fetch the current user when there is no active session', async () => {
        const store = setupStore()

        clearSessionStorage()

        renderWithProviders(
            <AppInitializer>
                <div>Application</div>
            </AppInitializer>,
            { store },
        )

        await waitFor(() => {
            const state = store.getState().auth

            expect(state.loading).toBe(false)
            expect(state.authenticated).toBe(false)
            expect(state.user).toBeNull()
            expect(state.token).toBeNull()
            expect(state.error).toBeNull()
        })
    })
})

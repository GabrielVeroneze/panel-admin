import { beforeEach, describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { AppInitializer } from '@/app'
import { ProtectedRoute } from '@/shared/auth'
import { getSession } from '@/shared/utils'
import { authReducer } from '@/features/auth/store'
import { dashboardReducer } from '@/features/dashboard/store'
import { productsReducer } from '@/features/products/store'
import { profileReducer } from '@/features/profile/store'
import { settingsReducer } from '@/features/settings/store'
import { usersReducer } from '@/features/users/store'
import { signInThunk } from '@/features/auth/store'
import { setupStore } from '@/tests/setupStore'
import { server } from '@/mocks/server'

const createProtectedRouter = () =>
    createMemoryRouter(
        [
            {
                path: '/auth/sign-in',
                element: <h1>Sign in</h1>,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: '/users',
                        element: <h1>Protected Users</h1>,
                    },
                ],
            },
        ],
        {
            initialEntries: ['/users'],
        },
    )

const createPersistedSession = async () => {
    const previousStore = setupStore()

    await previousStore
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

    return session!
}

const createStoreWithPersistedSession = (token: string) =>
    configureStore({
        reducer: {
            dashboard: dashboardReducer,
            users: usersReducer,
            products: productsReducer,
            profile: profileReducer,
            settings: settingsReducer,
            auth: authReducer,
        },
        preloadedState: {
            auth: {
                user: null,
                token,
                authenticated: true,
                loading: true,
                error: null,
            },
        },
    })

describe('Auth - session recovery integration', () => {
    beforeEach(() => {
        localStorage.clear()
        sessionStorage.clear()
    })

    it('restores an existing session and allows access to a protected route without signing in again', async () => {
        // Simulate a session persisted by a previous application run.
        const session = await createPersistedSession()

        expect(getSession()).toEqual(session)

        // Simulate the Redux state created when the app loads with this session.
        const store = createStoreWithPersistedSession(session.token)

        expect(store.getState().auth.user).toBeNull()
        expect(store.getState().auth.token).toBe(session.token)
        expect(store.getState().auth.loading).toBe(true)

        const initialization = render(
            <Provider store={store}>
                <AppInitializer>
                    <div>Application</div>
                </AppInitializer>
            </Provider>,
        )

        expect(screen.getByText('Application')).toBeInTheDocument()

        // The current user is recovered through /auth/me.
        await waitFor(() => {
            const auth = store.getState().auth

            expect(auth.loading).toBe(false)
            expect(auth.authenticated).toBe(true)
            expect(auth.user).not.toBeNull()
            expect(auth.user?.id).toBe(session.userId)
            expect(auth.user?.email).toBe('neil.sims1@example.com')
            expect(auth.token).toBe(session.token)
            expect(auth.error).toBeNull()
        })

        // Unmount the initializer before testing the protected route separately.
        initialization.unmount()

        const router = createProtectedRouter()

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>,
        )

        expect(
            await screen.findByRole('heading', {
                name: 'Protected Users',
            }),
        ).toBeInTheDocument()

        expect(router.state.location.pathname).toBe('/users')
        expect(getSession()).toEqual(session)
    })

    it('clears an expired session and redirects unauthenticated users away from protected content', async () => {
        // Simulate an existing session that the API now rejects.
        const session = await createPersistedSession()

        expect(getSession()).toEqual(session)

        server.use(
            http.get('/api/auth/me', () =>
                HttpResponse.json(
                    {
                        message: 'Unauthorized',
                    },
                    {
                        status: 401,
                    },
                ),
            ),
        )

        const store = createStoreWithPersistedSession(session.token)
        const router = createProtectedRouter()

        render(
            <Provider store={store}>
                <AppInitializer>
                    <RouterProvider router={router} />
                </AppInitializer>
            </Provider>,
        )

        // The rejected current-user request should invalidate the session.
        await waitFor(() => {
            const auth = store.getState().auth

            expect(auth.loading).toBe(false)
            expect(auth.authenticated).toBe(false)
            expect(auth.user).toBeNull()
            expect(auth.token).toBeNull()
            expect(getSession()).toBeNull()
        })

        await waitFor(() => {
            expect(router.state.location.pathname).toBe('/auth/sign-in')
        })

        expect(
            screen.getByRole('heading', {
                name: 'Sign in',
            }),
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'Protected Users',
            }),
        ).not.toBeInTheDocument()
    })
})

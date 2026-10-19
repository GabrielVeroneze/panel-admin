import { beforeEach, describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { createMemoryRouter, Link, Outlet, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { act, render, screen, waitFor } from '@testing-library/react'
import { AppInitializer } from '@/app'
import { ProtectedRoute } from '@/shared/auth'
import { Header } from '@/shared/layout'
import { getSession } from '@/shared/utils'
import { SignInPage } from '@/features/auth'
import { UsersPage } from '@/features/users'
import { setupStore } from '@/tests/setupStore'
import { server } from '@/mocks/server'
import userEvent from '@testing-library/user-event'

const usersResponse = {
    list: [
        {
            id: 1,
            name: 'Gabriel Veroneze',
            email: 'gabriel@example.com',
            phone: '+5511999999999',
            image: 'gabriel.jpg',
            department: 'Engineering',
            company: 'Acme',
            country: 'Brazil',
            status: 'active' as const,
        },
        {
            id: 2,
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+12025550123',
            image: 'john.jpg',
            department: 'Backend Developer',
            company: 'Tech Corp',
            country: 'United States',
            status: 'offline' as const,
        },
    ],
    total: 2,
    page: 1,
    pageSize: 15,
}

const ProtectedLayout = () => (
    <>
        <Header />
        <Outlet />
    </>
)

const DashboardTestPage = () => (
    <main>
        <h1>Dashboard</h1>
        <Link to="/users">Users</Link>
    </main>
)

const createTestRouter = () =>
    createMemoryRouter(
        [
            {
                path: '/auth/sign-in',
                element: <SignInPage />,
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: '/',
                        element: <ProtectedLayout />,
                        children: [
                            {
                                index: true,
                                element: <DashboardTestPage />,
                            },
                            {
                                path: 'users',
                                element: <UsersPage />,
                            },
                        ],
                    },
                ],
            },
        ],
        {
            initialEntries: ['/auth/sign-in'],
        },
    )

const renderApplication = () => {
    const store = setupStore()
    const router = createTestRouter()

    render(
        <Provider store={store}>
            <AppInitializer>
                <RouterProvider router={router} />
            </AppInitializer>
        </Provider>,
    )

    return { store, router }
}

describe('Auth - Users integration', () => {
    beforeEach(() => {
        localStorage.clear()
        sessionStorage.clear()

        server.use(
            http.get('/api/users', () => HttpResponse.json(usersResponse)),
        )
    })

    it('logs in, loads users, then logs out and blocks protected content', async () => {
        const user = userEvent.setup()
        const { store, router } = renderApplication()

        // 1. Sign in through the real form.
        await user.type(
            screen.getByLabelText(/email/i),
            'neil.sims1@example.com',
        )

        await user.type(screen.getByLabelText(/password/i), 'Password123*')

        const rememberMe = screen.queryByRole('checkbox')

        if (rememberMe) {
            await user.click(rememberMe)
        }

        await user.click(screen.getByRole('button', { name: /sign in/i }))

        // 2. Verify that authentication succeeded.
        await waitFor(() => {
            const auth = store.getState().auth

            expect(auth.authenticated).toBe(true)
            expect(auth.user).not.toBeNull()
            expect(auth.user?.email).toBe('neil.sims1@example.com')
            expect(auth.token).not.toBeNull()
            expect(auth.loading).toBe(false)
            expect(getSession()).not.toBeNull()
        })

        // 3. Verify access to protected content.
        expect(
            await screen.findByRole('heading', {
                name: 'Dashboard',
            }),
        ).toBeInTheDocument()

        // 4. Navigate to Users.
        await user.click(screen.getByRole('link', { name: 'Users' }))

        // 5. Verify that the users are loaded and displayed.
        expect(await screen.findByText('Gabriel Veroneze')).toBeInTheDocument()

        expect(await screen.findByText('John Doe')).toBeInTheDocument()

        await waitFor(() => {
            expect(store.getState().users.loading).toBe(false)
            expect(store.getState().users.data?.list).toHaveLength(2)
        })

        // 6. Open the authenticated user's menu.
        await user.click(
            screen.getByRole('button', {
                name: 'Avatar do usuário',
            }),
        )

        // 7. Sign out through the real header action.
        await user.click(
            screen.getByRole('button', {
                name: 'Sign out',
            }),
        )

        // 8. Verify that the session and authentication state are cleared.
        await waitFor(() => {
            const auth = store.getState().auth

            expect(auth.loading).toBe(false)
            expect(auth.authenticated).toBe(false)
            expect(auth.token).toBeNull()
            expect(auth.user).toBeNull()
            expect(auth.error).toBeNull()
            expect(getSession()).toBeNull()
            expect(router.state.location.pathname).toBe('/auth/sign-in')
        })

        // 9. Verify that protected content is no longer visible.
        expect(
            screen.queryByRole('heading', {
                name: 'Dashboard',
            }),
        ).not.toBeInTheDocument()

        expect(screen.queryByText('Gabriel Veroneze')).not.toBeInTheDocument()

        // 10. Attempt to access the protected route directly.
        await act(async () => {
            await router.navigate('/users')
        })

        await waitFor(() => {
            expect(router.state.location.pathname).toBe('/auth/sign-in')
        })

        expect(
            screen.getByRole('button', { name: /sign in/i }),
        ).toBeInTheDocument()

        expect(screen.queryByText('Gabriel Veroneze')).not.toBeInTheDocument()
    })

    it('redirects unauthenticated users away from the Users page', async () => {
        const { store, router } = renderApplication()

        await act(async () => {
            await router.navigate('/users')
        })

        await waitFor(() => {
            expect(router.state.location.pathname).toBe('/auth/sign-in')
        })

        expect(store.getState().auth.authenticated).toBe(false)

        expect(
            screen.getByRole('button', { name: /sign in/i }),
        ).toBeInTheDocument()

        expect(screen.queryByText('Gabriel Veroneze')).not.toBeInTheDocument()
    })
})

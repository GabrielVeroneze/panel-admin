import { beforeEach, describe, expect, it } from 'vitest'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { act, render, screen, waitFor } from '@testing-library/react'
import { AppLayout } from '@/shared/layout'
import { ProtectedRoute } from '@/shared/auth'
import { clearSessionStorage } from '@/shared/utils'
import { SignInPage } from '@/features/auth'
import { clearSession } from '@/features/auth/store'
import { ProductsPage } from '@/features/products'
import { setupStore } from '@/tests/setupStore'
import { server } from '@/mocks/server'
import userEvent from '@testing-library/user-event'

const createAppRouter = (initialEntries: string[] = ['/auth/sign-in']) =>
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
                        element: <AppLayout />,
                        children: [
                            {
                                index: true,
                                element: <h1>Dashboard</h1>,
                            },
                            {
                                path: 'products',
                                element: <ProductsPage />,
                            },
                        ],
                    },
                ],
            },
        ],
        {
            initialEntries,
        },
    )

describe('Auth - products integration', () => {
    beforeEach(() => {
        clearSessionStorage()
        localStorage.clear()
        sessionStorage.clear()
        server.resetHandlers()
    })

    it('logs in, accesses products, loads the list and logs out successfully', async () => {
        const user = userEvent.setup()
        const store = setupStore()

        store.dispatch(clearSession())

        const router = createAppRouter()

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>,
        )

        // Sign in through the actual form.
        await user.type(
            screen.getByPlaceholderText('Enter your email'),
            'neil.sims1@example.com',
        )

        await user.type(
            screen.getByPlaceholderText('Enter your password'),
            'Password123*',
        )

        await user.click(
            screen.getByRole('button', {
                name: 'Sign In',
            }),
        )

        // Wait for authentication to finish successfully.
        await waitFor(() => {
            const auth = store.getState().auth

            expect(auth.loading).toBe(false)
            expect(auth.authenticated).toBe(true)
            expect(auth.user?.email).toBe('neil.sims1@example.com')
        })

        // The login succeeds and the application navigates to its dashboard.
        expect(
            await screen.findByRole('heading', {
                name: 'Dashboard',
            }),
        ).toBeInTheDocument()

        expect(store.getState().auth.authenticated).toBe(true)
        expect(store.getState().auth.user?.email).toBe('neil.sims1@example.com')

        // Navigate to the protected products page.
        await act(async () => {
            await router.navigate('/products')
        })

        // Wait for the real products request to finish.
        await waitFor(() => {
            const products = store.getState().products

            expect(products.loading).toBe(false)
            expect(products.data).not.toBeNull()
            expect(products.data?.list.length).toBeGreaterThan(0)
        })

        // Verify that the returned products are displayed in the table.
        expect(
            await screen.findByRole('columnheader', {
                name: 'Name',
            }),
        ).toBeInTheDocument()

        const rows = screen.getAllByRole('row')

        expect(rows.length).toBeGreaterThan(1)

        expect(router.state.location.pathname).toBe('/products')

        // Open the user menu and sign out.
        await user.click(
            screen.getByRole('button', {
                name: 'Avatar do usuário',
            }),
        )

        await user.click(
            await screen.findByRole('button', {
                name: 'Sign out',
            }),
        )

        // The session is terminated and protected navigation redirects to sign-in.
        await waitFor(() => {
            expect(store.getState().auth.authenticated).toBe(false)
            expect(store.getState().auth.user).toBeNull()
            expect(store.getState().auth.token).toBeNull()
            expect(localStorage.getItem('auth-session')).toBeNull()
            expect(sessionStorage.getItem('auth-session')).toBeNull()
        })

        expect(
            await screen.findByRole('button', {
                name: 'Sign In',
            }),
        ).toBeInTheDocument()

        expect(router.state.location.pathname).toBe('/auth/sign-in')

        expect(
            screen.queryByRole('columnheader', {
                name: 'Name',
            }),
        ).not.toBeInTheDocument()
    })

    it('redirects an unauthenticated user who attempts to access products directly', async () => {
        const store = setupStore()

        store.dispatch(clearSession())

        const router = createAppRouter(['/products'])

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>,
        )

        // ProtectedRoute redirects to the sign-in page.
        expect(
            await screen.findByRole('button', {
                name: 'Sign In',
            }),
        ).toBeInTheDocument()

        expect(router.state.location.pathname).toBe('/auth/sign-in')
        expect(store.getState().auth.authenticated).toBe(false)

        expect(
            screen.queryByRole('columnheader', {
                name: 'Name',
            }),
        ).not.toBeInTheDocument()

        expect(
            screen.queryByRole('button', {
                name: 'Add Product',
            }),
        ).not.toBeInTheDocument()
    })
})

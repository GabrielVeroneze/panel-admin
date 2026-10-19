import { describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'
import { ProtectedRoute } from '@/shared/auth'
import { SignInPage } from '@/features/auth'
import { UsersPage } from '@/features/users'
import { setupStore } from '@/tests/setupStore'
import { server } from '@/mocks/server'
import userEvent from '@testing-library/user-event'

describe('Auth - protected navigation integration', () => {
    it('redirects unauthenticated users to sign-in and allows access after login', async () => {
        const user = userEvent.setup()
        const store = setupStore()

        server.use(
            http.get('/api/users', () =>
                HttpResponse.json({
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
                            status: 'active',
                        },
                    ],
                    total: 1,
                    page: 1,
                    pageSize: 15,
                }),
            ),
        )

        const router = createMemoryRouter(
            [
                {
                    path: '/auth/sign-in',
                    element: <SignInPage />,
                },
                {
                    element: <ProtectedRoute />,
                    children: [
                        {
                            path: '/users',
                            element: <UsersPage />,
                        },
                        {
                            path: '/',
                            element: <div>Dashboard</div>,
                        },
                    ],
                },
            ],
            {
                initialEntries: ['/users'],
            },
        )

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>,
        )

        expect(
            await screen.findByPlaceholderText('Enter your email'),
        ).toBeInTheDocument()

        expect(router.state.location.pathname).toBe('/auth/sign-in')
        expect(screen.queryByText('Gabriel Veroneze')).not.toBeInTheDocument()

        await user.type(
            screen.getByPlaceholderText('Enter your email'),
            'neil.sims1@example.com',
        )
        await user.type(
            screen.getByPlaceholderText('Enter your password'),
            'Password123*',
        )
        await user.click(screen.getByRole('button', { name: 'Sign In' }))

        await waitFor(() => {
            expect(store.getState().auth.authenticated).toBe(true)
        })

        await waitFor(() => {
            expect(router.state.location.pathname).toBe('/')
        })
    })

    it('does not authenticate the user when login fails', async () => {
        const user = userEvent.setup()
        const store = setupStore()

        const router = createMemoryRouter(
            [
                {
                    path: '/auth/sign-in',
                    element: <SignInPage />,
                },
                {
                    element: <ProtectedRoute />,
                    children: [
                        {
                            path: '/users',
                            element: <UsersPage />,
                        },
                        {
                            path: '/',
                            element: <div>Dashboard</div>,
                        },
                    ],
                },
            ],
            {
                initialEntries: ['/users'],
            },
        )

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>,
        )

        await user.type(
            await screen.findByPlaceholderText('Enter your email'),
            'invalid@example.com',
        )
        await user.type(
            screen.getByPlaceholderText('Enter your password'),
            'WrongPassword123*',
        )
        await user.click(screen.getByRole('button', { name: 'Sign In' }))

        expect(
            await screen.findByText('Invalid credentials'),
        ).toBeInTheDocument()

        expect(store.getState().auth.authenticated).toBe(false)
        expect(router.state.location.pathname).toBe('/auth/sign-in')
        expect(screen.queryByText('Gabriel Veroneze')).not.toBeInTheDocument()
    })
})

import { beforeEach, describe, expect, it } from 'vitest'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { render, screen, waitFor, within } from '@testing-library/react'
import { AppLayout, PageLayout } from '@/shared/layout'
import { ProtectedRoute } from '@/shared/auth'
import { clearSessionStorage } from '@/shared/utils'
import { SignInPage } from '@/features/auth'
import { DashboardPage } from '@/features/dashboard'
import { UsersPage } from '@/features/users'
import { ProductsPage } from '@/features/products'
import { MyProfilePage } from '@/features/profile'
import { SettingsPage } from '@/features/settings'
import { clearSession } from '@/features/auth/store'
import { setupStore } from '@/tests/setupStore'
import { server } from '@/mocks/server'
import userEvent from '@testing-library/user-event'

const createAppRouter = () =>
    createMemoryRouter([
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
                            element: <PageLayout />,
                            children: [
                                {
                                    index: true,
                                    element: <DashboardPage />,
                                },
                                {
                                    path: 'profile',
                                    element: <MyProfilePage />,
                                },
                                {
                                    path: 'settings',
                                    element: <SettingsPage />,
                                },
                            ],
                        },
                        {
                            element: <PageLayout variant="plain" />,
                            children: [
                                {
                                    path: 'users',
                                    element: <UsersPage />,
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
        },
    ])

describe('App navigation integration', () => {
    beforeEach(() => {
        clearSessionStorage()
        localStorage.clear()
        sessionStorage.clear()
        server.resetHandlers()
    })

    it('navigates between Dashboard, Users, Products, Profile and Settings without getting stuck loading', async () => {
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
            await screen.findByPlaceholderText('Enter your email'),
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

        // Wait for authentication and the Dashboard to finish loading.
        await waitFor(() => {
            expect(store.getState().auth.loading).toBe(false)
            expect(store.getState().auth.authenticated).toBe(true)
        })

        expect(
            await screen.findByRole('link', {
                name: 'Overview',
            }),
        ).toBeInTheDocument()

        await waitFor(() => {
            expect(store.getState().dashboard.loading).toBe(false)
            expect(store.getState().dashboard.data).not.toBeNull()
        })

        expect(router.state.location.pathname).toBe('/')

        // Dashboard -> Users.
        if (
            !screen.queryByRole('link', {
                name: 'Users',
            })
        ) {
            await user.click(screen.getByText('Pages'))
        }

        await user.click(
            screen.getByRole('link', {
                name: 'Users',
            }),
        )

        expect(
            await screen.findByPlaceholderText('Search for users'),
        ).toBeInTheDocument()

        await waitFor(() => {
            const users = store.getState().users

            expect(users.loading).toBe(false)
            expect(users.data?.list.length).toBeGreaterThan(0)
        })

        expect(router.state.location.pathname).toBe('/users')

        // Users -> Products.
        if (
            !screen.queryByRole('link', {
                name: 'Product List',
            })
        ) {
            await user.click(screen.getByText('Sales'))
        }

        await user.click(
            screen.getByRole('link', {
                name: 'Product List',
            }),
        )

        expect(
            await screen.findByRole('columnheader', {
                name: 'Name',
            }),
        ).toBeInTheDocument()

        await waitFor(() => {
            const products = store.getState().products

            expect(products.loading).toBe(false)
            expect(products.data?.list.length).toBeGreaterThan(0)
        })

        expect(router.state.location.pathname).toBe('/products')

        // Products -> Profile.
        if (
            !screen.queryByRole('link', {
                name: 'Profile',
            })
        ) {
            await user.click(screen.getByText('Pages'))
        }

        await user.click(
            screen.getByRole('link', {
                name: 'Profile',
            }),
        )

        await waitFor(() => {
            const profile = store.getState().profile

            expect(profile.loading).toBe(false)
            expect(profile.myProfile).not.toBeNull()
        })

        expect(router.state.location.pathname).toBe('/profile')

        expect(
            within(screen.getByRole('main')).getByRole('heading', {
                name: 'Neil Sims',
            }),
        ).toBeInTheDocument()

        expect(
            within(screen.getByRole('main')).getByRole('heading', {
                name: 'Contact Information',
            }),
        ).toBeInTheDocument()

        expect(
            within(screen.getByRole('main')).getByRole('heading', {
                name: 'Experience',
            }),
        ).toBeInTheDocument()

        // Profile -> Settings.
        if (
            !screen.queryByRole('link', {
                name: 'Settings',
            })
        ) {
            await user.click(screen.getByText('Pages'))
        }

        await user.click(
            screen.getByRole('link', {
                name: 'Settings',
            }),
        )

        expect(
            await screen.findByRole('heading', {
                name: 'General information',
            }),
        ).toBeInTheDocument()

        await waitFor(() => {
            const settings = store.getState().settings

            expect(settings.loading).toBe(false)
            expect(settings.settings).not.toBeNull()
        })

        expect(router.state.location.pathname).toBe('/settings')

        // The full journey must preserve authentication.
        expect(store.getState().auth.authenticated).toBe(true)
        expect(store.getState().auth.user?.email).toBe('neil.sims1@example.com')
    }, 15000)
})

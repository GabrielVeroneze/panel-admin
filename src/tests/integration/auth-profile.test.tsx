import { beforeEach, describe, expect, it } from 'vitest'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { act, render, screen, waitFor } from '@testing-library/react'
import { AppLayout, PageLayout } from '@/shared/layout'
import { ProtectedRoute } from '@/shared/auth'
import { clearSessionStorage } from '@/shared/utils'
import { SignInPage } from '@/features/auth'
import { MyProfilePage, UserProfilePage } from '@/features/profile'
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
                                element: <PageLayout />,
                                children: [
                                    {
                                        path: 'profile',
                                        element: <MyProfilePage />,
                                    },
                                    {
                                        path: 'users/:userId',
                                        element: <UserProfilePage />,
                                    },
                                ],
                            },
                            {
                                element: <PageLayout variant="plain" />,
                                children: [
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
        ],
        { initialEntries },
    )

const signIn = async () => {
    const user = userEvent.setup()

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
}

describe('Auth - profile integration', () => {
    beforeEach(() => {
        clearSessionStorage()
        localStorage.clear()
        sessionStorage.clear()
        server.resetHandlers()
    })

    it('loads and displays the authenticated user own profile', async () => {
        const store = setupStore()
        const router = createAppRouter()

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>,
        )

        await signIn()

        await waitFor(() => {
            expect(store.getState().auth.authenticated).toBe(true)
            expect(store.getState().auth.loading).toBe(false)
        })

        await act(async () => {
            await router.navigate('/profile')
        })

        await waitFor(() => {
            const { myProfile, loading } = store.getState().profile

            expect(myProfile?.name).toBe('Neil Sims')
            expect(loading).toBe(false)
        })

        expect(await screen.findByText('Neil Sims')).toBeInTheDocument()

        expect(router.state.location.pathname).toBe('/profile')
    })

    it('loads and displays the profile belonging to the requested user ID', async () => {
        const store = setupStore()
        const router = createAppRouter()

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>,
        )

        await signIn()

        await waitFor(() => {
            expect(store.getState().auth.authenticated).toBe(true)
            expect(store.getState().auth.loading).toBe(false)
        })

        await act(async () => {
            await router.navigate('/users/2')
        })

        await waitFor(() => {
            const { userProfile, loading } = store.getState().profile

            expect(userProfile?.id).toBe(2)
            expect(userProfile?.name).toBe('Roberta Casas')
            expect(loading).toBe(false)
        })

        expect(await screen.findByText('Roberta Casas')).toBeInTheDocument()

        expect(router.state.location.pathname).toBe('/users/2')
    })

    it('keeps the own profile separate from another user profile when navigating between them', async () => {
        const store = setupStore()
        const router = createAppRouter()

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>,
        )

        await signIn()

        await waitFor(() => {
            expect(store.getState().auth.authenticated).toBe(true)
            expect(store.getState().auth.loading).toBe(false)
        })

        await act(async () => {
            await router.navigate('/profile')
        })

        await waitFor(() => {
            expect(store.getState().profile.myProfile?.name).toBe('Neil Sims')
            expect(store.getState().profile.loading).toBe(false)
        })

        await act(async () => {
            await router.navigate('/users/2')
        })

        await waitFor(() => {
            const { myProfile, userProfile, loading } = store.getState().profile

            expect(myProfile?.name).toBe('Neil Sims')
            expect(userProfile?.name).toBe('Roberta Casas')
            expect(loading).toBe(false)
        })

        expect(await screen.findByText('Roberta Casas')).toBeInTheDocument()

        expect(router.state.location.pathname).toBe('/users/2')
    })

    it('navigates from the own profile to another protected area', async () => {
        const store = setupStore()
        const router = createAppRouter()

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>,
        )

        await signIn()

        await waitFor(() => {
            expect(store.getState().auth.authenticated).toBe(true)
            expect(store.getState().auth.loading).toBe(false)
        })

        await act(async () => {
            await router.navigate('/profile')
        })

        expect(await screen.findByText('Neil Sims')).toBeInTheDocument()

        await act(async () => {
            await router.navigate('/products')
        })

        await waitFor(() => {
            const products = store.getState().products

            expect(products.loading).toBe(false)
            expect(products.data).not.toBeNull()
            expect(products.data?.list.length).toBeGreaterThan(0)
        })

        expect(
            await screen.findByRole('columnheader', {
                name: 'Name',
            }),
        ).toBeInTheDocument()

        expect(router.state.location.pathname).toBe('/products')
        expect(store.getState().auth.authenticated).toBe(true)
    })

    it('redirects an unauthenticated user attempting to access a profile directly', async () => {
        const store = setupStore()
        const router = createAppRouter(['/profile'])

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>,
        )

        expect(
            await screen.findByRole('button', {
                name: 'Sign In',
            }),
        ).toBeInTheDocument()

        expect(router.state.location.pathname).toBe('/auth/sign-in')
        expect(store.getState().auth.authenticated).toBe(false)

        expect(screen.queryByText('Neil Sims')).not.toBeInTheDocument()
    })
})

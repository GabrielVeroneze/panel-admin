import { beforeEach, describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { act, render, screen, waitFor } from '@testing-library/react'
import { AppLayout } from '@/shared/layout'
import { ProtectedRoute } from '@/shared/auth'
import { clearSessionStorage } from '@/shared/utils'
import { SignInPage } from '@/features/auth'
import { clearSession } from '@/features/auth/store'
import { ProductsPage } from '@/features/products'
import { SettingsPage } from '@/features/settings'
import { setupStore } from '@/tests/setupStore'
import { server } from '@/mocks/server'
import type { Settings } from '@/features/settings/types'
import userEvent from '@testing-library/user-event'

const createSettings = (): Settings => ({
    profile: {
        avatar: 'https://example.com/avatar.jpg',
        name: 'John Doe',
        role: 'Administrator',
    },
    preferences: {
        language: 'en',
        timezone: 'America/New_York',
    },
    generalInformation: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        role: 'Administrator',
        phone: '+14155552671',
        birthDate: '1990-01-15',
        organization: 'Example Inc.',
        department: 'Engineering',
        address: '123 Main Street',
        city: 'New York',
        country: 'US',
        zipCode: '10001',
    },
    socialAccounts: [],
    connectedAccounts: [],
    notifications: {
        companyNews: true,
        accountActivity: true,
        meetupsNearYou: false,
        newMessages: true,
    },
    emailSettings: {
        ratingReminders: true,
        itemUpdateNotifications: true,
        itemCommentNotifications: false,
        buyerReviewNotifications: true,
    },
    recentDevices: [],
})

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
                                path: 'settings',
                                element: <SettingsPage />,
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
        { initialEntries },
    )

const signIn = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.type(
        screen.getByPlaceholderText('Enter your email'),
        'neil.sims1@example.com',
    )

    await user.type(
        screen.getByPlaceholderText('Enter your password'),
        'Password123*',
    )

    await user.click(screen.getByRole('button', { name: 'Sign In' }))
}

describe('Auth - settings integration', () => {
    beforeEach(() => {
        clearSessionStorage()
        localStorage.clear()
        sessionStorage.clear()
        server.resetHandlers()
    })

    it('allows an authenticated user to access settings and loads the settings data', async () => {
        const user = userEvent.setup()
        const settings = createSettings()

        server.use(
            http.get('/api/settings', () => {
                return HttpResponse.json(settings)
            }),
        )

        const store = setupStore()
        store.dispatch(clearSession())

        const router = createAppRouter()

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>,
        )

        await signIn(user)

        await waitFor(() => {
            expect(store.getState().auth.loading).toBe(false)
            expect(store.getState().auth.authenticated).toBe(true)
            expect(store.getState().auth.user?.email).toBe(
                'neil.sims1@example.com',
            )
        })

        expect(
            await screen.findByRole('heading', {
                name: 'Dashboard',
            }),
        ).toBeInTheDocument()

        await act(async () => {
            await router.navigate('/settings')
        })

        expect(
            await screen.findByRole('heading', {
                name: 'John Doe',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                name: 'General information',
            }),
        ).toBeInTheDocument()

        await waitFor(() => {
            const state = store.getState()

            expect(state.settings.loading).toBe(false)
            expect(state.settings.settings).toEqual(settings)
        })

        expect(router.state.location.pathname).toBe('/settings')
        expect(store.getState().auth.authenticated).toBe(true)
    })

    it('preserves authentication when navigating from settings to another protected page', async () => {
        const user = userEvent.setup()
        const settings = createSettings()

        server.use(
            http.get('/api/settings', () => {
                return HttpResponse.json(settings)
            }),
        )

        const store = setupStore()
        store.dispatch(clearSession())

        const router = createAppRouter()

        render(
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>,
        )

        await signIn(user)

        await waitFor(() => {
            expect(store.getState().auth.authenticated).toBe(true)
        })

        await act(async () => {
            await router.navigate('/settings')
        })

        expect(
            await screen.findByRole('heading', {
                name: 'John Doe',
            }),
        ).toBeInTheDocument()

        await waitFor(() => {
            expect(store.getState().settings.settings).toEqual(settings)
            expect(store.getState().settings.loading).toBe(false)
        })

        await act(async () => {
            await router.navigate('/products')
        })

        expect(
            await screen.findByRole('columnheader', {
                name: 'Name',
            }),
        ).toBeInTheDocument()

        await waitFor(() => {
            expect(store.getState().auth.authenticated).toBe(true)
            expect(store.getState().auth.user?.email).toBe(
                'neil.sims1@example.com',
            )
            expect(store.getState().products.loading).toBe(false)
            expect(store.getState().products.data?.list.length).toBeGreaterThan(
                0,
            )
        })

        expect(router.state.location.pathname).toBe('/products')
        expect(
            screen.queryByRole('heading', {
                name: 'Settings unavailable',
            }),
        ).not.toBeInTheDocument()
    })
})

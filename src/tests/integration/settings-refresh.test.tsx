import { afterEach, describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { act, screen, waitFor } from '@testing-library/react'
import { SettingsPage } from '@/features/settings'
import { fetchSettings } from '@/features/settings/store'
import { renderWithProviders } from '@/tests/test-utils'
import { setupStore } from '@/tests/setupStore'
import { server } from '@/mocks/server'
import type { Settings } from '@/features/settings/types'

const createSettings = (name: string): Settings => {
    const [firstName, ...lastNameParts] = name.split(' ')
    const lastName = lastNameParts.join(' ')

    return {
        profile: {
            avatar: 'https://example.com/avatar.jpg',
            name,
            role: 'Administrator',
        },
        preferences: {
            language: 'en',
            timezone: 'America/New_York',
        },
        generalInformation: {
            firstName,
            lastName,
            email: `${firstName.toLowerCase()}@example.com`,
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
    }
}

describe('Settings integration - refresh', () => {
    afterEach(() => {
        server.resetHandlers()
    })

    it('preserves existing settings while refreshing and updates the interface when the response arrives', async () => {
        const initialSettings = createSettings('John Doe')
        const refreshedSettings = createSettings('Jane Smith')

        let requestCount = 0
        let resolveRefresh!: (settings: Settings) => void

        const refreshResponse = new Promise<Settings>((resolve) => {
            resolveRefresh = resolve
        })

        server.use(
            http.get('/api/settings', async () => {
                requestCount += 1

                if (requestCount === 1) {
                    return HttpResponse.json(initialSettings)
                }

                const settings = await refreshResponse

                return HttpResponse.json(settings)
            }),
        )

        const store = setupStore()

        renderWithProviders(<SettingsPage />, { store })

        expect(
            await screen.findByRole('heading', { name: 'John Doe' }),
        ).toBeInTheDocument()

        expect(store.getState().settings.settings).toEqual(initialSettings)

        const dispatchFetchSettings = () => store.dispatch(fetchSettings())

        let refreshRequest!: ReturnType<typeof dispatchFetchSettings>

        act(() => {
            refreshRequest = dispatchFetchSettings()
        })

        await waitFor(() => {
            expect(store.getState().settings.loading).toBe(true)
        })

        expect(store.getState().settings.settings).toEqual(initialSettings)

        await act(async () => {
            resolveRefresh(refreshedSettings)
            await refreshRequest
        })

        expect(
            await screen.findByRole('heading', { name: 'Jane Smith' }),
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', { name: 'John Doe' }),
        ).not.toBeInTheDocument()

        expect(store.getState().settings.loading).toBe(false)
        expect(store.getState().settings.settings).toEqual(refreshedSettings)
    })

    it('recovers from a failed request when a subsequent request succeeds', async () => {
        const recoveredSettings = createSettings('Jane Smith')
        let requestCount = 0

        server.use(
            http.get('/api/settings', () => {
                requestCount += 1

                if (requestCount === 1) {
                    return HttpResponse.json(
                        { message: 'Internal server error' },
                        { status: 500 },
                    )
                }

                return HttpResponse.json(recoveredSettings)
            }),
        )

        const store = setupStore()

        renderWithProviders(<SettingsPage />, { store })

        expect(
            await screen.findByRole('heading', {
                name: 'Settings unavailable',
            }),
        ).toBeInTheDocument()

        await waitFor(() => {
            expect(store.getState().settings.loading).toBe(false)
            expect(store.getState().settings.settings).toBeNull()
        })

        await act(async () => {
            await store.dispatch(fetchSettings())
        })

        expect(
            await screen.findByRole('heading', { name: 'Jane Smith' }),
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'Settings unavailable',
            }),
        ).not.toBeInTheDocument()

        expect(store.getState().settings.loading).toBe(false)
        expect(store.getState().settings.settings).toEqual(recoveredSettings)
        expect(requestCount).toBe(2)
    })
})

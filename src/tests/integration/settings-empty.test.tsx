import { afterEach, describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor } from '@testing-library/react'
import { SettingsPage } from '@/features/settings'
import { renderWithProviders } from '@/tests/test-utils'
import { setupStore } from '@/tests/setupStore'
import { server } from '@/mocks/server'
import type { Settings } from '@/features/settings/types'

const emptySettings: Settings = {
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
}

describe('Settings integration - empty', () => {
    afterEach(() => {
        server.resetHandlers()
    })

    it('renders empty states for empty lists while keeping the remaining settings available', async () => {
        server.use(
            http.get('/api/settings', () => {
                return HttpResponse.json(emptySettings)
            }),
        )

        const store = setupStore()

        renderWithProviders(<SettingsPage />, { store })

        expect(
            await screen.findByRole('heading', { name: 'John Doe' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'Language & Time' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'General information' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'Alerts & Notifications' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'Email Settings' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'Password information' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'No social accounts' }),
        ).toBeInTheDocument()

        expect(
            screen.getByText('There are no social accounts available.'),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'No connected accounts' }),
        ).toBeInTheDocument()

        expect(
            screen.getByText('There are no connected accounts to display.'),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'No recent devices' }),
        ).toBeInTheDocument()

        expect(
            screen.getByText('No recent device sessions were found.'),
        ).toBeInTheDocument()

        await waitFor(() => {
            expect(store.getState().settings.loading).toBe(false)
            expect(store.getState().settings.settings).toEqual(emptySettings)
        })

        expect(
            screen.queryByText('Settings unavailable'),
        ).not.toBeInTheDocument()
    })

    it('renders the general unavailable state when the API response contains no settings', async () => {
        server.use(
            http.get('/api/settings', () => {
                return HttpResponse.json(null)
            }),
        )

        const store = setupStore()

        renderWithProviders(<SettingsPage />, { store })

        expect(
            await screen.findByRole('heading', {
                name: 'Settings unavailable',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByText(
                "We couldn't load your account settings. Please try again later.",
            ),
        ).toBeInTheDocument()

        await waitFor(() => {
            expect(store.getState().settings.loading).toBe(false)
            expect(store.getState().settings.settings).toBeNull()
        })

        expect(
            screen.queryByRole('heading', { name: 'No social accounts' }),
        ).not.toBeInTheDocument()

        expect(
            screen.queryByRole('heading', { name: 'No connected accounts' }),
        ).not.toBeInTheDocument()

        expect(
            screen.queryByRole('heading', { name: 'No recent devices' }),
        ).not.toBeInTheDocument()
    })
})

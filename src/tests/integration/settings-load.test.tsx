import { afterEach, describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor } from '@testing-library/react'
import { SettingsPage } from '@/features/settings'
import { renderWithProviders } from '@/tests/test-utils'
import { setupStore } from '@/tests/setupStore'
import { server } from '@/mocks/server'
import type { Settings } from '@/features/settings/types'

const mockSettings: Settings = {
    profile: {
        avatar: '/avatar.jpg',
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
        birthDate: '1990-05-15',
        organization: 'Acme',
        department: 'Engineering',
        address: '123 Main Street',
        city: 'São Paulo',
        country: 'BR',
        zipCode: '01310-100',
    },
    socialAccounts: [
        {
            id: 1,
            platform: 'github',
            connected: true,
            url: 'https://github.com/johndoe',
        },
        {
            id: 2,
            platform: 'twitter',
            connected: false,
            url: 'https://twitter.com/johndoe',
        },
    ],
    connectedAccounts: [
        {
            id: 1,
            name: 'Google',
            avatar: '/google-avatar.jpg',
            city: 'São Paulo',
            lastSeen: '2026-10-06T10:00:00Z',
        },
        {
            id: 2,
            name: 'Microsoft',
            avatar: '/microsoft-avatar.jpg',
            city: 'Curitiba',
            lastSeen: '2026-10-06T11:00:00Z',
        },
    ],
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
    recentDevices: [
        {
            id: 1,
            browser: 'Chrome',
            device: 'Windows PC',
            location: 'São Paulo, Brazil',
            lastAccessed: '2026-10-06T10:00:00Z',
        },
        {
            id: 2,
            browser: 'Safari',
            device: 'MacBook Pro',
            location: 'Curitiba, Brazil',
            lastAccessed: '2026-10-06T11:00:00Z',
        },
    ],
}

describe('Settings integration - load', () => {
    afterEach(() => {
        server.resetHandlers()
    })

    it('loads settings successfully and renders the data in all nine sections', async () => {
        server.use(
            http.get('/api/settings', () => {
                return HttpResponse.json(mockSettings)
            }),
        )

        const store = setupStore()

        renderWithProviders(<SettingsPage />, { store })

        await waitFor(() => {
            expect(store.getState().settings.loading).toBe(false)
            expect(store.getState().settings.settings).toEqual(mockSettings)
        })

        // 1. Profile
        expect(
            await screen.findByRole('img', { name: 'John Doe' }),
        ).toHaveAttribute('src', '/avatar.jpg')
        expect(screen.getByText('Administrator')).toBeInTheDocument()

        // 2. Language & Time
        const languageTimeSection = screen
            .getByRole('heading', {
                name: 'Language & Time',
            })
            .closest('section, article, div')

        expect(languageTimeSection).not.toBeNull()
        expect(screen.getByLabelText('Select Language')).toHaveValue('en')
        expect(screen.getByLabelText('Select Timezone')).toHaveValue(
            'America/New_York',
        )

        // 3. Social accounts
        expect(
            screen.getByRole('heading', { name: 'Social accounts' }),
        ).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { name: 'GitHub' }),
        ).toBeInTheDocument()
        expect(
            screen.getByRole('link', {
                name: 'https://github.com/johndoe',
            }),
        ).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { name: 'Twitter' }),
        ).toBeInTheDocument()
        expect(screen.getByText('Not connected')).toBeInTheDocument()

        // 4. General information
        expect(
            screen.getByRole('heading', { name: 'General information' }),
        ).toBeInTheDocument()

        expect(screen.getByLabelText('First Name')).toHaveValue('John')
        expect(screen.getByLabelText('Last Name')).toHaveValue('Doe')
        expect(screen.getByLabelText('Email')).toHaveValue(
            'john.doe@example.com',
        )
        expect(screen.getByLabelText('Role')).toHaveValue('Administrator')
        expect(screen.getByLabelText('Phone Number')).toHaveValue(
            '+14155552671',
        )
        expect(screen.getByLabelText('Birth Date')).toHaveValue('1990-05-15')
        expect(screen.getByLabelText('Organization')).toHaveValue('Acme')
        expect(screen.getByLabelText('Department')).toHaveValue('Engineering')
        expect(screen.getByLabelText('Address')).toHaveValue('123 Main Street')
        expect(screen.getByLabelText('City')).toHaveValue('São Paulo')
        expect(screen.getByLabelText('Country')).toHaveValue('BR')
        expect(screen.getByLabelText('Zip Code')).toHaveValue('01310-100')

        // 5. Connected accounts
        expect(
            screen.getByRole('heading', { name: 'Connected accounts' }),
        ).toBeInTheDocument()
        expect(screen.getByText('Google')).toBeInTheDocument()
        expect(screen.getByText('Microsoft')).toBeInTheDocument()

        // 6. Password information
        expect(
            screen.getByRole('heading', { name: 'Password information' }),
        ).toBeInTheDocument()
        expect(screen.getByLabelText('Current Password')).toBeInTheDocument()
        expect(screen.getByLabelText('New Password')).toBeInTheDocument()
        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument()

        // 7. Alerts & Notifications
        expect(
            screen.getByRole('heading', { name: 'Alerts & Notifications' }),
        ).toBeInTheDocument()

        const notificationSection = screen
            .getByRole('heading', { name: 'Alerts & Notifications' })
            .closest('div')

        expect(notificationSection).not.toBeNull()

        // 8. Email Settings
        expect(
            screen.getByRole('heading', { name: 'Email Settings' }),
        ).toBeInTheDocument()
        expect(screen.getByText('Rating reminders')).toBeInTheDocument()
        expect(
            screen.getByText('Item update notifications'),
        ).toBeInTheDocument()
        expect(
            screen.getByText('Item comment notifications'),
        ).toBeInTheDocument()
        expect(
            screen.getByText('Buyer review notifications'),
        ).toBeInTheDocument()

        // 9. Recent Devices
        expect(
            screen.getByRole('heading', { name: 'Recent Devices' }),
        ).toBeInTheDocument()
        expect(screen.getByText('Chrome')).toBeInTheDocument()
        expect(screen.getByText('Windows PC')).toBeInTheDocument()
        expect(screen.getByText('São Paulo, Brazil')).toBeInTheDocument()
        expect(screen.getByText('Safari')).toBeInTheDocument()
        expect(screen.getByText('MacBook Pro')).toBeInTheDocument()
        expect(screen.getByText('Curitiba, Brazil')).toBeInTheDocument()

        expect(store.getState().settings.settings?.profile).toEqual(
            mockSettings.profile,
        )
        expect(store.getState().settings.settings?.preferences).toEqual(
            mockSettings.preferences,
        )
        expect(store.getState().settings.settings?.generalInformation).toEqual(
            mockSettings.generalInformation,
        )
        expect(store.getState().settings.settings?.socialAccounts).toEqual(
            mockSettings.socialAccounts,
        )
        expect(store.getState().settings.settings?.connectedAccounts).toEqual(
            mockSettings.connectedAccounts,
        )
        expect(store.getState().settings.settings?.notifications).toEqual(
            mockSettings.notifications,
        )
        expect(store.getState().settings.settings?.emailSettings).toEqual(
            mockSettings.emailSettings,
        )
        expect(store.getState().settings.settings?.recentDevices).toEqual(
            mockSettings.recentDevices,
        )
    })
})

import { afterEach, describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor, within } from '@testing-library/react'
import { SettingsPage } from '@/features/settings'
import { setupStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
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
    socialAccounts: [
        { id: 1, platform: 'facebook', connected: false },
        {
            id: 2,
            platform: 'twitter',
            connected: true,
            url: 'twitter.com/johndoe',
        },
        { id: 3, platform: 'github', connected: false },
        { id: 4, platform: 'dribbble', connected: false },
    ],
    connectedAccounts: [],
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
            id: 101,
            browser: 'Chrome',
            device: 'Windows Desktop',
            location: 'New York, US',
            lastAccessed: 'October 15, 2026',
        },
        {
            id: 102,
            browser: 'Safari',
            device: 'MacBook Pro',
            location: 'London, UK',
            lastAccessed: 'October 14, 2026',
        },
    ],
})

const setupSettingsHandler = () => {
    server.use(
        http.get('/api/settings', () => {
            return HttpResponse.json(createSettings())
        }),
    )
}

const renderSettingsPage = () => {
    const store = setupStore()

    renderWithProviders(<SettingsPage />, { store })

    return store
}

const getDeviceRow = async (browserName: string) => {
    const browserCell = await screen.findByRole('cell', {
        name: browserName,
    })

    const row = browserCell.closest('tr')

    if (!row) {
        throw new Error(`Could not find the table row for "${browserName}".`)
    }

    return within(row)
}

describe('Settings integration - devices', () => {
    afterEach(() => {
        server.resetHandlers()
    })

    it('disconnects a session successfully and removes it from the list', async () => {
        const user = userEvent.setup()

        setupSettingsHandler()

        let requestedDeviceId: string | undefined

        server.use(
            http.delete('/api/settings/devices/:deviceId', ({ params }) => {
                requestedDeviceId = String(params.deviceId)

                return new HttpResponse(null, { status: 204 })
            }),
        )

        const store = renderSettingsPage()

        const deviceRow = await getDeviceRow('Chrome')

        await user.click(deviceRow.getByRole('button', { name: 'Disconnect' }))

        await waitFor(() => {
            expect(requestedDeviceId).toBe('101')

            expect(
                store
                    .getState()
                    .settings.settings?.recentDevices.some(
                        (device) => device.id === 101,
                    ),
            ).toBe(false)
        })

        expect(
            screen.queryByRole('cell', { name: 'Chrome' }),
        ).not.toBeInTheDocument()

        expect(screen.getByRole('cell', { name: 'Safari' })).toBeInTheDocument()

        expect(store.getState().settings.settings?.recentDevices).toHaveLength(
            1,
        )
    })

    it('keeps the session visible when the disconnect request fails', async () => {
        const user = userEvent.setup()

        setupSettingsHandler()

        let requestedDeviceId: string | undefined

        server.use(
            http.delete('/api/settings/devices/:deviceId', ({ params }) => {
                requestedDeviceId = String(params.deviceId)

                return HttpResponse.json(
                    { message: 'Unable to disconnect device session' },
                    { status: 500 },
                )
            }),
        )

        const store = renderSettingsPage()

        const deviceRow = await getDeviceRow('Chrome')

        await user.click(deviceRow.getByRole('button', { name: 'Disconnect' }))

        await waitFor(() => {
            expect(requestedDeviceId).toBe('101')

            expect(
                store.getState().settings.settings?.recentDevices,
            ).toHaveLength(2)
        })

        expect(screen.getByRole('cell', { name: 'Chrome' })).toBeInTheDocument()

        expect(screen.getByRole('cell', { name: 'Safari' })).toBeInTheDocument()

        expect(
            store
                .getState()
                .settings.settings?.recentDevices.some(
                    (device) => device.id === 101,
                ),
        ).toBe(true)
    })
})

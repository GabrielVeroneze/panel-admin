import { afterEach, describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, within, waitFor } from '@testing-library/react'
import { SettingsPage } from '@/features/settings'
import { setupStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'
import type {
    NotificationPreferences,
    Settings,
} from '@/features/settings/types'
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

const setupSettingsHandler = (settings: Settings) => {
    server.use(
        http.get('/api/settings', () => {
            return HttpResponse.json(settings)
        }),
    )
}

const renderSettingsPage = () => {
    const store = setupStore()

    renderWithProviders(<SettingsPage />, { store })

    return store
}

const getNotificationSwitch = async (label: string) => {
    const heading = await screen.findByRole('heading', {
        level: 4,
        name: label,
    })

    const item = heading.parentElement?.parentElement

    if (!item) {
        throw new Error(`Could not find notification item: ${label}`)
    }

    return within(item).getByRole('checkbox')
}

describe('Settings integration - notification preferences', () => {
    afterEach(() => {
        server.resetHandlers()
    })

    it('updates notification preferences through the API', async () => {
        const user = userEvent.setup()
        const settings = createSettings()
        let receivedPreferences: NotificationPreferences | null = null

        setupSettingsHandler(settings)

        server.use(
            http.put('/api/settings/notifications', async ({ request }) => {
                receivedPreferences =
                    (await request.json()) as NotificationPreferences

                return HttpResponse.json(receivedPreferences)
            }),
        )

        const store = renderSettingsPage()

        const companyNewsSwitch = await getNotificationSwitch('Company News')

        expect(companyNewsSwitch).toBeChecked()

        await user.click(companyNewsSwitch)

        await waitFor(() => {
            expect(receivedPreferences).toEqual({
                companyNews: false,
                accountActivity: true,
                meetupsNearYou: false,
                newMessages: true,
            })
        })

        await waitFor(() => {
            expect(store.getState().settings.settings?.notifications).toEqual(
                receivedPreferences,
            )
        })

        expect(companyNewsSwitch).not.toBeChecked()
    })

    it('preserves the current preferences when the API request fails', async () => {
        const user = userEvent.setup()
        const settings = createSettings()
        let requestCount = 0

        setupSettingsHandler(settings)

        server.use(
            http.put('/api/settings/notifications', () => {
                requestCount += 1

                return HttpResponse.json(
                    { message: 'Failed to update notification preferences' },
                    { status: 500 },
                )
            }),
        )

        const store = renderSettingsPage()

        const accountActivitySwitch =
            await getNotificationSwitch('Account Activity')

        expect(accountActivitySwitch).toBeChecked()

        await user.click(accountActivitySwitch)

        await waitFor(() => {
            expect(requestCount).toBe(1)
        })

        await waitFor(() => {
            expect(accountActivitySwitch).toBeChecked()
        })

        expect(store.getState().settings.settings?.notifications).toEqual(
            settings.notifications,
        )
    })

    it('updates the Redux state and switches using the preferences returned by the API', async () => {
        const user = userEvent.setup()
        const settings = createSettings()

        const apiPreferences: NotificationPreferences = {
            companyNews: false,
            accountActivity: false,
            meetupsNearYou: true,
            newMessages: false,
        }

        let receivedPreferences: NotificationPreferences | null = null

        setupSettingsHandler(settings)

        server.use(
            http.put('/api/settings/notifications', async ({ request }) => {
                receivedPreferences =
                    (await request.json()) as NotificationPreferences

                return HttpResponse.json(apiPreferences)
            }),
        )

        const store = renderSettingsPage()

        const accountActivitySwitch =
            await getNotificationSwitch('Account Activity')

        await user.click(accountActivitySwitch)

        await waitFor(() => {
            expect(receivedPreferences).toEqual({
                companyNews: true,
                accountActivity: false,
                meetupsNearYou: false,
                newMessages: true,
            })
        })

        await waitFor(() => {
            expect(store.getState().settings.settings?.notifications).toEqual(
                apiPreferences,
            )
        })

        expect(await getNotificationSwitch('Company News')).not.toBeChecked()

        expect(
            await getNotificationSwitch('Account Activity'),
        ).not.toBeChecked()

        expect(await getNotificationSwitch('Meetups Near You')).toBeChecked()

        expect(await getNotificationSwitch('New Messages')).not.toBeChecked()
    })
})

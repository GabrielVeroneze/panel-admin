import { afterEach, describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor, within } from '@testing-library/react'
import { SettingsPage } from '@/features/settings'
import { setupStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'
import type { EmailPreferences, Settings } from '@/features/settings/types'
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

    return { store }
}

const getEmailPreferenceSwitch = (label: string) => {
    const heading = screen.getByRole('heading', {
        name: label,
        level: 4,
    })

    const item = heading.parentElement?.parentElement

    if (!item) {
        throw new Error(`Email preference item "${label}" was not found`)
    }

    return within(item).getByRole('checkbox')
}

describe('Settings integration - email preferences', () => {
    afterEach(() => {
        server.resetHandlers()
    })

    it('updates email preferences through the API', async () => {
        const user = userEvent.setup()
        const settings = createSettings()
        let receivedPreferences: EmailPreferences | undefined

        setupSettingsHandler(settings)

        server.use(
            http.put(
                '/api/settings/email-notifications',
                async ({ request }) => {
                    receivedPreferences =
                        (await request.json()) as EmailPreferences

                    return HttpResponse.json(receivedPreferences)
                },
            ),
        )

        const { store } = renderSettingsPage()

        const itemCommentSwitch = await waitFor(() =>
            getEmailPreferenceSwitch('Item comment notifications'),
        )

        expect(itemCommentSwitch).not.toBeChecked()

        await user.click(itemCommentSwitch)

        await waitFor(() => {
            expect(receivedPreferences).toEqual({
                ratingReminders: true,
                itemUpdateNotifications: true,
                itemCommentNotifications: true,
                buyerReviewNotifications: true,
            })

            expect(store.getState().settings.settings?.emailSettings).toEqual(
                receivedPreferences,
            )
        })
    })

    it('preserves the previous email preferences when the API update fails', async () => {
        const user = userEvent.setup()
        const settings = createSettings()
        let requestCount = 0

        setupSettingsHandler(settings)

        server.use(
            http.put('/api/settings/email-notifications', () => {
                requestCount += 1

                return HttpResponse.json(
                    { message: 'Failed to update email preferences' },
                    { status: 500 },
                )
            }),
        )

        const { store } = renderSettingsPage()

        const ratingRemindersSwitch = await waitFor(() =>
            getEmailPreferenceSwitch('Rating reminders'),
        )

        expect(ratingRemindersSwitch).toBeChecked()

        await user.click(ratingRemindersSwitch)

        await waitFor(() => {
            expect(requestCount).toBe(1)
        })

        await waitFor(() => {
            expect(ratingRemindersSwitch).toBeChecked()
        })

        expect(store.getState().settings.settings?.emailSettings).toEqual(
            settings.emailSettings,
        )
    })

    it('reflects the email preferences returned by the API in Redux and the interface', async () => {
        const user = userEvent.setup()
        const settings = createSettings()

        const apiPreferences: EmailPreferences = {
            ratingReminders: false,
            itemUpdateNotifications: true,
            itemCommentNotifications: true,
            buyerReviewNotifications: false,
        }

        let receivedPreferences: EmailPreferences | undefined

        setupSettingsHandler(settings)

        server.use(
            http.put(
                '/api/settings/email-notifications',
                async ({ request }) => {
                    receivedPreferences =
                        (await request.json()) as EmailPreferences

                    return HttpResponse.json(apiPreferences)
                },
            ),
        )

        const { store } = renderSettingsPage()

        const itemCommentSwitch = await waitFor(() =>
            getEmailPreferenceSwitch('Item comment notifications'),
        )

        await user.click(itemCommentSwitch)

        await waitFor(() => {
            expect(receivedPreferences).toEqual({
                ...settings.emailSettings,
                itemCommentNotifications: true,
            })

            expect(store.getState().settings.settings?.emailSettings).toEqual(
                apiPreferences,
            )
        })

        await waitFor(() => {
            expect(
                getEmailPreferenceSwitch('Rating reminders'),
            ).not.toBeChecked()

            expect(
                getEmailPreferenceSwitch('Item update notifications'),
            ).toBeChecked()

            expect(
                getEmailPreferenceSwitch('Item comment notifications'),
            ).toBeChecked()

            expect(
                getEmailPreferenceSwitch('Buyer review notifications'),
            ).not.toBeChecked()
        })
    })
})

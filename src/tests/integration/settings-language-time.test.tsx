import { afterEach, describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { screen, waitFor, within } from '@testing-library/react'
import { SettingsPage } from '@/features/settings'
import { setupStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'
import type { Settings, SettingsPreferences } from '@/features/settings/types'
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

const setupSettingsHandlers = (settings: Settings) => {
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

const getLanguageTimeForm = () => {
    const languageSelect = screen.getByRole('combobox', {
        name: 'Select Language',
    })

    const timezoneSelect = screen.getByRole('combobox', {
        name: 'Select Timezone',
    })

    const form = languageSelect.closest('form')

    if (!form) {
        throw new Error('Language and time form was not found')
    }

    return {
        form,
        languageSelect,
        timezoneSelect,
    }
}

describe('Settings integration - language and time', () => {
    afterEach(() => {
        server.resetHandlers()
    })

    it('saves the selected language and timezone', async () => {
        const user = userEvent.setup()
        const settings = createSettings()
        let receivedPreferences: SettingsPreferences | undefined

        setupSettingsHandlers(settings)

        server.use(
            http.put('/api/settings/preferences', async ({ request }) => {
                receivedPreferences =
                    (await request.json()) as SettingsPreferences

                return HttpResponse.json(receivedPreferences)
            }),
        )

        const { store } = renderSettingsPage()

        const { form, languageSelect, timezoneSelect } = await waitFor(() =>
            getLanguageTimeForm(),
        )

        await user.selectOptions(languageSelect, 'pt-BR')
        await user.selectOptions(timezoneSelect, 'America/Sao_Paulo')

        await user.click(within(form).getByRole('button', { name: 'Update' }))

        await waitFor(() => {
            expect(receivedPreferences).toEqual({
                language: 'pt-BR',
                timezone: 'America/Sao_Paulo',
            })

            expect(store.getState().settings.settings?.preferences).toEqual({
                language: 'pt-BR',
                timezone: 'America/Sao_Paulo',
            })
        })
    })

    it('preserves the previous preferences when the API update fails', async () => {
        const user = userEvent.setup()
        const settings = createSettings()
        let requestCount = 0

        setupSettingsHandlers(settings)

        server.use(
            http.put('/api/settings/preferences', () => {
                requestCount += 1

                return HttpResponse.json(
                    { message: 'Failed to update preferences' },
                    { status: 500 },
                )
            }),
        )

        const { store } = renderSettingsPage()

        const { form, languageSelect, timezoneSelect } = await waitFor(() =>
            getLanguageTimeForm(),
        )

        await user.selectOptions(languageSelect, 'es')
        await user.selectOptions(timezoneSelect, 'Europe/London')

        await user.click(within(form).getByRole('button', { name: 'Update' }))

        await waitFor(() => {
            expect(requestCount).toBe(1)
        })

        expect(store.getState().settings.settings?.preferences).toEqual({
            language: 'en',
            timezone: 'America/New_York',
        })

        expect(languageSelect).toHaveValue('es')
        expect(timezoneSelect).toHaveValue('Europe/London')
    })

    it('persists the preferences returned by the API in Redux and the form', async () => {
        const user = userEvent.setup()
        const settings = createSettings()

        const apiPreferences: SettingsPreferences = {
            language: 'es',
            timezone: 'Europe/London',
        }

        let receivedPreferences: unknown

        setupSettingsHandlers(settings)

        server.use(
            http.put('/api/settings/preferences', async ({ request }) => {
                receivedPreferences = await request.json()

                return HttpResponse.json(apiPreferences)
            }),
        )

        const { store } = renderSettingsPage()

        const { form, languageSelect, timezoneSelect } = await waitFor(() =>
            getLanguageTimeForm(),
        )

        await user.selectOptions(languageSelect, apiPreferences.language)
        await user.selectOptions(timezoneSelect, apiPreferences.timezone)

        await user.click(within(form).getByRole('button', { name: 'Update' }))

        await waitFor(() => {
            expect(receivedPreferences).toEqual(apiPreferences)

            expect(store.getState().settings.settings?.preferences).toEqual(
                apiPreferences,
            )
        })

        expect(languageSelect).toHaveValue(apiPreferences.language)
        expect(timezoneSelect).toHaveValue(apiPreferences.timezone)
    })
})

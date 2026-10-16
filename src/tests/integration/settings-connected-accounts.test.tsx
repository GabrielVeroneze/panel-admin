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
    connectedAccounts: [
        {
            id: 10,
            name: 'Jane Smith',
            avatar: 'https://example.com/jane.jpg',
            city: 'New York',
            lastSeen: 'October 15, 2026',
        },
        {
            id: 11,
            name: 'Michael Brown',
            avatar: 'https://example.com/michael.jpg',
            city: 'London',
            lastSeen: 'October 14, 2026',
        },
    ],
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
    recentDevices: [],
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

const getConnectedAccount = async (accountName: string) => {
    const heading = await screen.findByRole('heading', {
        name: accountName,
    })

    let accountItem: HTMLElement | null = heading

    while (
        accountItem &&
        !within(accountItem).queryByRole('button', {
            name: 'Disconnect',
        })
    ) {
        accountItem = accountItem.parentElement
    }

    if (!accountItem) {
        throw new Error(
            `Could not find the connected account item for "${accountName}".`,
        )
    }

    return within(accountItem)
}

describe('Settings integration - connected accounts', () => {
    afterEach(() => {
        server.resetHandlers()
    })

    it('disconnects an account successfully and removes it from the list', async () => {
        const user = userEvent.setup()

        setupSettingsHandler()

        let requestedAccountId: string | undefined

        server.use(
            http.delete(
                '/api/settings/connected-accounts/:accountId',
                ({ params }) => {
                    requestedAccountId = String(params.accountId)

                    return HttpResponse.json({})
                },
            ),
        )

        const store = renderSettingsPage()

        const account = await getConnectedAccount('Jane Smith')

        await user.click(account.getByRole('button', { name: 'Disconnect' }))

        await waitFor(() => {
            expect(requestedAccountId).toBe('10')

            expect(
                store
                    .getState()
                    .settings.settings?.connectedAccounts.some(
                        (item) => item.id === 10,
                    ),
            ).toBe(false)
        })

        expect(
            screen.queryByRole('heading', { name: 'Jane Smith' }),
        ).not.toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'Michael Brown' }),
        ).toBeInTheDocument()

        expect(
            store.getState().settings.settings?.connectedAccounts,
        ).toHaveLength(1)
    })

    it('keeps the account visible when the disconnect request fails', async () => {
        const user = userEvent.setup()

        setupSettingsHandler()

        let requestedAccountId: string | undefined

        server.use(
            http.delete(
                '/api/settings/connected-accounts/:accountId',
                ({ params }) => {
                    requestedAccountId = String(params.accountId)

                    return HttpResponse.json(
                        { message: 'Unable to disconnect account' },
                        { status: 500 },
                    )
                },
            ),
        )

        const store = renderSettingsPage()

        const account = await getConnectedAccount('Jane Smith')

        await user.click(account.getByRole('button', { name: 'Disconnect' }))

        await waitFor(() => {
            expect(requestedAccountId).toBe('10')

            expect(store.getState().settings.loading).toBe(false)
        })

        expect(
            screen.getByRole('heading', { name: 'Jane Smith' }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: 'Michael Brown' }),
        ).toBeInTheDocument()

        expect(
            store.getState().settings.settings?.connectedAccounts,
        ).toHaveLength(2)

        expect(
            store
                .getState()
                .settings.settings?.connectedAccounts.some(
                    (item) => item.id === 10,
                ),
        ).toBe(true)
    })
})

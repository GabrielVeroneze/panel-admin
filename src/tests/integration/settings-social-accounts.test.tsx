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
        {
            id: 1,
            platform: 'facebook',
            connected: false,
        },
        {
            id: 2,
            platform: 'twitter',
            connected: true,
            url: 'twitter.com/johndoe',
        },
        {
            id: 3,
            platform: 'github',
            connected: false,
        },
        {
            id: 4,
            platform: 'dribbble',
            connected: false,
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

const getSocialAccount = async (platformName: string) => {
    const heading = await screen.findByRole('heading', {
        name: platformName,
    })

    let accountItem: HTMLElement | null = heading

    while (accountItem && !accountItem.querySelector('button')) {
        accountItem = accountItem.parentElement
    }

    if (!accountItem) {
        throw new Error(
            `Could not find the ${platformName} account item with its action button`,
        )
    }

    return within(accountItem)
}

describe('Settings integration - social accounts', () => {
    afterEach(() => {
        server.resetHandlers()
    })

    it('connects a social account successfully', async () => {
        const user = userEvent.setup()

        const connectedAccount = {
            id: 1,
            platform: 'facebook' as const,
            connected: true,
            url: 'facebook.com/johndoe',
        }

        setupSettingsHandler()

        server.use(
            http.put('/api/settings/social-accounts/facebook/connect', () => {
                return HttpResponse.json(connectedAccount)
            }),
        )

        const store = renderSettingsPage()

        const facebookAccount = await getSocialAccount('Facebook')

        expect(
            await facebookAccount.findByText('Not connected'),
        ).toBeInTheDocument()

        await user.click(
            facebookAccount.getByRole('button', {
                name: 'Connect',
            }),
        )

        await waitFor(async () => {
            const account = await getSocialAccount('Facebook')

            expect(
                account.getByRole('button', {
                    name: 'Disconnect',
                }),
            ).toBeInTheDocument()
        })

        const facebookAccountAfterConnect = await getSocialAccount('Facebook')

        expect(
            facebookAccountAfterConnect.getByRole('link', {
                name: 'facebook.com/johndoe',
            }),
        ).toHaveAttribute('href', 'https://facebook.com/johndoe')

        expect(
            store
                .getState()
                .settings.settings?.socialAccounts.find(
                    (account) => account.platform === 'facebook',
                ),
        ).toEqual(connectedAccount)
    })

    it('preserves the disconnected state when connecting a social account fails', async () => {
        const user = userEvent.setup()

        setupSettingsHandler()

        server.use(
            http.put('/api/settings/social-accounts/facebook/connect', () => {
                return HttpResponse.json(
                    { message: 'Unable to connect account' },
                    { status: 500 },
                )
            }),
        )

        const store = renderSettingsPage()

        const facebookAccount = await getSocialAccount('Facebook')

        expect(
            await facebookAccount.findByText('Not connected'),
        ).toBeInTheDocument()

        await user.click(
            facebookAccount.getByRole('button', {
                name: 'Connect',
            }),
        )

        await waitFor(() => {
            expect(store.getState().settings.loading).toBe(false)
        })

        const facebookAccountAfterFailure = await getSocialAccount('Facebook')

        expect(
            facebookAccountAfterFailure.getByText('Not connected'),
        ).toBeInTheDocument()

        expect(
            facebookAccountAfterFailure.getByRole('button', {
                name: 'Connect',
            }),
        ).toBeInTheDocument()

        expect(
            store
                .getState()
                .settings.settings?.socialAccounts.find(
                    (account) => account.platform === 'facebook',
                ),
        ).toEqual({
            id: 1,
            platform: 'facebook',
            connected: false,
        })
    })

    it('disconnects a connected social account successfully', async () => {
        const user = userEvent.setup()

        const disconnectedAccount = {
            id: 2,
            platform: 'twitter' as const,
            connected: false,
        }

        setupSettingsHandler()

        server.use(
            http.put('/api/settings/social-accounts/twitter/disconnect', () => {
                return HttpResponse.json(disconnectedAccount)
            }),
        )

        const store = renderSettingsPage()

        const twitterAccount = await getSocialAccount('Twitter')

        expect(
            await twitterAccount.findByRole('link', {
                name: 'twitter.com/johndoe',
            }),
        ).toBeInTheDocument()

        await user.click(
            twitterAccount.getByRole('button', {
                name: 'Disconnect',
            }),
        )

        await waitFor(async () => {
            const account = await getSocialAccount('Twitter')

            expect(
                account.getByRole('button', {
                    name: 'Connect',
                }),
            ).toBeInTheDocument()
        })

        const twitterAccountAfterDisconnect = await getSocialAccount('Twitter')

        expect(
            twitterAccountAfterDisconnect.getByText('Not connected'),
        ).toBeInTheDocument()

        expect(
            store
                .getState()
                .settings.settings?.socialAccounts.find(
                    (account) => account.platform === 'twitter',
                ),
        ).toEqual(disconnectedAccount)
    })

    it('preserves the connected state when disconnecting a social account fails', async () => {
        const user = userEvent.setup()

        setupSettingsHandler()

        server.use(
            http.put('/api/settings/social-accounts/twitter/disconnect', () => {
                return HttpResponse.json(
                    { message: 'Unable to disconnect account' },
                    { status: 500 },
                )
            }),
        )

        const store = renderSettingsPage()

        const twitterAccount = await getSocialAccount('Twitter')

        expect(
            await twitterAccount.findByRole('link', {
                name: 'twitter.com/johndoe',
            }),
        ).toBeInTheDocument()

        await user.click(
            twitterAccount.getByRole('button', {
                name: 'Disconnect',
            }),
        )

        await waitFor(() => {
            expect(store.getState().settings.loading).toBe(false)
        })

        const twitterAccountAfterFailure = await getSocialAccount('Twitter')

        expect(
            twitterAccountAfterFailure.getByRole('link', {
                name: 'twitter.com/johndoe',
            }),
        ).toBeInTheDocument()

        expect(
            twitterAccountAfterFailure.getByRole('button', {
                name: 'Disconnect',
            }),
        ).toBeInTheDocument()

        expect(
            store
                .getState()
                .settings.settings?.socialAccounts.find(
                    (account) => account.platform === 'twitter',
                ),
        ).toEqual({
            id: 2,
            platform: 'twitter',
            connected: true,
            url: 'twitter.com/johndoe',
        })
    })
})

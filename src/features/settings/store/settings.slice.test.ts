import { describe, expect, it, vi } from 'vitest'
import settingsReducer from './settings.slice'
import {
    connectAccount,
    disconnectAccount,
    fetchSettings,
    removeConnectedAccount,
    removeDeviceSession,
    saveEmailSettings,
    saveGeneralInformation,
    saveNotifications,
    savePreferences,
    updateAvatar,
} from './settings.thunks'
import type { Settings } from '../types'

vi.mock('@/services/api', () => ({
    api: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}))

const createSettings = (): Settings => ({
    profile: {
        avatar: '/avatars/user.jpg',
        name: 'John Doe',
        role: 'Admin',
    },
    preferences: {
        language: 'en',
        timezone: 'UTC',
    },
    generalInformation: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'Admin',
        phone: '+5511999999999',
        birthDate: '1990-01-01',
        organization: 'Acme',
        department: 'Engineering',
        address: 'Main Street, 123',
        city: 'São Paulo',
        country: 'Brazil',
        zipCode: '01000-000',
    },
    socialAccounts: [
        {
            id: 1,
            platform: 'facebook',
            connected: true,
            url: 'https://facebook.com/johndoe',
        },
        {
            id: 2,
            platform: 'github',
            connected: false,
        },
    ],
    connectedAccounts: [
        {
            id: 1,
            name: 'John Doe',
            avatar: '/avatars/john.jpg',
            city: 'São Paulo',
            lastSeen: '2026-10-06T10:00:00Z',
        },
        {
            id: 2,
            name: 'Jane Doe',
            avatar: '/avatars/jane.jpg',
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
        itemUpdateNotifications: false,
        itemCommentNotifications: true,
        buyerReviewNotifications: false,
    },
    recentDevices: [
        {
            id: 1,
            browser: 'Chrome',
            device: 'Windows',
            location: 'São Paulo, Brazil',
            lastAccessed: '2026-10-06T10:00:00Z',
        },
        {
            id: 2,
            browser: 'Safari',
            device: 'iPhone',
            location: 'Curitiba, Brazil',
            lastAccessed: '2026-10-06T11:00:00Z',
        },
    ],
})

describe('settings.slice', () => {
    it('returns the initial state', () => {
        expect(settingsReducer(undefined, { type: 'unknown' })).toEqual({
            settings: null,
            loading: false,
        })
    })

    it('sets loading to true when fetching settings starts', () => {
        const state = settingsReducer(
            undefined,
            fetchSettings.pending('request-id'),
        )

        expect(state).toEqual({
            settings: null,
            loading: true,
        })
    })

    it('stores settings and stops loading when fetching settings succeeds', () => {
        const settings = createSettings()

        const state = settingsReducer(
            {
                settings: null,
                loading: true,
            },
            fetchSettings.fulfilled(settings, 'request-id'),
        )

        expect(state).toEqual({
            settings,
            loading: false,
        })
    })

    it('stops loading when fetching settings fails', () => {
        const settings = createSettings()

        const state = settingsReducer(
            {
                settings,
                loading: true,
            },
            fetchSettings.rejected(new Error('Request failed'), 'request-id'),
        )

        expect(state).toEqual({
            settings,
            loading: false,
        })
    })

    it('updates the profile when the avatar is updated', () => {
        const settings = createSettings()
        const profile = {
            avatar: '/avatars/new-avatar.jpg',
            name: 'John Doe',
            role: 'Admin',
        }

        const state = settingsReducer(
            {
                settings,
                loading: false,
            },
            updateAvatar.fulfilled(profile, 'request-id', {
                avatar: new File(['avatar'], 'avatar.jpg', {
                    type: 'image/jpeg',
                }),
            }),
        )

        expect(state.settings?.profile).toEqual(profile)
    })

    it('does not update the profile when avatar update succeeds without settings', () => {
        const profile = {
            avatar: '/avatars/new-avatar.jpg',
            name: 'John Doe',
            role: 'Admin',
        }

        const state = settingsReducer(
            {
                settings: null,
                loading: false,
            },
            updateAvatar.fulfilled(profile, 'request-id', {
                avatar: new File(['avatar'], 'avatar.jpg', {
                    type: 'image/jpeg',
                }),
            }),
        )

        expect(state).toEqual({
            settings: null,
            loading: false,
        })
    })

    it('updates preferences when they are saved', () => {
        const settings = createSettings()
        const preferences = {
            language: 'pt-BR',
            timezone: 'America/Sao_Paulo',
        }

        const state = settingsReducer(
            {
                settings,
                loading: false,
            },
            savePreferences.fulfilled(preferences, 'request-id', preferences),
        )

        expect(state.settings?.preferences).toEqual(preferences)
    })

    it('does not update preferences when settings does not exist', () => {
        const preferences = {
            language: 'pt-BR',
            timezone: 'America/Sao_Paulo',
        }

        const state = settingsReducer(
            {
                settings: null,
                loading: false,
            },
            savePreferences.fulfilled(preferences, 'request-id', preferences),
        )

        expect(state).toEqual({
            settings: null,
            loading: false,
        })
    })

    it('updates general information and synchronizes profile name and role', () => {
        const settings = createSettings()
        const generalInformation = {
            ...settings.generalInformation,
            firstName: 'Jane',
            lastName: 'Smith',
            role: 'Manager',
        }

        const state = settingsReducer(
            {
                settings,
                loading: false,
            },
            saveGeneralInformation.fulfilled(
                generalInformation,
                'request-id',
                generalInformation,
            ),
        )

        expect(state.settings?.generalInformation).toEqual(generalInformation)
        expect(state.settings?.profile.name).toBe('Jane Smith')
        expect(state.settings?.profile.role).toBe('Manager')
    })

    it('does not update general information when settings does not exist', () => {
        const generalInformation = {
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane@example.com',
            role: 'Manager',
            phone: '+5511888888888',
            birthDate: '1992-02-02',
            organization: 'Acme',
            department: 'Sales',
            address: 'Second Street, 456',
            city: 'Curitiba',
            country: 'Brazil',
            zipCode: '80000-000',
        }

        const state = settingsReducer(
            {
                settings: null,
                loading: false,
            },
            saveGeneralInformation.fulfilled(
                generalInformation,
                'request-id',
                generalInformation,
            ),
        )

        expect(state).toEqual({
            settings: null,
            loading: false,
        })
    })

    it('updates notification preferences', () => {
        const settings = createSettings()
        const notifications = {
            companyNews: false,
            accountActivity: true,
            meetupsNearYou: true,
            newMessages: false,
        }

        const state = settingsReducer(
            {
                settings,
                loading: false,
            },
            saveNotifications.fulfilled(
                notifications,
                'request-id',
                notifications,
            ),
        )

        expect(state.settings?.notifications).toEqual(notifications)
    })

    it('does not update notification preferences when settings does not exist', () => {
        const notifications = {
            companyNews: false,
            accountActivity: true,
            meetupsNearYou: true,
            newMessages: false,
        }

        const state = settingsReducer(
            {
                settings: null,
                loading: false,
            },
            saveNotifications.fulfilled(
                notifications,
                'request-id',
                notifications,
            ),
        )

        expect(state).toEqual({
            settings: null,
            loading: false,
        })
    })

    it('updates email settings', () => {
        const settings = createSettings()
        const emailSettings = {
            ratingReminders: false,
            itemUpdateNotifications: true,
            itemCommentNotifications: false,
            buyerReviewNotifications: true,
        }

        const state = settingsReducer(
            {
                settings,
                loading: false,
            },
            saveEmailSettings.fulfilled(
                emailSettings,
                'request-id',
                emailSettings,
            ),
        )

        expect(state.settings?.emailSettings).toEqual(emailSettings)
    })

    it('does not update email settings when settings does not exist', () => {
        const emailSettings = {
            ratingReminders: false,
            itemUpdateNotifications: true,
            itemCommentNotifications: false,
            buyerReviewNotifications: true,
        }

        const state = settingsReducer(
            {
                settings: null,
                loading: false,
            },
            saveEmailSettings.fulfilled(
                emailSettings,
                'request-id',
                emailSettings,
            ),
        )

        expect(state).toEqual({
            settings: null,
            loading: false,
        })
    })

    it.each([
        ['facebook', 1],
        ['github', 2],
    ] as const)(
        'updates the social account when %s is connected',
        (platform, accountId) => {
            const settings = createSettings()
            const account = {
                id: accountId,
                platform,
                connected: true,
                url: `https://${platform}.com/johndoe`,
            }

            const state = settingsReducer(
                {
                    settings,
                    loading: false,
                },
                connectAccount.fulfilled(account, 'request-id', platform),
            )

            expect(
                state.settings?.socialAccounts.find(
                    (item) => item.id === accountId,
                ),
            ).toEqual(account)
        },
    )

    it('does not update a social account when the connected account does not exist', () => {
        const settings = createSettings()
        const account = {
            id: 999,
            platform: 'facebook' as const,
            connected: true,
            url: 'https://facebook.com/johndoe',
        }

        const state = settingsReducer(
            {
                settings,
                loading: false,
            },
            connectAccount.fulfilled(account, 'request-id', 'facebook'),
        )

        expect(state.settings?.socialAccounts).toEqual(settings.socialAccounts)
    })

    it.each([
        ['facebook', 1],
        ['github', 2],
    ] as const)(
        'updates the social account when %s is disconnected',
        (platform, accountId) => {
            const settings = createSettings()
            const account = {
                id: accountId,
                platform,
                connected: false,
            }

            const state = settingsReducer(
                {
                    settings,
                    loading: false,
                },
                disconnectAccount.fulfilled(account, 'request-id', platform),
            )

            expect(
                state.settings?.socialAccounts.find(
                    (item) => item.id === accountId,
                ),
            ).toEqual(account)
        },
    )

    it('does not update a social account when the disconnected account does not exist', () => {
        const settings = createSettings()
        const account = {
            id: 999,
            platform: 'facebook' as const,
            connected: false,
        }

        const state = settingsReducer(
            {
                settings,
                loading: false,
            },
            disconnectAccount.fulfilled(account, 'request-id', 'facebook'),
        )

        expect(state.settings?.socialAccounts).toEqual(settings.socialAccounts)
    })

    it('removes a connected account', () => {
        const settings = createSettings()

        const state = settingsReducer(
            {
                settings,
                loading: false,
            },
            removeConnectedAccount.fulfilled(1, 'request-id', 1),
        )

        expect(state.settings?.connectedAccounts).toEqual([
            settings.connectedAccounts[1],
        ])
    })

    it('keeps connected accounts unchanged when the account does not exist', () => {
        const settings = createSettings()

        const state = settingsReducer(
            {
                settings,
                loading: false,
            },
            removeConnectedAccount.fulfilled(999, 'request-id', 999),
        )

        expect(state.settings?.connectedAccounts).toEqual(
            settings.connectedAccounts,
        )
    })

    it('does not remove a connected account when settings does not exist', () => {
        const state = settingsReducer(
            {
                settings: null,
                loading: false,
            },
            removeConnectedAccount.fulfilled(1, 'request-id', 1),
        )

        expect(state).toEqual({
            settings: null,
            loading: false,
        })
    })

    it('removes a device session', () => {
        const settings = createSettings()

        const state = settingsReducer(
            {
                settings,
                loading: false,
            },
            removeDeviceSession.fulfilled(1, 'request-id', 1),
        )

        expect(state.settings?.recentDevices).toEqual([
            settings.recentDevices[1],
        ])
    })

    it('keeps device sessions unchanged when the device does not exist', () => {
        const settings = createSettings()

        const state = settingsReducer(
            {
                settings,
                loading: false,
            },
            removeDeviceSession.fulfilled(999, 'request-id', 999),
        )

        expect(state.settings?.recentDevices).toEqual(settings.recentDevices)
    })

    it('does not remove a device session when settings does not exist', () => {
        const state = settingsReducer(
            {
                settings: null,
                loading: false,
            },
            removeDeviceSession.fulfilled(1, 'request-id', 1),
        )

        expect(state).toEqual({
            settings: null,
            loading: false,
        })
    })
})

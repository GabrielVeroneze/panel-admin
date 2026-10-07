import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchCurrentUserThunk } from '@/features/auth/store'
import { fetchMyProfile } from '@/features/profile/store'
import {
    connectSocialAccount,
    disconnectConnectedAccount,
    disconnectSocialAccount,
    getSettings,
    revokeDeviceSession,
    updateEmailSettings,
    updateGeneralInformation,
    updateNotifications,
    updatePassword,
    updatePreferences,
    updateProfileAvatar,
} from '../api'
import {
    connectAccount,
    disconnectAccount,
    fetchSettings,
    removeConnectedAccount,
    removeDeviceSession,
    saveEmailSettings,
    saveGeneralInformation,
    saveNotifications,
    savePassword,
    savePreferences,
    updateAvatar,
} from './settings.thunks'
import type {
    ConnectedAccount,
    EmailPreferences,
    GeneralInformation,
    NotificationPreferences,
    Settings,
    SettingsPreferences,
    SettingsProfile,
    SocialAccount,
    UpdatePasswordPayload,
    UpdateProfileAvatarPayload,
} from '../types'

vi.mock('../api', () => ({
    connectSocialAccount: vi.fn(),
    disconnectConnectedAccount: vi.fn(),
    disconnectSocialAccount: vi.fn(),
    getSettings: vi.fn(),
    revokeDeviceSession: vi.fn(),
    updateEmailSettings: vi.fn(),
    updateGeneralInformation: vi.fn(),
    updateNotifications: vi.fn(),
    updatePassword: vi.fn(),
    updatePreferences: vi.fn(),
    updateProfileAvatar: vi.fn(),
}))

vi.mock('@/features/auth/store', () => ({
    fetchCurrentUserThunk: vi.fn(() => ({
        type: 'auth/fetchCurrentUser',
    })),
}))

vi.mock('@/features/profile/store', () => ({
    fetchMyProfile: vi.fn(() => ({
        type: 'profile/fetchMyProfile',
    })),
}))

const createDispatch = () => {
    const dispatch = vi.fn((action) => {
        if (typeof action === 'function') {
            return action(dispatch, () => ({}), undefined)
        }

        return Promise.resolve(action)
    })

    return dispatch
}

describe('settings.thunks', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('fetches settings successfully', async () => {
        const settings: Settings = {
            profile: {
                avatar: '/avatar.jpg',
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
                address: 'Main Street',
                city: 'São Paulo',
                country: 'Brazil',
                zipCode: '01000-000',
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

        vi.mocked(getSettings).mockResolvedValue(settings)

        const dispatch = createDispatch()

        const result = await dispatch(fetchSettings())

        expect(getSettings).toHaveBeenCalledTimes(1)
        expect(result.type).toBe('settings/fetchSettings/fulfilled')
        expect(result.payload).toEqual(settings)
    })

    it('updates the avatar and refreshes related user data', async () => {
        const payload: UpdateProfileAvatarPayload = {
            avatar: new File(['avatar'], 'avatar.jpg', {
                type: 'image/jpeg',
            }),
        }

        const profile: SettingsProfile = {
            avatar: '/new-avatar.jpg',
            name: 'John Doe',
            role: 'Admin',
        }

        vi.mocked(updateProfileAvatar).mockResolvedValue(profile)

        const dispatch = createDispatch()

        const result = await dispatch(updateAvatar(payload))

        expect(updateProfileAvatar).toHaveBeenCalledWith(payload)

        expect(
            dispatch.mock.calls.some(
                ([action]) =>
                    typeof action === 'object' &&
                    action?.type === 'settings/fetchSettings/fulfilled',
            ),
        ).toBe(true)

        expect(fetchCurrentUserThunk).toHaveBeenCalledTimes(1)
        expect(fetchMyProfile).toHaveBeenCalledTimes(1)

        expect(result.type).toBe('settings/updateAvatar/fulfilled')
        expect(result.payload).toEqual(profile)
    })

    it('saves preferences successfully', async () => {
        const payload: SettingsPreferences = {
            language: 'pt-BR',
            timezone: 'America/Sao_Paulo',
        }

        vi.mocked(updatePreferences).mockResolvedValue(payload)

        const dispatch = createDispatch()

        const result = await dispatch(savePreferences(payload))

        expect(updatePreferences).toHaveBeenCalledWith(payload)
        expect(result.type).toBe('settings/savePreferences/fulfilled')
        expect(result.payload).toEqual(payload)
    })

    it('saves general information and refreshes related user data', async () => {
        const payload: GeneralInformation = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            role: 'Admin',
            phone: '+5511999999999',
            birthDate: '1990-01-01',
            organization: 'Acme',
            department: 'Engineering',
            address: 'Main Street',
            city: 'São Paulo',
            country: 'Brazil',
            zipCode: '01000-000',
        }

        vi.mocked(updateGeneralInformation).mockResolvedValue(payload)

        const dispatch = createDispatch()

        const result = await dispatch(saveGeneralInformation(payload))

        expect(updateGeneralInformation).toHaveBeenCalledWith(payload)

        expect(
            dispatch.mock.calls.some(
                ([action]) =>
                    typeof action === 'object' &&
                    action?.type === 'settings/fetchSettings/fulfilled',
            ),
        ).toBe(true)

        expect(fetchCurrentUserThunk).toHaveBeenCalledTimes(1)
        expect(fetchMyProfile).toHaveBeenCalledTimes(1)

        expect(result.type).toBe('settings/saveGeneralInformation/fulfilled')
        expect(result.payload).toEqual(payload)
    })

    it('saves notification preferences successfully', async () => {
        const payload: NotificationPreferences = {
            companyNews: false,
            accountActivity: true,
            meetupsNearYou: true,
            newMessages: false,
        }

        vi.mocked(updateNotifications).mockResolvedValue(payload)

        const dispatch = createDispatch()

        const result = await dispatch(saveNotifications(payload))

        expect(updateNotifications).toHaveBeenCalledWith(payload)
        expect(result.type).toBe('settings/saveNotifications/fulfilled')
        expect(result.payload).toEqual(payload)
    })

    it('saves email settings successfully', async () => {
        const payload: EmailPreferences = {
            ratingReminders: true,
            itemUpdateNotifications: false,
            itemCommentNotifications: true,
            buyerReviewNotifications: false,
        }

        vi.mocked(updateEmailSettings).mockResolvedValue(payload)

        const dispatch = createDispatch()

        const result = await dispatch(saveEmailSettings(payload))

        expect(updateEmailSettings).toHaveBeenCalledWith(payload)
        expect(result.type).toBe('settings/saveEmailSettings/fulfilled')
        expect(result.payload).toEqual(payload)
    })

    it('saves the password successfully', async () => {
        const payload: UpdatePasswordPayload = {
            currentPassword: 'Current123!',
            newPassword: 'NewPassword123!',
            confirmPassword: 'NewPassword123!',
        }

        vi.mocked(updatePassword).mockResolvedValue(undefined)

        const dispatch = createDispatch()

        const result = await dispatch(savePassword(payload))

        expect(updatePassword).toHaveBeenCalledWith(payload)
        expect(result.type).toBe('settings/savePassword/fulfilled')
        expect(result.payload).toBeUndefined()
    })

    it('rejects password update with a custom error when the current password is incorrect', async () => {
        const payload: UpdatePasswordPayload = {
            currentPassword: 'WrongPassword123!',
            newPassword: 'NewPassword123!',
            confirmPassword: 'NewPassword123!',
        }

        vi.mocked(updatePassword).mockRejectedValue(
            new Error('Invalid password'),
        )

        const dispatch = createDispatch()

        const result = await dispatch(savePassword(payload))

        expect(updatePassword).toHaveBeenCalledWith(payload)
        expect(result.type).toBe('settings/savePassword/rejected')
        expect(result.payload).toBe('Current password is incorrect')
        expect(result.error.message).toBe('Rejected')
    })

    it.each(['facebook', 'twitter', 'github', 'dribbble'] as const)(
        'connects the %s account successfully',
        async (platform) => {
            const socialAccount: SocialAccount = {
                id: 1,
                platform,
                connected: true,
                url: `https://${platform}.com/john`,
            }

            vi.mocked(connectSocialAccount).mockResolvedValue(socialAccount)

            const dispatch = createDispatch()

            const result = await dispatch(connectAccount(platform))

            expect(connectSocialAccount).toHaveBeenCalledWith(platform)
            expect(result.type).toBe('settings/connectAccount/fulfilled')
            expect(result.payload).toEqual(socialAccount)
        },
    )

    it.each(['facebook', 'twitter', 'github', 'dribbble'] as const)(
        'disconnects the %s account successfully',
        async (platform) => {
            const socialAccount: SocialAccount = {
                id: 1,
                platform,
                connected: false,
            }

            vi.mocked(disconnectSocialAccount).mockResolvedValue(socialAccount)

            const dispatch = createDispatch()

            const result = await dispatch(disconnectAccount(platform))

            expect(disconnectSocialAccount).toHaveBeenCalledWith(platform)
            expect(result.type).toBe('settings/disconnectAccount/fulfilled')
            expect(result.payload).toEqual(socialAccount)
        },
    )

    it('removes a connected account and returns its id', async () => {
        const accountId: ConnectedAccount['id'] = 42

        vi.mocked(disconnectConnectedAccount).mockResolvedValue({
            success: true,
        })

        const dispatch = createDispatch()

        const result = await dispatch(removeConnectedAccount(accountId))

        expect(disconnectConnectedAccount).toHaveBeenCalledWith(accountId)
        expect(result.type).toBe('settings/removeConnectedAccount/fulfilled')
        expect(result.payload).toBe(accountId)
    })

    it('removes a device session and returns its id', async () => {
        const deviceId = 42

        vi.mocked(revokeDeviceSession).mockResolvedValue(undefined)

        const dispatch = createDispatch()

        const result = await dispatch(removeDeviceSession(deviceId))

        expect(revokeDeviceSession).toHaveBeenCalledWith(deviceId)
        expect(result.type).toBe('settings/removeDeviceSession/fulfilled')
        expect(result.payload).toBe(deviceId)
    })
})

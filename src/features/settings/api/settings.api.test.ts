import { describe, expect, it, vi } from 'vitest'
import { api } from '@/services/api'
import { toFormData } from '@/shared/utils'
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
} from './settings.api'
import type {
    EmailPreferences,
    GeneralInformation,
    NotificationPreferences,
    Settings,
    SettingsPreferences,
    SocialPlatform,
    UpdatePasswordPayload,
    UpdateProfileAvatarPayload,
} from '../types'

vi.mock('@/services/api', () => ({
    api: {
        get: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}))

vi.mock('@/shared/utils', () => ({
    toFormData: vi.fn(),
}))

describe('settings.api', () => {
    it('gets settings successfully', async () => {
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

        vi.mocked(api.get).mockResolvedValue({
            data: settings,
        })

        const result = await getSettings()

        expect(api.get).toHaveBeenCalledWith('/settings')
        expect(result).toEqual(settings)
    })

    it('updates the profile avatar using form data', async () => {
        const payload: UpdateProfileAvatarPayload = {
            avatar: new File(['avatar'], 'avatar.jpg', {
                type: 'image/jpeg',
            }),
        }

        const formData = new FormData()
        const responseData = {
            avatar: '/new-avatar.jpg',
        }

        vi.mocked(toFormData).mockReturnValue(formData)
        vi.mocked(api.put).mockResolvedValue({
            data: responseData,
        })

        const result = await updateProfileAvatar(payload)

        expect(toFormData).toHaveBeenCalledWith(payload)
        expect(api.put).toHaveBeenCalledWith('/settings/profile', formData)
        expect(result).toEqual(responseData)
    })

    it('updates preferences successfully', async () => {
        const payload: SettingsPreferences = {
            language: 'pt-BR',
            timezone: 'America/Sao_Paulo',
        }

        const responseData = {
            language: 'pt-BR',
            timezone: 'America/Sao_Paulo',
        }

        vi.mocked(api.put).mockResolvedValue({
            data: responseData,
        })

        const result = await updatePreferences(payload)

        expect(api.put).toHaveBeenCalledWith('/settings/preferences', payload)
        expect(result).toEqual(responseData)
    })

    it('updates general information successfully', async () => {
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

        const responseData = {
            ...payload,
        }

        vi.mocked(api.put).mockResolvedValue({
            data: responseData,
        })

        const result = await updateGeneralInformation(payload)

        expect(api.put).toHaveBeenCalledWith('/settings/general', payload)
        expect(result).toEqual(responseData)
    })

    it('updates password successfully', async () => {
        const payload: UpdatePasswordPayload = {
            currentPassword: 'Current123!',
            newPassword: 'NewPassword123!',
            confirmPassword: 'NewPassword123!',
        }

        const responseData = {
            success: true,
        }

        vi.mocked(api.put).mockResolvedValue({
            data: responseData,
        })

        const result = await updatePassword(payload)

        expect(api.put).toHaveBeenCalledWith('/settings/password', payload)
        expect(result).toEqual(responseData)
    })

    it('updates notification preferences successfully', async () => {
        const payload: NotificationPreferences = {
            companyNews: false,
            accountActivity: true,
            meetupsNearYou: true,
            newMessages: false,
        }

        const responseData = {
            ...payload,
        }

        vi.mocked(api.put).mockResolvedValue({
            data: responseData,
        })

        const result = await updateNotifications(payload)

        expect(api.put).toHaveBeenCalledWith('/settings/notifications', payload)
        expect(result).toEqual(responseData)
    })

    it('updates email settings successfully', async () => {
        const payload: EmailPreferences = {
            ratingReminders: true,
            itemUpdateNotifications: false,
            itemCommentNotifications: true,
            buyerReviewNotifications: false,
        }

        const responseData = {
            ...payload,
        }

        vi.mocked(api.put).mockResolvedValue({
            data: responseData,
        })

        const result = await updateEmailSettings(payload)

        expect(api.put).toHaveBeenCalledWith(
            '/settings/email-notifications',
            payload,
        )
        expect(result).toEqual(responseData)
    })

    it.each<SocialPlatform>(['facebook', 'twitter', 'github', 'dribbble'])(
        'connects the %s social account successfully',
        async (platform) => {
            const responseData = {
                platform,
                connected: true,
            }

            vi.mocked(api.put).mockResolvedValue({
                data: responseData,
            })

            const result = await connectSocialAccount(platform)

            expect(api.put).toHaveBeenCalledWith(
                `/settings/social-accounts/${platform}/connect`,
            )
            expect(result).toEqual(responseData)
        },
    )

    it.each<SocialPlatform>(['facebook', 'twitter', 'github', 'dribbble'])(
        'disconnects the %s social account successfully',
        async (platform) => {
            const responseData = {
                platform,
                connected: false,
            }

            vi.mocked(api.put).mockResolvedValue({
                data: responseData,
            })

            const result = await disconnectSocialAccount(platform)

            expect(api.put).toHaveBeenCalledWith(
                `/settings/social-accounts/${platform}/disconnect`,
            )
            expect(result).toEqual(responseData)
        },
    )

    it('disconnects a connected account successfully', async () => {
        const accountId = 42
        const responseData = {
            success: true,
        }

        vi.mocked(api.delete).mockResolvedValue({
            data: responseData,
        })

        const result = await disconnectConnectedAccount(accountId)

        expect(api.delete).toHaveBeenCalledWith(
            `/settings/connected-accounts/${accountId}`,
        )
        expect(result).toEqual(responseData)
    })

    it('revokes a device session successfully', async () => {
        const deviceId = 42

        vi.mocked(api.delete).mockResolvedValue({
            data: undefined,
        })

        const result = await revokeDeviceSession(deviceId)

        expect(api.delete).toHaveBeenCalledWith(`/settings/devices/${deviceId}`)
        expect(result).toBeUndefined()
    })
})

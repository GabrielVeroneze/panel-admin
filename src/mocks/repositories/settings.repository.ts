import { settingsDatabase, type StoredSettings } from '../database'
import {
    getCurrentUser,
    updateAuthAvatarFromSettings,
    updateAuthUserFromSettings,
    updateProfileAvatarFromSettings,
    updateProfileFromSettings,
    updateUserAvatarFromSettings,
    updateUserFromSettings,
} from './'
import type { UpdateUserPayload } from '@/features/users/types'
import type { AuthUser } from '@/features/auth/types'
import type {
    EmailPreferences,
    GeneralInformation,
    NotificationPreferences,
    Settings,
    SettingsPreferences,
    SettingsProfile,
    SocialAccount,
    SocialPlatform,
} from '@/features/settings/types'

export const findSettingsByUserId = (userId: number): Settings | null => {
    const settings = settingsDatabase.find(
        (settings) => settings.userId === userId,
    )

    if (!settings) {
        return null
    }

    const { userId: _, ...data } = settings

    return data
}

export const getCurrentSettings = (): Settings | null => {
    const user = getCurrentUser()

    if (!user) {
        return null
    }

    return findSettingsByUserId(user.id)
}

const getStoredSettings = (userId: number) => {
    return (
        settingsDatabase.find((settings) => settings.userId === userId) ?? null
    )
}

const getCurrentStoredSettings = (): StoredSettings | null => {
    const user = getCurrentUser()

    if (!user) {
        return null
    }

    return getStoredSettings(user.id)
}

export const createSettings = (user: AuthUser): Settings => {
    const [firstName, ...lastName] = user.name.split(' ')

    const settings: StoredSettings = {
        userId: user.id,
        profile: {
            avatar: user.avatar,
            name: user.name,
            role: user.role,
        },
        preferences: {
            language: 'en',
            timezone: 'America/New_York',
        },
        generalInformation: {
            firstName: firstName,
            lastName: lastName.join(' '),
            email: user.email,
            role: user.role,
            phone: '',
            birthDate: '',
            organization: '',
            department: '',
            address: '',
            city: '',
            country: 'United States',
            zipCode: '',
        },
        socialAccounts: [
            {
                id: 1,
                platform: 'github',
                connected: false,
                url: '',
            },
            {
                id: 2,
                platform: 'twitter',
                connected: false,
                url: '',
            },
        ],
        connectedAccounts: [],
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
        recentDevices: [],
    }

    settingsDatabase.push(settings)

    const { userId: _, ...response } = settings

    return response
}

export const updateSettings = (
    id: number,
    payload: UpdateUserPayload,
): Settings | null => {
    const settings = getStoredSettings(id)

    if (!settings) {
        return null
    }

    const { avatar, ...data } = payload

    if (avatar) {
        settings.profile.avatar = URL.createObjectURL(avatar)
    }

    if (data.name !== undefined) {
        settings.profile.name = data.name

        const [firstName, ...lastName] = data.name.split(' ')

        settings.generalInformation.firstName = firstName
        settings.generalInformation.lastName = lastName.join(' ')
    }

    if (data.email !== undefined) {
        settings.generalInformation.email = data.email
    }

    if (data.phone !== undefined) {
        settings.generalInformation.phone = data.phone
    }

    if (data.company !== undefined) {
        settings.generalInformation.organization = data.company
    }

    if (data.department !== undefined) {
        settings.profile.role = data.department

        settings.generalInformation.department = data.department
    }

    const { userId: _, ...response } = settings

    return response
}

export const updateSettingsProfileAvatar = (
    avatar: File,
): SettingsProfile | null => {
    const settings = getCurrentStoredSettings()

    if (!settings) {
        return null
    }

    settings.profile.avatar = URL.createObjectURL(avatar)

    updateProfileAvatarFromSettings(settings.userId, avatar)

    updateUserAvatarFromSettings(settings.userId, avatar)

    updateAuthAvatarFromSettings(settings.userId, avatar)

    return settings.profile
}

export const updateGeneralInformation = (
    payload: GeneralInformation,
): GeneralInformation | null => {
    const settings = getCurrentStoredSettings()

    if (!settings) {
        return null
    }

    settings.generalInformation = payload

    settings.profile.name = `${payload.firstName} ${payload.lastName}`
    settings.profile.role = payload.role

    updateProfileFromSettings(settings.userId, payload)

    updateUserFromSettings(settings.userId, payload)

    updateAuthUserFromSettings(settings.userId, payload)

    return settings.generalInformation
}

export const updatePreferences = (
    payload: SettingsPreferences,
): SettingsPreferences | null => {
    const settings = getCurrentStoredSettings()

    if (!settings) {
        return null
    }

    settings.preferences = payload

    return settings.preferences
}

export const updateNotifications = (
    payload: NotificationPreferences,
): NotificationPreferences | null => {
    const settings = getCurrentStoredSettings()

    if (!settings) {
        return null
    }

    settings.notifications = payload

    return settings.notifications
}

export const updateEmailSettings = (
    payload: EmailPreferences,
): EmailPreferences | null => {
    const settings = getCurrentStoredSettings()

    if (!settings) {
        return null
    }

    settings.emailSettings = payload

    return settings.emailSettings
}

export const connectSocialAccount = (
    platform: SocialPlatform,
): SocialAccount | null => {
    const settings = getCurrentStoredSettings()

    if (!settings) {
        return null
    }

    const account = settings.socialAccounts.find(
        (account) => account.platform === platform,
    )

    if (!account) {
        return null
    }

    account.connected = true

    return account
}

export const disconnectSocialAccount = (
    platform: SocialPlatform,
): SocialAccount | null => {
    const settings = getCurrentStoredSettings()

    if (!settings) {
        return null
    }

    const account = settings.socialAccounts.find(
        (account) => account.platform === platform,
    )

    if (!account) {
        return null
    }

    account.connected = false

    return account
}

export const removeConnectedAccount = (accountId: number): boolean => {
    const settings = getCurrentStoredSettings()

    if (!settings) {
        return false
    }

    const index = settings.connectedAccounts.findIndex(
        (account) => account.id === accountId,
    )

    if (index === -1) {
        return false
    }

    settings.connectedAccounts.splice(index, 1)

    return true
}

export const removeDeviceSession = (deviceId: number): boolean => {
    const settings = getCurrentStoredSettings()

    if (!settings) {
        return false
    }

    const index = settings.recentDevices.findIndex(
        (device) => device.id === deviceId,
    )

    if (index === -1) {
        return false
    }

    settings.recentDevices.splice(index, 1)

    return true
}

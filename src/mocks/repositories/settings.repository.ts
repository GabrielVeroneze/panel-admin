import { settingsDatabase } from '../database'
import { getCurrentUser } from './'
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

export const updateSettingsProfileAvatar = (
    avatar: File,
): SettingsProfile | null => {
    const user = getCurrentUser()

    if (!user) {
        return null
    }

    const settings = getStoredSettings(user.id)

    if (!settings) {
        return null
    }

    settings.profile.avatar = URL.createObjectURL(avatar)

    return settings.profile
}

export const updateGeneralInformation = (
    payload: GeneralInformation,
): GeneralInformation | null => {
    const user = getCurrentUser()

    if (!user) {
        return null
    }

    const settings = getStoredSettings(user.id)

    if (!settings) {
        return null
    }

    settings.generalInformation = payload

    return settings.generalInformation
}

export const updatePreferences = (
    payload: SettingsPreferences,
): SettingsPreferences | null => {
    const user = getCurrentUser()

    if (!user) {
        return null
    }

    const settings = getStoredSettings(user.id)

    if (!settings) {
        return null
    }

    settings.preferences = payload

    return settings.preferences
}

export const updateNotifications = (
    payload: NotificationPreferences,
): NotificationPreferences | null => {
    const user = getCurrentUser()

    if (!user) {
        return null
    }

    const settings = getStoredSettings(user.id)

    if (!settings) {
        return null
    }

    settings.notifications = payload

    return settings.notifications
}

export const updateEmailSettings = (
    payload: EmailPreferences,
): EmailPreferences | null => {
    const user = getCurrentUser()

    if (!user) {
        return null
    }

    const settings = getStoredSettings(user.id)

    if (!settings) {
        return null
    }

    settings.emailSettings = payload

    return settings.emailSettings
}

export const connectSocialAccount = (
    platform: SocialPlatform,
): SocialAccount | null => {
    const user = getCurrentUser()

    if (!user) {
        return null
    }

    const settings = getStoredSettings(user.id)

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

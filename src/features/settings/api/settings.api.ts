import { api } from '@/services/api'
import { toFormData } from '@/shared/utils'
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

export const getSettings = async () => {
    const { data } = await api.get<Settings>('/settings')

    return data
}

export const updateProfileAvatar = async (
    payload: UpdateProfileAvatarPayload,
) => {
    const formData = toFormData(payload)

    const { data } = await api.put('/settings/profile', formData)

    return data
}

export const updatePreferences = async (payload: SettingsPreferences) => {
    const { data } = await api.put('/settings/preferences', payload)

    return data
}

export const updateGeneralInformation = async (payload: GeneralInformation) => {
    const { data } = await api.put('/settings/general', payload)

    return data
}

export const updatePassword = async (payload: UpdatePasswordPayload) => {
    const { data } = await api.put('/settings/password', payload)

    return data
}

export const updateNotifications = async (payload: NotificationPreferences) => {
    const { data } = await api.put('/settings/notifications', payload)

    return data
}

export const updateEmailSettings = async (payload: EmailPreferences) => {
    const { data } = await api.put('/settings/email-settings', payload)

    return data
}

export const connectSocialAccount = async (platform: SocialPlatform) => {
    const { data } = await api.put(
        `/settings/social-accounts/${platform}/connect`,
    )

    return data
}

export const disconnectSocialAccount = async (platform: SocialPlatform) => {
    const { data } = await api.put(
        `/settings/social-accounts/${platform}/disconnect`,
    )

    return data
}

export const disconnectConnectedAccount = async (accountId: number) => {
    const { data } = await api.delete(
        `/settings/connected-accounts/${accountId}`,
    )

    return data
}

export const revokeDeviceSession = async (deviceId: number) => {
    await api.delete(`/settings/devices/${deviceId}`)
}

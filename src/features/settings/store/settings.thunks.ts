import { createAsyncThunk } from '@reduxjs/toolkit'
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
import type {
    ConnectedAccount,
    DeviceSession,
    EmailPreferences,
    GeneralInformation,
    NotificationPreferences,
    Settings,
    SettingsPreferences,
    SettingsProfile,
    SocialAccount,
    SocialPlatform,
    UpdatePasswordPayload,
    UpdateProfileAvatarPayload,
} from '../types'

export const fetchSettings = createAsyncThunk<Settings>(
    'settings/fetchSettings',
    async () => {
        return await getSettings()
    },
)

export const updateAvatar = createAsyncThunk<
    SettingsProfile,
    UpdateProfileAvatarPayload
>('settings/updateAvatar', async (payload, { dispatch }) => {
    const profile = await updateProfileAvatar(payload)

    await dispatch(fetchSettings())
    await dispatch(fetchCurrentUserThunk())
    await dispatch(fetchMyProfile())

    return profile
})

export const savePreferences = createAsyncThunk<
    SettingsPreferences,
    SettingsPreferences
>('settings/savePreferences', async (payload) => {
    return await updatePreferences(payload)
})

export const saveGeneralInformation = createAsyncThunk<
    GeneralInformation,
    GeneralInformation
>('settings/saveGeneralInformation', async (payload, { dispatch }) => {
    const response = await updateGeneralInformation(payload)

    await dispatch(fetchSettings())
    await dispatch(fetchCurrentUserThunk())
    await dispatch(fetchMyProfile())

    return response
})

export const saveNotifications = createAsyncThunk<
    NotificationPreferences,
    NotificationPreferences
>('settings/saveNotifications', async (payload) => {
    return await updateNotifications(payload)
})

export const saveEmailSettings = createAsyncThunk<
    EmailPreferences,
    EmailPreferences
>('settings/saveEmailSettings', async (payload) => {
    return await updateEmailSettings(payload)
})

export const savePassword = createAsyncThunk<void, UpdatePasswordPayload>(
    'settings/savePassword',
    async (payload, { rejectWithValue }) => {
        try {
            await updatePassword(payload)
        } catch {
            return rejectWithValue('Current password is incorrect')
        }
    },
)

export const connectAccount = createAsyncThunk<SocialAccount, SocialPlatform>(
    'settings/connectAccount',
    async (platform) => {
        return await connectSocialAccount(platform)
    },
)

export const disconnectAccount = createAsyncThunk<
    SocialAccount,
    SocialPlatform
>('settings/disconnectAccount', async (platform) => {
    return await disconnectSocialAccount(platform)
})

export const removeConnectedAccount = createAsyncThunk<
    ConnectedAccount['id'],
    ConnectedAccount['id']
>('settings/removeConnectedAccount', async (accountId) => {
    await disconnectConnectedAccount(accountId)

    return accountId
})

export const removeDeviceSession = createAsyncThunk<
    DeviceSession['id'],
    DeviceSession['id']
>('settings/removeDeviceSession', async (deviceId) => {
    await revokeDeviceSession(deviceId)

    return deviceId
})

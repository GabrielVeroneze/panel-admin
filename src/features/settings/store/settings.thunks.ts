import { createAsyncThunk } from '@reduxjs/toolkit'
import { getApiErrorMessage } from '@/shared/utils'
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
    UpdateProfileAvatarPayload,
    { rejectValue: string }
>('settings/updateAvatar', async (payload, { dispatch, rejectWithValue }) => {
    try {
        const profile = await updateProfileAvatar(payload)

        await dispatch(fetchSettings())
        await dispatch(fetchCurrentUserThunk())
        await dispatch(fetchMyProfile())

        return profile
    } catch (error) {
        return rejectWithValue(
            getApiErrorMessage(error, {
                fallback: 'Unable to update profile picture. Please try again.',
            }),
        )
    }
})

export const savePreferences = createAsyncThunk<
    SettingsPreferences,
    SettingsPreferences,
    { rejectValue: string }
>('settings/savePreferences', async (payload, { rejectWithValue }) => {
    try {
        return await updatePreferences(payload)
    } catch (error) {
        return rejectWithValue(
            getApiErrorMessage(error, {
                fallback:
                    'Unable to update language and timezone preferences. Please try again.',
            }),
        )
    }
})

export const saveGeneralInformation = createAsyncThunk<
    GeneralInformation,
    GeneralInformation,
    { rejectValue: string }
>(
    'settings/saveGeneralInformation',
    async (payload, { dispatch, rejectWithValue }) => {
        try {
            const response = await updateGeneralInformation(payload)

            await dispatch(fetchSettings())
            await dispatch(fetchCurrentUserThunk())
            await dispatch(fetchMyProfile())

            return response
        } catch (error) {
            return rejectWithValue(
                getApiErrorMessage(error, {
                    fallback:
                        'Unable to update general information. Please try again.',
                }),
            )
        }
    },
)

export const saveNotifications = createAsyncThunk<
    NotificationPreferences,
    NotificationPreferences,
    { rejectValue: string }
>('settings/saveNotifications', async (payload, { rejectWithValue }) => {
    try {
        return await updateNotifications(payload)
    } catch (error) {
        return rejectWithValue(
            getApiErrorMessage(error, {
                fallback:
                    'Unable to update notification preferences. Please try again.',
            }),
        )
    }
})

export const saveEmailSettings = createAsyncThunk<
    EmailPreferences,
    EmailPreferences,
    { rejectValue: string }
>('settings/saveEmailSettings', async (payload, { rejectWithValue }) => {
    try {
        return await updateEmailSettings(payload)
    } catch (error) {
        return rejectWithValue(
            getApiErrorMessage(error, {
                fallback:
                    'Unable to update email preferences. Please try again.',
            }),
        )
    }
})

export const savePassword = createAsyncThunk<
    void,
    UpdatePasswordPayload,
    { rejectValue: string }
>('settings/savePassword', async (payload, { rejectWithValue }) => {
    try {
        await updatePassword(payload)
    } catch (error) {
        return rejectWithValue(
            getApiErrorMessage(error, {
                fallback: 'Unable to update password. Please try again.',
            }),
        )
    }
})

export const connectAccount = createAsyncThunk<
    SocialAccount,
    SocialPlatform,
    { rejectValue: string }
>('settings/connectAccount', async (platform, { rejectWithValue }) => {
    try {
        return await connectSocialAccount(platform)
    } catch (error) {
        return rejectWithValue(
            getApiErrorMessage(error, {
                fallback: 'Unable to connect social account. Please try again.',
            }),
        )
    }
})

export const disconnectAccount = createAsyncThunk<
    SocialAccount,
    SocialPlatform,
    { rejectValue: string }
>('settings/disconnectAccount', async (platform, { rejectWithValue }) => {
    try {
        return await disconnectSocialAccount(platform)
    } catch (error) {
        return rejectWithValue(
            getApiErrorMessage(error, {
                fallback:
                    'Unable to disconnect social account. Please try again.',
            }),
        )
    }
})

export const removeConnectedAccount = createAsyncThunk<
    ConnectedAccount['id'],
    ConnectedAccount['id'],
    { rejectValue: string }
>('settings/removeConnectedAccount', async (accountId, { rejectWithValue }) => {
    try {
        await disconnectConnectedAccount(accountId)

        return accountId
    } catch (error) {
        return rejectWithValue(
            getApiErrorMessage(error, {
                fallback: 'Unable to disconnect account. Please try again.',
            }),
        )
    }
})

export const removeDeviceSession = createAsyncThunk<
    DeviceSession['id'],
    DeviceSession['id'],
    { rejectValue: string }
>('settings/removeDeviceSession', async (deviceId, { rejectWithValue }) => {
    try {
        await revokeDeviceSession(deviceId)

        return deviceId
    } catch (error) {
        return rejectWithValue(
            getApiErrorMessage(error, {
                fallback: 'Unable to disconnect device. Please try again.',
            }),
        )
    }
})

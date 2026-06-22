import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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

type SettingsState = {
    settings: Settings | null
    loading: boolean
}

const initialState: SettingsState = {
    settings: null,
    loading: false,
}

export const fetchSettings = createAsyncThunk<Settings>(
    'settings/fetchSettings',
    async () => {
        return await getSettings()
    },
)

export const updateAvatar = createAsyncThunk<
    SettingsProfile,
    UpdateProfileAvatarPayload
>('settings/updateAvatar', async (payload) => {
    return await updateProfileAvatar(payload)
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
>('settings/saveGeneralInformation', async (payload) => {
    return await updateGeneralInformation(payload)
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
    async (payload) => {
        return await updatePassword(payload)
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

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.loading = false
                state.settings = action.payload
            })
            .addCase(fetchSettings.rejected, (state) => {
                state.loading = false
            })
            .addCase(updateAvatar.fulfilled, (state, action) => {
                if (!state.settings) return

                state.settings.profile = action.payload
            })
            .addCase(savePreferences.fulfilled, (state, action) => {
                if (!state.settings) return

                state.settings.preferences = action.payload
            })
            .addCase(saveGeneralInformation.fulfilled, (state, action) => {
                if (!state.settings) return

                state.settings.generalInformation = action.payload
            })
            .addCase(saveNotifications.fulfilled, (state, action) => {
                if (!state.settings) return

                state.settings.notifications = action.payload
            })
            .addCase(saveEmailSettings.fulfilled, (state, action) => {
                if (!state.settings) return

                state.settings.emailSettings = action.payload
            })
            .addCase(connectAccount.fulfilled, (state, action) => {
                if (!state.settings) return

                const index = state.settings.socialAccounts.findIndex(
                    (account) => account.id === action.payload.id,
                )

                if (index === -1) return

                state.settings.socialAccounts[index] = action.payload
            })
            .addCase(disconnectAccount.fulfilled, (state, action) => {
                if (!state.settings) return

                const index = state.settings.socialAccounts.findIndex(
                    (account) => account.id === action.payload.id,
                )

                if (index === -1) return

                state.settings.socialAccounts[index] = action.payload
            })
            .addCase(removeConnectedAccount.fulfilled, (state, action) => {
                if (!state.settings) return

                const remainingConnectedAccounts =
                    state.settings.connectedAccounts.filter(
                        (account) => account.id !== action.payload,
                    )

                state.settings.connectedAccounts = remainingConnectedAccounts
            })
            .addCase(removeDeviceSession.fulfilled, (state, action) => {
                if (!state.settings) return

                const remainingDeviceSessions =
                    state.settings.recentDevices.filter(
                        (device) => device.id !== action.payload,
                    )

                state.settings.recentDevices = remainingDeviceSessions
            })
    },
})

export default settingsSlice.reducer

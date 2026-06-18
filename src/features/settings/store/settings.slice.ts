import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    getSettings,
    updateEmailSettings,
    updateGeneralInformation,
    updateNotifications,
    updatePassword,
    updatePreferences,
    updateProfileAvatar,
} from '../api'
import type {
    EmailPreferences,
    GeneralInformation,
    NotificationPreferences,
    Settings,
    SettingsPreferences,
    SettingsProfile,
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
    },
})

export default settingsSlice.reducer

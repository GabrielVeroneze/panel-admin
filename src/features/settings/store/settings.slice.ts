import { createSlice } from '@reduxjs/toolkit'
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
import type { Settings, SocialPlatform } from '../types'

type SettingsState = {
    settings: Settings | null
    loading: boolean
    avatarLoading: boolean
    generalInformationLoading: boolean
    preferencesLoading: boolean
    passwordLoading: boolean
    notificationsLoading: boolean
    emailSettingsLoading: boolean
    socialAccountsLoading: SocialPlatform[]
    connectedAccountsLoading: number[]
    recentDevicesLoading: number[]
}

const initialState: SettingsState = {
    settings: null,
    loading: false,
    avatarLoading: false,
    generalInformationLoading: false,
    preferencesLoading: false,
    passwordLoading: false,
    notificationsLoading: false,
    emailSettingsLoading: false,
    socialAccountsLoading: [],
    connectedAccountsLoading: [],
    recentDevicesLoading: [],
}

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
            .addCase(updateAvatar.pending, (state) => {
                state.avatarLoading = true
            })
            .addCase(updateAvatar.fulfilled, (state, action) => {
                state.avatarLoading = false

                if (!state.settings) return

                state.settings.profile = action.payload
            })
            .addCase(updateAvatar.rejected, (state) => {
                state.avatarLoading = false
            })
            .addCase(savePreferences.pending, (state) => {
                state.preferencesLoading = true
            })
            .addCase(savePreferences.fulfilled, (state, action) => {
                state.preferencesLoading = false

                if (!state.settings) return

                state.settings.preferences = action.payload
            })
            .addCase(savePreferences.rejected, (state) => {
                state.preferencesLoading = false
            })
            .addCase(saveGeneralInformation.pending, (state) => {
                state.generalInformationLoading = true
            })
            .addCase(saveGeneralInformation.fulfilled, (state, action) => {
                state.generalInformationLoading = false

                if (!state.settings) return

                state.settings.generalInformation = action.payload

                state.settings.profile.name = `${action.payload.firstName} ${action.payload.lastName}`
                state.settings.profile.role = action.payload.role
            })
            .addCase(saveGeneralInformation.rejected, (state) => {
                state.generalInformationLoading = false
            })
            .addCase(savePassword.pending, (state) => {
                state.passwordLoading = true
            })
            .addCase(savePassword.fulfilled, (state) => {
                state.passwordLoading = false
            })
            .addCase(savePassword.rejected, (state) => {
                state.passwordLoading = false
            })
            .addCase(saveNotifications.pending, (state) => {
                state.notificationsLoading = true
            })
            .addCase(saveNotifications.fulfilled, (state, action) => {
                state.notificationsLoading = false

                if (!state.settings) return

                state.settings.notifications = action.payload
            })
            .addCase(saveNotifications.rejected, (state) => {
                state.notificationsLoading = false
            })
            .addCase(saveEmailSettings.pending, (state) => {
                state.emailSettingsLoading = true
            })
            .addCase(saveEmailSettings.fulfilled, (state, action) => {
                state.emailSettingsLoading = false

                if (!state.settings) return

                state.settings.emailSettings = action.payload
            })
            .addCase(saveEmailSettings.rejected, (state) => {
                state.emailSettingsLoading = false
            })
            .addCase(connectAccount.pending, (state, action) => {
                if (!state.socialAccountsLoading.includes(action.meta.arg)) {
                    state.socialAccountsLoading.push(action.meta.arg)
                }
            })
            .addCase(connectAccount.fulfilled, (state, action) => {
                state.socialAccountsLoading =
                    state.socialAccountsLoading.filter(
                        (platform) => platform !== action.meta.arg,
                    )

                if (!state.settings) return

                const index = state.settings.socialAccounts.findIndex(
                    (account) => account.id === action.payload.id,
                )

                if (index === -1) return

                state.settings.socialAccounts[index] = action.payload
            })
            .addCase(connectAccount.rejected, (state, action) => {
                state.socialAccountsLoading =
                    state.socialAccountsLoading.filter(
                        (platform) => platform !== action.meta.arg,
                    )
            })
            .addCase(disconnectAccount.pending, (state, action) => {
                if (!state.socialAccountsLoading.includes(action.meta.arg)) {
                    state.socialAccountsLoading.push(action.meta.arg)
                }
            })
            .addCase(disconnectAccount.fulfilled, (state, action) => {
                state.socialAccountsLoading =
                    state.socialAccountsLoading.filter(
                        (platform) => platform !== action.meta.arg,
                    )

                if (!state.settings) return

                const index = state.settings.socialAccounts.findIndex(
                    (account) => account.id === action.payload.id,
                )

                if (index === -1) return

                state.settings.socialAccounts[index] = action.payload
            })
            .addCase(disconnectAccount.rejected, (state, action) => {
                state.socialAccountsLoading =
                    state.socialAccountsLoading.filter(
                        (platform) => platform !== action.meta.arg,
                    )
            })
            .addCase(removeConnectedAccount.pending, (state, action) => {
                if (!state.connectedAccountsLoading.includes(action.meta.arg)) {
                    state.connectedAccountsLoading.push(action.meta.arg)
                }
            })
            .addCase(removeConnectedAccount.fulfilled, (state, action) => {
                state.connectedAccountsLoading =
                    state.connectedAccountsLoading.filter(
                        (id) => id !== action.meta.arg,
                    )

                if (!state.settings) return

                state.settings.connectedAccounts =
                    state.settings.connectedAccounts.filter(
                        (account) => account.id !== action.payload,
                    )
            })
            .addCase(removeConnectedAccount.rejected, (state, action) => {
                state.connectedAccountsLoading =
                    state.connectedAccountsLoading.filter(
                        (id) => id !== action.meta.arg,
                    )
            })
            .addCase(removeDeviceSession.pending, (state, action) => {
                if (!state.recentDevicesLoading.includes(action.meta.arg)) {
                    state.recentDevicesLoading.push(action.meta.arg)
                }
            })
            .addCase(removeDeviceSession.fulfilled, (state, action) => {
                state.recentDevicesLoading = state.recentDevicesLoading.filter(
                    (id) => id !== action.meta.arg,
                )

                if (!state.settings) return

                state.settings.recentDevices =
                    state.settings.recentDevices.filter(
                        (device) => device.id !== action.payload,
                    )
            })
            .addCase(removeDeviceSession.rejected, (state, action) => {
                state.recentDevicesLoading = state.recentDevicesLoading.filter(
                    (id) => id !== action.meta.arg,
                )
            })
    },
})

export default settingsSlice.reducer

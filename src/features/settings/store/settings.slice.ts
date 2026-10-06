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
    savePreferences,
    updateAvatar,
} from './settings.thunks'
import type { Settings } from '../types'

type SettingsState = {
    settings: Settings | null
    loading: boolean
}

const initialState: SettingsState = {
    settings: null,
    loading: false,
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

                state.settings.profile.name = `${action.payload.firstName} ${action.payload.lastName}`
                state.settings.profile.role = action.payload.role
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

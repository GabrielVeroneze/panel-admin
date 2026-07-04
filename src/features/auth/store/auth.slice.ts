import { createSlice } from '@reduxjs/toolkit'
import {
    fetchCurrentUserThunk,
    logoutThunk,
    signInThunk,
    signUpThunk,
} from './auth.thunks'
import type { AuthUser } from '../types'

export type AuthState = {
    user: AuthUser | null
    token: string | null
    authenticated: boolean
    loading: boolean
    error: string | null
}

const initialState: AuthState = {
    user: null,
    token: null,
    authenticated: false,
    loading: false,
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signInThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signInThunk.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
                state.authenticated = true
            })
            .addCase(signInThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? null
            })
            .addCase(signUpThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signUpThunk.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(signUpThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? null
            })
            .addCase(logoutThunk.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.loading = false
                state.user = null
                state.token = null
                state.authenticated = false
                state.error = null
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload ?? null
            })
            .addCase(fetchCurrentUserThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchCurrentUserThunk.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.authenticated = true
            })
            .addCase(fetchCurrentUserThunk.rejected, (state) => {
                state.loading = false
                state.user = null
                state.token = null
                state.authenticated = false
            })
    },
})

export default authSlice.reducer

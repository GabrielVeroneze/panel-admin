import { createAsyncThunk } from '@reduxjs/toolkit'
import { clearSessionStorage, getSession } from '@/shared/utils'
import { signIn, signUp, logout, me } from '../api'
import type { SignInFormValues, SignUpFormValues } from '../schemas'
import type { AuthResponse, AuthUser } from '../types'

type ThunkConfig = {
    rejectValue: string
}

export const signInThunk = createAsyncThunk<
    AuthResponse,
    SignInFormValues,
    ThunkConfig
>('auth/signIn', async (credentials, { rejectWithValue }) => {
    try {
        return await signIn(credentials)
    } catch {
        return rejectWithValue('Invalid credentials')
    }
})

export const signUpThunk = createAsyncThunk<
    void,
    SignUpFormValues,
    ThunkConfig
>('auth/signUp', async ({ name, email, password }, { rejectWithValue }) => {
    try {
        await signUp({ name, email, password })
    } catch {
        return rejectWithValue('Unable to create account')
    }
})

export const logoutThunk = createAsyncThunk<void, void, ThunkConfig>(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await logout()

            clearSessionStorage()
        } catch {
            return rejectWithValue('Unable to logout')
        }
    },
)

export const fetchCurrentUserThunk = createAsyncThunk<
    AuthUser,
    void,
    ThunkConfig
>('auth/fetchCurrentUser', async (_, { rejectWithValue }) => {
    try {
        if (!getSession()) {
            return rejectWithValue('No active session')
        }

        return await me()
    } catch {
        clearSessionStorage()

        return rejectWithValue('Session expired')
    }
})

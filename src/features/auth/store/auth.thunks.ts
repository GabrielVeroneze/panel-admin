import { createAsyncThunk } from '@reduxjs/toolkit'
import { getToken, removeToken, saveToken } from '@/shared/utils'
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
>(
    'auth/signIn',
    async ({ rememberMe, ...credentials }, { rejectWithValue }) => {
        try {
            const response = await signIn(credentials)

            saveToken(response.token, rememberMe)

            return response
        } catch {
            return rejectWithValue('Invalid credentials')
        }
    },
)

export const signUpThunk = createAsyncThunk<
    void,
    SignUpFormValues,
    ThunkConfig
>('auth/signUp', async ({ email, password }, { rejectWithValue }) => {
    try {
        await signUp({ email, password })
    } catch {
        return rejectWithValue('Unable to create account')
    }
})

export const logoutThunk = createAsyncThunk<void, void, ThunkConfig>(
    'auth/logout',
    async () => {
        await logout()

        removeToken()
    },
)

export const fetchCurrentUserThunk = createAsyncThunk<
    AuthUser,
    void,
    ThunkConfig
>('auth/fetchCurrentUser', async (_, { rejectWithValue }) => {
    try {
        const token = getToken()

        if (!token) {
            return rejectWithValue('No active session')
        }

        return await me()
    } catch {
        removeToken()

        return rejectWithValue('Session expired')
    }
})

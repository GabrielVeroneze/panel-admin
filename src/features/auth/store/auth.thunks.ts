import { createAsyncThunk } from '@reduxjs/toolkit'
import {
    clearSessionStorage,
    getApiErrorMessage,
    getSession,
    saveSession,
} from '@/shared/utils'
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

            saveSession(
                {
                    token: response.token,
                    userId: response.user.id,
                },
                rememberMe,
            )

            return response
        } catch (error) {
            return rejectWithValue(
                getApiErrorMessage(error, {
                    fallback: 'Unable to sign in. Please try again.',
                }),
            )
        }
    },
)

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

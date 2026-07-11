import { api } from '@/services/api'
import type {
    AuthResponse,
    AuthUser,
    SignInPayload,
    SignUpPayload,
} from '../types'

export const signIn = async (payload: SignInPayload) => {
    const { data } = await api.post<AuthResponse>('/auth/sign-in', payload)

    return data
}

export const signUp = async (payload: SignUpPayload) => {
    const { data } = await api.post<AuthResponse>('/auth/sign-up', payload)

    return data
}

export const logout = async () => {
    await api.post('/auth/sign-out')
}

export const me = async () => {
    const { data } = await api.get<AuthUser>('/auth/me')

    return data
}

import { api } from '@/services/api'
import type { UserProfile } from '../types'

export const getMyProfile = async () => {
    const { data } = await api.get<UserProfile>('/me')

    return data
}

export const getUserProfile = async (id: number) => {
    const { data } = await api.get<UserProfile>(`/users/${id}`)

    return data
}

import { api } from '@/services/api'
import type { User } from '../types'

export const getUsers = async () => {
    const { data } = await api.get<User[]>('/users')

    return data
}

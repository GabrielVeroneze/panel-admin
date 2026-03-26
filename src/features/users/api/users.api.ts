import { api } from '@/services/api'
import type { UsersData } from '../types'

export const getUsers = async (params: { page: number; pageSize: number }) => {
    const { data } = await api.get<UsersData>('/users', {
        params,
    })

    return data
}

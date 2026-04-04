import { api } from '@/services/api'
import type {
    PaginatedUsers,
} from '../types'

export const getUsers = async (params: { page: number; pageSize: number }) => {
    const { data } = await api.get<PaginatedUsers>('/users', {
        params,
    })

    return data
}

import { api } from '@/services/api'
import type {
    UsersResponse,
} from '../types'

export const getUsers = async (params: { page: number; pageSize: number }) => {
    const { data } = await api.get<UsersResponse>('/users', {
        params,
    })

    return data
}

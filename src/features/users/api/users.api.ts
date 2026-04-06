import { api } from '@/services/api'
import type {
    CreateUserPayload,
    UpdateUserPayload,
    User,
    PaginatedUsers,
} from '../types'

type GetUsersParams = {
    page: number
    pageSize: number
    search?: string
}

export const getUsers = async (params: GetUsersParams) => {
    const { data } = await api.get<PaginatedUsers>('/users', {
        params,
    })

    return data
}

export const createUser = async (payload: CreateUserPayload) => {
    const { data } = await api.post<User>('/users', payload)

    return data
}

export const updateUser = async (id: number, payload: UpdateUserPayload) => {
    const { data } = await api.put<User>(`/users/${id}`, payload)

    return data
}

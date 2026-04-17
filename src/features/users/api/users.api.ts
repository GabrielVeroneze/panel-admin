import { api } from '@/services/api'
import { toFormData } from '@/shared/utils'
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
    const formData = toFormData(payload)

    const { data } = await api.post<User>('/users', formData)

    return data
}

export const updateUser = async (id: number, payload: UpdateUserPayload) => {
    const formData = toFormData({
        ...payload,
        password: payload.password?.new,
    })

    const { data } = await api.put<User>(`/users/${id}`, formData)

    return data
}

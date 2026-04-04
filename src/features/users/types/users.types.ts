import type { PaginatedResponse } from '@/shared/types'

export type UserEntity = {
    id: number
    name: string
    email: string
    phone: string
    company: string
    department: string
    image: string
    country: string
    status: 'active' | 'offline'
    password?: string
}

export type UserListItem = {
    id: number
    image: string
    name: string
    email: string
    position: string
    country: string
    status: 'active' | 'offline'
}

export type CreateUserPayload = {
    name: string
    email: string
    phone: string
    company: string
    department: string
    password?: string
    avatar?: File
}

export type UpdateUserPayload = {
    name?: string
    email?: string
    phone?: string
    company?: string
    department?: string
    password?: {
        current: string
        new: string
    }
    avatar?: File
}

export type UsersResponse = PaginatedResponse<UserEntity>

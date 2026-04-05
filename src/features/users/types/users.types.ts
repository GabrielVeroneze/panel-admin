import type { PaginatedResponse } from '@/shared/types'

export type User = {
    id: number
    name: string
    email: string
    phone: string
    image: string
    department: string
    company: string
    country: string
    status: 'active' | 'offline'
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
    password: string
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

export type PaginatedUsers = PaginatedResponse<User>

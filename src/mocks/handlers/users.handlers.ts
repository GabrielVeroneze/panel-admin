import { delay, http, HttpResponse } from 'msw'
import {
    createUser,
    deleteUsers,
    deleteUser,
    getUserById,
    getUsers,
    updateUser,
} from '../repositories'
import type {
    CreateUserPayload,
    PaginatedUsers,
    UpdateUserPayload,
    User,
} from '@/features/users/types'

type UpdateUserParams = {
    id: string
}

type DeleteUserParams = {
    id: string
}

type DeleteUsersPayload = {
    ids: number[]
}

export const usersHandlers = [
    http.get<never, never, PaginatedUsers>(
        '/api/users',
        async ({ request }) => {
            await delay(1000)

            const url = new URL(request.url)

            const page = Number(url.searchParams.get('page') ?? 1)
            const pageSize = Number(url.searchParams.get('pageSize') ?? 15)
            const search = url.searchParams.get('search')?.toLowerCase() ?? ''

            const users = getUsers()

            const filteredUsers = search
                ? users.filter(
                      (user) =>
                          user.name.toLowerCase().includes(search) ||
                          user.email.toLowerCase().includes(search) ||
                          user.company.toLowerCase().includes(search),
                  )
                : users

            const start = (page - 1) * pageSize
            const end = start + pageSize

            const paginatedUsers = filteredUsers.slice(start, end)

            const response = paginatedUsers.map(
                ({ password: _password, ...user }) => user,
            )

            return HttpResponse.json({
                list: response,
                total: filteredUsers.length,
                page,
                pageSize,
            })
        },
    ),

    http.post<never, CreateUserPayload, User>(
        '/api/users',
        async ({ request }) => {
            await delay(1000)

            const formData = await request.formData()

            const avatar = formData.get('avatar') as File | null

            const payload: CreateUserPayload = {
                name: formData.get('name') as string,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                company: formData.get('company') as string,
                department: formData.get('department') as string,
                password: formData.get('password') as string,
                avatar: avatar ?? undefined,
            }

            const createdUser = createUser(payload)

            const { password: _password, ...response } = createdUser

            return HttpResponse.json(response)
        },
    ),

    http.put<UpdateUserParams, UpdateUserPayload, User>(
        '/api/users/:id',
        async ({ params, request }) => {
            await delay(1000)

            const id = Number(params.id)

            if (!getUserById(id)) {
                return HttpResponse.json(null, {
                    status: 404,
                })
            }

            const formData = await request.formData()

            const avatar = formData.get('avatar') as File | null

            const payload: UpdateUserPayload = {
                name: (formData.get('name') as string) || undefined,
                email: (formData.get('email') as string) || undefined,
                phone: (formData.get('phone') as string) || undefined,
                company: (formData.get('company') as string) || undefined,
                department: (formData.get('department') as string) || undefined,
                currentPassword:
                    (formData.get('currentPassword') as string) || undefined,
                newPassword:
                    (formData.get('newPassword') as string) || undefined,
                avatar: avatar ?? undefined,
            }

            const updatedUser = updateUser(id, payload)

            if (!updatedUser) {
                return HttpResponse.json(null, {
                    status: 404,
                })
            }

            const { password: _password, ...response } = updatedUser

            return HttpResponse.json(response)
        },
    ),

    http.delete<DeleteUserParams, never, null>(
        '/api/users/:id',
        async ({ params }) => {
            await delay(1000)

            const id = Number(params.id)

            const deleted = deleteUser(id)

            if (!deleted) {
                return HttpResponse.json(null, {
                    status: 404,
                })
            }

            return HttpResponse.json(null, {
                status: 204,
            })
        },
    ),

    http.delete<never, DeleteUsersPayload, null>(
        '/api/users',
        async ({ request }) => {
            await delay(1000)

            const { ids } = await request.json()

            if (!ids || ids.length === 0) {
                return HttpResponse.json(null, {
                    status: 400,
                })
            }

            deleteUsers(ids)

            return HttpResponse.json(null, {
                status: 204,
            })
        },
    ),
]

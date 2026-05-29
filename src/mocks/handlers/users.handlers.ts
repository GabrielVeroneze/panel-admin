import { delay, http, HttpResponse } from 'msw'
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

            const filteredUsers = search
                ? allUsers.filter(
                      (user) =>
                          user.name.toLowerCase().includes(search) ||
                          user.email.toLowerCase().includes(search) ||
                          user.company.toLowerCase().includes(search),
                  )
                : allUsers

            const start = (page - 1) * pageSize
            const end = start + pageSize

            const paginatedUsers = filteredUsers.slice(start, end)

            const usersResponse = paginatedUsers.map(
                ({ password: _password, ...userWithoutPassword }) => {
                    return userWithoutPassword
                },
            )

            return HttpResponse.json({
                list: usersResponse,
                total: filteredUsers.length,
                page,
                pageSize,
            })
        },
    ),

    http.post<never, CreateUserPayload, User>(
        '/api/users',
        async ({ request }) => {
            const formData = await request.formData()

            const avatar = formData.get('avatar') as File | null
            const name = formData.get('name') as string
            const email = formData.get('email') as string
            const phone = formData.get('phone') as string
            const company = formData.get('company') as string
            const department = formData.get('department') as string
            const password = formData.get('password') as string

            const nextId =
                allUsers.length > 0
                    ? Math.max(...allUsers.map((u) => u.id)) + 1
                    : 1

            const newUser: User = {
                id: nextId,
                name: name,
                email: email,
                phone: phone,
                company: company,
                department: department,
                image: avatar
                    ? URL.createObjectURL(avatar)
                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=150`,
                country: 'United States',
                status: 'active',
            }

            allUsers.push({ ...newUser, password: password })

            return HttpResponse.json(newUser)
        },
    ),

    http.put<UpdateUserParams, UpdateUserPayload, User>(
        '/api/users/:id',
        async ({ params, request }) => {
            const id = Number(params.id)
            const formData = await request.formData()

            const avatar = formData.get('avatar') as File | null
            const name = formData.get('name') as string | null
            const email = formData.get('email') as string | null
            const phone = formData.get('phone') as string | null
            const company = formData.get('company') as string | null
            const department = formData.get('department') as string | null
            const password = formData.get('password') as string | null

            const userIndex = allUsers.findIndex((user) => user.id === id)

            if (userIndex === -1) {
                return HttpResponse.json(null, { status: 404 })
            }

            const existingUser = allUsers[userIndex]

            const updatedUser: MockUser = {
                ...existingUser,
                name: name ?? existingUser.name,
                email: email ?? existingUser.email,
                phone: phone ?? existingUser.phone,
                company: company ?? existingUser.company,
                department: department ?? existingUser.department,
                image: avatar
                    ? URL.createObjectURL(avatar)
                    : existingUser.image,
                password: password ?? existingUser.password,
            }

            allUsers[userIndex] = updatedUser

            const { password: _password, ...responseUser } = updatedUser

            return HttpResponse.json(responseUser)
        },
    ),

    http.delete<DeleteUserParams, never, null>(
        '/api/users/:id',
        async ({ params }) => {
            const id = Number(params.id)

            const userIndex = allUsers.findIndex((user) => user.id === id)

            if (userIndex === -1) {
                return HttpResponse.json(null, { status: 404 })
            }

            allUsers.splice(userIndex, 1)

            return HttpResponse.json(null, { status: 204 })
        },
    ),

    http.delete<never, DeleteUsersPayload, null>(
        '/api/users',
        async ({ request }) => {
            const { ids } = await request.json()

            if (!ids || ids.length === 0) {
                return HttpResponse.json(null, { status: 400 })
            }

            for (const id of ids) {
                const index = allUsers.findIndex((user) => user.id === id)

                if (index !== -1) {
                    allUsers.splice(index, 1)
                }
            }

            return HttpResponse.json(null, { status: 204 })
        },
    ),
]

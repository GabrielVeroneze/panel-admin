import { delay, http, HttpResponse } from 'msw'
import {
    clearSession,
    createSession,
    createUser,
    emailAlreadyExists,
    findUserByCredentials,
    getCurrentUser,
    validateToken,
} from '../database/'
import type {
    AuthResponse,
    AuthUser,
    SignInPayload,
    SignUpPayload,
} from '@/features/auth/types'

type LoginResponse = AuthResponse | MessageResponse

type RegisterResponse = MessageResponse

type MeResponse = AuthUser | MessageResponse

type MessageResponse = {
    message: string
}

export const authHandlers = [
    http.post<never, SignInPayload, LoginResponse>(
        '/api/auth/sign-in',
        async ({ request }) => {
            const body = await request.json()

            await delay(1000)

            const user = findUserByCredentials(body)

            if (!user) {
                return HttpResponse.json(
                    {
                        message: 'Invalid credentials',
                    },
                    {
                        status: 401,
                    },
                )
            }

            const token = createSession(user)

            return HttpResponse.json({
                token,
                user,
            })
        },
    ),

    http.post<never, SignUpPayload, RegisterResponse>(
        '/api/auth/sign-up',
        async ({ request }) => {
            const body = await request.json()

            await delay(1000)

            if (emailAlreadyExists(body.email)) {
                return HttpResponse.json(
                    {
                        message: 'Email already registered',
                    },
                    {
                        status: 409,
                    },
                )
            }

            createUser(body)

            return HttpResponse.json(
                {
                    message: 'User created successfully',
                },
                {
                    status: 201,
                },
            )
        },
    ),

    http.get<never, never, MeResponse>('/api/auth/me', async ({ request }) => {
        await delay(500)

        const authorization = request.headers.get('Authorization')

        if (!authorization) {
            return HttpResponse.json(
                {
                    message: 'Unauthorized',
                },
                {
                    status: 401,
                },
            )
        }

        const token = authorization.replace('Bearer ', '')

        if (!validateToken(token)) {
            return HttpResponse.json(
                {
                    message: 'Unauthorized',
                },
                {
                    status: 401,
                },
            )
        }

        const user = getCurrentUser()

        if (!user) {
            return HttpResponse.json(
                {
                    message: 'Unauthorized',
                },
                {
                    status: 401,
                },
            )
        }

        return HttpResponse.json(user)
    }),

    http.post('/api/auth/sign-out', async () => {
        await delay(300)

        clearSession()

        return HttpResponse.json(
            {
                message: 'Signed out successfully',
            },
            {
                status: 200,
            },
        )
    }),
]

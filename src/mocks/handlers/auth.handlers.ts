import { delay, http, HttpResponse } from 'msw'
import {
    clearMockSession,
    createAuthUser,
    createMockSession,
    emailAlreadyExists,
    findUserByCredentials,
    getCurrentUser,
    validateToken,
} from '../repositories'
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
            await delay(1000)

            const body = await request.json()

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

            const token = createMockSession(user)

            return HttpResponse.json({
                token,
                user,
            })
        },
    ),

    http.post<never, SignUpPayload, RegisterResponse>(
        '/api/auth/sign-up',
        async ({ request }) => {
            await delay(1000)

            const body = await request.json()

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

            createAuthUser(body)

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

        clearMockSession()

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

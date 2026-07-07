import { delay, http, HttpResponse } from 'msw'
import { authToken, authUser } from '../database'
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

            const { email, password } = body

            await delay(1000)

            if (email !== 'bonnie@example.com' || password !== '123456') {
                return HttpResponse.json(
                    {
                        message: 'Invalid credentials',
                    },
                    {
                        status: 401,
                    },
                )
            }

            return HttpResponse.json({
                token: authToken,
                user: authUser,
            })
        },
    ),

    http.post<never, SignUpPayload, RegisterResponse>(
        '/api/auth/sign-up',
        async () => {
            await delay(1000)

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
        const authorization = request.headers.get('Authorization')

        await delay(500)

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

        return HttpResponse.json(authUser)
    }),
]

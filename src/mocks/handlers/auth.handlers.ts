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
        '/auth/login',
        async ({ request }) => {
            const body = await request.json()

            const { email, password } = body

            await delay(800)

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
        '/auth/register',
        async () => {
            await delay(800)

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

    http.get<never, never, MeResponse>('/auth/me', async ({ request }) => {
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

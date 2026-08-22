import { describe, expect, it } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '@/mocks/server'
import { logout, me, signIn, signUp } from './auth.api'

describe('auth.api', () => {
    describe('signIn', () => {
        it('sends the sign-in payload and returns the response data', async () => {
            const payload = {
                email: 'user@example.com',
                password: 'Password1!',
                rememberMe: true,
            }

            const responseData = {
                token: 'access-token',
                user: {
                    id: '1',
                    email: 'user@example.com',
                },
            }

            server.use(
                http.post('*/auth/sign-in', async ({ request }) => {
                    const body = await request.json()

                    expect(body).toEqual(payload)

                    return HttpResponse.json(responseData)
                }),
            )

            const result = await signIn(payload)

            expect(result).toEqual(responseData)
        })

        it('propagates the request error', async () => {
            server.use(
                http.post('*/auth/sign-in', () => {
                    return HttpResponse.json(
                        {
                            message: 'Invalid credentials',
                        },
                        { status: 401 },
                    )
                }),
            )

            await expect(
                signIn({
                    email: 'user@example.com',
                    password: 'WrongPassword1!',
                }),
            ).rejects.toThrow()
        })
    })

    describe('signUp', () => {
        it('sends the sign-up payload and returns the response data', async () => {
            const payload = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            }

            const responseData = {
                token: 'access-token',
                user: {
                    id: '1',
                    email: 'john@example.com',
                },
            }

            server.use(
                http.post('*/auth/sign-up', async ({ request }) => {
                    const body = await request.json()

                    expect(body).toEqual(payload)

                    return HttpResponse.json(responseData)
                }),
            )

            const result = await signUp(payload)

            expect(result).toEqual(responseData)
        })

        it('propagates the request error', async () => {
            server.use(
                http.post('*/auth/sign-up', () => {
                    return HttpResponse.json(
                        {
                            message: 'Email already exists',
                        },
                        { status: 409 },
                    )
                }),
            )

            await expect(
                signUp({
                    name: 'John Doe',
                    email: 'john@example.com',
                    password: 'Password1!',
                }),
            ).rejects.toThrow()
        })
    })

    describe('logout', () => {
        it('sends a sign-out request', async () => {
            let requestReceived = false

            server.use(
                http.post('*/auth/sign-out', () => {
                    requestReceived = true

                    return new HttpResponse(null, { status: 204 })
                }),
            )

            await logout()

            expect(requestReceived).toBe(true)
        })

        it('propagates the request error', async () => {
            server.use(
                http.post('*/auth/sign-out', () => {
                    return HttpResponse.json(
                        {
                            message: 'Unable to sign out',
                        },
                        { status: 500 },
                    )
                }),
            )

            await expect(logout()).rejects.toThrow()
        })
    })

    describe('me', () => {
        it('sends a request to the current-user endpoint and returns the response data', async () => {
            const responseData = {
                id: '1',
                email: 'user@example.com',
            }

            server.use(
                http.get('*/auth/me', () => {
                    return HttpResponse.json(responseData)
                }),
            )

            const result = await me()

            expect(result).toEqual(responseData)
        })

        it('propagates the request error', async () => {
            server.use(
                http.get('*/auth/me', () => {
                    return HttpResponse.json(
                        {
                            message: 'Unauthorized',
                        },
                        { status: 401 },
                    )
                }),
            )

            await expect(me()).rejects.toThrow()
        })
    })
})

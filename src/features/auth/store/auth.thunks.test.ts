import { beforeEach, describe, expect, it, vi } from 'vitest'
import { clearSessionStorage, getSession, saveSession } from '@/shared/utils'
import { logout, me, signIn, signUp } from '../api'
import {
    fetchCurrentUserThunk,
    logoutThunk,
    signInThunk,
    signUpThunk,
} from './auth.thunks'
import type { AuthResponse, AuthUser } from '../types'

vi.mock('@/shared/utils', () => ({
    clearSessionStorage: vi.fn(),
    getSession: vi.fn(),
    saveSession: vi.fn(),
}))

vi.mock('../api', () => ({
    logout: vi.fn(),
    me: vi.fn(),
    signIn: vi.fn(),
    signUp: vi.fn(),
}))

describe('auth.thunks', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('signInThunk', () => {
        const credentials = {
            email: 'user@example.com',
            password: 'Password1!',
        }

        const response: AuthResponse = {
            token: 'access-token',
            user: {
                id: 1,
                name: 'John Doe',
                email: 'user@example.com',
                role: 'user',
                avatar: '/avatars/john-doe.jpg',
            },
        }

        it('calls signIn with credentials without rememberMe', async () => {
            vi.mocked(signIn).mockResolvedValue(response)

            const result = await signInThunk({
                ...credentials,
                rememberMe: true,
            })(vi.fn(), vi.fn(), undefined)

            expect(signIn).toHaveBeenCalledWith(credentials)
            expect(result.type).toBe('auth/signIn/fulfilled')
        })

        it('saves the session with the token, user id, and rememberMe value', async () => {
            vi.mocked(signIn).mockResolvedValue(response)

            await signInThunk({
                ...credentials,
                rememberMe: true,
            })(vi.fn(), vi.fn(), undefined)

            expect(saveSession).toHaveBeenCalledWith(
                {
                    token: 'access-token',
                    userId: 1,
                },
                true,
            )
        })

        it('returns the authentication response when signIn succeeds', async () => {
            vi.mocked(signIn).mockResolvedValue(response)

            const result = await signInThunk({
                ...credentials,
                rememberMe: false,
            })(vi.fn(), vi.fn(), undefined)

            expect(result).toMatchObject({
                type: 'auth/signIn/fulfilled',
                payload: response,
            })
        })

        it('rejects with Invalid credentials when signIn fails', async () => {
            vi.mocked(signIn).mockRejectedValue(new Error('Unauthorized'))

            const result = await signInThunk({
                ...credentials,
                rememberMe: false,
            })(vi.fn(), vi.fn(), undefined)

            expect(result).toMatchObject({
                type: 'auth/signIn/rejected',
                payload: 'Invalid credentials',
            })

            expect(saveSession).not.toHaveBeenCalled()
        })
    })

    describe('signUpThunk', () => {
        const formValues = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'Password1!',
            confirmPassword: 'Password1!',
            terms: true,
        }

        const response: AuthResponse = {
            token: 'access-token',
            user: {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                role: 'user',
                avatar: '/avatars/john-doe.jpg',
            },
        }

        it('calls signUp with only the required registration data', async () => {
            vi.mocked(signUp).mockResolvedValue(response)

            const result = await signUpThunk(formValues)(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(signUp).toHaveBeenCalledWith({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1!',
            })

            expect(result.type).toBe('auth/signUp/fulfilled')
        })

        it('does not pass confirmPassword or terms to signUp', async () => {
            vi.mocked(signUp).mockResolvedValue(response)

            await signUpThunk(formValues)(vi.fn(), vi.fn(), undefined)

            expect(signUp).not.toHaveBeenCalledWith(
                expect.objectContaining({
                    confirmPassword: 'Password1!',
                }),
            )

            expect(signUp).not.toHaveBeenCalledWith(
                expect.objectContaining({
                    terms: true,
                }),
            )
        })

        it('resolves when signUp succeeds', async () => {
            vi.mocked(signUp).mockResolvedValue(response)

            const result = await signUpThunk(formValues)(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(result).toMatchObject({
                type: 'auth/signUp/fulfilled',
            })

            expect(result.payload).toBeUndefined()
        })

        it('rejects with Unable to create account when signUp fails', async () => {
            vi.mocked(signUp).mockRejectedValue(
                new Error('Email already exists'),
            )

            const result = await signUpThunk(formValues)(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(result).toMatchObject({
                type: 'auth/signUp/rejected',
                payload: 'Unable to create account',
            })
        })
    })

    describe('logoutThunk', () => {
        it('calls logout', async () => {
            vi.mocked(logout).mockResolvedValue(undefined)

            const result = await logoutThunk()(vi.fn(), vi.fn(), undefined)

            expect(logout).toHaveBeenCalledTimes(1)
            expect(result.type).toBe('auth/logout/fulfilled')
        })

        it('clears the session storage after successful logout', async () => {
            vi.mocked(logout).mockResolvedValue(undefined)

            await logoutThunk()(vi.fn(), vi.fn(), undefined)

            expect(clearSessionStorage).toHaveBeenCalledTimes(1)
        })

        it('rejects with Unable to logout when logout fails', async () => {
            vi.mocked(logout).mockRejectedValue(new Error('Network error'))

            const result = await logoutThunk()(vi.fn(), vi.fn(), undefined)

            expect(result).toMatchObject({
                type: 'auth/logout/rejected',
                payload: 'Unable to logout',
            })

            expect(clearSessionStorage).not.toHaveBeenCalled()
        })
    })

    describe('fetchCurrentUserThunk', () => {
        const user: AuthUser = {
            id: 1,
            name: 'John Doe',
            email: 'user@example.com',
            role: 'user',
            avatar: '/avatars/john-doe.jpg',
        }

        const session = {
            token: 'access-token',
            userId: 1,
        }

        it('rejects with No active session when there is no session', async () => {
            vi.mocked(getSession).mockReturnValue(null)

            const result = await fetchCurrentUserThunk()(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(getSession).toHaveBeenCalledTimes(1)
            expect(me).not.toHaveBeenCalled()

            expect(result).toMatchObject({
                type: 'auth/fetchCurrentUser/rejected',
                payload: 'No active session',
            })
        })

        it('calls me when an active session exists', async () => {
            vi.mocked(getSession).mockReturnValue(session)
            vi.mocked(me).mockResolvedValue(user)

            const result = await fetchCurrentUserThunk()(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(getSession).toHaveBeenCalledTimes(1)
            expect(me).toHaveBeenCalledTimes(1)

            expect(result).toMatchObject({
                type: 'auth/fetchCurrentUser/fulfilled',
                payload: user,
            })
        })

        it('returns the current user when me succeeds', async () => {
            vi.mocked(getSession).mockReturnValue(session)
            vi.mocked(me).mockResolvedValue(user)

            const result = await fetchCurrentUserThunk()(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(result.payload).toEqual(user)
        })

        it('clears the session and rejects with Session expired when me fails', async () => {
            vi.mocked(getSession).mockReturnValue(session)
            vi.mocked(me).mockRejectedValue(new Error('Unauthorized'))

            const result = await fetchCurrentUserThunk()(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(clearSessionStorage).toHaveBeenCalledTimes(1)

            expect(result).toMatchObject({
                type: 'auth/fetchCurrentUser/rejected',
                payload: 'Session expired',
            })
        })
    })
})

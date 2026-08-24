import { afterEach, describe, expect, it, vi } from 'vitest'

const { mockGetSession } = vi.hoisted(() => ({
    mockGetSession: vi.fn(),
}))

vi.mock('@/shared/utils', () => ({
    getSession: mockGetSession,
}))

vi.mock('@/services/api', () => ({
    api: {
        post: vi.fn(),
        get: vi.fn(),
    },
}))

describe('auth.slice', () => {
    afterEach(() => {
        vi.resetModules()
        mockGetSession.mockReset()
    })

    describe('initial state', () => {
        it('initializes with an unauthenticated state when there is no session', async () => {
            mockGetSession.mockReturnValue(null)

            const { default: reducer } = await import('./auth.slice')

            const state = reducer(undefined, {
                type: '@@INIT',
            })

            expect(state).toEqual({
                user: null,
                token: null,
                authenticated: false,
                loading: false,
                error: null,
            })
        })

        it('initializes with the session token when there is an active session', async () => {
            mockGetSession.mockReturnValue({
                token: 'access-token',
                userId: 1,
            })

            const { default: reducer } = await import('./auth.slice')

            const state = reducer(undefined, {
                type: '@@INIT',
            })

            expect(state).toEqual({
                user: null,
                token: 'access-token',
                authenticated: true,
                loading: true,
                error: null,
            })
        })
    })

    describe('clearSession', () => {
        it('clears the authentication state', async () => {
            const { clearSession, default: reducer } =
                await import('./auth.slice')

            const state = {
                user: {
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com',
                    role: 'user' as const,
                    avatar: 'avatar.jpg',
                },
                token: 'access-token',
                authenticated: true,
                loading: true,
                error: 'Some error',
            }

            const result = reducer(state, clearSession())

            expect(result).toEqual({
                user: null,
                token: null,
                authenticated: false,
                loading: false,
                error: null,
            })
        })
    })

    describe('signInThunk', () => {
        const user = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'user' as const,
            avatar: 'avatar.jpg',
        }

        const response = {
            token: 'access-token',
            user,
        }

        const formValues = {
            email: 'john@example.com',
            password: 'Password1!',
            rememberMe: false,
        }

        it('sets loading to true and clears the error when pending', async () => {
            const { default: reducer } = await import('./auth.slice')
            const { signInThunk } = await import('./auth.thunks')

            const state = {
                user: null,
                token: null,
                authenticated: false,
                loading: false,
                error: 'Previous error',
            }

            const result = reducer(
                state,
                signInThunk.pending('request-id', formValues),
            )

            expect(result).toEqual({
                user: null,
                token: null,
                authenticated: false,
                loading: true,
                error: null,
            })
        })

        it('stores the user and token when fulfilled', async () => {
            const { default: reducer } = await import('./auth.slice')
            const { signInThunk } = await import('./auth.thunks')

            const state = {
                user: null,
                token: null,
                authenticated: false,
                loading: true,
                error: null,
            }

            const result = reducer(
                state,
                signInThunk.fulfilled(response, 'request-id', formValues),
            )

            expect(result).toEqual({
                user,
                token: 'access-token',
                authenticated: true,
                loading: false,
                error: null,
            })
        })

        it('sets the rejected error when rejected with a payload', async () => {
            const { default: reducer } = await import('./auth.slice')
            const { signInThunk } = await import('./auth.thunks')

            const state = {
                user: null,
                token: null,
                authenticated: false,
                loading: true,
                error: null,
            }

            const result = reducer(
                state,
                signInThunk.rejected(
                    new Error('Invalid credentials'),
                    'request-id',
                    {
                        ...formValues,
                        password: 'WrongPassword1!',
                    },
                    'Invalid credentials',
                ),
            )

            expect(result).toEqual({
                user: null,
                token: null,
                authenticated: false,
                loading: false,
                error: 'Invalid credentials',
            })
        })

        it('uses Unexpected error when rejected without a payload', async () => {
            const { default: reducer } = await import('./auth.slice')
            const { signInThunk } = await import('./auth.thunks')

            const state = {
                user: null,
                token: null,
                authenticated: false,
                loading: true,
                error: null,
            }

            const result = reducer(
                state,
                signInThunk.rejected(
                    new Error('Unexpected error'),
                    'request-id',
                    formValues,
                ),
            )

            expect(result.loading).toBe(false)
            expect(result.error).toBe('Unexpected error')
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

        it('sets loading to true and clears the error when pending', async () => {
            const { default: reducer } = await import('./auth.slice')
            const { signUpThunk } = await import('./auth.thunks')

            const state = {
                user: null,
                token: null,
                authenticated: false,
                loading: false,
                error: 'Previous error',
            }

            const result = reducer(
                state,
                signUpThunk.pending('request-id', formValues),
            )

            expect(result).toEqual({
                user: null,
                token: null,
                authenticated: false,
                loading: true,
                error: null,
            })
        })

        it('sets loading to false when fulfilled', async () => {
            const { default: reducer } = await import('./auth.slice')
            const { signUpThunk } = await import('./auth.thunks')

            const state = {
                user: null,
                token: null,
                authenticated: false,
                loading: true,
                error: null,
            }

            const result = reducer(
                state,
                signUpThunk.fulfilled(undefined, 'request-id', formValues),
            )

            expect(result).toEqual({
                user: null,
                token: null,
                authenticated: false,
                loading: false,
                error: null,
            })
        })

        it('sets the rejected error when rejected with a payload', async () => {
            const { default: reducer } = await import('./auth.slice')
            const { signUpThunk } = await import('./auth.thunks')

            const state = {
                user: null,
                token: null,
                authenticated: false,
                loading: true,
                error: null,
            }

            const result = reducer(
                state,
                signUpThunk.rejected(
                    new Error('Unable to create account'),
                    'request-id',
                    formValues,
                    'Unable to create account',
                ),
            )

            expect(result.loading).toBe(false)
            expect(result.error).toBe('Unable to create account')
        })

        it('uses Unexpected error when rejected without a payload', async () => {
            const { default: reducer } = await import('./auth.slice')
            const { signUpThunk } = await import('./auth.thunks')

            const state = {
                user: null,
                token: null,
                authenticated: false,
                loading: true,
                error: null,
            }

            const result = reducer(
                state,
                signUpThunk.rejected(
                    new Error('Unexpected error'),
                    'request-id',
                    formValues,
                ),
            )

            expect(result.loading).toBe(false)
            expect(result.error).toBe('Unexpected error')
        })
    })

    describe('logoutThunk', () => {
        it('sets loading to true and clears the error when pending', async () => {
            const { default: reducer } = await import('./auth.slice')
            const { logoutThunk } = await import('./auth.thunks')

            const state = {
                user: {
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com',
                    role: 'user' as const,
                    avatar: 'avatar.jpg',
                },
                token: 'access-token',
                authenticated: true,
                loading: false,
                error: 'Previous error',
            }

            const result = reducer(
                state,
                logoutThunk.pending('request-id', undefined),
            )

            expect(result.loading).toBe(true)
            expect(result.error).toBe(null)
        })

        it('clears the authentication state when fulfilled', async () => {
            const { default: reducer } = await import('./auth.slice')
            const { logoutThunk } = await import('./auth.thunks')

            const state = {
                user: {
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com',
                    role: 'user' as const,
                    avatar: 'avatar.jpg',
                },
                token: 'access-token',
                authenticated: true,
                loading: true,
                error: null,
            }

            const result = reducer(
                state,
                logoutThunk.fulfilled(undefined, 'request-id', undefined),
            )

            expect(result).toEqual({
                user: null,
                token: null,
                authenticated: false,
                loading: false,
                error: null,
            })
        })

        it('sets the rejected error when logout fails', async () => {
            const { default: reducer } = await import('./auth.slice')
            const { logoutThunk } = await import('./auth.thunks')

            const state = {
                user: null,
                token: null,
                authenticated: true,
                loading: true,
                error: null,
            }

            const result = reducer(
                state,
                logoutThunk.rejected(
                    new Error('Unable to logout'),
                    'request-id',
                    undefined,
                    'Unable to logout',
                ),
            )

            expect(result.loading).toBe(false)
            expect(result.error).toBe('Unable to logout')
        })

        it('uses null when logout is rejected without a payload', async () => {
            const { default: reducer } = await import('./auth.slice')
            const { logoutThunk } = await import('./auth.thunks')

            const state = {
                user: null,
                token: 'access-token',
                authenticated: true,
                loading: true,
                error: null,
            }

            const result = reducer(
                state,
                logoutThunk.rejected(
                    new Error('Unexpected error'),
                    'request-id',
                    undefined,
                ),
            )

            expect(result.loading).toBe(false)
            expect(result.error).toBe(null)
        })
    })

    describe('fetchCurrentUserThunk', () => {
        const user = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'user' as const,
            avatar: 'avatar.jpg',
        }

        it('sets loading to true when pending', async () => {
            const { default: reducer } = await import('./auth.slice')
            const { fetchCurrentUserThunk } = await import('./auth.thunks')

            const state = {
                user: null,
                token: 'access-token',
                authenticated: true,
                loading: false,
                error: 'Previous error',
            }

            const result = reducer(
                state,
                fetchCurrentUserThunk.pending('request-id', undefined),
            )

            expect(result.loading).toBe(true)
            expect(result.error).toBe('Previous error')
        })

        it('stores the current user when fulfilled', async () => {
            const { default: reducer } = await import('./auth.slice')
            const { fetchCurrentUserThunk } = await import('./auth.thunks')

            const state = {
                user: null,
                token: 'access-token',
                authenticated: false,
                loading: true,
                error: null,
            }

            const result = reducer(
                state,
                fetchCurrentUserThunk.fulfilled(user, 'request-id', undefined),
            )

            expect(result).toEqual({
                user,
                token: 'access-token',
                authenticated: true,
                loading: false,
                error: null,
            })
        })

        it('clears the authentication state when rejected', async () => {
            const { default: reducer } = await import('./auth.slice')
            const { fetchCurrentUserThunk } = await import('./auth.thunks')

            const state = {
                user,
                token: 'access-token',
                authenticated: true,
                loading: true,
                error: 'Previous error',
            }

            const result = reducer(
                state,
                fetchCurrentUserThunk.rejected(
                    new Error('Session expired'),
                    'request-id',
                    undefined,
                    'Session expired',
                ),
            )

            expect(result).toEqual({
                user: null,
                token: null,
                authenticated: false,
                loading: false,
                error: 'Previous error',
            })
        })
    })
})

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import {
    fetchCurrentUserThunk,
    logoutThunk,
    signInThunk,
    signUpThunk,
} from '../store'
import { useAuth } from './useAuth'

const { mockDispatch, mockUseAppSelector } = vi.hoisted(() => ({
    mockDispatch: vi.fn(),
    mockUseAppSelector: vi.fn(),
}))

vi.mock('@/store', () => ({
    useAppDispatch: () => mockDispatch,
    useAppSelector: mockUseAppSelector,
}))

vi.mock('../store', () => ({
    fetchCurrentUserThunk: vi.fn(),
    logoutThunk: vi.fn(),
    signInThunk: vi.fn(),
    signUpThunk: vi.fn(),
}))

describe('useAuth', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('state', () => {
        it('returns the authentication state', () => {
            const authState = {
                user: {
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com',
                    role: 'user' as const,
                    avatar: 'avatar.jpg',
                },
                authenticated: true,
                loading: false,
                error: null,
            }

            mockUseAppSelector.mockImplementation(
                (selector: (state: { auth: typeof authState }) => unknown) =>
                    selector({ auth: authState }),
            )

            const { result } = renderHook(() => useAuth())

            expect(result.current.user).toEqual(authState.user)
            expect(result.current.authenticated).toBe(true)
            expect(result.current.loading).toBe(false)
            expect(result.current.error).toBe(null)
        })

        it('returns an unauthenticated state', () => {
            const authState = {
                user: null,
                authenticated: false,
                loading: false,
                error: null,
            }

            mockUseAppSelector.mockImplementation(
                (selector: (state: { auth: typeof authState }) => unknown) =>
                    selector({ auth: authState }),
            )

            const { result } = renderHook(() => useAuth())

            expect(result.current.user).toBe(null)
            expect(result.current.authenticated).toBe(false)
            expect(result.current.loading).toBe(false)
            expect(result.current.error).toBe(null)
        })

        it('returns the authentication error', () => {
            const authState = {
                user: null,
                authenticated: false,
                loading: false,
                error: 'Invalid credentials',
            }

            mockUseAppSelector.mockImplementation(
                (selector: (state: { auth: typeof authState }) => unknown) =>
                    selector({ auth: authState }),
            )

            const { result } = renderHook(() => useAuth())

            expect(result.current.error).toBe('Invalid credentials')
        })

        it('returns the loading state', () => {
            const authState = {
                user: null,
                authenticated: false,
                loading: true,
                error: null,
            }

            mockUseAppSelector.mockImplementation(
                (selector: (state: { auth: typeof authState }) => unknown) =>
                    selector({ auth: authState }),
            )

            const { result } = renderHook(() => useAuth())

            expect(result.current.loading).toBe(true)
        })
    })

    describe('signIn', () => {
        it('dispatches signInThunk with the form data', async () => {
            const thunk = { type: 'auth/signIn' }
            const dispatchResult = {
                unwrap: vi.fn().mockResolvedValue({
                    token: 'access-token',
                }),
            }

            vi.mocked(signInThunk).mockReturnValue(thunk as never)
            mockDispatch.mockReturnValue(dispatchResult)

            mockUseAppSelector.mockImplementation(
                (selector: (state: { auth: object }) => unknown) =>
                    selector({
                        auth: {
                            user: null,
                            authenticated: false,
                            loading: false,
                            error: null,
                        },
                    }),
            )

            const { result } = renderHook(() => useAuth())

            const data = {
                email: 'john@example.com',
                password: 'Password1!',
                rememberMe: true,
            }

            await result.current.signIn(data)

            expect(signInThunk).toHaveBeenCalledWith(data)
            expect(mockDispatch).toHaveBeenCalledWith(thunk)
        })

        it('returns the result of unwrap', async () => {
            const expectedResponse = {
                token: 'access-token',
            }

            const thunk = { type: 'auth/signIn' }
            const unwrap = vi.fn().mockResolvedValue(expectedResponse)

            vi.mocked(signInThunk).mockReturnValue(thunk as never)
            mockDispatch.mockReturnValue({ unwrap })

            mockUseAppSelector.mockReturnValue({
                user: null,
                authenticated: false,
                loading: false,
                error: null,
            })

            const { result } = renderHook(() => useAuth())

            const data = {
                email: 'john@example.com',
                password: 'Password1!',
                rememberMe: true,
            }

            const response = await result.current.signIn(data)

            expect(unwrap).toHaveBeenCalledTimes(1)
            expect(response).toEqual(expectedResponse)
        })

        it('propagates the rejection from unwrap', async () => {
            const error = 'Invalid credentials'

            const thunk = { type: 'auth/signIn' }
            const unwrap = vi.fn().mockRejectedValue(error)

            vi.mocked(signInThunk).mockReturnValue(thunk as never)
            mockDispatch.mockReturnValue({ unwrap })

            mockUseAppSelector.mockReturnValue({
                user: null,
                authenticated: false,
                loading: false,
                error,
            })

            const { result } = renderHook(() => useAuth())

            const data = {
                email: 'john@example.com',
                password: 'WrongPassword1!',
                rememberMe: false,
            }

            await expect(result.current.signIn(data)).rejects.toBe(error)
        })
    })

    describe('signUp', () => {
        it('dispatches signUpThunk with the form data', async () => {
            const thunk = { type: 'auth/signUp' }
            const dispatchResult = {
                unwrap: vi.fn().mockResolvedValue(undefined),
            }

            vi.mocked(signUpThunk).mockReturnValue(thunk as never)
            mockDispatch.mockReturnValue(dispatchResult)

            mockUseAppSelector.mockReturnValue({
                user: null,
                authenticated: false,
                loading: false,
                error: null,
            })

            const { result } = renderHook(() => useAuth())

            const data = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            }

            await result.current.signUp(data)

            expect(signUpThunk).toHaveBeenCalledWith(data)
            expect(mockDispatch).toHaveBeenCalledWith(thunk)
        })

        it('returns the result of unwrap', async () => {
            const thunk = { type: 'auth/signUp' }
            const unwrap = vi.fn().mockResolvedValue(undefined)

            vi.mocked(signUpThunk).mockReturnValue(thunk as never)
            mockDispatch.mockReturnValue({ unwrap })

            mockUseAppSelector.mockReturnValue({
                user: null,
                authenticated: false,
                loading: false,
                error: null,
            })

            const { result } = renderHook(() => useAuth())

            const data = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            }

            const response = await result.current.signUp(data)

            expect(unwrap).toHaveBeenCalledTimes(1)
            expect(response).toBeUndefined()
        })

        it('propagates the rejection from unwrap', async () => {
            const error = 'Unable to create account'

            const thunk = { type: 'auth/signUp' }
            const unwrap = vi.fn().mockRejectedValue(error)

            vi.mocked(signUpThunk).mockReturnValue(thunk as never)
            mockDispatch.mockReturnValue({ unwrap })

            mockUseAppSelector.mockReturnValue({
                user: null,
                authenticated: false,
                loading: false,
                error,
            })

            const { result } = renderHook(() => useAuth())

            const data = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            }

            await expect(result.current.signUp(data)).rejects.toBe(error)
        })
    })

    describe('logout', () => {
        it('dispatches logoutThunk', async () => {
            const thunk = { type: 'auth/logout' }

            vi.mocked(logoutThunk).mockReturnValue(thunk as never)

            const unwrap = vi.fn().mockResolvedValue(undefined)

            mockDispatch.mockReturnValue({ unwrap })

            mockUseAppSelector.mockReturnValue({
                user: null,
                authenticated: false,
                loading: false,
                error: null,
            })

            const { result } = renderHook(() => useAuth())

            await result.current.logout()

            expect(logoutThunk).toHaveBeenCalledTimes(1)
            expect(mockDispatch).toHaveBeenCalledWith(thunk)
        })

        it('returns the result of unwrap', async () => {
            const thunk = { type: 'auth/logout' }
            const unwrap = vi.fn().mockResolvedValue(undefined)

            vi.mocked(logoutThunk).mockReturnValue(thunk as never)
            mockDispatch.mockReturnValue({ unwrap })

            mockUseAppSelector.mockReturnValue({
                user: null,
                authenticated: false,
                loading: false,
                error: null,
            })

            const { result } = renderHook(() => useAuth())

            const response = await result.current.logout()

            expect(unwrap).toHaveBeenCalledTimes(1)
            expect(response).toBeUndefined()
        })

        it('propagates the rejection from unwrap', async () => {
            const error = 'Unable to logout'

            const thunk = { type: 'auth/logout' }
            const unwrap = vi.fn().mockRejectedValue(error)

            vi.mocked(logoutThunk).mockReturnValue(thunk as never)
            mockDispatch.mockReturnValue({ unwrap })

            mockUseAppSelector.mockReturnValue({
                user: null,
                authenticated: true,
                loading: false,
                error,
            })

            const { result } = renderHook(() => useAuth())

            await expect(result.current.logout()).rejects.toBe(error)
        })
    })

    describe('fetchCurrentUser', () => {
        it('dispatches fetchCurrentUserThunk', async () => {
            const thunk = { type: 'auth/fetchCurrentUser' }
            const unwrap = vi.fn().mockResolvedValue({
                id: 1,
            })

            vi.mocked(fetchCurrentUserThunk).mockReturnValue(thunk as never)
            mockDispatch.mockReturnValue({ unwrap })

            mockUseAppSelector.mockReturnValue({
                user: null,
                authenticated: true,
                loading: true,
                error: null,
            })

            const { result } = renderHook(() => useAuth())

            await result.current.fetchCurrentUser()

            expect(fetchCurrentUserThunk).toHaveBeenCalledTimes(1)
            expect(fetchCurrentUserThunk).toHaveBeenCalledWith()
            expect(mockDispatch).toHaveBeenCalledWith(thunk)
        })

        it('returns the result of unwrap', async () => {
            const user = {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                role: 'user' as const,
                avatar: 'avatar.jpg',
            }

            const thunk = { type: 'auth/fetchCurrentUser' }
            const unwrap = vi.fn().mockResolvedValue(user)

            vi.mocked(fetchCurrentUserThunk).mockReturnValue(thunk as never)
            mockDispatch.mockReturnValue({ unwrap })

            mockUseAppSelector.mockReturnValue({
                user: null,
                authenticated: true,
                loading: true,
                error: null,
            })

            const { result } = renderHook(() => useAuth())

            const response = await result.current.fetchCurrentUser()

            expect(unwrap).toHaveBeenCalledTimes(1)
            expect(response).toEqual(user)
        })

        it('propagates the rejection from unwrap', async () => {
            const error = 'Session expired'

            const thunk = { type: 'auth/fetchCurrentUser' }
            const unwrap = vi.fn().mockRejectedValue(error)

            vi.mocked(fetchCurrentUserThunk).mockReturnValue(thunk as never)
            mockDispatch.mockReturnValue({ unwrap })

            mockUseAppSelector.mockReturnValue({
                user: null,
                authenticated: false,
                loading: false,
                error,
            })

            const { result } = renderHook(() => useAuth())

            await expect(result.current.fetchCurrentUser()).rejects.toBe(error)
        })
    })
})

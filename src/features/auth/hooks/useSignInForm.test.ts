import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useNavigate } from 'react-router'
import { act, renderHook } from '@testing-library/react'
import { useAuth } from './useAuth'
import { useSignInForm } from './useSignInForm'

vi.mock('react-router', () => ({
    useNavigate: vi.fn(),
}))

vi.mock('./useAuth', () => ({
    useAuth: vi.fn(),
}))

describe('useSignInForm', () => {
    const mockNavigate = vi.fn()
    const mockSignIn = vi.fn()

    const mockAuth = {
        signIn: mockSignIn,
        signUp: vi.fn(),
        logout: vi.fn(),
        fetchCurrentUser: vi.fn(),
        user: null,
        authenticated: false,
        loading: false,
        error: null,
    }

    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useNavigate).mockReturnValue(mockNavigate)

        vi.mocked(useAuth).mockReturnValue(mockAuth)
    })

    describe('initial state', () => {
        it('initializes the form with the default values', () => {
            const { result } = renderHook(() => useSignInForm())

            expect(result.current.form.getValues()).toEqual({
                email: '',
                password: '',
                rememberMe: false,
            })
        })

        it('returns the loading state from useAuth', () => {
            vi.mocked(useAuth).mockReturnValue({
                ...mockAuth,
                loading: true,
            })

            const { result } = renderHook(() => useSignInForm())

            expect(result.current.loading).toBe(true)
        })

        it('returns the authentication error from useAuth', () => {
            vi.mocked(useAuth).mockReturnValue({
                ...mockAuth,
                error: 'Invalid credentials',
            })

            const { result } = renderHook(() => useSignInForm())

            expect(result.current.error).toBe('Invalid credentials')
        })
    })

    describe('validation', () => {
        it('rejects an invalid email', async () => {
            const { result } = renderHook(() => useSignInForm())

            await act(async () => {
                result.current.form.setValue('email', 'invalid-email')
                result.current.form.setValue('password', 'Password1!')
            })

            await act(async () => {
                await result.current.form.handleSubmit(mockSignIn)()
            })

            expect(mockSignIn).not.toHaveBeenCalled()

            expect(
                result.current.form.getFieldState('email').error?.message,
            ).toBe('Invalid email format')
        })

        it('rejects an empty email', async () => {
            const { result } = renderHook(() => useSignInForm())

            await act(async () => {
                await result.current.form.handleSubmit(mockSignIn)()
            })

            expect(mockSignIn).not.toHaveBeenCalled()

            expect(
                result.current.form.getFieldState('email').error?.message,
            ).toBe('Email is required')
        })

        it('rejects an empty password', async () => {
            const { result } = renderHook(() => useSignInForm())

            await act(async () => {
                result.current.form.setValue('email', 'user@example.com')
            })

            await act(async () => {
                await result.current.form.handleSubmit(mockSignIn)()
            })

            expect(mockSignIn).not.toHaveBeenCalled()

            expect(
                result.current.form.getFieldState('password').error?.message,
            ).toBe('Password is required')
        })

        it('accepts valid form data', async () => {
            const { result } = renderHook(() => useSignInForm())

            const data = {
                email: 'user@example.com',
                password: 'Password1!',
                rememberMe: true,
            }

            await act(async () => {
                result.current.form.setValue('email', data.email)
                result.current.form.setValue('password', data.password)
                result.current.form.setValue('rememberMe', data.rememberMe)
            })

            await act(async () => {
                await result.current.form.handleSubmit(mockSignIn)()
            })

            expect(mockSignIn).toHaveBeenCalledTimes(1)
            expect(mockSignIn).toHaveBeenCalledWith(data, undefined)
        })
    })

    describe('onSubmit', () => {
        it('calls signIn with the form data', async () => {
            mockSignIn.mockResolvedValue(undefined)

            const { result } = renderHook(() => useSignInForm())

            const data = {
                email: 'user@example.com',
                password: 'Password1!',
                rememberMe: true,
            }

            await act(async () => {
                await result.current.onSubmit(data)
            })

            expect(mockSignIn).toHaveBeenCalledTimes(1)
            expect(mockSignIn).toHaveBeenCalledWith(data)
        })

        it('navigates to the home page after successful sign in', async () => {
            mockSignIn.mockResolvedValue(undefined)

            const { result } = renderHook(() => useSignInForm())

            const data = {
                email: 'user@example.com',
                password: 'Password1!',
                rememberMe: false,
            }

            await act(async () => {
                await result.current.onSubmit(data)
            })

            expect(mockNavigate).toHaveBeenCalledTimes(1)
            expect(mockNavigate).toHaveBeenCalledWith('/')
        })

        it('does not navigate when sign in fails', async () => {
            const error = new Error('Invalid credentials')

            mockSignIn.mockRejectedValue(error)

            const { result } = renderHook(() => useSignInForm())

            const data = {
                email: 'user@example.com',
                password: 'WrongPassword1!',
                rememberMe: false,
            }

            await expect(
                act(async () => {
                    await result.current.onSubmit(data)
                }),
            ).rejects.toThrow('Invalid credentials')

            expect(mockNavigate).not.toHaveBeenCalled()
        })

        it('waits for signIn to finish before navigating', async () => {
            let resolveSignIn!: () => void

            mockSignIn.mockReturnValue(
                new Promise<void>((resolve) => {
                    resolveSignIn = resolve
                }),
            )

            const { result } = renderHook(() => useSignInForm())

            const data = {
                email: 'user@example.com',
                password: 'Password1!',
                rememberMe: false,
            }

            let submitPromise: Promise<void>

            await act(async () => {
                submitPromise = result.current.onSubmit(data)

                await Promise.resolve()
            })

            expect(mockSignIn).toHaveBeenCalledWith(data)
            expect(mockNavigate).not.toHaveBeenCalled()

            await act(async () => {
                resolveSignIn()
                await submitPromise!
            })

            expect(mockNavigate).toHaveBeenCalledWith('/')
        })
    })
})

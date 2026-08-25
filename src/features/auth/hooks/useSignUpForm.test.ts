import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useNavigate } from 'react-router'
import { act, renderHook } from '@testing-library/react'
import { Toast } from '@/shared/lib'
import { useAuth } from './useAuth'
import { useSignUpForm } from './useSignUpForm'

vi.mock('react-router', () => ({
    useNavigate: vi.fn(),
}))

vi.mock('@/shared/lib', () => ({
    Toast: {
        success: vi.fn(),
    },
}))

vi.mock('./useAuth', () => ({
    useAuth: vi.fn(),
}))

describe('useSignUpForm', () => {
    const mockNavigate = vi.fn()
    const mockSignUp = vi.fn()

    const mockAuth = {
        signIn: vi.fn(),
        signUp: mockSignUp,
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
            const { result } = renderHook(() => useSignUpForm())

            expect(result.current.form.getValues()).toEqual({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                terms: false,
            })
        })

        it('returns the loading state from useAuth', () => {
            vi.mocked(useAuth).mockReturnValue({
                ...mockAuth,
                loading: true,
            })

            const { result } = renderHook(() => useSignUpForm())

            expect(result.current.loading).toBe(true)
        })

        it('returns the authentication error from useAuth', () => {
            vi.mocked(useAuth).mockReturnValue({
                ...mockAuth,
                error: 'Unable to create account',
            })

            const { result } = renderHook(() => useSignUpForm())

            expect(result.current.error).toBe('Unable to create account')
        })
    })

    describe('validation', () => {
        it('rejects an empty form', async () => {
            const { result } = renderHook(() => useSignUpForm())

            await act(async () => {
                await result.current.form.handleSubmit(mockSignUp)()
            })

            expect(mockSignUp).not.toHaveBeenCalled()

            expect(
                result.current.form.getFieldState('name').error?.message,
            ).toBe('Name must have at least 2 characters')

            expect(
                result.current.form.getFieldState('email').error?.message,
            ).toBe('Email is required')

            expect(
                result.current.form.getFieldState('password').error?.message,
            ).toBe('Password must be at least 8 characters')

            expect(
                result.current.form.getFieldState('confirmPassword').error
                    ?.message,
            ).toBe('Confirm password is required')

            expect(
                result.current.form.getFieldState('terms').error?.message,
            ).toBe('You must accept the terms and conditions')
        })

        it('rejects an invalid email', async () => {
            const { result } = renderHook(() => useSignUpForm())

            await act(async () => {
                result.current.form.setValue('name', 'John Doe')
                result.current.form.setValue('email', 'invalid-email')
                result.current.form.setValue('password', 'Password1!')
                result.current.form.setValue('confirmPassword', 'Password1!')
                result.current.form.setValue('terms', true)
            })

            await act(async () => {
                await result.current.form.handleSubmit(mockSignUp)()
            })

            expect(mockSignUp).not.toHaveBeenCalled()

            expect(
                result.current.form.getFieldState('email').error?.message,
            ).toBe('Invalid email format')
        })

        it('rejects passwords that do not match', async () => {
            const { result } = renderHook(() => useSignUpForm())

            await act(async () => {
                result.current.form.setValue('name', 'John Doe')
                result.current.form.setValue('email', 'john@example.com')
                result.current.form.setValue('password', 'Password1!')
                result.current.form.setValue(
                    'confirmPassword',
                    'DifferentPassword1!',
                )
                result.current.form.setValue('terms', true)
            })

            await act(async () => {
                await result.current.form.handleSubmit(mockSignUp)()
            })

            expect(mockSignUp).not.toHaveBeenCalled()

            expect(
                result.current.form.getFieldState('confirmPassword').error
                    ?.message,
            ).toBe('Passwords do not match')
        })

        it('rejects when terms are not accepted', async () => {
            const { result } = renderHook(() => useSignUpForm())

            await act(async () => {
                result.current.form.setValue('name', 'John Doe')
                result.current.form.setValue('email', 'john@example.com')
                result.current.form.setValue('password', 'Password1!')
                result.current.form.setValue('confirmPassword', 'Password1!')
                result.current.form.setValue('terms', false)
            })

            await act(async () => {
                await result.current.form.handleSubmit(mockSignUp)()
            })

            expect(mockSignUp).not.toHaveBeenCalled()

            expect(
                result.current.form.getFieldState('terms').error?.message,
            ).toBe('You must accept the terms and conditions')
        })

        it('accepts valid form data', async () => {
            const data = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            }

            mockSignUp.mockResolvedValue(undefined)

            const { result } = renderHook(() => useSignUpForm())

            await act(async () => {
                result.current.form.setValue('name', data.name)
                result.current.form.setValue('email', data.email)
                result.current.form.setValue('password', data.password)
                result.current.form.setValue(
                    'confirmPassword',
                    data.confirmPassword,
                )
                result.current.form.setValue('terms', data.terms)
            })

            await act(async () => {
                await result.current.form.handleSubmit(mockSignUp)()
            })

            expect(mockSignUp).toHaveBeenCalledTimes(1)
            expect(mockSignUp).toHaveBeenCalledWith(data, undefined)
        })
    })

    describe('onSubmit', () => {
        const data = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'Password1!',
            confirmPassword: 'Password1!',
            terms: true,
        }

        it('calls signUp with the form data', async () => {
            mockSignUp.mockResolvedValue(undefined)

            const { result } = renderHook(() => useSignUpForm())

            await act(async () => {
                await result.current.onSubmit(data)
            })

            expect(mockSignUp).toHaveBeenCalledTimes(1)
            expect(mockSignUp).toHaveBeenCalledWith(data)
        })

        it('shows a success toast after successful sign up', async () => {
            mockSignUp.mockResolvedValue(undefined)

            const { result } = renderHook(() => useSignUpForm())

            await act(async () => {
                await result.current.onSubmit(data)
            })

            expect(Toast.success).toHaveBeenCalledTimes(1)
            expect(Toast.success).toHaveBeenCalledWith(
                'Account successfully created',
            )
        })

        it('navigates to the sign-in page after successful sign up', async () => {
            mockSignUp.mockResolvedValue(undefined)

            const { result } = renderHook(() => useSignUpForm())

            await act(async () => {
                await result.current.onSubmit(data)
            })

            expect(mockNavigate).toHaveBeenCalledTimes(1)
            expect(mockNavigate).toHaveBeenCalledWith('/auth/sign-in')
        })

        it('does not show a success toast when sign up fails', async () => {
            const error = new Error('Unable to create account')

            mockSignUp.mockRejectedValue(error)

            const { result } = renderHook(() => useSignUpForm())

            await expect(result.current.onSubmit(data)).rejects.toThrow(
                'Unable to create account',
            )

            expect(Toast.success).not.toHaveBeenCalled()
        })

        it('does not navigate when sign up fails', async () => {
            const error = new Error('Unable to create account')

            mockSignUp.mockRejectedValue(error)

            const { result } = renderHook(() => useSignUpForm())

            await expect(result.current.onSubmit(data)).rejects.toThrow(
                'Unable to create account',
            )

            expect(mockNavigate).not.toHaveBeenCalled()
        })

        it('waits for signUp to finish before showing the success toast', async () => {
            let resolveSignUp!: () => void

            mockSignUp.mockReturnValue(
                new Promise<void>((resolve) => {
                    resolveSignUp = resolve
                }),
            )

            const { result } = renderHook(() => useSignUpForm())

            let submitPromise: Promise<void>

            await act(async () => {
                submitPromise = result.current.onSubmit(data)

                await Promise.resolve()
            })

            expect(mockSignUp).toHaveBeenCalledWith(data)
            expect(Toast.success).not.toHaveBeenCalled()

            await act(async () => {
                resolveSignUp()
                await submitPromise!
            })

            expect(Toast.success).toHaveBeenCalledWith(
                'Account successfully created',
            )
        })

        it('shows the toast before navigating', async () => {
            mockSignUp.mockResolvedValue(undefined)

            const callOrder: string[] = []

            vi.mocked(Toast.success).mockImplementation(() => {
                callOrder.push('toast')
            })

            mockNavigate.mockImplementation(() => {
                callOrder.push('navigate')
            })

            const { result } = renderHook(() => useSignUpForm())

            await act(async () => {
                await result.current.onSubmit(data)
            })

            expect(callOrder).toEqual(['toast', 'navigate'])
        })
    })
})

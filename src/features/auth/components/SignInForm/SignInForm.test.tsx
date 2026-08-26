import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useSignInForm } from '@/features/auth/hooks'
import { SignInForm } from './SignInForm'
import {
    cloneElement,
    isValidElement,
    type HTMLAttributes,
    type ReactElement,
    type ReactNode,
} from 'react'
import type { FieldErrors } from 'react-hook-form'
import type { SignInFormValues } from '@/features/auth/schemas'
import userEvent from '@testing-library/user-event'

const { mockHandleSubmit, mockRegister } = vi.hoisted(() => ({
    mockHandleSubmit: vi.fn(),
    mockRegister: vi.fn(),
}))

vi.mock('react-router', () => ({
    Link: vi.fn(
        ({
            children,
            to,
            ...props
        }: {
            children: React.ReactNode
            to: string
            className?: string
        }) => (
            <a href={to} {...props}>
                {children}
            </a>
        ),
    ),
}))

vi.mock('@/features/auth/hooks', () => ({
    useSignInForm: vi.fn(),
}))

vi.mock('@/shared/components', () => ({
    Button: ({
        children,
        loading,
        size: _size,
        ...props
    }: {
        children: React.ReactNode
        loading?: boolean
        type?: 'button' | 'submit'
        size?: string
    }) => (
        <button {...props} type={props.type} data-loading={loading}>
            {children}
        </button>
    ),

    Checkbox: ({
        label,
        ...props
    }: {
        label: string
        name?: string
        onChange?: React.ChangeEventHandler<HTMLInputElement>
        onBlur?: React.FocusEventHandler<HTMLInputElement>
        ref?: React.Ref<HTMLInputElement>
    }) => (
        <label>
            <input type="checkbox" {...props} />
            {label}
        </label>
    ),

    FormField: ({
        children,
        id,
        label,
        message,
        status,
    }: {
        children: ReactNode
        id: string
        label: string
        message?: string
        status?: string
    }) => (
        <div data-testid={`form-field-${id}`} data-status={status}>
            <label htmlFor={id}>{label}</label>

            {isValidElement(children)
                ? cloneElement(
                      children as ReactElement<
                          HTMLAttributes<HTMLInputElement>
                      >,
                      { id },
                  )
                : children}

            {message && <span>{message}</span>}
        </div>
    ),

    Input: ({
        size: _size,
        ...props
    }: React.InputHTMLAttributes<HTMLInputElement> & {
        size?: string
    }) => <input {...props} />,
}))

describe('SignInForm', () => {
    const mockOnSubmit = vi.fn()

    const mockForm = {
        register: mockRegister,
        handleSubmit: mockHandleSubmit,
        formState: {
            errors: {},
        },
    }

    const createUseSignInFormMock = (
        overrides: Partial<{
            errors: FieldErrors<SignInFormValues>
            loading: boolean
            error: string | null
        }> = {},
    ) => ({
        form: {
            ...mockForm,
            formState: {
                errors: overrides.errors ?? {},
            },
        } as unknown as ReturnType<typeof useSignInForm>['form'],
        loading: overrides.loading ?? false,
        error: overrides.error ?? null,
        onSubmit: mockOnSubmit,
    })

    beforeEach(() => {
        vi.clearAllMocks()

        mockRegister.mockImplementation((name: string) => ({
            name,
            onChange: vi.fn(),
            onBlur: vi.fn(),
            ref: vi.fn(),
        }))

        mockHandleSubmit.mockImplementation(
            (onSubmit: (data: unknown) => unknown) => {
                return (event?: React.FormEvent<HTMLFormElement>) => {
                    event?.preventDefault()

                    return onSubmit(event)
                }
            },
        )

        vi.mocked(useSignInForm).mockReturnValue(createUseSignInFormMock())
    })

    describe('fields', () => {
        it('renders the email field', () => {
            render(<SignInForm />)

            expect(screen.getByLabelText('Your Email')).toBeInTheDocument()

            expect(
                screen.getByPlaceholderText('Enter your email'),
            ).toBeInTheDocument()
        })

        it('renders the password field', () => {
            render(<SignInForm />)

            expect(screen.getByLabelText('Password')).toBeInTheDocument()

            expect(
                screen.getByPlaceholderText('Enter your password'),
            ).toBeInTheDocument()
        })

        it('renders the remember me checkbox', () => {
            render(<SignInForm />)

            expect(
                screen.getByRole('checkbox', {
                    name: 'Remember me',
                }),
            ).toBeInTheDocument()
        })

        it('renders the email input with email type', () => {
            render(<SignInForm />)

            expect(
                screen.getByPlaceholderText('Enter your email'),
            ).toHaveAttribute('type', 'email')
        })

        it('renders the password input with password type', () => {
            render(<SignInForm />)

            expect(
                screen.getByPlaceholderText('Enter your password'),
            ).toHaveAttribute('type', 'password')
        })
    })

    describe('form registration', () => {
        it('registers the email field', () => {
            render(<SignInForm />)

            expect(mockRegister).toHaveBeenCalledWith('email')
        })

        it('registers the password field', () => {
            render(<SignInForm />)

            expect(mockRegister).toHaveBeenCalledWith('password')
        })

        it('registers the rememberMe field', () => {
            render(<SignInForm />)

            expect(mockRegister).toHaveBeenCalledWith('rememberMe')
        })
    })

    describe('validation errors', () => {
        it('renders the email validation error', () => {
            vi.mocked(useSignInForm).mockReturnValue(
                createUseSignInFormMock({
                    errors: {
                        email: {
                            type: 'required',
                            message: 'Email is required',
                        },
                    },
                }),
            )

            render(<SignInForm />)

            expect(screen.getByText('Email is required')).toBeInTheDocument()
        })

        it('renders the password validation error', () => {
            vi.mocked(useSignInForm).mockReturnValue(
                createUseSignInFormMock({
                    errors: {
                        password: {
                            type: 'required',
                            message: 'Password is required',
                        },
                    },
                }),
            )

            render(<SignInForm />)

            expect(screen.getByText('Password is required')).toBeInTheDocument()
        })

        it('marks the email field as having an error', () => {
            vi.mocked(useSignInForm).mockReturnValue(
                createUseSignInFormMock({
                    errors: {
                        email: {
                            type: 'validate',
                            message: 'Invalid email format',
                        },
                    },
                }),
            )

            render(<SignInForm />)

            expect(screen.getByTestId('form-field-email')).toHaveAttribute(
                'data-status',
                'error',
            )
        })

        it('marks the password field as having an error', () => {
            vi.mocked(useSignInForm).mockReturnValue(
                createUseSignInFormMock({
                    errors: {
                        password: {
                            type: 'required',
                            message: 'Password is required',
                        },
                    },
                }),
            )

            render(<SignInForm />)

            expect(screen.getByTestId('form-field-password')).toHaveAttribute(
                'data-status',
                'error',
            )
        })
    })

    describe('authentication error', () => {
        it('renders the authentication error', () => {
            vi.mocked(useSignInForm).mockReturnValue(
                createUseSignInFormMock({
                    error: 'Invalid credentials',
                }),
            )

            render(<SignInForm />)

            expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
        })

        it('does not render the authentication error when there is no error', () => {
            render(<SignInForm />)

            expect(
                screen.queryByText('Invalid credentials'),
            ).not.toBeInTheDocument()
        })
    })

    describe('submit button', () => {
        it('renders the sign in button', () => {
            render(<SignInForm />)

            expect(
                screen.getByRole('button', {
                    name: 'Sign In',
                }),
            ).toBeInTheDocument()
        })

        it('renders the submit button with submit type', () => {
            render(<SignInForm />)

            expect(
                screen.getByRole('button', {
                    name: 'Sign In',
                }),
            ).toHaveAttribute('type', 'submit')
        })

        it('passes the loading state to the button', () => {
            vi.mocked(useSignInForm).mockReturnValue(
                createUseSignInFormMock({
                    loading: true,
                }),
            )

            render(<SignInForm />)

            expect(
                screen.getByRole('button', {
                    name: 'Sign In',
                }),
            ).toHaveAttribute('data-loading', 'true')
        })

        it('passes the non-loading state to the button', () => {
            render(<SignInForm />)

            expect(
                screen.getByRole('button', {
                    name: 'Sign In',
                }),
            ).toHaveAttribute('data-loading', 'false')
        })
    })

    describe('submit', () => {
        it('passes onSubmit to handleSubmit', () => {
            render(<SignInForm />)

            expect(mockHandleSubmit).toHaveBeenCalledWith(mockOnSubmit)
        })

        it('calls onSubmit when the form is submitted', async () => {
            const user = userEvent.setup()

            render(<SignInForm />)

            await user.click(
                screen.getByRole('button', {
                    name: 'Sign In',
                }),
            )

            expect(mockOnSubmit).toHaveBeenCalledTimes(1)
        })
    })

    describe('navigation', () => {
        it('renders the create account link', () => {
            render(<SignInForm />)

            expect(
                screen.getByRole('link', {
                    name: 'Create account',
                }),
            ).toBeInTheDocument()
        })

        it('links to the sign up page', () => {
            render(<SignInForm />)

            expect(
                screen.getByRole('link', {
                    name: 'Create account',
                }),
            ).toHaveAttribute('href', '/auth/sign-up')
        })

        it('renders the account prompt', () => {
            render(<SignInForm />)

            expect(
                screen.getByText("Don't have an account?"),
            ).toBeInTheDocument()
        })
    })
})

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useSignUpForm } from '@/features/auth/hooks'
import { SignUpForm } from './SignUpForm'
import { cloneElement, type ReactElement } from 'react'
import type { FieldErrors } from 'react-hook-form'
import type { SignUpFormValues } from '@/features/auth/schemas'
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
        }) => (
            <a href={to} {...props}>
                {children}
            </a>
        ),
    ),
}))

vi.mock('@/features/auth/hooks', () => ({
    useSignUpForm: vi.fn(),
}))

vi.mock('@/shared/components', () => ({
    Button: ({
        children,
        loading,
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
        children: ReactElement<{ id?: string }>
        id: string
        label: string
        message?: string
        status?: string
    }) => (
        <div data-testid={`form-field-${id}`} data-status={status}>
            <label htmlFor={id}>{label}</label>

            {cloneElement(children, { id })}

            {message && <span>{message}</span>}
        </div>
    ),
    Input: ({
        ...props
    }: React.InputHTMLAttributes<HTMLInputElement> & {
        size?: string
    }) => <input {...props} />,
}))

describe('SignUpForm', () => {
    const mockOnSubmit = vi.fn()

    const createMockForm = (errors: FieldErrors<SignUpFormValues> = {}) => ({
        register: mockRegister,
        handleSubmit: mockHandleSubmit,
        formState: {
            errors,
        },
    })

    const mockUseSignUpForm = ({
        errors = {},
        loading = false,
        error = null,
    }: {
        errors?: FieldErrors<SignUpFormValues>
        loading?: boolean
        error?: string | null
    } = {}) => {
        vi.mocked(useSignUpForm).mockReturnValue({
            form: createMockForm(errors) as unknown as ReturnType<
                typeof useSignUpForm
            >['form'],
            loading,
            error,
            onSubmit: mockOnSubmit,
        })
    }

    beforeEach(() => {
        vi.clearAllMocks()

        mockRegister.mockImplementation((name: string) => ({
            name,
            onChange: vi.fn(),
            onBlur: vi.fn(),
            ref: vi.fn(),
        }))

        mockHandleSubmit.mockImplementation(
            (onSubmit: (data: unknown) => unknown) =>
                (event?: React.FormEvent<HTMLFormElement>) => {
                    event?.preventDefault()

                    return onSubmit(event)
                },
        )

        mockUseSignUpForm()
    })

    describe('fields', () => {
        it('renders the name field', () => {
            render(<SignUpForm />)

            expect(screen.getByLabelText('Full Name')).toBeInTheDocument()

            expect(
                screen.getByPlaceholderText('Enter your full name'),
            ).toBeInTheDocument()
        })

        it('renders the email field', () => {
            render(<SignUpForm />)

            expect(screen.getByLabelText('Your Email')).toBeInTheDocument()

            expect(
                screen.getByPlaceholderText('Enter your email'),
            ).toBeInTheDocument()
        })

        it('renders the password field', () => {
            render(<SignUpForm />)

            expect(screen.getByLabelText('Password')).toBeInTheDocument()

            expect(
                screen.getByPlaceholderText('Enter your password'),
            ).toBeInTheDocument()
        })

        it('renders the confirm password field', () => {
            render(<SignUpForm />)

            expect(
                screen.getByLabelText('Confirm Password'),
            ).toBeInTheDocument()

            expect(
                screen.getByPlaceholderText('Confirm your password'),
            ).toBeInTheDocument()
        })

        it('renders the terms checkbox', () => {
            render(<SignUpForm />)

            expect(
                screen.getByRole('checkbox', {
                    name: 'I accept the Terms & Conditions',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('input attributes', () => {
        it('renders the email input with email type', () => {
            render(<SignUpForm />)

            expect(
                screen.getByPlaceholderText('Enter your email'),
            ).toHaveAttribute('type', 'email')
        })

        it('renders the password input with password type', () => {
            render(<SignUpForm />)

            expect(
                screen.getByPlaceholderText('Enter your password'),
            ).toHaveAttribute('type', 'password')
        })

        it('renders the confirm password input with password type', () => {
            render(<SignUpForm />)

            expect(
                screen.getByPlaceholderText('Confirm your password'),
            ).toHaveAttribute('type', 'password')
        })
    })

    describe('form registration', () => {
        it('registers the name field', () => {
            render(<SignUpForm />)

            expect(mockRegister).toHaveBeenCalledWith('name')
        })

        it('registers the email field', () => {
            render(<SignUpForm />)

            expect(mockRegister).toHaveBeenCalledWith('email')
        })

        it('registers the password field', () => {
            render(<SignUpForm />)

            expect(mockRegister).toHaveBeenCalledWith('password')
        })

        it('registers the confirmPassword field', () => {
            render(<SignUpForm />)

            expect(mockRegister).toHaveBeenCalledWith('confirmPassword')
        })

        it('registers the terms field', () => {
            render(<SignUpForm />)

            expect(mockRegister).toHaveBeenCalledWith('terms')
        })
    })

    describe('validation errors', () => {
        it('renders the name validation error', () => {
            mockUseSignUpForm({
                errors: {
                    name: {
                        type: 'min',
                        message: 'Name must have at least 2 characters',
                    },
                },
            })

            render(<SignUpForm />)

            expect(
                screen.getByText('Name must have at least 2 characters'),
            ).toBeInTheDocument()
        })

        it('renders the email validation error', () => {
            mockUseSignUpForm({
                errors: {
                    email: {
                        type: 'custom',
                        message: 'Invalid email format',
                    },
                },
            })

            render(<SignUpForm />)

            expect(screen.getByText('Invalid email format')).toBeInTheDocument()
        })

        it('renders the password validation error', () => {
            mockUseSignUpForm({
                errors: {
                    password: {
                        type: 'min',
                        message: 'Password must be at least 8 characters',
                    },
                },
            })

            render(<SignUpForm />)

            expect(
                screen.getByText('Password must be at least 8 characters'),
            ).toBeInTheDocument()
        })

        it('renders the confirm password validation error', () => {
            mockUseSignUpForm({
                errors: {
                    confirmPassword: {
                        type: 'custom',
                        message: 'Passwords do not match',
                    },
                },
            })

            render(<SignUpForm />)

            expect(
                screen.getByText('Passwords do not match'),
            ).toBeInTheDocument()
        })

        it('marks the name field as having an error', () => {
            mockUseSignUpForm({
                errors: {
                    name: {
                        type: 'custom',
                        message: 'Name is invalid',
                    },
                },
            })

            render(<SignUpForm />)

            expect(screen.getByTestId('form-field-name')).toHaveAttribute(
                'data-status',
                'error',
            )
        })

        it('marks the email field as having an error', () => {
            mockUseSignUpForm({
                errors: {
                    email: {
                        type: 'custom',
                        message: 'Invalid email format',
                    },
                },
            })

            render(<SignUpForm />)

            expect(screen.getByTestId('form-field-email')).toHaveAttribute(
                'data-status',
                'error',
            )
        })

        it('marks the password field as having an error', () => {
            mockUseSignUpForm({
                errors: {
                    password: {
                        type: 'custom',
                        message: 'Invalid password',
                    },
                },
            })

            render(<SignUpForm />)

            expect(screen.getByTestId('form-field-password')).toHaveAttribute(
                'data-status',
                'error',
            )
        })

        it('marks the confirm password field as having an error', () => {
            mockUseSignUpForm({
                errors: {
                    confirmPassword: {
                        type: 'custom',
                        message: 'Passwords do not match',
                    },
                },
            })

            render(<SignUpForm />)

            expect(
                screen.getByTestId('form-field-confirm-password'),
            ).toHaveAttribute('data-status', 'error')
        })
    })

    describe('authentication error', () => {
        it('renders the authentication error', () => {
            mockUseSignUpForm({
                error: 'Unable to create account',
            })

            render(<SignUpForm />)

            expect(
                screen.getByText('Unable to create account'),
            ).toBeInTheDocument()
        })

        it('does not render the authentication error when there is no error', () => {
            render(<SignUpForm />)

            expect(
                screen.queryByText('Unable to create account'),
            ).not.toBeInTheDocument()
        })
    })

    describe('submit button', () => {
        it('renders the create account button', () => {
            render(<SignUpForm />)

            expect(
                screen.getByRole('button', {
                    name: 'Create account',
                }),
            ).toBeInTheDocument()
        })

        it('renders the submit button with submit type', () => {
            render(<SignUpForm />)

            expect(
                screen.getByRole('button', {
                    name: 'Create account',
                }),
            ).toHaveAttribute('type', 'submit')
        })

        it('passes the loading state to the button', () => {
            mockUseSignUpForm({
                loading: true,
            })

            render(<SignUpForm />)

            expect(
                screen.getByRole('button', {
                    name: 'Create account',
                }),
            ).toHaveAttribute('data-loading', 'true')
        })

        it('passes the non-loading state to the button', () => {
            render(<SignUpForm />)

            expect(
                screen.getByRole('button', {
                    name: 'Create account',
                }),
            ).toHaveAttribute('data-loading', 'false')
        })
    })

    describe('submit', () => {
        it('passes onSubmit to handleSubmit', () => {
            render(<SignUpForm />)

            expect(mockHandleSubmit).toHaveBeenCalledWith(mockOnSubmit)
        })

        it('calls onSubmit when the form is submitted', async () => {
            const user = userEvent.setup()

            render(<SignUpForm />)

            await user.click(
                screen.getByRole('button', {
                    name: 'Create account',
                }),
            )

            expect(mockOnSubmit).toHaveBeenCalledTimes(1)
        })
    })

    describe('navigation', () => {
        it('renders the sign in link', () => {
            render(<SignUpForm />)

            expect(
                screen.getByRole('link', {
                    name: 'Sign In',
                }),
            ).toBeInTheDocument()
        })

        it('links to the sign in page', () => {
            render(<SignUpForm />)

            expect(
                screen.getByRole('link', {
                    name: 'Sign In',
                }),
            ).toHaveAttribute('href', '/auth/sign-in')
        })

        it('renders the account prompt', () => {
            render(<SignUpForm />)

            expect(
                screen.getByText('Already have an account?'),
            ).toBeInTheDocument()
        })
    })
})

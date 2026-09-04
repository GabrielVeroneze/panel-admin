import { useEffect, type ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { render, screen } from '@testing-library/react'
import { CreatePasswordFields } from './CreatePasswordFields'
import type { CreateUserFormValues } from '@/features/users/schemas'
import userEvent from '@testing-library/user-event'

vi.mock('@/shared/components', () => ({
    FormField: ({
        id,
        label,
        status,
        message,
        children,
    }: {
        id: string
        label: string
        status?: string
        message?: string
        children: ReactNode
    }) => (
        <div data-testid={`form-field-${id}`}>
            <label htmlFor={id}>{label}</label>
            {children}
            {status === 'error' && message && (
                <span role="alert">{message}</span>
            )}
        </div>
    ),

    Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
        <input {...props} />
    ),
}))

const TestForm = ({
    children,
    defaultValues,
}: {
    children: ReactNode
    defaultValues?: Partial<CreateUserFormValues>
}) => {
    const form = useForm<CreateUserFormValues>({
        defaultValues,
    })

    return <FormProvider {...form}>{children}</FormProvider>
}

describe('CreatePasswordFields', () => {
    it('renders password fields', () => {
        render(
            <TestForm>
                <CreatePasswordFields />
            </TestForm>,
        )

        expect(
            screen.getByPlaceholderText('Enter password'),
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText('Enter confirm password'),
        ).toBeInTheDocument()
    })

    it('renders the password field correctly', () => {
        render(
            <TestForm>
                <CreatePasswordFields />
            </TestForm>,
        )

        const input = screen.getByPlaceholderText('Enter password')

        expect(input).toHaveAttribute('type', 'password')
        expect(input).toHaveAttribute('name', 'password')
        expect(input).toHaveAttribute('placeholder', 'Enter password')
    })

    it('renders the confirm password field correctly', () => {
        render(
            <TestForm>
                <CreatePasswordFields />
            </TestForm>,
        )

        const input = screen.getByPlaceholderText('Enter confirm password')

        expect(input).toHaveAttribute('type', 'password')
        expect(input).toHaveAttribute('name', 'confirmPassword')
        expect(input).toHaveAttribute('placeholder', 'Enter confirm password')
    })

    it('renders password values from form default values', () => {
        render(
            <TestForm
                defaultValues={{
                    password: 'Password123!',
                    confirmPassword: 'Password123!',
                }}
            >
                <CreatePasswordFields />
            </TestForm>,
        )

        expect(screen.getByPlaceholderText('Enter password')).toHaveValue(
            'Password123!',
        )

        expect(
            screen.getByPlaceholderText('Enter confirm password'),
        ).toHaveValue('Password123!')
    })

    it('updates password fields when the user types', async () => {
        const user = userEvent.setup()

        render(
            <TestForm>
                <CreatePasswordFields />
            </TestForm>,
        )

        const password = screen.getByPlaceholderText('Enter password')
        const confirmPassword = screen.getByPlaceholderText(
            'Enter confirm password',
        )

        await user.type(password, 'Password123!')
        await user.type(confirmPassword, 'Password123!')

        expect(password).toHaveValue('Password123!')
        expect(confirmPassword).toHaveValue('Password123!')
    })

    it('renders fields without errors initially', () => {
        render(
            <TestForm>
                <CreatePasswordFields />
            </TestForm>,
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('displays password error', async () => {
        const SetPasswordError = () => {
            const { setError } = useFormContext<CreateUserFormValues>()

            useEffect(() => {
                setError('password', {
                    type: 'manual',
                    message: 'Password must be at least 8 characters',
                })
            }, [setError])

            return null
        }

        const TestFormWithError = () => {
            const form = useForm<CreateUserFormValues>()

            return (
                <FormProvider {...form}>
                    <SetPasswordError />
                    <CreatePasswordFields />
                </FormProvider>
            )
        }

        render(<TestFormWithError />)

        expect(
            await screen.findByText('Password must be at least 8 characters'),
        ).toBeInTheDocument()
    })

    it('displays confirm password error', async () => {
        const SetConfirmPasswordError = () => {
            const { setError } = useFormContext<CreateUserFormValues>()

            useEffect(() => {
                setError('confirmPassword', {
                    type: 'manual',
                    message: 'Passwords do not match',
                })
            }, [setError])

            return null
        }

        const TestFormWithError = () => {
            const form = useForm<CreateUserFormValues>()

            return (
                <FormProvider {...form}>
                    <SetConfirmPasswordError />
                    <CreatePasswordFields />
                </FormProvider>
            )
        }

        render(<TestFormWithError />)

        expect(
            await screen.findByText('Passwords do not match'),
        ).toBeInTheDocument()
    })
})

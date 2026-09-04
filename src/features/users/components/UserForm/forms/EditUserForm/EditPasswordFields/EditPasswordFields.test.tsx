import { useEffect, type ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { render, screen } from '@testing-library/react'
import { EditPasswordFields } from './EditPasswordFields'
import type { UpdateUserFormValues } from '@/features/users/schemas'
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
    defaultValues?: Partial<UpdateUserFormValues>
}) => {
    const form = useForm<UpdateUserFormValues>({
        defaultValues,
    })

    return <FormProvider {...form}>{children}</FormProvider>
}

describe('EditPasswordFields', () => {
    it('renders password fields', () => {
        render(
            <TestForm>
                <EditPasswordFields />
            </TestForm>,
        )

        expect(
            screen.getByPlaceholderText('Enter current password'),
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText('Enter new password'),
        ).toBeInTheDocument()
    })

    it('renders the current password field correctly', () => {
        render(
            <TestForm>
                <EditPasswordFields />
            </TestForm>,
        )

        const input = screen.getByPlaceholderText('Enter current password')

        expect(input).toHaveAttribute('type', 'password')
        expect(input).toHaveAttribute('name', 'currentPassword')
        expect(input).toHaveAttribute('placeholder', 'Enter current password')
    })

    it('renders the new password field correctly', () => {
        render(
            <TestForm>
                <EditPasswordFields />
            </TestForm>,
        )

        const input = screen.getByPlaceholderText('Enter new password')

        expect(input).toHaveAttribute('type', 'password')
        expect(input).toHaveAttribute('name', 'newPassword')
        expect(input).toHaveAttribute('placeholder', 'Enter new password')
    })

    it('renders password values from form default values', () => {
        render(
            <TestForm
                defaultValues={{
                    currentPassword: 'Current123!',
                    newPassword: 'NewPassword123!',
                }}
            >
                <EditPasswordFields />
            </TestForm>,
        )

        expect(
            screen.getByPlaceholderText('Enter current password'),
        ).toHaveValue('Current123!')

        expect(screen.getByPlaceholderText('Enter new password')).toHaveValue(
            'NewPassword123!',
        )
    })

    it('updates password fields when the user types', async () => {
        const user = userEvent.setup()

        render(
            <TestForm>
                <EditPasswordFields />
            </TestForm>,
        )

        const currentPassword = screen.getByPlaceholderText(
            'Enter current password',
        )

        const newPassword = screen.getByPlaceholderText('Enter new password')

        await user.type(currentPassword, 'Current123!')
        await user.type(newPassword, 'NewPassword123!')

        expect(currentPassword).toHaveValue('Current123!')
        expect(newPassword).toHaveValue('NewPassword123!')
    })

    it('renders fields without errors initially', () => {
        render(
            <TestForm>
                <EditPasswordFields />
            </TestForm>,
        )

        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('displays current password error', async () => {
        const SetCurrentPasswordError = () => {
            const { setError } = useFormContext<UpdateUserFormValues>()

            useEffect(() => {
                setError('currentPassword', {
                    type: 'manual',
                    message:
                        'Current password is required to set a new password',
                })
            }, [setError])

            return null
        }

        const TestFormWithError = () => {
            const form = useForm<UpdateUserFormValues>()

            return (
                <FormProvider {...form}>
                    <SetCurrentPasswordError />
                    <EditPasswordFields />
                </FormProvider>
            )
        }

        render(<TestFormWithError />)

        expect(
            await screen.findByText(
                'Current password is required to set a new password',
            ),
        ).toBeInTheDocument()
    })

    it('displays new password error', async () => {
        const SetNewPasswordError = () => {
            const { setError } = useFormContext<UpdateUserFormValues>()

            useEffect(() => {
                setError('newPassword', {
                    type: 'manual',
                    message: 'New password is required when changing password',
                })
            }, [setError])

            return null
        }

        const TestFormWithError = () => {
            const form = useForm<UpdateUserFormValues>()

            return (
                <FormProvider {...form}>
                    <SetNewPasswordError />
                    <EditPasswordFields />
                </FormProvider>
            )
        }

        render(<TestFormWithError />)

        expect(
            await screen.findByText(
                'New password is required when changing password',
            ),
        ).toBeInTheDocument()
    })

    it('displays an error when the new password is the same as the current password', async () => {
        const SetNewPasswordError = () => {
            const { setError } = useFormContext<UpdateUserFormValues>()

            useEffect(() => {
                setError('newPassword', {
                    type: 'manual',
                    message:
                        'New password must be different from current password',
                })
            }, [setError])

            return null
        }

        const TestFormWithError = () => {
            const form = useForm<UpdateUserFormValues>()

            return (
                <FormProvider {...form}>
                    <SetNewPasswordError />
                    <EditPasswordFields />
                </FormProvider>
            )
        }

        render(<TestFormWithError />)

        expect(
            await screen.findByText(
                'New password must be different from current password',
            ),
        ).toBeInTheDocument()
    })
})

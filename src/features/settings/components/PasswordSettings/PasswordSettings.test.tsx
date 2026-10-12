import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { usePasswordForm } from '@/features/settings/hooks'
import { PasswordSettings } from './PasswordSettings'
import type { ReactNode } from 'react'
import userEvent from '@testing-library/user-event'

const mocks = vi.hoisted(() => ({
    onSubmit: vi.fn(),
    register: vi.fn((name: string) => ({
        name,
        onChange: vi.fn(),
        onBlur: vi.fn(),
        ref: vi.fn(),
    })),
}))

vi.mock('@/features/settings/hooks', () => ({
    usePasswordForm: vi.fn(),
}))

vi.mock('./PasswordSettingsSkeleton', () => ({
    PasswordSettingsSkeleton: () => (
        <div data-testid="password-settings-skeleton">
            Loading password settings
        </div>
    ),
}))

vi.mock('@/features/settings/components', async (importOriginal) => {
    const actual =
        await importOriginal<typeof import('@/features/settings/components')>()

    return {
        ...actual,
        SettingsCard: ({
            children,
            title,
        }: {
            children: ReactNode
            title: string
        }) => (
            <section>
                <h2>{title}</h2>
                {children}
            </section>
        ),
    }
})

const defaultErrors = {}

const setup = ({
    loading = false,
    errors = defaultErrors,
}: {
    loading?: boolean
    errors?: Record<string, { message?: string } | undefined>
} = {}) => {
    vi.mocked(usePasswordForm).mockReturnValue({
        form: {
            register: mocks.register,
            formState: { errors },
        },
        onSubmit: mocks.onSubmit,
    } as unknown as ReturnType<typeof usePasswordForm>)

    return render(<PasswordSettings loading={loading} />)
}

describe('PasswordSettings', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the skeleton while loading', () => {
        setup({ loading: true })

        expect(
            screen.getByTestId('password-settings-skeleton'),
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'Password information',
            }),
        ).not.toBeInTheDocument()
    })

    it('renders the settings card title', () => {
        setup()

        expect(
            screen.getByRole('heading', {
                name: 'Password information',
            }),
        ).toBeInTheDocument()
    })

    it.each([
        ['Current Password', 'current-password', 'currentPassword'],
        ['New Password', 'new-password', 'newPassword'],
        ['Confirm Password', 'confirm-password', 'confirmPassword'],
    ])('renders the %s field', (label, id, name) => {
        setup()

        const input = screen.getByLabelText(label)

        expect(input).toBeInTheDocument()
        expect(input).toHaveAttribute('id', id)
        expect(input).toHaveAttribute('name', name)
        expect(input).toHaveAttribute('type', 'password')
    })

    it.each([
        ['Current Password', 'Enter your current password'],
        ['New Password', 'Enter your new password'],
        ['Confirm Password', 'Confirm your new password'],
    ])('renders the placeholder for %s', (label, placeholder) => {
        setup()

        expect(screen.getByLabelText(label)).toHaveAttribute(
            'placeholder',
            placeholder,
        )
    })

    it.each([
        ['currentPassword', 'current-password'],
        ['newPassword', 'new-password'],
        ['confirmPassword', 'confirm-password'],
    ])('registers the %s field with the form', (name, id) => {
        setup()

        expect(mocks.register).toHaveBeenCalledWith(name)
        expect(document.getElementById(id)).toHaveAttribute('name', name)
    })

    it('renders the password requirements heading and description', () => {
        setup()

        expect(screen.getByText('Password requirements:')).toBeInTheDocument()

        expect(
            screen.getByText('Ensure that these requirements are met:'),
        ).toBeInTheDocument()
    })

    it('renders all password requirements', () => {
        setup()

        const requirements = screen.getByRole('list')

        expect(requirements).toBeInTheDocument()
        expect(
            screen.getByText('Between 8 and 100 characters long'),
        ).toBeInTheDocument()
        expect(
            screen.getByText('Include both uppercase and lowercase letters'),
        ).toBeInTheDocument()
        expect(
            screen.getByText(
                'Include at least one number and one special character',
            ),
        ).toBeInTheDocument()

        expect(requirements.querySelectorAll('li')).toHaveLength(3)
    })

    it('renders the Update submit button', () => {
        setup()

        expect(screen.getByRole('button', { name: 'Update' })).toHaveAttribute(
            'type',
            'submit',
        )
    })

    it.each([
        ['currentPassword', 'Current password is required'],
        ['newPassword', 'New password is required'],
        ['confirmPassword', 'Password confirmation is required'],
    ])('renders the validation message for %s', (field, message) => {
        setup({
            errors: {
                [field]: { message },
            },
        })

        expect(screen.getByText(message)).toBeInTheDocument()
    })

    it('does not render validation messages when there are no errors', () => {
        setup()

        expect(
            screen.queryByText('Current password is required'),
        ).not.toBeInTheDocument()

        expect(
            screen.queryByText('New password is required'),
        ).not.toBeInTheDocument()

        expect(
            screen.queryByText('Password confirmation is required'),
        ).not.toBeInTheDocument()
    })

    it('calls the submit handler when the form is submitted', () => {
        setup()

        const form = screen
            .getByRole('button', { name: 'Update' })
            .closest('form')

        expect(form).not.toBeNull()

        fireEvent.submit(form!)

        expect(mocks.onSubmit).toHaveBeenCalledTimes(1)
    })

    it('calls the form hook even while loading', () => {
        setup({ loading: true })

        expect(usePasswordForm).toHaveBeenCalledTimes(1)
    })

    it('renders all password fields as password inputs', () => {
        setup()

        const passwordInputs = screen.getAllByLabelText(
            /Current Password|New Password|Confirm Password/,
        )

        expect(passwordInputs).toHaveLength(3)

        passwordInputs.forEach((input) => {
            expect(input).toHaveAttribute('type', 'password')
        })
    })

    it('allows typing into the password fields', async () => {
        const user = userEvent.setup()

        setup()

        const currentPassword = screen.getByLabelText('Current Password')
        const newPassword = screen.getByLabelText('New Password')
        const confirmPassword = screen.getByLabelText('Confirm Password')

        await user.type(currentPassword, 'Current123!')
        await user.type(newPassword, 'NewPassword123!')
        await user.type(confirmPassword, 'NewPassword123!')

        expect(currentPassword).toHaveValue('Current123!')
        expect(newPassword).toHaveValue('NewPassword123!')
        expect(confirmPassword).toHaveValue('NewPassword123!')
    })
})

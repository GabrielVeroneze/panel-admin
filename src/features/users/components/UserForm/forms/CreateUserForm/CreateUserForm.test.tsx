import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import { CreateUserForm } from './CreateUserForm'
import type { CreateUserFormValues } from '@/features/users/schemas'
import userEvent from '@testing-library/user-event'

const { mockUseCreateUserForm } = vi.hoisted(() => ({
    mockUseCreateUserForm: vi.fn(),
}))

vi.mock('@/features/users/hooks', () => ({
    useCreateUserForm: mockUseCreateUserForm,
}))

vi.mock('@/features/users/components', () => ({
    CommonUserFields: () => (
        <div data-testid="common-user-fields">Common User Fields</div>
    ),

    AvatarField: () => <div data-testid="avatar-field">Avatar Field</div>,
}))

vi.mock('./CreatePasswordFields/CreatePasswordFields', () => ({
    CreatePasswordFields: () => (
        <div data-testid="create-password-fields">Create Password Fields</div>
    ),
}))

vi.mock('react-hook-form', async () => {
    const actual =
        await vi.importActual<typeof import('react-hook-form')>(
            'react-hook-form',
        )

    return {
        ...actual,

        FormProvider: ({ children }: { children: React.ReactNode }) => (
            <>{children}</>
        ),
    }
})

describe('CreateUserForm', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the form with the provided id', () => {
        const onSubmit = vi.fn()

        mockUseCreateUserForm.mockReturnValue({
            handleSubmit: vi.fn(),
        })

        const { container } = render(
            <CreateUserForm formId="create-user-form" onSubmit={onSubmit} />,
        )

        const form = container.querySelector('#create-user-form')

        expect(form).toBeInTheDocument()
        expect(form).toHaveAttribute('id', 'create-user-form')
    })

    it('renders CommonUserFields', () => {
        const onSubmit = vi.fn()

        mockUseCreateUserForm.mockReturnValue({
            handleSubmit: vi.fn(),
        })

        const { getByTestId } = render(
            <CreateUserForm formId="create-user-form" onSubmit={onSubmit} />,
        )

        expect(getByTestId('common-user-fields')).toBeInTheDocument()
    })

    it('renders CreatePasswordFields', () => {
        const onSubmit = vi.fn()

        mockUseCreateUserForm.mockReturnValue({
            handleSubmit: vi.fn(),
        })

        const { getByTestId } = render(
            <CreateUserForm formId="create-user-form" onSubmit={onSubmit} />,
        )

        expect(getByTestId('create-password-fields')).toBeInTheDocument()
    })

    it('renders AvatarField', () => {
        const onSubmit = vi.fn()

        mockUseCreateUserForm.mockReturnValue({
            handleSubmit: vi.fn(),
        })

        const { getByTestId } = render(
            <CreateUserForm formId="create-user-form" onSubmit={onSubmit} />,
        )

        expect(getByTestId('avatar-field')).toBeInTheDocument()
    })

    it('calls useCreateUserForm once', () => {
        const onSubmit = vi.fn()

        mockUseCreateUserForm.mockReturnValue({
            handleSubmit: vi.fn(),
        })

        render(<CreateUserForm formId="create-user-form" onSubmit={onSubmit} />)

        expect(mockUseCreateUserForm).toHaveBeenCalledTimes(1)
    })

    it('passes onSubmit to methods.handleSubmit', () => {
        const onSubmit = vi.fn()
        const handleSubmit = vi.fn()

        mockUseCreateUserForm.mockReturnValue({
            handleSubmit,
        })

        render(<CreateUserForm formId="create-user-form" onSubmit={onSubmit} />)

        expect(handleSubmit).toHaveBeenCalledTimes(1)
        expect(handleSubmit).toHaveBeenCalledWith(onSubmit)
    })

    it('submits the form through methods.handleSubmit', async () => {
        const user = userEvent.setup()
        const onSubmit = vi.fn()

        const formData: CreateUserFormValues = {
            firstName: 'Gabriel',
            lastName: 'Veroneze',
            email: 'gabriel@example.com',
            phone: '+5511999999999',
            company: 'Acme',
            department: 'Engineering',
            password: 'Password123!',
            confirmPassword: 'Password123!',
            avatar: undefined,
        }

        const handleSubmit = vi.fn(
            (callback: (data: CreateUserFormValues) => void) =>
                (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault()

                    callback(formData)
                },
        )

        mockUseCreateUserForm.mockReturnValue({
            handleSubmit,
        })

        const { container } = render(
            <CreateUserForm formId="create-user-form" onSubmit={onSubmit} />,
        )

        const form = container.querySelector(
            '#create-user-form',
        ) as HTMLFormElement

        expect(form).toBeInTheDocument()

        const submitButton = document.createElement('button')

        submitButton.type = 'submit'
        submitButton.textContent = 'Submit'

        form.appendChild(submitButton)

        await user.click(submitButton)

        expect(handleSubmit).toHaveBeenCalledWith(onSubmit)
        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenCalledWith(formData)
    })
})

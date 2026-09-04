import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { EditUserForm } from './EditUserForm'
import type { UpdateUserFormValues } from '@/features/users/schemas'
import type { User } from '@/features/users/types'

const { mockHandleSubmit, mockUseEditUserForm } = vi.hoisted(() => {
    const handleSubmit = vi.fn(
        (onValid: (data: UpdateUserFormValues) => void) =>
            (event?: React.BaseSyntheticEvent) => {
                event?.preventDefault()

                onValid({} as UpdateUserFormValues)
            },
    )

    const useEditUserForm = vi.fn(() => ({ handleSubmit }))

    return {
        mockHandleSubmit: handleSubmit,
        mockUseEditUserForm: useEditUserForm,
    }
})

vi.mock('@/features/users/hooks', () => ({
    useEditUserForm: mockUseEditUserForm,
}))

vi.mock('@/features/users/components', () => ({
    AvatarField: () => <div data-testid="avatar-field">Avatar Field</div>,

    CommonUserFields: () => (
        <div data-testid="common-user-fields">Common User Fields</div>
    ),
}))

vi.mock('./EditPasswordFields/EditPasswordFields', () => ({
    EditPasswordFields: () => (
        <div data-testid="edit-password-fields">Edit Password Fields</div>
    ),
}))

vi.mock('./EditUserForm.module.scss', () => ({
    default: {
        form: 'form',
    },
}))

const user: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+14155552671',
    image: 'https://example.com/avatar.jpg',
    department: 'Engineering',
    company: 'Acme',
    country: 'United States',
    status: 'active',
}

describe('EditUserForm', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the form with the provided id', () => {
        const onSubmit = vi.fn()

        render(<EditUserForm formId="edit-user-form" onSubmit={onSubmit} />)

        const form = document.getElementById('edit-user-form')

        expect(form).toBeInTheDocument()
        expect(form).toHaveAttribute('id', 'edit-user-form')
    })

    it('renders CommonUserFields', () => {
        const onSubmit = vi.fn()

        render(<EditUserForm formId="edit-user-form" onSubmit={onSubmit} />)

        expect(screen.getByTestId('common-user-fields')).toBeInTheDocument()
    })

    it('renders EditPasswordFields', () => {
        const onSubmit = vi.fn()

        render(<EditUserForm formId="edit-user-form" onSubmit={onSubmit} />)

        expect(screen.getByTestId('edit-password-fields')).toBeInTheDocument()
    })

    it('renders AvatarField', () => {
        const onSubmit = vi.fn()

        render(<EditUserForm formId="edit-user-form" onSubmit={onSubmit} />)

        expect(screen.getByTestId('avatar-field')).toBeInTheDocument()
    })

    it('calls useEditUserForm once', () => {
        const onSubmit = vi.fn()

        render(<EditUserForm formId="edit-user-form" onSubmit={onSubmit} />)

        expect(mockUseEditUserForm).toHaveBeenCalledTimes(1)
    })

    it('passes the user to useEditUserForm', () => {
        const onSubmit = vi.fn()

        render(
            <EditUserForm
                formId="edit-user-form"
                user={user}
                onSubmit={onSubmit}
            />,
        )

        expect(mockUseEditUserForm).toHaveBeenCalledWith(user)
    })

    it('passes null to useEditUserForm when user is null', () => {
        const onSubmit = vi.fn()

        render(
            <EditUserForm
                formId="edit-user-form"
                user={null}
                onSubmit={onSubmit}
            />,
        )

        expect(mockUseEditUserForm).toHaveBeenCalledWith(null)
    })

    it('passes undefined to useEditUserForm when user is not provided', () => {
        const onSubmit = vi.fn()

        render(<EditUserForm formId="edit-user-form" onSubmit={onSubmit} />)

        expect(mockUseEditUserForm).toHaveBeenCalledWith(undefined)
    })

    it('passes onSubmit to methods.handleSubmit', () => {
        const onSubmit = vi.fn()

        render(<EditUserForm formId="edit-user-form" onSubmit={onSubmit} />)

        expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
        expect(mockHandleSubmit).toHaveBeenCalledWith(onSubmit)
    })

    it('submits the form through methods.handleSubmit', () => {
        const onSubmit = vi.fn()

        render(<EditUserForm formId="edit-user-form" onSubmit={onSubmit} />)

        const form = document.getElementById('edit-user-form')

        expect(form).toBeInTheDocument()

        fireEvent.submit(form!)

        expect(onSubmit).toHaveBeenCalledTimes(1)
    })
})

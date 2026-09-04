import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CreateUserModal } from './CreateUserModal'
import type { CreateUserFormValues } from '@/features/users/schemas'
import userEvent from '@testing-library/user-event'

const { mockModal, mockModalHeader, mockModalContent, mockModalFooter } =
    vi.hoisted(() => ({
        mockModal: vi.fn(),
        mockModalHeader: vi.fn(),
        mockModalContent: vi.fn(),
        mockModalFooter: vi.fn(),
    }))

vi.mock('@/shared/components', () => ({
    Modal: ({
        open,
        onClose,
        children,
    }: {
        open: boolean
        onClose: () => void
        children: React.ReactNode
    }) => {
        mockModal({ open, onClose })

        if (!open) {
            return null
        }

        return <div data-testid="modal">{children}</div>
    },

    ModalHeader: ({
        title,
        onClose,
    }: {
        title: string
        onClose: () => void
    }) => {
        mockModalHeader({ title, onClose })

        return (
            <div data-testid="modal-header">
                <span>{title}</span>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close modal"
                >
                    Close
                </button>
            </div>
        )
    },

    ModalContent: ({ children }: { children: React.ReactNode }) => {
        mockModalContent()

        return <div data-testid="modal-content">{children}</div>
    },

    ModalFooter: ({ children }: { children: React.ReactNode }) => {
        mockModalFooter()

        return <div data-testid="modal-footer">{children}</div>
    },

    Button: ({
        children,
        type,
        form,
        variant,
        onClick,
    }: {
        children: React.ReactNode
        type?: 'button' | 'submit'
        form?: string
        variant?: string
        size?: string
        className?: string
        onClick?: () => void
    }) => (
        <button
            type={type}
            form={form}
            data-variant={variant}
            onClick={onClick}
        >
            {children}
        </button>
    ),
}))

vi.mock('@/features/users/components', () => ({
    CreateUserForm: ({
        formId,
        onSubmit,
    }: {
        formId: string
        onSubmit: (data: CreateUserFormValues) => void
    }) => (
        <form
            id={formId}
            data-testid="create-user-form"
            onSubmit={(event) => {
                event.preventDefault()

                onSubmit({
                    firstName: 'Gabriel',
                    lastName: 'Veroneze',
                    email: 'gabriel@example.com',
                    phone: '+5511999999999',
                    company: 'Acme',
                    department: 'Engineering',
                    password: 'Password123!',
                    confirmPassword: 'Password123!',
                    avatar: undefined,
                })
            }}
        />
    ),
}))

describe('CreateUserModal', () => {
    it('renders the modal when open', () => {
        const onCreate = vi.fn()
        const onClose = vi.fn()

        render(
            <CreateUserModal
                open={true}
                onCreate={onCreate}
                onClose={onClose}
            />,
        )

        expect(screen.getByTestId('modal')).toBeInTheDocument()
    })

    it('does not render the modal content when closed', () => {
        const onCreate = vi.fn()
        const onClose = vi.fn()

        render(
            <CreateUserModal
                open={false}
                onCreate={onCreate}
                onClose={onClose}
            />,
        )

        expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
    })

    it('renders the modal header with the correct title', () => {
        const onCreate = vi.fn()
        const onClose = vi.fn()

        render(
            <CreateUserModal
                open={true}
                onCreate={onCreate}
                onClose={onClose}
            />,
        )

        expect(screen.getByText('Create user')).toBeInTheDocument()

        expect(mockModalHeader).toHaveBeenCalledWith({
            title: 'Create user',
            onClose,
        })
    })

    it('renders CreateUserForm with the correct form id and submit handler', () => {
        const onCreate = vi.fn()
        const onClose = vi.fn()

        render(
            <CreateUserModal
                open={true}
                onCreate={onCreate}
                onClose={onClose}
            />,
        )

        const form = screen.getByTestId('create-user-form')

        expect(form).toHaveAttribute('id', 'user-form')
    })

    it('renders the Save button as a submit button associated with the form', () => {
        const onCreate = vi.fn()
        const onClose = vi.fn()

        render(
            <CreateUserModal
                open={true}
                onCreate={onCreate}
                onClose={onClose}
            />,
        )

        const saveButton = screen.getByRole('button', {
            name: 'Save',
        })

        expect(saveButton).toHaveAttribute('type', 'submit')
        expect(saveButton).toHaveAttribute('form', 'user-form')
        expect(saveButton).toHaveAttribute('data-variant', 'primary')
    })

    it('submits the CreateUserForm when Save is clicked', async () => {
        const user = userEvent.setup()

        const onCreate = vi.fn()
        const onClose = vi.fn()

        const expectedData: CreateUserFormValues = {
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

        render(
            <CreateUserModal
                open={true}
                onCreate={onCreate}
                onClose={onClose}
            />,
        )

        await user.click(
            screen.getByRole('button', {
                name: 'Save',
            }),
        )

        expect(onCreate).toHaveBeenCalledTimes(1)
        expect(onCreate).toHaveBeenCalledWith(expectedData)
    })

    it('calls onClose when Cancel is clicked', async () => {
        const user = userEvent.setup()

        const onCreate = vi.fn()
        const onClose = vi.fn()

        render(
            <CreateUserModal
                open={true}
                onCreate={onCreate}
                onClose={onClose}
            />,
        )

        await user.click(
            screen.getByRole('button', {
                name: 'Cancel',
            }),
        )

        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('passes onClose to the modal and modal header', () => {
        const onCreate = vi.fn()
        const onClose = vi.fn()

        render(
            <CreateUserModal
                open={true}
                onCreate={onCreate}
                onClose={onClose}
            />,
        )

        expect(mockModal).toHaveBeenCalledWith({
            open: true,
            onClose,
        })

        expect(mockModalHeader).toHaveBeenCalledWith({
            title: 'Create user',
            onClose,
        })
    })
})

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EditUserModal } from './EditUserModal'
import type { UpdateUserFormValues } from '@/features/users/schemas'
import type { User } from '@/features/users/types'
import userEvent from '@testing-library/user-event'

const {
    mockModal,
    mockModalHeader,
    mockModalContent,
    mockModalFooter,
    mockButton,
    mockEditUserForm,
} = vi.hoisted(() => ({
    mockModal: vi.fn(),
    mockModalHeader: vi.fn(),
    mockModalContent: vi.fn(),
    mockModalFooter: vi.fn(),
    mockButton: vi.fn(),
    mockEditUserForm: vi.fn(),
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

        return (
            <div data-testid="modal">
                <button type="button" onClick={onClose}>
                    Close modal
                </button>
                {children}
            </div>
        )
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
            <header data-testid="modal-header">
                <h2>{title}</h2>
                <button type="button" onClick={onClose}>
                    Close header
                </button>
            </header>
        )
    },

    ModalContent: ({ children }: { children: React.ReactNode }) => {
        mockModalContent()

        return <div data-testid="modal-content">{children}</div>
    },

    ModalFooter: ({ children }: { children: React.ReactNode }) => {
        mockModalFooter()

        return <footer data-testid="modal-footer">{children}</footer>
    },

    Button: ({
        children,
        type,
        form,
        variant,
        size,
        iconPosition,
        icon,
        onClick,
    }: {
        children: React.ReactNode
        type?: 'button' | 'submit' | 'reset'
        form?: string
        variant?: string
        size?: string
        iconPosition?: string
        icon?: React.ReactNode
        onClick?: () => void
    }) => {
        mockButton({
            type,
            form,
            variant,
            size,
            iconPosition,
            icon,
            onClick,
        })

        return (
            <button
                type={type}
                form={form}
                data-variant={variant}
                data-size={size}
                data-icon-position={iconPosition}
                onClick={onClick}
            >
                {icon}
                {children}
            </button>
        )
    },
}))

vi.mock('@/shared/assets/icons', () => ({
    XSolidIcon: () => <span data-testid="delete-icon" />,
}))

vi.mock('@/features/users/components', () => ({
    EditUserForm: ({
        formId,
        user,
        onSubmit,
    }: {
        formId: string
        user?: User | null
        onSubmit: (data: UpdateUserFormValues) => void
    }) => {
        mockEditUserForm({ formId, user, onSubmit })

        const data: UpdateUserFormValues = {
            firstName: 'Gabriel',
            lastName: 'Veroneze',
            email: 'gabriel@example.com',
            phone: '+5511999999999',
            company: 'Acme',
            department: 'Engineering',
            currentPassword: '',
            newPassword: '',
            avatar: undefined,
        }

        return (
            <form
                id={formId}
                data-testid="edit-user-form"
                onSubmit={(event) => {
                    event.preventDefault()
                    onSubmit(data)
                }}
            >
                <input
                    aria-label="Edit user form"
                    defaultValue={user?.name ?? ''}
                />
            </form>
        )
    },
}))

const user: User = {
    id: 1,
    name: 'Gabriel Veroneze',
    email: 'gabriel@example.com',
    phone: '+5511999999999',
    image: 'avatar.jpg',
    department: 'Engineering',
    company: 'Acme',
    country: 'Brazil',
    status: 'active',
}

describe('EditUserModal', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the modal when open', () => {
        render(
            <EditUserModal
                open={true}
                user={user}
                onUpdate={vi.fn()}
                onClose={vi.fn()}
            />,
        )

        expect(screen.getByTestId('modal')).toBeInTheDocument()
    })

    it('does not render the modal content when closed', () => {
        render(
            <EditUserModal
                open={false}
                user={user}
                onUpdate={vi.fn()}
                onClose={vi.fn()}
            />,
        )

        expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
        expect(screen.queryByText('Edit user')).not.toBeInTheDocument()
        expect(
            screen.queryByRole('button', { name: 'Save' }),
        ).not.toBeInTheDocument()
    })

    it('renders the correct modal title', () => {
        render(
            <EditUserModal
                open={true}
                user={user}
                onUpdate={vi.fn()}
                onClose={vi.fn()}
            />,
        )

        expect(
            screen.getByRole('heading', { name: 'Edit user' }),
        ).toBeInTheDocument()
    })

    it('renders EditUserForm with the correct form id', () => {
        render(
            <EditUserModal
                open={true}
                user={user}
                onUpdate={vi.fn()}
                onClose={vi.fn()}
            />,
        )

        expect(screen.getByTestId('edit-user-form')).toHaveAttribute(
            'id',
            'user-form',
        )

        expect(mockEditUserForm).toHaveBeenCalledWith({
            formId: 'user-form',
            user,
            onSubmit: expect.any(Function),
        })
    })

    it('passes the user to EditUserForm', () => {
        render(
            <EditUserModal
                open={true}
                user={user}
                onUpdate={vi.fn()}
                onClose={vi.fn()}
            />,
        )

        expect(mockEditUserForm).toHaveBeenCalledWith(
            expect.objectContaining({
                user,
            }),
        )
    })

    it('passes null user to EditUserForm', () => {
        render(
            <EditUserModal
                open={true}
                user={null}
                onUpdate={vi.fn()}
                onClose={vi.fn()}
            />,
        )

        expect(mockEditUserForm).toHaveBeenCalledWith(
            expect.objectContaining({
                user: null,
            }),
        )
    })

    it('passes undefined user to EditUserForm', () => {
        render(
            <EditUserModal open={true} onUpdate={vi.fn()} onClose={vi.fn()} />,
        )

        expect(mockEditUserForm).toHaveBeenCalledWith(
            expect.objectContaining({
                user: undefined,
            }),
        )
    })

    it('renders the Save button as a submit button associated with the form', () => {
        render(
            <EditUserModal
                open={true}
                user={user}
                onUpdate={vi.fn()}
                onClose={vi.fn()}
            />,
        )

        const saveButton = screen.getByRole('button', {
            name: 'Save',
        })

        expect(saveButton).toHaveAttribute('type', 'submit')
        expect(saveButton).toHaveAttribute('form', 'user-form')
        expect(saveButton).toHaveAttribute('data-variant', 'primary')
        expect(saveButton).toHaveAttribute('data-size', 'lg')
    })

    it('submits the EditUserForm when Save is clicked', async () => {
        const userEventInstance = userEvent.setup()
        const onUpdate = vi.fn()

        render(
            <EditUserModal
                open={true}
                user={user}
                onUpdate={onUpdate}
                onClose={vi.fn()}
            />,
        )

        await userEventInstance.click(
            screen.getByRole('button', {
                name: 'Save',
            }),
        )

        expect(onUpdate).toHaveBeenCalledTimes(1)
        expect(onUpdate).toHaveBeenCalledWith({
            firstName: 'Gabriel',
            lastName: 'Veroneze',
            email: 'gabriel@example.com',
            phone: '+5511999999999',
            company: 'Acme',
            department: 'Engineering',
            currentPassword: '',
            newPassword: '',
            avatar: undefined,
        })
    })

    it('renders the Delete account button with the correct configuration', () => {
        render(
            <EditUserModal
                open={true}
                user={user}
                onUpdate={vi.fn()}
                onClose={vi.fn()}
            />,
        )

        const deleteButton = screen.getByRole('button', {
            name: 'Delete account',
        })

        expect(deleteButton).toHaveAttribute('data-variant', 'danger')
        expect(deleteButton).toHaveAttribute('data-size', 'lg')
        expect(deleteButton).toHaveAttribute('data-icon-position', 'left')

        expect(screen.getByTestId('delete-icon')).toBeInTheDocument()
    })

    it('calls onDelete when Delete account is clicked', async () => {
        const userEventInstance = userEvent.setup()
        const onDelete = vi.fn()

        render(
            <EditUserModal
                open={true}
                user={user}
                onUpdate={vi.fn()}
                onClose={vi.fn()}
                onDelete={onDelete}
            />,
        )

        await userEventInstance.click(
            screen.getByRole('button', {
                name: 'Delete account',
            }),
        )

        expect(onDelete).toHaveBeenCalledTimes(1)
    })

    it('does not throw when Delete account has no onDelete handler', async () => {
        const userEventInstance = userEvent.setup()

        render(
            <EditUserModal
                open={true}
                user={user}
                onUpdate={vi.fn()}
                onClose={vi.fn()}
            />,
        )

        await expect(
            userEventInstance.click(
                screen.getByRole('button', {
                    name: 'Delete account',
                }),
            ),
        ).resolves.not.toThrow()
    })

    it('calls onClose when the modal close action is triggered', async () => {
        const userEventInstance = userEvent.setup()
        const onClose = vi.fn()

        render(
            <EditUserModal
                open={true}
                user={user}
                onUpdate={vi.fn()}
                onClose={onClose}
            />,
        )

        await userEventInstance.click(
            screen.getByRole('button', {
                name: 'Close modal',
            }),
        )

        expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('passes onClose to ModalHeader', () => {
        const onClose = vi.fn()

        render(
            <EditUserModal
                open={true}
                user={user}
                onUpdate={vi.fn()}
                onClose={onClose}
            />,
        )

        expect(mockModalHeader).toHaveBeenCalledWith({
            title: 'Edit user',
            onClose,
        })
    })

    it('passes onClose to Modal', () => {
        const onClose = vi.fn()

        render(
            <EditUserModal
                open={true}
                user={user}
                onUpdate={vi.fn()}
                onClose={onClose}
            />,
        )

        expect(mockModal).toHaveBeenCalledWith({
            open: true,
            onClose,
        })
    })
})

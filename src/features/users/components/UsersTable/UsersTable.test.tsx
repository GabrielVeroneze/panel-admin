import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UsersTable } from './UsersTable'
import type { ReactNode } from 'react'
import type { UserListItem } from '@/features/users/types'
import userEvent from '@testing-library/user-event'

const { mockNavigate } = vi.hoisted(() => ({
    mockNavigate: vi.fn(),
}))

vi.mock('react-router', () => ({
    useNavigate: () => mockNavigate,
}))

vi.mock('@/shared/assets/icons', () => ({
    ExclamationCircleIcon: () => <span data-testid="exclamation-icon" />,

    PencilAltSolidIcon: () => <span data-testid="pencil-icon" />,
}))

vi.mock('@/shared/components', () => ({
    DataTableSkeleton: ({ className }: { className?: string }) => (
        <div data-testid="data-table-skeleton" className={className} />
    ),

    EmptyState: ({
        icon,
        title,
        description,
    }: {
        icon: ReactNode
        title: string
        description: string
    }) => (
        <div data-testid="empty-state">
            <div data-testid="empty-state-icon">{icon}</div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    ),

    Table: ({
        children,
        className,
        borderedRows,
    }: {
        children: ReactNode
        className?: string
        borderedRows?: boolean
    }) => (
        <table
            data-testid="table"
            className={className}
            data-bordered-rows={borderedRows}
        >
            {children}
        </table>
    ),

    TableHead: ({ children }: { children: ReactNode }) => (
        <thead>{children}</thead>
    ),

    TableBody: ({ children }: { children: ReactNode }) => (
        <tbody>{children}</tbody>
    ),

    TableRow: ({ children, size }: { children: ReactNode; size?: string }) => (
        <tr data-size={size}>{children}</tr>
    ),

    TableCell: ({
        children,
        className,
        size,
        header,
    }: {
        children: ReactNode
        className?: string
        size?: string
        header?: boolean
    }) => {
        if (header) {
            return (
                <th className={className} data-size={size}>
                    {children}
                </th>
            )
        }

        return (
            <td className={className} data-size={size}>
                {children}
            </td>
        )
    },

    Checkbox: ({
        checked,
        onChange,
    }: {
        checked: boolean
        onChange: () => void
    }) => <input type="checkbox" checked={checked} onChange={onChange} />,

    UserInfo: ({
        variant,
        avatarUrl,
        name,
        email,
        onClick,
    }: {
        variant?: string
        avatarUrl: string
        name: string
        email: string
        onClick?: () => void
    }) => (
        <button
            type="button"
            data-testid="user-info"
            data-variant={variant}
            data-avatar-url={avatarUrl}
            onClick={onClick}
        >
            <span>{name}</span>
            <span>{email}</span>
        </button>
    ),

    StatusBadge: ({ status }: { status: UserListItem['status'] }) => (
        <span data-testid="status-badge">{status}</span>
    ),

    Button: ({
        children,
        size,
        variant,
        iconPosition,
        icon,
        onClick,
    }: {
        children: ReactNode
        size?: string
        variant?: string
        iconPosition?: string
        icon?: ReactNode
        onClick?: () => void
    }) => (
        <button
            type="button"
            data-testid="edit-button"
            data-size={size}
            data-variant={variant}
            data-icon-position={iconPosition}
            onClick={onClick}
        >
            {icon}
            {children}
        </button>
    ),
}))

const users: UserListItem[] = [
    {
        id: 1,
        name: 'Gabriel Veroneze',
        email: 'gabriel@example.com',
        image: 'gabriel.jpg',
        position: 'Frontend Developer',
        country: 'Brazil',
        status: 'active',
    },
    {
        id: 2,
        name: 'John Doe',
        email: 'john@example.com',
        image: 'john.jpg',
        position: 'Backend Developer',
        country: 'United States',
        status: 'offline',
    },
]

describe('UsersTable', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the loading state', () => {
        render(
            <UsersTable
                users={users}
                loading={true}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        expect(screen.getByTestId('data-table-skeleton')).toBeInTheDocument()

        expect(screen.queryByTestId('table')).not.toBeInTheDocument()

        expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument()
    })

    it('does not render the table when loading', () => {
        render(
            <UsersTable
                users={users}
                loading={true}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        expect(screen.queryByText('Gabriel Veroneze')).not.toBeInTheDocument()

        expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
    })

    it('renders the empty state when there are no users', () => {
        render(
            <UsersTable
                users={[]}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        expect(screen.getByTestId('empty-state')).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                name: 'No users',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByText('There are no users to display.'),
        ).toBeInTheDocument()

        expect(screen.getByTestId('exclamation-icon')).toBeInTheDocument()
    })

    it('does not render the table when there are no users', () => {
        render(
            <UsersTable
                users={[]}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        expect(screen.queryByTestId('table')).not.toBeInTheDocument()
    })

    it('renders the table when users are provided', () => {
        render(
            <UsersTable
                users={users}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        expect(screen.getByTestId('table')).toBeInTheDocument()

        expect(screen.getByText('Gabriel Veroneze')).toBeInTheDocument()

        expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('renders all table headers', () => {
        render(
            <UsersTable
                users={users}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        expect(
            screen.getByRole('columnheader', {
                name: 'Name',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('columnheader', {
                name: 'Position',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('columnheader', {
                name: 'Country',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('columnheader', {
                name: 'Status',
            }),
        ).toBeInTheDocument()
    })

    it('renders user information correctly', () => {
        render(
            <UsersTable
                users={users}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        expect(screen.getByText('Gabriel Veroneze')).toBeInTheDocument()

        expect(screen.getByText('gabriel@example.com')).toBeInTheDocument()

        expect(screen.getByText('Frontend Developer')).toBeInTheDocument()

        expect(screen.getByText('Brazil')).toBeInTheDocument()

        expect(screen.getByText('John Doe')).toBeInTheDocument()

        expect(screen.getByText('john@example.com')).toBeInTheDocument()

        expect(screen.getByText('Backend Developer')).toBeInTheDocument()

        expect(screen.getByText('United States')).toBeInTheDocument()
    })

    it('passes the correct data to UserInfo', () => {
        render(
            <UsersTable
                users={users}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        const userInfos = screen.getAllByTestId('user-info')

        expect(userInfos).toHaveLength(2)

        expect(userInfos[0]).toHaveAttribute('data-variant', 'md')

        expect(userInfos[0]).toHaveAttribute('data-avatar-url', 'gabriel.jpg')

        expect(userInfos[1]).toHaveAttribute('data-variant', 'md')

        expect(userInfos[1]).toHaveAttribute('data-avatar-url', 'john.jpg')
    })

    it('renders the correct status for each user', () => {
        render(
            <UsersTable
                users={users}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn()}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        const statusBadges = screen.getAllByTestId('status-badge')

        expect(statusBadges).toHaveLength(2)

        expect(statusBadges[0]).toHaveTextContent('active')
        expect(statusBadges[1]).toHaveTextContent('offline')
    })

    it('uses isSelected to determine each user checkbox state', () => {
        const isSelected = vi.fn((id: number) => id === 1)

        render(
            <UsersTable
                users={users}
                loading={false}
                onEdit={vi.fn()}
                isSelected={isSelected}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        const checkboxes = screen.getAllByRole('checkbox')

        expect(checkboxes).toHaveLength(3)

        expect(checkboxes[0]).not.toBeChecked()
        expect(checkboxes[1]).toBeChecked()
        expect(checkboxes[2]).not.toBeChecked()

        expect(isSelected).toHaveBeenCalledWith(1)
        expect(isSelected).toHaveBeenCalledWith(2)
    })

    it('uses allSelected for the header checkbox', () => {
        render(
            <UsersTable
                users={users}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn().mockReturnValue(false)}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={true}
            />,
        )

        const checkboxes = screen.getAllByRole('checkbox')

        expect(checkboxes[0]).toBeChecked()
        expect(checkboxes[1]).not.toBeChecked()
        expect(checkboxes[2]).not.toBeChecked()
    })

    it('calls onToggleSelectAll when the header checkbox is changed', async () => {
        const user = userEvent.setup()
        const onToggleSelectAll = vi.fn()

        render(
            <UsersTable
                users={users}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn().mockReturnValue(false)}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={onToggleSelectAll}
                allSelected={false}
            />,
        )

        const checkboxes = screen.getAllByRole('checkbox')

        await user.click(checkboxes[0])

        expect(onToggleSelectAll).toHaveBeenCalledTimes(1)
    })

    it('calls onToggleSelect with the correct user id', async () => {
        const user = userEvent.setup()
        const onToggleSelect = vi.fn()

        render(
            <UsersTable
                users={users}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn().mockReturnValue(false)}
                onToggleSelect={onToggleSelect}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        const checkboxes = screen.getAllByRole('checkbox')

        await user.click(checkboxes[1])

        expect(onToggleSelect).toHaveBeenCalledTimes(1)
        expect(onToggleSelect).toHaveBeenCalledWith(1)

        await user.click(checkboxes[2])

        expect(onToggleSelect).toHaveBeenCalledTimes(2)
        expect(onToggleSelect).toHaveBeenLastCalledWith(2)
    })

    it('renders an edit button for each user', () => {
        render(
            <UsersTable
                users={users}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn().mockReturnValue(false)}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        const editButtons = screen.getAllByRole('button', {
            name: 'Edit Item',
        })

        expect(editButtons).toHaveLength(2)
    })

    it('renders the edit button with the correct configuration', () => {
        render(
            <UsersTable
                users={users}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn().mockReturnValue(false)}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        const editButtons = screen.getAllByRole('button', {
            name: 'Edit Item',
        })

        expect(editButtons[0]).toHaveAttribute('data-size', 'md')

        expect(editButtons[0]).toHaveAttribute('data-variant', 'primary')

        expect(editButtons[0]).toHaveAttribute('data-icon-position', 'left')

        expect(screen.getAllByTestId('pencil-icon')).toHaveLength(2)
    })

    it('calls onEdit with the correct user id', async () => {
        const user = userEvent.setup()
        const onEdit = vi.fn()

        render(
            <UsersTable
                users={users}
                loading={false}
                onEdit={onEdit}
                isSelected={vi.fn().mockReturnValue(false)}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        const editButtons = screen.getAllByRole('button', {
            name: 'Edit Item',
        })

        await user.click(editButtons[0])

        expect(onEdit).toHaveBeenCalledTimes(1)
        expect(onEdit).toHaveBeenCalledWith(1)

        await user.click(editButtons[1])

        expect(onEdit).toHaveBeenCalledTimes(2)
        expect(onEdit).toHaveBeenLastCalledWith(2)
    })

    it('navigates to the user details when UserInfo is clicked', async () => {
        const user = userEvent.setup()

        render(
            <UsersTable
                users={users}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn().mockReturnValue(false)}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        const userInfos = screen.getAllByTestId('user-info')

        await user.click(userInfos[0])

        expect(mockNavigate).toHaveBeenCalledTimes(1)
        expect(mockNavigate).toHaveBeenCalledWith('/users/1')

        await user.click(userInfos[1])

        expect(mockNavigate).toHaveBeenCalledTimes(2)
        expect(mockNavigate).toHaveBeenLastCalledWith('/users/2')
    })

    it('does not navigate before a UserInfo interaction', () => {
        render(
            <UsersTable
                users={users}
                loading={false}
                onEdit={vi.fn()}
                isSelected={vi.fn().mockReturnValue(false)}
                onToggleSelect={vi.fn()}
                onToggleSelectAll={vi.fn()}
                allSelected={false}
            />,
        )

        expect(mockNavigate).not.toHaveBeenCalled()
    })
})

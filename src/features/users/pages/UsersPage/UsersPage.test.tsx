import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { UsersPage } from './UsersPage'
import type { ReactNode } from 'react'
import type { User, UserListItem } from '@/features/users/types'
import userEvent from '@testing-library/user-event'

const {
    mockDispatch,
    mockUseUsersPage,
    mockUseDataSelection,
    mockDeleteUsers,
} = vi.hoisted(() => ({
    mockDispatch: vi.fn(),
    mockUseUsersPage: vi.fn(),
    mockUseDataSelection: vi.fn(),
    mockDeleteUsers: vi.fn(),
}))

vi.mock('@/store', () => ({
    useAppDispatch: () => mockDispatch,
}))

vi.mock('@/shared/hooks', () => ({
    useDataSelection: (...args: unknown[]) => mockUseDataSelection(...args),
}))

vi.mock('@/features/users/hooks', () => ({
    useUsersPage: () => mockUseUsersPage(),
}))

vi.mock('@/features/users/store', () => ({
    deleteUsers: (...args: unknown[]) => mockDeleteUsers(...args),
}))

vi.mock('@/shared/components', () => ({
    DataTableToolbar: ({
        search,
        searchPlaceholder,
        createLabel,
        hasSelection,
        onSearchChange,
        onCreate,
        onDelete,
    }: {
        search: string
        searchPlaceholder: string
        createLabel: string
        hasSelection: boolean
        onSearchChange: (value: string) => void
        onCreate: () => void
        onDelete: () => void
    }) => (
        <div data-testid="data-table-toolbar">
            <input
                aria-label="Search users"
                placeholder={searchPlaceholder}
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
            />
            <button type="button" onClick={onCreate}>
                {createLabel}
            </button>
            <button type="button" onClick={onDelete} disabled={!hasSelection}>
                Delete selected
            </button>
            <span data-testid="toolbar-has-selection">
                {String(hasSelection)}
            </span>
        </div>
    ),

    DataTableFooter: ({
        label,
        page,
        pageSize,
        total,
        onPageChange,
        info,
    }: {
        label: string
        page: number
        pageSize: number
        total: number
        onPageChange: (page: number) => void
        info?: ReactNode
    }) => (
        <div data-testid="data-table-footer">
            <span data-testid="footer-label">{label}</span>
            <span data-testid="footer-page">{page}</span>
            <span data-testid="footer-page-size">{pageSize}</span>
            <span data-testid="footer-total">{total}</span>
            <button type="button" onClick={() => onPageChange(2)}>
                Next page
            </button>
            <div data-testid="footer-info">{info}</div>
        </div>
    ),
}))

vi.mock('@/features/users/components', () => ({
    CreateUserModal: ({
        open,
        onCreate,
        onClose,
    }: {
        open: boolean
        onCreate: (data: unknown) => void
        onClose: () => void
    }) => (
        <div data-testid="create-user-modal" data-open={open}>
            <button
                type="button"
                onClick={() =>
                    onCreate({
                        firstName: 'Gabriel',
                    })
                }
            >
                Submit create
            </button>
            <button type="button" onClick={onClose}>
                Close create
            </button>
        </div>
    ),

    EditUserModal: ({
        open,
        user,
        onUpdate,
        onDelete,
        onClose,
    }: {
        open: boolean
        user?: User | null
        onUpdate: (data: unknown) => void
        onDelete?: () => void
        onClose: () => void
    }) => (
        <div data-testid="edit-user-modal" data-open={open}>
            <span data-testid="editing-user">{user?.name}</span>
            <button
                type="button"
                onClick={() =>
                    onUpdate({
                        firstName: 'Updated',
                    })
                }
            >
                Submit update
            </button>
            <button type="button" onClick={onDelete}>
                Delete account
            </button>
            <button type="button" onClick={onClose}>
                Close edit
            </button>
        </div>
    ),

    UsersFooterInfo: () => (
        <span data-testid="users-footer-info">Footer info</span>
    ),

    UsersTable: ({
        users,
        loading,
        onEdit,
        isSelected,
        onToggleSelect,
        onToggleSelectAll,
        allSelected,
    }: {
        users: UserListItem[]
        loading: boolean
        onEdit: (userId: number) => void
        isSelected: (id: number) => boolean
        onToggleSelect: (id: number) => void
        onToggleSelectAll: () => void
        allSelected: boolean
    }) => (
        <div data-testid="users-table">
            <span data-testid="table-users-count">{users.length}</span>
            <span data-testid="table-loading">{String(loading)}</span>
            <span data-testid="table-all-selected">{String(allSelected)}</span>
            <span data-testid="table-user-selected">
                {String(isSelected(1))}
            </span>
            <button type="button" onClick={() => onEdit(1)}>
                Edit user 1
            </button>
            <button type="button" onClick={() => onToggleSelect(1)}>
                Toggle user 1
            </button>
            <button type="button" onClick={onToggleSelectAll}>
                Toggle all users
            </button>
        </div>
    ),
}))

const user: User = {
    id: 1,
    name: 'Gabriel Veroneze',
    email: 'gabriel@example.com',
    phone: '+5511999999999',
    image: 'gabriel.jpg',
    department: 'Engineering',
    company: 'Acme',
    country: 'Brazil',
    status: 'active',
}

const usersList: UserListItem[] = [
    {
        id: 1,
        name: 'Gabriel Veroneze',
        email: 'gabriel@example.com',
        image: 'gabriel.jpg',
        position: 'Engineering',
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

const createUsersPageResult = () => {
    const result = {
        filters: {
            page: 1,
            search: '',
            setPage: vi.fn(),
            handleSearchChange: vi.fn(),
        },
        pageSize: 15,
        usersList: [] as UserListItem[],
        total: 0,
        loading: false,
        modal: {
            isCreateOpen: false,
            isEditOpen: false,
            editingItem: null as User | null,
            openCreate: vi.fn(),
            openEdit: vi.fn(),
            close: vi.fn(),
        },
        handleEdit: vi.fn(),
        handleCreateSubmit: vi.fn(),
        handleUpdateSubmit: vi.fn(),
        handleDeleteUser: vi.fn(),
    }

    return result
}

const createDataSelectionResult = () => {
    const result = {
        selectedIds: [],
        isSelected: vi.fn().mockReturnValue(false),
        toggleSelect: vi.fn(),
        toggleSelectAll: vi.fn(),
        handleDelete: vi.fn(),
        allSelected: false,
        hasSelection: false,
    }

    mockUseDataSelection.mockReturnValue(result)

    return result
}

describe('UsersPage', () => {
    beforeEach(() => {
        vi.clearAllMocks()

        mockDispatch.mockReturnValue(vi.fn())

        mockDeleteUsers.mockReturnValue({
            type: 'users/deleteUsers',
        })

        mockUseUsersPage.mockReturnValue(createUsersPageResult())

        createDataSelectionResult()
    })

    it('renders the page', () => {
        render(<UsersPage />)

        expect(screen.getByTestId('data-table-toolbar')).toBeInTheDocument()

        expect(screen.getByTestId('users-table')).toBeInTheDocument()

        expect(screen.getByTestId('data-table-footer')).toBeInTheDocument()
    })

    it('passes the correct search configuration to DataTableToolbar', () => {
        const pageResult = createUsersPageResult()

        pageResult.filters.search = 'gabriel'

        mockUseUsersPage.mockReturnValue(pageResult)

        render(<UsersPage />)

        const searchInput = screen.getByRole('textbox', {
            name: 'Search users',
        })

        expect(searchInput).toHaveValue('gabriel')
        expect(searchInput).toHaveAttribute('placeholder', 'Search for users')
    })

    it('passes hasSelection to DataTableToolbar', () => {
        const selection = createDataSelectionResult()

        selection.hasSelection = true

        render(<UsersPage />)

        expect(screen.getByTestId('toolbar-has-selection')).toHaveTextContent(
            'true',
        )
    })

    it('passes users and loading state to UsersTable', () => {
        const page = createUsersPageResult()

        page.handleEdit.mockReset()

        mockUseUsersPage.mockReturnValue({
            ...page,
            usersList,
            loading: true,
        })

        render(<UsersPage />)

        expect(screen.getByTestId('table-users-count')).toHaveTextContent('2')

        expect(screen.getByTestId('table-loading')).toHaveTextContent('true')
    })

    it('passes selection handlers to UsersTable', async () => {
        const userEventInstance = userEvent.setup()
        const selection = createDataSelectionResult()

        render(<UsersPage />)

        await userEventInstance.click(
            screen.getByRole('button', {
                name: 'Toggle user 1',
            }),
        )

        expect(selection.toggleSelect).toHaveBeenCalledTimes(1)

        expect(selection.toggleSelect).toHaveBeenCalledWith(1)

        await userEventInstance.click(
            screen.getByRole('button', {
                name: 'Toggle all users',
            }),
        )

        expect(selection.toggleSelectAll).toHaveBeenCalledTimes(1)
    })

    it('passes isSelected to UsersTable', () => {
        const selection = createDataSelectionResult()

        selection.isSelected.mockReturnValue(true)

        render(<UsersPage />)

        expect(screen.getByTestId('table-user-selected')).toHaveTextContent(
            'true',
        )

        expect(selection.isSelected).toHaveBeenCalledWith(1)
    })

    it('passes allSelected to UsersTable', () => {
        const selection = createDataSelectionResult()

        selection.allSelected = true

        render(<UsersPage />)

        expect(screen.getByTestId('table-all-selected')).toHaveTextContent(
            'true',
        )
    })

    it('passes handleEdit to UsersTable', async () => {
        const userEventInstance = userEvent.setup()
        const pageResult = createUsersPageResult()

        mockUseUsersPage.mockReturnValue(pageResult)

        render(<UsersPage />)

        await userEventInstance.click(
            screen.getByRole('button', {
                name: 'Edit user 1',
            }),
        )

        expect(pageResult.handleEdit).toHaveBeenCalledTimes(1)
        expect(pageResult.handleEdit).toHaveBeenCalledWith(1)
    })

    it('passes the correct pagination props to DataTableFooter', () => {
        const pageResult = createUsersPageResult()

        pageResult.filters.page = 3
        pageResult.total = 42
        pageResult.usersList = usersList

        mockUseUsersPage.mockReturnValue(pageResult)

        render(<UsersPage />)

        expect(screen.getByTestId('footer-label')).toHaveTextContent('users')
        expect(screen.getByTestId('footer-page')).toHaveTextContent('3')
        expect(screen.getByTestId('footer-page-size')).toHaveTextContent('15')
        expect(screen.getByTestId('footer-total')).toHaveTextContent('42')
    })

    it('passes setPage to DataTableFooter', async () => {
        const userEventInstance = userEvent.setup()
        const pageResult = createUsersPageResult()

        mockUseUsersPage.mockReturnValue(pageResult)

        render(<UsersPage />)

        await userEventInstance.click(
            screen.getByRole('button', {
                name: 'Next page',
            }),
        )

        expect(pageResult.filters.setPage).toHaveBeenCalledTimes(1)
        expect(pageResult.filters.setPage).toHaveBeenCalledWith(2)
    })

    it('passes filter search changes to DataTableToolbar', () => {
        const pageResult = createUsersPageResult()

        mockUseUsersPage.mockReturnValue(pageResult)

        render(<UsersPage />)

        const input = screen.getByRole('textbox', {
            name: 'Search users',
        })

        fireEvent.change(input, {
            target: {
                value: 'gabriel',
            },
        })

        expect(pageResult.filters.handleSearchChange).toHaveBeenCalledTimes(1)

        expect(pageResult.filters.handleSearchChange).toHaveBeenCalledWith(
            'gabriel',
        )
    })

    it('calls modal.openCreate when Add User is clicked', async () => {
        const userEventInstance = userEvent.setup()
        const pageResult = createUsersPageResult()

        mockUseUsersPage.mockReturnValue(pageResult)

        render(<UsersPage />)

        await userEventInstance.click(
            screen.getByRole('button', {
                name: 'Add User',
            }),
        )

        expect(pageResult.modal.openCreate).toHaveBeenCalledTimes(1)
    })

    it('renders CreateUserModal when isCreateOpen is true', () => {
        const pageResult = createUsersPageResult()

        pageResult.modal.isCreateOpen = true

        mockUseUsersPage.mockReturnValue(pageResult)

        render(<UsersPage />)

        expect(screen.getByTestId('create-user-modal')).toBeInTheDocument()

        expect(screen.getByTestId('create-user-modal')).toHaveAttribute(
            'data-open',
            'true',
        )
    })

    it('does not render CreateUserModal when isCreateOpen is false', () => {
        render(<UsersPage />)

        expect(
            screen.queryByTestId('create-user-modal'),
        ).not.toBeInTheDocument()
    })

    it('passes create handlers to CreateUserModal', async () => {
        const userEventInstance = userEvent.setup()
        const pageResult = createUsersPageResult()

        pageResult.modal.isCreateOpen = true

        mockUseUsersPage.mockReturnValue(pageResult)

        render(<UsersPage />)

        await userEventInstance.click(
            screen.getByRole('button', {
                name: 'Submit create',
            }),
        )

        expect(pageResult.handleCreateSubmit).toHaveBeenCalledTimes(1)
        expect(pageResult.handleCreateSubmit).toHaveBeenCalledWith({
            firstName: 'Gabriel',
        })

        await userEventInstance.click(
            screen.getByRole('button', {
                name: 'Close create',
            }),
        )

        expect(pageResult.modal.close).toHaveBeenCalledTimes(1)
    })

    it('renders EditUserModal when an editing item exists', () => {
        const pageResult = createUsersPageResult()

        pageResult.modal.isEditOpen = true
        pageResult.modal.editingItem = user

        mockUseUsersPage.mockReturnValue(pageResult)

        render(<UsersPage />)

        expect(screen.getByTestId('edit-user-modal')).toBeInTheDocument()

        expect(screen.getByTestId('editing-user')).toHaveTextContent(
            'Gabriel Veroneze',
        )
    })

    it('does not render EditUserModal when isEditOpen is false', () => {
        const { modal } = createUsersPageResult()

        modal.editingItem = user

        render(<UsersPage />)

        expect(screen.queryByTestId('edit-user-modal')).not.toBeInTheDocument()
    })

    it('does not render EditUserModal when there is no editing item', () => {
        const { modal } = createUsersPageResult()

        modal.isEditOpen = true
        modal.editingItem = null

        render(<UsersPage />)

        expect(screen.queryByTestId('edit-user-modal')).not.toBeInTheDocument()
    })

    it('passes update handlers to EditUserModal', async () => {
        const userEventInstance = userEvent.setup()
        const pageResult = createUsersPageResult()

        pageResult.modal.isEditOpen = true
        pageResult.modal.editingItem = user

        mockUseUsersPage.mockReturnValue(pageResult)

        render(<UsersPage />)

        await userEventInstance.click(
            screen.getByRole('button', {
                name: 'Submit update',
            }),
        )

        expect(pageResult.handleUpdateSubmit).toHaveBeenCalledTimes(1)
        expect(pageResult.handleUpdateSubmit).toHaveBeenCalledWith({
            firstName: 'Updated',
        })

        await userEventInstance.click(
            screen.getByRole('button', {
                name: 'Delete account',
            }),
        )

        expect(pageResult.handleDeleteUser).toHaveBeenCalledTimes(1)

        await userEventInstance.click(
            screen.getByRole('button', {
                name: 'Close edit',
            }),
        )

        expect(pageResult.modal.close).toHaveBeenCalledTimes(1)
    })

    it('passes handleDeleteUser to EditUserModal', async () => {
        const userEventInstance = userEvent.setup()
        const pageResult = createUsersPageResult()

        pageResult.modal.isEditOpen = true
        pageResult.modal.editingItem = user

        mockUseUsersPage.mockReturnValue(pageResult)

        render(<UsersPage />)

        await userEventInstance.click(
            screen.getByRole('button', {
                name: 'Delete account',
            }),
        )

        expect(pageResult.handleDeleteUser).toHaveBeenCalledTimes(1)
    })

    it('passes the correct selection configuration to useDataSelection', () => {
        const pageResult = createUsersPageResult()

        pageResult.usersList = usersList

        mockUseUsersPage.mockReturnValue(pageResult)

        render(<UsersPage />)

        const config = mockUseDataSelection.mock.calls[0][0]

        expect(config.items).toBe(usersList)

        expect(config.getId(usersList[0])).toBe(1)

        expect(config.getId(usersList[1])).toBe(2)

        expect(config.onDelete).toBeTypeOf('function')
    })

    it('dispatches deleteUsers with the selected ids', () => {
        const deleteAction = {
            type: 'users/deleteUsers',
            payload: {
                ids: [1, 2],
            },
        }

        mockDeleteUsers.mockReturnValue(deleteAction)

        render(<UsersPage />)

        const config = mockUseDataSelection.mock.calls[0][0]

        config.onDelete([1, 2])

        expect(mockDeleteUsers).toHaveBeenCalledTimes(1)

        expect(mockDeleteUsers).toHaveBeenCalledWith({
            ids: [1, 2],
        })

        expect(mockDispatch).toHaveBeenCalledTimes(1)

        expect(mockDispatch).toHaveBeenCalledWith(deleteAction)
    })

    it('passes handleDelete to DataTableToolbar', async () => {
        const userEventInstance = userEvent.setup()
        const selection = createDataSelectionResult()

        selection.hasSelection = true

        render(<UsersPage />)

        await userEventInstance.click(
            screen.getByRole('button', {
                name: 'Delete selected',
            }),
        )

        expect(selection.handleDelete).toHaveBeenCalledTimes(1)
    })

    it('passes hasSelection correctly to DataTableToolbar', () => {
        const selection = createDataSelectionResult()

        selection.hasSelection = false

        render(<UsersPage />)

        expect(screen.getByTestId('toolbar-has-selection')).toHaveTextContent(
            'false',
        )
    })
})

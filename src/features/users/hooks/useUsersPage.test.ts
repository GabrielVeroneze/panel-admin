import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useAppDispatch } from '@/store'
import { useFormModal, usePaginationFilters } from '@/shared/hooks'
import { mapFormToCreatePayload, mapFormToUpdatePayload } from '../mappers'
import { useUsers } from '../hooks'
import { useUsersPage } from './useUsersPage'
import type { CreateUserFormValues, UpdateUserFormValues } from '../schemas'
import type { User } from '../types'

const { mockDispatch, mockCreateUser, mockUpdateUser, mockDeleteUser } =
    vi.hoisted(() => ({
        mockDispatch: vi.fn(),
        mockCreateUser: vi.fn(),
        mockUpdateUser: vi.fn(),
        mockDeleteUser: vi.fn(),
    }))

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
}))

vi.mock('@/shared/hooks', () => ({
    useFormModal: vi.fn(),
    usePaginationFilters: vi.fn(),
}))

vi.mock('../hooks', () => ({
    useUsers: vi.fn(),
}))

vi.mock('../mappers', () => ({
    mapFormToCreatePayload: vi.fn(),
    mapFormToUpdatePayload: vi.fn(),
}))

vi.mock('../store', () => ({
    createUser: mockCreateUser,
    updateUser: mockUpdateUser,
    deleteUser: mockDeleteUser,
}))

const user: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+5511987654321',
    image: 'avatar.jpg',
    department: 'Engineering',
    company: 'Acme',
    country: 'Brazil',
    status: 'active',
}

const createFormValues: CreateUserFormValues = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+5511987654321',
    company: 'Acme',
    department: 'Engineering',
    password: 'Password1!',
    confirmPassword: 'Password1!',
    avatar: undefined,
}

const updateFormValues: UpdateUserFormValues = {
    firstName: 'John',
    lastName: 'Updated',
    email: 'john.updated@example.com',
    phone: '+5511987654321',
    company: 'Acme',
    department: 'Engineering',
    currentPassword: '',
    newPassword: '',
    avatar: undefined,
}

const createModal = (editingItem: User | null = null) => ({
    modal: editingItem
        ? {
              type: 'edit' as const,
              item: editingItem,
          }
        : null,
    isCreateOpen: false,
    isEditOpen: Boolean(editingItem),
    editingItem,
    openCreate: vi.fn(),
    openEdit: vi.fn(),
    close: vi.fn(),
})

const filters = {
    page: 1,
    search: '',
    setPage: vi.fn(),
    handleSearchChange: vi.fn(),
}

describe('useUsersPage', () => {
    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useAppDispatch).mockReturnValue(mockDispatch)

        vi.mocked(usePaginationFilters).mockReturnValue(filters)

        vi.mocked(useUsers).mockReturnValue({
            users: [user],
            usersList: [],
            total: 1,
            page: 1,
            pageSize: 15,
            loading: false,
        })

        mockCreateUser.mockImplementation((params) => ({
            type: 'users/createUser',
            payload: params,
        }))

        mockUpdateUser.mockImplementation((params) => ({
            type: 'users/updateUser',
            payload: params,
        }))

        mockDeleteUser.mockImplementation((params) => ({
            type: 'users/deleteUser',
            payload: params,
        }))
    })

    it('returns filters', () => {
        const modal = createModal()

        vi.mocked(useFormModal).mockReturnValue(modal)

        const { result } = renderHook(() => useUsersPage())

        expect(result.current.filters).toBe(filters)
    })

    it('returns the fixed page size', () => {
        const modal = createModal()

        vi.mocked(useFormModal).mockReturnValue(modal)

        const { result } = renderHook(() => useUsersPage())

        expect(result.current.pageSize).toBe(15)
    })

    it('returns users list, total and loading state', () => {
        const modal = createModal()

        vi.mocked(useFormModal).mockReturnValue(modal)

        const { result } = renderHook(() => useUsersPage())

        expect(result.current.usersList).toEqual([])
        expect(result.current.total).toBe(1)
        expect(result.current.loading).toBe(false)
    })

    it('returns modal state and actions', () => {
        const modal = createModal()

        vi.mocked(useFormModal).mockReturnValue(modal)

        const { result } = renderHook(() => useUsersPage())

        expect(result.current.modal).toBe(modal)
    })

    it('opens the edit modal with the user matching the provided id', () => {
        const modal = createModal()

        vi.mocked(useFormModal).mockReturnValue(modal)

        const { result } = renderHook(() => useUsersPage())

        act(() => {
            result.current.handleEdit(user.id)
        })

        expect(modal.openEdit).toHaveBeenCalledTimes(1)
        expect(modal.openEdit).toHaveBeenCalledWith(user)
    })

    it('does not open the edit modal when the user does not exist', () => {
        const modal = createModal()

        vi.mocked(useFormModal).mockReturnValue(modal)

        const { result } = renderHook(() => useUsersPage())

        act(() => {
            result.current.handleEdit(999)
        })

        expect(modal.openEdit).not.toHaveBeenCalled()
    })

    it('maps and dispatches create user data and closes the modal', async () => {
        const modal = createModal()

        const payload = {
            name: 'John Doe',
            email: 'john@example.com',
            phone: '+5511987654321',
            company: 'Acme',
            department: 'Engineering',
            password: 'Password1!',
            avatar: undefined,
        }

        const createAction = {
            type: 'users/createUser',
            payload: {
                payload,
            },
        }

        mockCreateUser.mockReturnValue(createAction)

        vi.mocked(useFormModal).mockReturnValue(modal)
        vi.mocked(mapFormToCreatePayload).mockReturnValue(payload)

        const { result } = renderHook(() => useUsersPage())

        await act(async () => {
            await result.current.handleCreateSubmit(createFormValues)
        })

        expect(mapFormToCreatePayload).toHaveBeenCalledTimes(1)
        expect(mapFormToCreatePayload).toHaveBeenCalledWith(createFormValues)

        expect(mockCreateUser).toHaveBeenCalledTimes(1)
        expect(mockCreateUser).toHaveBeenCalledWith({
            payload,
        })

        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledWith(createAction)

        expect(modal.close).toHaveBeenCalledTimes(1)
    })

    it('maps and dispatches update user data and closes the modal', async () => {
        const modal = createModal(user)

        const payload = {
            name: 'John Updated',
            email: 'john.updated@example.com',
            phone: '+5511987654321',
            company: 'Acme',
            department: 'Engineering',
        }

        const updateAction = {
            type: 'users/updateUser',
            payload: {
                id: user.id,
                payload,
            },
        }

        mockUpdateUser.mockReturnValue(updateAction)

        vi.mocked(useFormModal).mockReturnValue(modal)
        vi.mocked(mapFormToUpdatePayload).mockReturnValue(payload)

        const { result } = renderHook(() => useUsersPage())

        await act(async () => {
            await result.current.handleUpdateSubmit(updateFormValues)
        })

        expect(mapFormToUpdatePayload).toHaveBeenCalledTimes(1)
        expect(mapFormToUpdatePayload).toHaveBeenCalledWith(updateFormValues)

        expect(mockUpdateUser).toHaveBeenCalledTimes(1)
        expect(mockUpdateUser).toHaveBeenCalledWith({
            id: user.id,
            payload,
        })

        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledWith(updateAction)

        expect(modal.close).toHaveBeenCalledTimes(1)
    })

    it('does not update when there is no editing item', async () => {
        const modal = createModal(null)

        vi.mocked(useFormModal).mockReturnValue(modal)

        const { result } = renderHook(() => useUsersPage())

        await act(async () => {
            await result.current.handleUpdateSubmit(updateFormValues)
        })

        expect(mapFormToUpdatePayload).not.toHaveBeenCalled()
        expect(mockUpdateUser).not.toHaveBeenCalled()
        expect(mockDispatch).not.toHaveBeenCalled()
        expect(modal.close).not.toHaveBeenCalled()
    })

    it('dispatches delete user and closes the modal', async () => {
        const modal = createModal(user)

        const deleteAction = {
            type: 'users/deleteUser',
            payload: {
                id: user.id,
            },
        }

        mockDeleteUser.mockReturnValue(deleteAction)

        vi.mocked(useFormModal).mockReturnValue(modal)

        const { result } = renderHook(() => useUsersPage())

        await act(async () => {
            await result.current.handleDeleteUser()
        })

        expect(mockDeleteUser).toHaveBeenCalledTimes(1)
        expect(mockDeleteUser).toHaveBeenCalledWith({
            id: user.id,
        })

        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledWith(deleteAction)

        expect(modal.close).toHaveBeenCalledTimes(1)
    })

    it('does not delete when there is no editing item', async () => {
        const modal = createModal(null)

        vi.mocked(useFormModal).mockReturnValue(modal)

        const { result } = renderHook(() => useUsersPage())

        await act(async () => {
            await result.current.handleDeleteUser()
        })

        expect(mockDeleteUser).not.toHaveBeenCalled()
        expect(mockDispatch).not.toHaveBeenCalled()
        expect(modal.close).not.toHaveBeenCalled()
    })
})

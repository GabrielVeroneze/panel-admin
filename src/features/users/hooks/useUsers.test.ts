import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAppDispatch, useAppSelector } from '@/store'
import { fetchUsers, selectUsersList } from '../store'
import { useUsers } from './useUsers'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn(),
}))

vi.mock('../store', () => ({
    fetchUsers: vi.fn(),
    selectUsersList: vi.fn(),
}))

const mockDispatch = vi.fn()

const createUsersState = (overrides = {}) => ({
    data: null,
    loading: false,
    ...overrides,
})

const createUser = (overrides = {}) => ({
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+5511987654321',
    image: 'https://example.com/john.jpg',
    department: 'Engineering',
    company: 'Acme',
    country: 'Brazil',
    status: 'active' as const,
    ...overrides,
})

const mockSelectors = (
    state: ReturnType<typeof createUsersState>,
    usersList: unknown[] = [],
) => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
        if (selector === selectUsersList) {
            return usersList
        }

        return state
    })
}

const createFetchUsersAction = () => ({
    type: 'users/fetchUsers/mock',
})

describe('useUsers', () => {
    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useAppDispatch).mockReturnValue(mockDispatch)

        vi.mocked(fetchUsers).mockImplementation(
            () => createFetchUsersAction() as never,
        )
    })

    it('returns default values when users data is null', () => {
        const state = createUsersState()

        mockSelectors(state)

        const { result } = renderHook(() => useUsers(1, 10))

        expect(result.current).toEqual({
            users: [],
            usersList: [],
            total: 0,
            page: 1,
            pageSize: 10,
            loading: false,
        })
    })

    it('returns users data from the store', () => {
        const users = [
            createUser(),
            createUser({
                id: 2,
                name: 'Jane Smith',
                email: 'jane@example.com',
                department: 'Design',
                status: 'offline',
            }),
        ]

        const usersList = [
            {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                image: 'https://example.com/john.jpg',
                position: 'Engineering',
                country: 'Brazil',
                status: 'active',
            },
            {
                id: 2,
                name: 'Jane Smith',
                email: 'jane@example.com',
                image: 'https://example.com/jane.jpg',
                position: 'Design',
                country: 'Brazil',
                status: 'offline',
            },
        ]

        const state = createUsersState({
            data: {
                list: users,
                total: 25,
                page: 2,
                pageSize: 10,
            },
            loading: true,
        })

        mockSelectors(state, usersList)

        const { result } = renderHook(() => useUsers(1, 10))

        expect(result.current).toEqual({
            users,
            usersList,
            total: 25,
            page: 2,
            pageSize: 10,
            loading: true,
        })
    })

    it('uses the requested page when users data does not contain a page', () => {
        const state = createUsersState({
            data: {
                list: [],
                total: 0,
                page: undefined,
                pageSize: undefined,
            },
            loading: false,
        })

        mockSelectors(state)

        const { result } = renderHook(() => useUsers(3, 20))

        expect(result.current.page).toBe(3)
        expect(result.current.pageSize).toBe(20)
    })

    it('dispatches fetchUsers on mount', () => {
        mockSelectors(createUsersState())

        const fetchUsersAction = createFetchUsersAction()

        vi.mocked(fetchUsers).mockReturnValue(fetchUsersAction as never)

        renderHook(() => useUsers(2, 10))

        expect(fetchUsers).toHaveBeenCalledTimes(1)
        expect(fetchUsers).toHaveBeenCalledWith({
            page: 2,
            pageSize: 10,
            search: undefined,
        })

        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledWith(fetchUsersAction)
    })

    it('dispatches fetchUsers with the search term', () => {
        mockSelectors(createUsersState())

        const fetchUsersAction = createFetchUsersAction()

        vi.mocked(fetchUsers).mockReturnValue(fetchUsersAction as never)

        renderHook(() => useUsers(1, 10, 'john'))

        expect(fetchUsers).toHaveBeenCalledTimes(1)
        expect(fetchUsers).toHaveBeenCalledWith({
            page: 1,
            pageSize: 10,
            search: 'john',
        })

        expect(mockDispatch).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledWith(fetchUsersAction)
    })

    it('refetches users when page changes', () => {
        mockSelectors(createUsersState())

        const firstAction = createFetchUsersAction()
        const secondAction = createFetchUsersAction()

        vi.mocked(fetchUsers)
            .mockReturnValueOnce(firstAction as never)
            .mockReturnValueOnce(secondAction as never)

        const { rerender } = renderHook(({ page }) => useUsers(page, 10), {
            initialProps: {
                page: 1,
            },
        })

        expect(fetchUsers).toHaveBeenCalledTimes(1)
        expect(fetchUsers).toHaveBeenNthCalledWith(1, {
            page: 1,
            pageSize: 10,
            search: undefined,
        })

        rerender({
            page: 2,
        })

        expect(fetchUsers).toHaveBeenCalledTimes(2)
        expect(fetchUsers).toHaveBeenNthCalledWith(2, {
            page: 2,
            pageSize: 10,
            search: undefined,
        })

        expect(mockDispatch).toHaveBeenCalledTimes(2)
        expect(mockDispatch).toHaveBeenNthCalledWith(1, firstAction)
        expect(mockDispatch).toHaveBeenNthCalledWith(2, secondAction)
    })

    it('refetches users when pageSize changes', () => {
        mockSelectors(createUsersState())

        const firstAction = createFetchUsersAction()
        const secondAction = createFetchUsersAction()

        vi.mocked(fetchUsers)
            .mockReturnValueOnce(firstAction as never)
            .mockReturnValueOnce(secondAction as never)

        const { rerender } = renderHook(
            ({ pageSize }) => useUsers(1, pageSize),
            {
                initialProps: {
                    pageSize: 10,
                },
            },
        )

        expect(fetchUsers).toHaveBeenCalledTimes(1)

        rerender({
            pageSize: 20,
        })

        expect(fetchUsers).toHaveBeenCalledTimes(2)
        expect(fetchUsers).toHaveBeenNthCalledWith(2, {
            page: 1,
            pageSize: 20,
            search: undefined,
        })

        expect(mockDispatch).toHaveBeenCalledTimes(2)
        expect(mockDispatch).toHaveBeenNthCalledWith(1, firstAction)
        expect(mockDispatch).toHaveBeenNthCalledWith(2, secondAction)
    })

    it('refetches users when search changes', () => {
        mockSelectors(createUsersState())

        const firstAction = createFetchUsersAction()
        const secondAction = createFetchUsersAction()

        vi.mocked(fetchUsers)
            .mockReturnValueOnce(firstAction as never)
            .mockReturnValueOnce(secondAction as never)

        const { rerender } = renderHook(
            ({ search }) => useUsers(1, 10, search),
            {
                initialProps: {
                    search: 'john',
                },
            },
        )

        expect(fetchUsers).toHaveBeenCalledTimes(1)

        rerender({
            search: 'jane',
        })

        expect(fetchUsers).toHaveBeenCalledTimes(2)
        expect(fetchUsers).toHaveBeenNthCalledWith(2, {
            page: 1,
            pageSize: 10,
            search: 'jane',
        })

        expect(mockDispatch).toHaveBeenCalledTimes(2)
        expect(mockDispatch).toHaveBeenNthCalledWith(1, firstAction)
        expect(mockDispatch).toHaveBeenNthCalledWith(2, secondAction)
    })

    it('does not refetch when dependencies do not change', () => {
        mockSelectors(createUsersState())

        const fetchUsersAction = createFetchUsersAction()

        vi.mocked(fetchUsers).mockReturnValue(fetchUsersAction as never)

        const { rerender } = renderHook(
            ({ page, pageSize, search }) => useUsers(page, pageSize, search),
            {
                initialProps: {
                    page: 1,
                    pageSize: 10,
                    search: 'john',
                },
            },
        )

        expect(fetchUsers).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledTimes(1)

        rerender({
            page: 1,
            pageSize: 10,
            search: 'john',
        })

        expect(fetchUsers).toHaveBeenCalledTimes(1)
        expect(mockDispatch).toHaveBeenCalledTimes(1)
    })
})

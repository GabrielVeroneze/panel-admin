import { describe, expect, it, vi } from 'vitest'
import reducer from './users.slice'
import {
    createUser,
    deleteUser,
    deleteUsers,
    fetchUsers,
    updateUser,
} from './users.thunks'
import type { PaginatedUsers, User } from '../types'

vi.mock('@/services/api', () => ({
    api: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}))

const createUserMock = (overrides: Partial<User> = {}): User => ({
    id: 1,
    name: 'Gabriel Veroneze',
    email: 'gabriel@example.com',
    phone: '+5511987654321',
    image: '',
    department: 'Engineering',
    company: 'Example Corp',
    country: 'Brazil',
    status: 'active',
    ...overrides,
})

const createPaginatedUsers = (
    overrides: Partial<PaginatedUsers> = {},
): PaginatedUsers => ({
    list: [
        createUserMock({
            id: 1,
            name: 'Gabriel Veroneze',
        }),
        createUserMock({
            id: 2,
            name: 'John Doe',
            email: 'john@example.com',
            status: 'offline',
        }),
        createUserMock({
            id: 3,
            name: 'Jane Doe',
            email: 'jane@example.com',
        }),
    ],
    total: 3,
    page: 1,
    pageSize: 10,
    ...overrides,
})

describe('users.slice', () => {
    describe('initial state', () => {
        it('returns the initial state', () => {
            const state = reducer(undefined, {
                type: 'unknown',
            })

            expect(state).toEqual({
                data: null,
                loading: false,
            })
        })
    })

    describe('fetchUsers', () => {
        it('sets loading to true when the request is pending', () => {
            const state = reducer(
                undefined,
                fetchUsers.pending('request-id', {
                    page: 1,
                    pageSize: 10,
                }),
            )

            expect(state.loading).toBe(true)
            expect(state.data).toBeNull()
        })

        it('sets loading to true while preserving existing data', () => {
            const data = createPaginatedUsers()

            const state = reducer(
                {
                    data,
                    loading: false,
                },
                fetchUsers.pending('request-id', {
                    page: 2,
                    pageSize: 10,
                }),
            )

            expect(state.loading).toBe(true)
            expect(state.data).toEqual(data)
        })

        it('sets loading to false and stores the fetched users', () => {
            const data = createPaginatedUsers()

            const state = reducer(
                {
                    data: null,
                    loading: true,
                },
                fetchUsers.fulfilled(data, 'request-id', {
                    page: 1,
                    pageSize: 10,
                }),
            )

            expect(state.loading).toBe(false)
            expect(state.data).toEqual(data)
        })

        it('replaces previously loaded data with the fetched data', () => {
            const previousData = createPaginatedUsers()

            const newData = createPaginatedUsers({
                list: [
                    createUserMock({
                        id: 10,
                        name: 'New User',
                    }),
                ],
                total: 1,
                page: 2,
                pageSize: 10,
            })

            const state = reducer(
                {
                    data: previousData,
                    loading: true,
                },
                fetchUsers.fulfilled(newData, 'request-id', {
                    page: 2,
                    pageSize: 10,
                }),
            )

            expect(state.data).toEqual(newData)
            expect(state.loading).toBe(false)
        })
    })

    describe('createUser', () => {
        it('adds the created user to the beginning of the list', () => {
            const data = createPaginatedUsers()

            const newUser = createUserMock({
                id: 4,
                name: 'New User',
            })

            const state = reducer(
                {
                    data,
                    loading: false,
                },
                createUser.fulfilled(newUser, 'request-id', {
                    payload: {
                        name: 'New User',
                        email: 'new@example.com',
                        phone: '+5511987654321',
                        company: 'Example Corp',
                        department: 'Engineering',
                        password: 'Password1!',
                    },
                }),
            )

            expect(state.data?.list[0]).toEqual(newUser)
            expect(state.data?.list).toHaveLength(4)
        })

        it('increments the total after creating a user', () => {
            const data = createPaginatedUsers()

            const newUser = createUserMock({
                id: 4,
                name: 'New User',
            })

            const state = reducer(
                {
                    data,
                    loading: false,
                },
                createUser.fulfilled(newUser, 'request-id', {
                    payload: {
                        name: 'New User',
                        email: 'new@example.com',
                        phone: '+5511987654321',
                        company: 'Example Corp',
                        department: 'Engineering',
                        password: 'Password1!',
                    },
                }),
            )

            expect(state.data?.total).toBe(4)
        })

        it('does nothing when there is no existing data', () => {
            const newUser = createUserMock({
                id: 4,
                name: 'New User',
            })

            const state = reducer(
                {
                    data: null,
                    loading: false,
                },
                createUser.fulfilled(newUser, 'request-id', {
                    payload: {
                        name: 'New User',
                        email: 'new@example.com',
                        phone: '+5511987654321',
                        company: 'Example Corp',
                        department: 'Engineering',
                        password: 'Password1!',
                    },
                }),
            )

            expect(state).toEqual({
                data: null,
                loading: false,
            })
        })
    })

    describe('updateUser', () => {
        it('replaces the matching user in the list', () => {
            const data = createPaginatedUsers()

            const updatedUser = createUserMock({
                id: 2,
                name: 'John Updated',
                email: 'john.updated@example.com',
                department: 'Product',
            })

            const state = reducer(
                {
                    data,
                    loading: false,
                },
                updateUser.fulfilled(updatedUser, 'request-id', {
                    id: 2,
                    payload: {
                        name: 'John Updated',
                    },
                }),
            )

            expect(state.data?.list[1]).toEqual(updatedUser)
        })

        it('preserves the other users when updating a user', () => {
            const data = createPaginatedUsers()

            const firstUser = data.list[0]
            const thirdUser = data.list[2]

            const updatedUser = createUserMock({
                id: 2,
                name: 'John Updated',
            })

            const state = reducer(
                {
                    data,
                    loading: false,
                },
                updateUser.fulfilled(updatedUser, 'request-id', {
                    id: 2,
                    payload: {
                        name: 'John Updated',
                    },
                }),
            )

            expect(state.data?.list).toEqual([
                firstUser,
                updatedUser,
                thirdUser,
            ])
        })

        it('does not change the list when the user is not found', () => {
            const data = createPaginatedUsers()

            const originalList = [...data.list]

            const updatedUser = createUserMock({
                id: 999,
                name: 'Unknown User',
            })

            const state = reducer(
                {
                    data,
                    loading: false,
                },
                updateUser.fulfilled(updatedUser, 'request-id', {
                    id: 999,
                    payload: {
                        name: 'Unknown User',
                    },
                }),
            )

            expect(state.data?.list).toEqual(originalList)
            expect(state.data?.total).toBe(3)
        })

        it('does nothing when there is no existing data', () => {
            const updatedUser = createUserMock({
                id: 1,
                name: 'Updated User',
            })

            const state = reducer(
                {
                    data: null,
                    loading: false,
                },
                updateUser.fulfilled(updatedUser, 'request-id', {
                    id: 1,
                    payload: {
                        name: 'Updated User',
                    },
                }),
            )

            expect(state).toEqual({
                data: null,
                loading: false,
            })
        })
    })

    describe('deleteUser', () => {
        it('removes the user with the provided id', () => {
            const data = createPaginatedUsers()

            const state = reducer(
                {
                    data,
                    loading: false,
                },
                deleteUser.fulfilled(undefined, 'request-id', {
                    id: 2,
                }),
            )

            expect(state.data?.list).toEqual([data.list[0], data.list[2]])
        })

        it('decrements the total after deleting a user', () => {
            const data = createPaginatedUsers()

            const state = reducer(
                {
                    data,
                    loading: false,
                },
                deleteUser.fulfilled(undefined, 'request-id', {
                    id: 2,
                }),
            )

            expect(state.data?.total).toBe(2)
        })

        it('does not remove other users', () => {
            const data = createPaginatedUsers()

            const state = reducer(
                {
                    data,
                    loading: false,
                },
                deleteUser.fulfilled(undefined, 'request-id', {
                    id: 1,
                }),
            )

            expect(state.data?.list).not.toContainEqual(data.list[0])
            expect(state.data?.list).toContainEqual(data.list[1])
            expect(state.data?.list).toContainEqual(data.list[2])
        })

        it('does nothing when there is no existing data', () => {
            const state = reducer(
                {
                    data: null,
                    loading: false,
                },
                deleteUser.fulfilled(undefined, 'request-id', {
                    id: 1,
                }),
            )

            expect(state).toEqual({
                data: null,
                loading: false,
            })
        })
    })

    describe('deleteUsers', () => {
        it('removes all users with the provided ids', () => {
            const data = createPaginatedUsers()

            const state = reducer(
                {
                    data,
                    loading: false,
                },
                deleteUsers.fulfilled(undefined, 'request-id', {
                    ids: [1, 3],
                }),
            )

            expect(state.data?.list).toEqual([data.list[1]])
        })

        it('decrements the total by the number of provided ids', () => {
            const data = createPaginatedUsers()

            const state = reducer(
                {
                    data,
                    loading: false,
                },
                deleteUsers.fulfilled(undefined, 'request-id', {
                    ids: [1, 3],
                }),
            )

            expect(state.data?.total).toBe(1)
        })

        it('supports deleting a single user through deleteUsers', () => {
            const data = createPaginatedUsers()

            const state = reducer(
                {
                    data,
                    loading: false,
                },
                deleteUsers.fulfilled(undefined, 'request-id', {
                    ids: [2],
                }),
            )

            expect(state.data?.list).toEqual([data.list[0], data.list[2]])

            expect(state.data?.total).toBe(2)
        })

        it('does nothing when there is no existing data', () => {
            const state = reducer(
                {
                    data: null,
                    loading: false,
                },
                deleteUsers.fulfilled(undefined, 'request-id', {
                    ids: [1, 2],
                }),
            )

            expect(state).toEqual({
                data: null,
                loading: false,
            })
        })
    })
})

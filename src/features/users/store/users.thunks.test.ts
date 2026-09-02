import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchCurrentUserThunk } from '@/features/auth/store'
import {
    createUser as createUserRequest,
    deleteUser as deleteUserRequest,
    deleteUsers as deleteUsersRequest,
    getUsers,
    updateUser as updateUserRequest,
} from '../api'
import {
    createUser,
    deleteUser,
    deleteUsers,
    fetchUsers,
    updateUser,
} from './users.thunks'
import type {
    CreateUserPayload,
    PaginatedUsers,
    UpdateUserPayload,
    User,
} from '../types'

vi.mock('../api', () => ({
    getUsers: vi.fn(),
    createUser: vi.fn(),
    updateUser: vi.fn(),
    deleteUser: vi.fn(),
    deleteUsers: vi.fn(),
}))

vi.mock('@/features/auth/store', () => ({
    fetchCurrentUserThunk: vi.fn(),
}))

describe('users.thunks', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('fetchUsers', () => {
        it('fetches users with pagination parameters', async () => {
            const params = {
                page: 1,
                pageSize: 10,
            }

            const response: PaginatedUsers = {
                list: [
                    {
                        id: 1,
                        name: 'Gabriel Veroneze',
                        email: 'gabriel@example.com',
                        phone: '+5511987654321',
                        image: '',
                        department: 'Engineering',
                        company: 'Example Corp',
                        country: 'Brazil',
                        status: 'active',
                    },
                ],
                total: 1,
                page: 1,
                pageSize: 10,
            }

            vi.mocked(getUsers).mockResolvedValue(response)

            const result = await fetchUsers(params)(vi.fn(), vi.fn(), undefined)

            expect(getUsers).toHaveBeenCalledWith(params)
            expect(result.type).toBe('users/fetchUsers/fulfilled')
            expect(result.payload).toEqual(response)
        })

        it('includes the search parameter when provided', async () => {
            const params = {
                page: 1,
                pageSize: 10,
                search: 'Gabriel',
            }

            const response: PaginatedUsers = {
                list: [],
                total: 0,
                page: 1,
                pageSize: 10,
            }

            vi.mocked(getUsers).mockResolvedValue(response)

            const result = await fetchUsers(params)(vi.fn(), vi.fn(), undefined)

            expect(getUsers).toHaveBeenCalledWith(params)
            expect(result.type).toBe('users/fetchUsers/fulfilled')
            expect(result.payload).toEqual(response)
        })

        it('returns a rejected action when the request fails', async () => {
            vi.mocked(getUsers).mockRejectedValue(new Error('Request failed'))

            const result = await fetchUsers({
                page: 1,
                pageSize: 10,
            })(vi.fn(), vi.fn(), undefined)

            expect(fetchUsers.rejected.match(result)).toBe(true)

            if (fetchUsers.rejected.match(result)) {
                expect(result.error.message).toBe('Request failed')
            }
        })
    })

    describe('createUser', () => {
        it('creates a user with the provided payload', async () => {
            const payload: CreateUserPayload = {
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
                password: 'Password123!',
            }

            const user: User = {
                id: 1,
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                image: '',
                department: 'Engineering',
                company: 'Example Corp',
                country: 'Brazil',
                status: 'active',
            }

            vi.mocked(createUserRequest).mockResolvedValue(user)

            const result = await createUser({ payload })(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(createUserRequest).toHaveBeenCalledWith(payload)
            expect(result.type).toBe('users/createUser/fulfilled')
            expect(result.payload).toEqual(user)
        })

        it('returns a rejected action when the request fails', async () => {
            vi.mocked(createUserRequest).mockRejectedValue(
                new Error('Request failed'),
            )

            const result = await createUser({
                payload: {
                    name: 'Gabriel Veroneze',
                    email: 'gabriel@example.com',
                    phone: '+5511987654321',
                    company: 'Example Corp',
                    department: 'Engineering',
                    password: 'Password123!',
                },
            })(vi.fn(), vi.fn(), undefined)

            expect(createUser.rejected.match(result)).toBe(true)

            if (createUser.rejected.match(result)) {
                expect(result.error.message).toBe('Request failed')
            }
        })
    })

    describe('updateUser', () => {
        it('updates a user with the provided id and payload', async () => {
            const id = 1

            const payload: UpdateUserPayload = {
                email: 'gabriel@example.com',
            }

            const user: User = {
                id,
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                image: '',
                department: 'Engineering',
                company: 'Example Corp',
                country: 'Brazil',
                status: 'active',
            }

            vi.mocked(updateUserRequest).mockResolvedValue(user)

            const dispatch = vi.fn().mockReturnValue({
                unwrap: vi.fn().mockResolvedValue(user),
            })

            const result = await updateUser({
                id,
                payload,
            })(dispatch, vi.fn(), undefined)

            expect(updateUserRequest).toHaveBeenCalledWith(id, payload)
            expect(result.type).toBe('users/updateUser/fulfilled')
            expect(result.payload).toEqual(user)
        })

        it('refreshes the current user after a successful update', async () => {
            const id = 1

            const payload: UpdateUserPayload = {
                email: 'gabriel@example.com',
            }

            const user: User = {
                id,
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                image: '',
                department: 'Engineering',
                company: 'Example Corp',
                country: 'Brazil',
                status: 'active',
            }

            const fetchCurrentUserAction = {
                type: 'auth/fetchCurrentUser',
            }

            vi.mocked(updateUserRequest).mockResolvedValue(user)

            vi.mocked(fetchCurrentUserThunk).mockReturnValue(
                fetchCurrentUserAction as never,
            )

            const dispatch = vi.fn().mockReturnValue({
                unwrap: vi.fn().mockResolvedValue(user),
            })

            await updateUser({
                id,
                payload,
            })(dispatch, vi.fn(), undefined)

            expect(fetchCurrentUserThunk).toHaveBeenCalledTimes(1)
            expect(dispatch).toHaveBeenCalledWith(fetchCurrentUserAction)
        })

        it('returns the updated user after refreshing the current user', async () => {
            const id = 1

            const payload: UpdateUserPayload = {
                email: 'gabriel@example.com',
            }

            const user: User = {
                id,
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                image: '',
                department: 'Engineering',
                company: 'Example Corp',
                country: 'Brazil',
                status: 'active',
            }

            vi.mocked(updateUserRequest).mockResolvedValue(user)

            const dispatch = vi.fn().mockReturnValue({
                unwrap: vi.fn().mockResolvedValue(user),
            })

            const result = await updateUser({
                id,
                payload,
            })(dispatch, vi.fn(), undefined)

            expect(result.type).toBe('users/updateUser/fulfilled')
            expect(result.payload).toEqual(user)
        })

        it('returns a rejected action when updating the user fails', async () => {
            const id = 1

            const payload: UpdateUserPayload = {
                email: 'gabriel@example.com',
            }

            vi.mocked(updateUserRequest).mockRejectedValue(
                new Error('Request failed'),
            )

            const result = await updateUser({
                id,
                payload,
            })(vi.fn(), vi.fn(), undefined)

            expect(updateUser.rejected.match(result)).toBe(true)

            if (updateUser.rejected.match(result)) {
                expect(result.payload).toBe('Unable to update user')
            }
        })

        it('returns a rejected action when refreshing the current user fails', async () => {
            const id = 1

            const payload: UpdateUserPayload = {
                email: 'gabriel@example.com',
            }

            const user: User = {
                id,
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                image: '',
                department: 'Engineering',
                company: 'Example Corp',
                country: 'Brazil',
                status: 'active',
            }

            vi.mocked(updateUserRequest).mockResolvedValue(user)

            const dispatch = vi.fn().mockReturnValue({
                unwrap: vi.fn().mockRejectedValue(new Error('Refresh failed')),
            })

            const result = await updateUser({
                id,
                payload,
            })(dispatch, vi.fn(), undefined)

            expect(updateUser.rejected.match(result)).toBe(true)

            if (updateUser.rejected.match(result)) {
                expect(result.payload).toBe('Unable to update user')
            }
        })

        it('does not refresh the current user when updating fails', async () => {
            const id = 1

            const payload: UpdateUserPayload = {
                email: 'gabriel@example.com',
            }

            vi.mocked(updateUserRequest).mockRejectedValue(
                new Error('Request failed'),
            )

            const dispatch = vi.fn()

            const result = await updateUser({
                id,
                payload,
            })(dispatch, vi.fn(), undefined)

            expect(updateUser.rejected.match(result)).toBe(true)

            if (updateUser.rejected.match(result)) {
                expect(result.payload).toBe('Unable to update user')
            }

            expect(updateUserRequest).toHaveBeenCalledWith(id, payload)
            expect(fetchCurrentUserThunk).not.toHaveBeenCalled()
        })
    })

    describe('deleteUser', () => {
        it('deletes a user with the provided id', async () => {
            const id = 1

            vi.mocked(deleteUserRequest).mockResolvedValue(undefined)

            const result = await deleteUser({ id })(vi.fn(), vi.fn(), undefined)

            expect(deleteUserRequest).toHaveBeenCalledWith(id)
            expect(result.type).toBe('users/deleteUser/fulfilled')
        })

        it('uses the correct user id', async () => {
            const id = 42

            vi.mocked(deleteUserRequest).mockResolvedValue(undefined)

            await deleteUser({ id })(vi.fn(), vi.fn(), undefined)

            expect(deleteUserRequest).toHaveBeenCalledTimes(1)
            expect(deleteUserRequest).toHaveBeenCalledWith(42)
        })

        it('returns a rejected action when the request fails', async () => {
            vi.mocked(deleteUserRequest).mockRejectedValue(
                new Error('Request failed'),
            )

            const result = await deleteUser({ id: 1 })(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(deleteUser.rejected.match(result)).toBe(true)

            if (deleteUser.rejected.match(result)) {
                expect(result.error.message).toBe('Request failed')
            }
        })
    })

    describe('deleteUsers', () => {
        it('deletes multiple users with the provided ids', async () => {
            const ids = [1, 2, 3]

            vi.mocked(deleteUsersRequest).mockResolvedValue(undefined)

            const result = await deleteUsers({ ids })(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(deleteUsersRequest).toHaveBeenCalledWith(ids)
            expect(result.type).toBe('users/deleteUsers/fulfilled')
        })

        it('supports an empty ids array', async () => {
            const ids: number[] = []

            vi.mocked(deleteUsersRequest).mockResolvedValue(undefined)

            const result = await deleteUsers({ ids })(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(deleteUsersRequest).toHaveBeenCalledWith([])
            expect(result.type).toBe('users/deleteUsers/fulfilled')
        })

        it('does not modify the provided ids', async () => {
            const ids = [1, 2, 3]
            const originalIds = [...ids]

            vi.mocked(deleteUsersRequest).mockResolvedValue(undefined)

            await deleteUsers({ ids })(vi.fn(), vi.fn(), undefined)

            expect(ids).toEqual(originalIds)
        })

        it('returns a rejected action when the request fails', async () => {
            vi.mocked(deleteUsersRequest).mockRejectedValue(
                new Error('Request failed'),
            )

            const result = await deleteUsers({
                ids: [1, 2, 3],
            })(vi.fn(), vi.fn(), undefined)

            expect(deleteUsers.rejected.match(result)).toBe(true)

            if (deleteUsers.rejected.match(result)) {
                expect(result.error.message).toBe('Request failed')
            }
        })
    })
})

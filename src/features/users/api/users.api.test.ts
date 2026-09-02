import { beforeEach, describe, expect, it, vi } from 'vitest'
import { api } from '@/services/api'
import { toFormData } from '@/shared/utils'
import {
    createUser,
    deleteUser,
    deleteUsers,
    getUsers,
    updateUser,
} from './users.api'

vi.mock('@/services/api', () => ({
    api: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}))

vi.mock('@/shared/utils', () => ({
    toFormData: vi.fn(),
}))

describe('users.api', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('getUsers', () => {
        it('fetches users with pagination parameters', async () => {
            const params = {
                page: 1,
                pageSize: 10,
            }

            const response = {
                data: {
                    data: [
                        {
                            id: 1,
                            name: 'Gabriel Veroneze',
                            email: 'gabriel@example.com',
                            phone: '+5511987654321',
                            image: 'avatar.jpg',
                            department: 'Engineering',
                            company: 'Example Corp',
                            country: 'Brazil',
                            status: 'active' as const,
                        },
                    ],
                    total: 1,
                    page: 1,
                    pageSize: 10,
                },
            }

            vi.mocked(api.get).mockResolvedValue(response)

            const result = await getUsers(params)

            expect(api.get).toHaveBeenCalledTimes(1)
            expect(api.get).toHaveBeenCalledWith('/users', {
                params,
            })

            expect(result).toEqual(response.data)
        })

        it('includes the search parameter when provided', async () => {
            const params = {
                page: 2,
                pageSize: 20,
                search: 'Gabriel',
            }

            const response = {
                data: {
                    data: [],
                    total: 0,
                    page: 2,
                    pageSize: 20,
                },
            }

            vi.mocked(api.get).mockResolvedValue(response)

            const result = await getUsers(params)

            expect(api.get).toHaveBeenCalledWith('/users', {
                params: {
                    page: 2,
                    pageSize: 20,
                    search: 'Gabriel',
                },
            })

            expect(result).toEqual(response.data)
        })

        it('returns the response data', async () => {
            const data = {
                data: [],
                total: 0,
                page: 1,
                pageSize: 10,
            }

            vi.mocked(api.get).mockResolvedValue({
                data,
            })

            const result = await getUsers({
                page: 1,
                pageSize: 10,
            })

            expect(result).toBe(data)
        })

        it('propagates API errors', async () => {
            const error = new Error('Failed to fetch users')

            vi.mocked(api.get).mockRejectedValue(error)

            await expect(
                getUsers({
                    page: 1,
                    pageSize: 10,
                }),
            ).rejects.toThrow('Failed to fetch users')
        })
    })

    describe('createUser', () => {
        it('converts the payload to FormData before sending it', async () => {
            const payload = {
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
                password: 'Password1!',
            }

            const formData = new FormData()

            vi.mocked(toFormData).mockReturnValue(formData)

            vi.mocked(api.post).mockResolvedValue({
                data: {
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
            })

            await createUser(payload)

            expect(toFormData).toHaveBeenCalledTimes(1)
            expect(toFormData).toHaveBeenCalledWith(payload)

            expect(api.post).toHaveBeenCalledWith('/users', formData)
        })

        it('returns the created user', async () => {
            const payload = {
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
                password: 'Password1!',
            }

            const formData = new FormData()

            const user = {
                id: 1,
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                image: '',
                department: 'Engineering',
                company: 'Example Corp',
                country: 'Brazil',
                status: 'active' as const,
            }

            vi.mocked(toFormData).mockReturnValue(formData)
            vi.mocked(api.post).mockResolvedValue({
                data: user,
            })

            const result = await createUser(payload)

            expect(result).toBe(user)
        })

        it('propagates API errors', async () => {
            const payload = {
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
                password: 'Password1!',
            }

            const error = new Error('Failed to create user')

            vi.mocked(api.post).mockRejectedValue(error)

            await expect(createUser(payload)).rejects.toThrow(
                'Failed to create user',
            )
        })
    })

    describe('updateUser', () => {
        it('converts the payload to FormData before sending it', async () => {
            const id = 1

            const payload = {
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Example Corp',
                department: 'Engineering',
            }

            const formData = new FormData()

            vi.mocked(toFormData).mockReturnValue(formData)
            vi.mocked(api.put).mockResolvedValue({
                data: {
                    id,
                    name: 'Gabriel Veroneze',
                    email: 'gabriel@example.com',
                    phone: '+5511987654321',
                    image: '',
                    department: 'Engineering',
                    company: 'Example Corp',
                    country: 'Brazil',
                    status: 'active',
                },
            })

            await updateUser(id, payload)

            expect(toFormData).toHaveBeenCalledTimes(1)
            expect(toFormData).toHaveBeenCalledWith(payload)

            expect(api.put).toHaveBeenCalledWith(`/users/${id}`, formData)
        })

        it('uses the provided user id in the request URL', async () => {
            const id = 42
            const payload = {
                email: 'updated@example.com',
            }

            const formData = new FormData()

            vi.mocked(toFormData).mockReturnValue(formData)
            vi.mocked(api.put).mockResolvedValue({
                data: {},
            })

            await updateUser(id, payload)

            expect(api.put).toHaveBeenCalledWith('/users/42', formData)
        })

        it('returns the updated user', async () => {
            const user = {
                id: 1,
                name: 'Gabriel Veroneze',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                image: '',
                department: 'Engineering',
                company: 'Example Corp',
                country: 'Brazil',
                status: 'active' as const,
            }

            const formData = new FormData()

            vi.mocked(toFormData).mockReturnValue(formData)
            vi.mocked(api.put).mockResolvedValue({
                data: user,
            })

            const result = await updateUser(1, {
                email: 'gabriel@example.com',
            })

            expect(result).toBe(user)
        })

        it('propagates API errors', async () => {
            const error = new Error('Failed to update user')

            vi.mocked(api.put).mockRejectedValue(error)

            await expect(
                updateUser(1, {
                    email: 'gabriel@example.com',
                }),
            ).rejects.toThrow('Failed to update user')
        })
    })

    describe('deleteUser', () => {
        it('deletes a user using the provided id', async () => {
            vi.mocked(api.delete).mockResolvedValue(undefined)

            await deleteUser(1)

            expect(api.delete).toHaveBeenCalledTimes(1)
            expect(api.delete).toHaveBeenCalledWith('/users/1')
        })

        it('uses the correct user id in the request URL', async () => {
            vi.mocked(api.delete).mockResolvedValue(undefined)

            await deleteUser(42)

            expect(api.delete).toHaveBeenCalledWith('/users/42')
        })

        it('does not return a value', async () => {
            vi.mocked(api.delete).mockResolvedValue(undefined)

            const result = await deleteUser(1)

            expect(result).toBeUndefined()
        })

        it('propagates API errors', async () => {
            const error = new Error('Failed to delete user')

            vi.mocked(api.delete).mockRejectedValue(error)

            await expect(deleteUser(1)).rejects.toThrow('Failed to delete user')
        })
    })

    describe('deleteUsers', () => {
        it('deletes multiple users using their ids', async () => {
            const ids = [1, 2, 3]

            vi.mocked(api.delete).mockResolvedValue(undefined)

            await deleteUsers(ids)

            expect(api.delete).toHaveBeenCalledTimes(1)
            expect(api.delete).toHaveBeenCalledWith('/users', {
                data: { ids },
            })
        })

        it('sends an empty ids array when no users are selected', async () => {
            const ids: number[] = []

            vi.mocked(api.delete).mockResolvedValue(undefined)

            await deleteUsers(ids)

            expect(api.delete).toHaveBeenCalledWith('/users', {
                data: { ids: [] },
            })
        })

        it('does not modify the provided ids', async () => {
            const ids = [1, 2, 3]

            vi.mocked(api.delete).mockResolvedValue(undefined)

            await deleteUsers(ids)

            expect(ids).toEqual([1, 2, 3])
        })

        it('propagates API errors', async () => {
            const error = new Error('Failed to delete users')

            vi.mocked(api.delete).mockRejectedValue(error)

            await expect(deleteUsers([1, 2, 3])).rejects.toThrow(
                'Failed to delete users',
            )
        })
    })
})

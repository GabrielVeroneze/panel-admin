import { describe, expect, it } from 'vitest'
import { selectUsersList } from './users.selectors'
import type { RootState } from '@/store'

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

const createState = (users: RootState['users']): RootState =>
    ({
        users,
    }) as RootState

describe('selectUsersList', () => {
    it('returns an empty array when users data is null', () => {
        const state = createState({
            data: null,
            loading: false,
        })

        expect(selectUsersList(state)).toEqual([])
    })

    it('returns an empty array when users list is empty', () => {
        const state = createState({
            data: {
                list: [],
                total: 0,
                page: 1,
                pageSize: 10,
            },
            loading: false,
        })

        expect(selectUsersList(state)).toEqual([])
    })

    it('maps users to user list items', () => {
        const state = createState({
            data: {
                list: [createUser()],
                total: 1,
                page: 1,
                pageSize: 10,
            },
            loading: false,
        })

        expect(selectUsersList(state)).toEqual([
            {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                image: 'https://example.com/john.jpg',
                position: 'Engineering',
                country: 'Brazil',
                status: 'active',
            },
        ])
    })

    it('maps multiple users', () => {
        const state = createState({
            data: {
                list: [
                    createUser(),
                    createUser({
                        id: 2,
                        name: 'Jane Smith',
                        email: 'jane@example.com',
                        image: 'https://example.com/jane.jpg',
                        department: 'Design',
                        status: 'offline',
                    }),
                ],
                total: 2,
                page: 1,
                pageSize: 10,
            },
            loading: false,
        })

        expect(selectUsersList(state)).toEqual([
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
        ])
    })

    it('maps department to position', () => {
        const state = createState({
            data: {
                list: [
                    createUser({
                        department: 'Marketing',
                    }),
                ],
                total: 1,
                page: 1,
                pageSize: 10,
            },
            loading: false,
        })

        expect(selectUsersList(state)[0]).toMatchObject({
            position: 'Marketing',
        })
    })

    it('does not expose fields that are not part of UserListItem', () => {
        const state = createState({
            data: {
                list: [
                    createUser({
                        phone: '+5511999999999',
                        company: 'Acme',
                        department: 'Engineering',
                    }),
                ],
                total: 1,
                page: 1,
                pageSize: 10,
            },
            loading: false,
        })

        const result = selectUsersList(state)

        expect(result[0]).not.toHaveProperty('phone')
        expect(result[0]).not.toHaveProperty('company')
        expect(result[0]).not.toHaveProperty('department')
    })
})

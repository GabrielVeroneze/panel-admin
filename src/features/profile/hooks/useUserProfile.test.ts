import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useUserProfile } from './useUserProfile'
import { fetchUserProfile } from '../store'
import { useAppDispatch, useAppSelector } from '@/store'
import type { UnknownAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'
import type { UserProfile } from '../types'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn(),
}))

vi.mock('../store', () => ({
    fetchUserProfile: vi.fn(),
}))

const profileData: UserProfile = {
    id: 1,
    avatar: '/avatars/user-1.jpg',
    name: 'John Doe',
    role: 'Admin',
    country: 'Brazil',
    contact: {
        email: 'john@example.com',
        address: '123 Main Street',
        phone: '+55 11 99999-9999',
    },
    about: 'Software developer',
    skills: [
        {
            id: '1',
            label: 'React',
        },
        {
            id: '2',
            label: 'TypeScript',
        },
    ],
    summary: {
        products: {
            count: 120,
            variation: 12,
        },
        users: {
            count: 350,
            variation: 8,
        },
        profile: {
            role: 'Admin',
            status: 'active',
            lastLogin: '2026-09-30T10:00:00Z',
            memberSince: '2024-01-15',
        },
    },
    activities: [
        {
            id: 1,
            type: 'user-created',
            target: 'Jane Doe',
            createdAt: '2026-09-30T09:00:00Z',
        },
    ],
    recentProducts: [
        {
            id: 1,
            image: '/products/product-1.jpg',
            name: 'Product 1',
            category: 'Category 1',
            price: 99.9,
            stockQuantity: 10,
        },
    ],
    experience: [
        {
            id: 1,
            period: '2022 - Present',
            title: 'Senior Developer',
            organization: 'Company',
            description: 'Software development',
        },
    ],
    education: [
        {
            id: 1,
            period: '2018 - 2022',
            title: 'Computer Science',
            organization: 'University',
            description: 'Bachelor degree',
        },
    ],
}

const dispatch = vi.fn()

const action: UnknownAction = {
    type: 'profile/fetchUserProfile',
}

const createState = (
    overrides: Partial<RootState['profile']> = {},
): RootState =>
    ({
        profile: {
            myProfile: null,
            userProfile: null,
            loading: false,
            ...overrides,
        },
    }) as RootState

describe('useUserProfile', () => {
    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useAppDispatch).mockReturnValue(dispatch)

        vi.mocked(fetchUserProfile).mockReturnValue(
            action as unknown as ReturnType<typeof fetchUserProfile>,
        )

        vi.mocked(useAppSelector).mockImplementation((selector) =>
            selector(createState()),
        )
    })

    describe('return value', () => {
        it('returns null profile and false loading initially', () => {
            const { result } = renderHook(() => useUserProfile())

            expect(result.current).toEqual({
                profile: null,
                loading: false,
            })
        })

        it('returns the current user profile from the store', () => {
            vi.mocked(useAppSelector).mockImplementation((selector) =>
                selector(
                    createState({
                        userProfile: profileData,
                        loading: false,
                    }),
                ),
            )

            const { result } = renderHook(() => useUserProfile())

            expect(result.current).toEqual({
                profile: profileData,
                loading: false,
            })
        })

        it('returns the loading state from the store', () => {
            vi.mocked(useAppSelector).mockImplementation((selector) =>
                selector(
                    createState({
                        loading: true,
                    }),
                ),
            )

            const { result } = renderHook(() => useUserProfile())

            expect(result.current).toEqual({
                profile: null,
                loading: true,
            })
        })

        it('returns the profile and loading state from the store', () => {
            vi.mocked(useAppSelector).mockImplementation((selector) =>
                selector(
                    createState({
                        userProfile: profileData,
                        loading: true,
                    }),
                ),
            )

            const { result } = renderHook(() => useUserProfile())

            expect(result.current).toEqual({
                profile: profileData,
                loading: true,
            })
        })
    })

    describe('fetchUserProfile', () => {
        it('does not dispatch when userId is not provided', () => {
            renderHook(() => useUserProfile())

            expect(fetchUserProfile).not.toHaveBeenCalled()
            expect(dispatch).not.toHaveBeenCalled()
        })

        it('dispatches fetchUserProfile with the user id converted to a number', () => {
            renderHook(() => useUserProfile('2'))

            expect(fetchUserProfile).toHaveBeenCalledTimes(1)
            expect(fetchUserProfile).toHaveBeenCalledWith({
                id: 2,
            })
            expect(dispatch).toHaveBeenCalledTimes(1)
            expect(dispatch).toHaveBeenCalledWith(action)
        })

        it('does not dispatch again when userId remains unchanged', () => {
            const { rerender } = renderHook(
                ({ userId }) => useUserProfile(userId),
                {
                    initialProps: {
                        userId: '2',
                    },
                },
            )

            rerender({ userId: '2' })

            expect(fetchUserProfile).toHaveBeenCalledTimes(1)
            expect(dispatch).toHaveBeenCalledTimes(1)
        })

        it('dispatches again when userId changes', () => {
            const { rerender } = renderHook(
                ({ userId }) => useUserProfile(userId),
                {
                    initialProps: {
                        userId: '2',
                    },
                },
            )

            rerender({
                userId: '3',
            })

            expect(fetchUserProfile).toHaveBeenCalledTimes(2)
            expect(fetchUserProfile).toHaveBeenNthCalledWith(1, {
                id: 2,
            })
            expect(fetchUserProfile).toHaveBeenNthCalledWith(2, {
                id: 3,
            })

            expect(dispatch).toHaveBeenCalledTimes(2)
            expect(dispatch).toHaveBeenNthCalledWith(1, action)
            expect(dispatch).toHaveBeenNthCalledWith(2, action)
        })

        it('does not dispatch when userId is an empty string', () => {
            renderHook(() => useUserProfile(''))

            expect(fetchUserProfile).not.toHaveBeenCalled()
            expect(dispatch).not.toHaveBeenCalled()
        })
    })
})

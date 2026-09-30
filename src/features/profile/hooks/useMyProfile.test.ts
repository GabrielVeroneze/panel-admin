import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useMyProfile } from './useMyProfile'
import { fetchMyProfile } from '../store'
import { useAppDispatch, useAppSelector } from '@/store'
import type { UserProfile } from '../types'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn(),
}))

vi.mock('../store', () => ({
    fetchMyProfile: vi.fn(),
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

const mockProfileState = (
    overrides: {
        myProfile?: UserProfile | null
        loading?: boolean
    } = {},
) => {
    vi.mocked(useAppSelector).mockReturnValue({
        myProfile: null,
        userProfile: null,
        loading: false,
        ...overrides,
    })
}

describe('useMyProfile', () => {
    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useAppDispatch).mockReturnValue(dispatch)

        mockProfileState()
    })

    describe('return value', () => {
        it('returns null profile and false loading initially', () => {
            const { result } = renderHook(() => useMyProfile())

            expect(result.current).toEqual({
                profile: null,
                loading: false,
            })
        })

        it('returns the current profile from the store', () => {
            mockProfileState({
                myProfile: profileData,
            })

            const { result } = renderHook(() => useMyProfile())

            expect(result.current).toEqual({
                profile: profileData,
                loading: false,
            })
        })

        it('returns the loading state from the store', () => {
            mockProfileState({
                loading: true,
            })

            const { result } = renderHook(() => useMyProfile())

            expect(result.current).toEqual({
                profile: null,
                loading: true,
            })
        })

        it('returns the profile and loading state from the store', () => {
            mockProfileState({
                myProfile: profileData,
                loading: true,
            })

            const { result } = renderHook(() => useMyProfile())

            expect(result.current).toEqual({
                profile: profileData,
                loading: true,
            })
        })
    })

    describe('fetchMyProfile', () => {
        it('dispatches fetchMyProfile when the hook mounts', () => {
            const thunkAction = vi.fn()

            vi.mocked(fetchMyProfile).mockReturnValue(thunkAction)

            renderHook(() => useMyProfile())

            expect(fetchMyProfile).toHaveBeenCalledTimes(1)
            expect(dispatch).toHaveBeenCalledTimes(1)
            expect(dispatch).toHaveBeenCalledWith(thunkAction)
        })

        it('does not dispatch fetchMyProfile again on rerender', () => {
            const thunkAction = vi.fn()

            vi.mocked(fetchMyProfile).mockReturnValue(thunkAction)

            const { rerender } = renderHook(() => useMyProfile())

            rerender()
            rerender()

            expect(fetchMyProfile).toHaveBeenCalledTimes(1)
            expect(dispatch).toHaveBeenCalledTimes(1)
        })
    })
})

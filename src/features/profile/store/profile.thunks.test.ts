import { beforeEach, describe, expect, it, vi } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'
import { getMyProfile, getUserProfile } from '../api'
import { fetchMyProfile, fetchUserProfile } from './profile.thunks'
import type { UserProfile } from '../types'

vi.mock('@/features/profile/api', () => ({
    getMyProfile: vi.fn(),
    getUserProfile: vi.fn(),
}))

const profileData: UserProfile = {
    id: 1,
    avatar: '/avatars/user-1.png',
    name: 'John Doe',
    role: 'Administrator',
    country: 'Brazil',
    contact: {
        email: 'john@example.com',
        address: 'Main Street, 100',
        phone: '+55 11 99999-9999',
    },
    about: 'Profile description',
    skills: [
        {
            id: '1',
            label: 'React',
        },
    ],
    summary: {
        products: {
            count: 10,
            variation: 5,
        },
        users: {
            count: 20,
            variation: 10,
        },
        profile: {
            role: 'Administrator',
            status: 'active',
            lastLogin: '2026-09-30T10:00:00Z',
            memberSince: '2025-01-01',
        },
    },
    activities: [
        {
            id: 1,
            type: 'user-created',
            target: 'Jane Doe',
            createdAt: '2026-09-30T10:00:00Z',
        },
    ],
    recentProducts: [
        {
            id: 1,
            image: '/products/product-1.png',
            name: 'Product 1',
            category: 'Category 1',
            price: 99.9,
            stockQuantity: 10,
        },
    ],
    experience: [
        {
            id: 1,
            period: '2024 - Present',
            title: 'Frontend Developer',
            organization: 'Company',
            description: 'Frontend development',
        },
    ],
    education: [
        {
            id: 1,
            period: '2020 - 2024',
            title: 'Computer Science',
            organization: 'University',
            description: 'Bachelor degree',
        },
    ],
}

const createTestStore = () =>
    configureStore({
        reducer: () => null,
    })

beforeEach(() => {
    vi.clearAllMocks()
})

describe('profile.thunks', () => {
    describe('fetchMyProfile', () => {
        it('returns the authenticated user profile when the API succeeds', async () => {
            vi.mocked(getMyProfile).mockResolvedValue(profileData)

            const store = createTestStore()
            const result = await store.dispatch(fetchMyProfile())

            expect(result.type).toBe('profile/fetchMyProfile/fulfilled')
            expect(result.payload).toEqual(profileData)
        })

        it('calls getMyProfile', async () => {
            vi.mocked(getMyProfile).mockResolvedValue(profileData)

            const store = createTestStore()

            await store.dispatch(fetchMyProfile())

            expect(getMyProfile).toHaveBeenCalledTimes(1)
        })

        it('returns a rejected action when the API fails', async () => {
            const error = new Error('Failed to fetch profile')

            vi.mocked(getMyProfile).mockRejectedValue(error)

            const store = createTestStore()
            const result = await store.dispatch(fetchMyProfile())

            expect(fetchMyProfile.rejected.match(result)).toBe(true)

            if (fetchMyProfile.rejected.match(result)) {
                expect(result.error).toMatchObject({
                    message: 'Failed to fetch profile',
                })
            }
        })
    })

    describe('fetchUserProfile', () => {
        it('returns the requested user profile when the API succeeds', async () => {
            const userId = 2
            const userProfile = {
                ...profileData,
                id: userId,
            }

            vi.mocked(getUserProfile).mockResolvedValue(userProfile)

            const store = createTestStore()
            const result = await store.dispatch(
                fetchUserProfile({ id: userId }),
            )

            expect(result.type).toBe('profile/fetchUserProfile/fulfilled')
            expect(result.payload).toEqual(userProfile)
        })

        it('passes the user id to getUserProfile', async () => {
            const userId = 2

            vi.mocked(getUserProfile).mockResolvedValue({
                ...profileData,
                id: userId,
            })

            const store = createTestStore()

            await store.dispatch(fetchUserProfile({ id: userId }))

            expect(getUserProfile).toHaveBeenCalledTimes(1)
            expect(getUserProfile).toHaveBeenCalledWith(userId)
        })

        it('returns a rejected action when the API fails', async () => {
            const error = new Error('User not found')

            vi.mocked(getUserProfile).mockRejectedValue(error)

            const store = createTestStore()
            const result = await store.dispatch(fetchUserProfile({ id: 2 }))

            expect(fetchUserProfile.rejected.match(result)).toBe(true)

            if (fetchUserProfile.rejected.match(result)) {
                expect(result.error).toMatchObject({
                    message: 'User not found',
                })
            }
        })
    })
})

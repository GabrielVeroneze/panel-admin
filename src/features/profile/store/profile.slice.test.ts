import { describe, expect, it, vi } from 'vitest'
import profileReducer from './profile.slice'
import { fetchMyProfile, fetchUserProfile } from './profile.thunks'
import type { UserProfile } from '../types'

vi.mock('@/services/api', () => ({
    api: {
        get: vi.fn(),
    },
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

describe('profile.slice', () => {
    describe('initial state', () => {
        it('returns the initial state', () => {
            expect(profileReducer(undefined, { type: 'unknown' })).toEqual({
                myProfile: null,
                userProfile: null,
                loading: false,
            })
        })
    })

    describe('fetchMyProfile', () => {
        it('sets loading to true when the request is pending', () => {
            const state = profileReducer(
                undefined,
                fetchMyProfile.pending('request-id'),
            )

            expect(state).toEqual({
                myProfile: null,
                userProfile: null,
                loading: true,
            })
        })

        it('stores my profile and stops loading when the request succeeds', () => {
            const state = profileReducer(
                undefined,
                fetchMyProfile.fulfilled(profileData, 'request-id'),
            )

            expect(state).toEqual({
                myProfile: profileData,
                userProfile: null,
                loading: false,
            })
        })

        it('clears my profile and stops loading when the request fails', () => {
            const previousState = {
                myProfile: profileData,
                userProfile: null,
                loading: true,
            }

            const state = profileReducer(
                previousState,
                fetchMyProfile.rejected(
                    new Error('Failed to fetch profile'),
                    'request-id',
                ),
            )

            expect(state).toEqual({
                myProfile: null,
                userProfile: null,
                loading: false,
            })
        })
    })

    describe('fetchUserProfile', () => {
        it('sets loading to true when the request is pending', () => {
            const state = profileReducer(
                undefined,
                fetchUserProfile.pending('request-id', { id: 2 }),
            )

            expect(state).toEqual({
                myProfile: null,
                userProfile: null,
                loading: true,
            })
        })

        it('stores the user profile and stops loading when the request succeeds', () => {
            const userProfile = {
                ...profileData,
                id: 2,
                name: 'Jane Doe',
            }

            const state = profileReducer(
                undefined,
                fetchUserProfile.fulfilled(userProfile, 'request-id', {
                    id: 2,
                }),
            )

            expect(state).toEqual({
                myProfile: null,
                userProfile,
                loading: false,
            })
        })

        it('clears the user profile and stops loading when the request fails', () => {
            const previousState = {
                myProfile: profileData,
                userProfile: profileData,
                loading: true,
            }

            const state = profileReducer(
                previousState,
                fetchUserProfile.rejected(
                    new Error('User not found'),
                    'request-id',
                    { id: 2 },
                ),
            )

            expect(state).toEqual({
                myProfile: profileData,
                userProfile: null,
                loading: false,
            })
        })
    })
})

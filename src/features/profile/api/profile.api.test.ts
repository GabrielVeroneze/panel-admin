import { describe, expect, it } from 'vitest'
import { HttpResponse, http } from 'msw'
import { getMyProfile, getUserProfile } from '@/features/profile/api'
import { server } from '@/mocks/server'
import type { UserProfile } from '@/features/profile/types'

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

describe('profile.api', () => {
    describe('getMyProfile', () => {
        it('returns the authenticated user profile', async () => {
            server.use(
                http.get('/api/me', () => {
                    return HttpResponse.json(profileData)
                }),
            )

            const result = await getMyProfile()

            expect(result).toEqual(profileData)
        })

        it('requests the /api/me endpoint', async () => {
            let requestedPath = ''

            server.use(
                http.get('/api/me', ({ request }) => {
                    requestedPath = new URL(request.url).pathname

                    return HttpResponse.json(profileData)
                }),
            )

            await getMyProfile()

            expect(requestedPath).toBe('/api/me')
        })

        it('propagates the API error', async () => {
            server.use(
                http.get('/api/me', () => {
                    return HttpResponse.json(null, {
                        status: 500,
                    })
                }),
            )

            await expect(getMyProfile()).rejects.toMatchObject({
                response: {
                    status: 500,
                },
            })
        })
    })

    describe('getUserProfile', () => {
        it('returns the requested user profile', async () => {
            server.use(
                http.get('/api/users/:id', () => {
                    return HttpResponse.json(profileData)
                }),
            )

            const result = await getUserProfile(2)

            expect(result).toEqual(profileData)
        })

        it('requests the profile endpoint with the user id', async () => {
            let requestedPath = ''

            server.use(
                http.get('/api/users/:id', ({ request }) => {
                    requestedPath = new URL(request.url).pathname

                    return HttpResponse.json(profileData)
                }),
            )

            await getUserProfile(2)

            expect(requestedPath).toBe('/api/users/2')
        })

        it('propagates the API error', async () => {
            server.use(
                http.get('/api/users/:id', () => {
                    return HttpResponse.json(null, {
                        status: 500,
                    })
                }),
            )

            await expect(getUserProfile(2)).rejects.toMatchObject({
                response: {
                    status: 500,
                },
            })
        })
    })
})

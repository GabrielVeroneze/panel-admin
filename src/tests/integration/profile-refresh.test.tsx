import { describe, expect, it } from 'vitest'
import { delay, HttpResponse, http } from 'msw'
import { act, screen, waitFor } from '@testing-library/react'
import { MyProfilePage } from '@/features/profile'
import { fetchMyProfile } from '@/features/profile/store'
import { setupStore } from '@/tests/setupStore'
import { renderWithProviders } from '@/tests/test-utils'
import { server } from '@/mocks/server'
import type { UserProfile } from '@/features/profile/types'

const initialProfile: UserProfile = {
    id: 1,
    avatar: '/avatars/john-doe.jpg',
    name: 'John Doe',
    role: 'Administrator',
    country: 'United States',
    contact: {
        email: 'john.doe@example.com',
        address: '123 Main Street',
        phone: '+1 555 123 4567',
    },
    about: 'Frontend developer with experience in React.',
    skills: [
        {
            id: 'react',
            label: 'React',
        },
    ],
    summary: {
        products: {
            count: 25,
            variation: 10,
        },
        users: {
            count: 100,
            variation: 5,
        },
        profile: {
            role: 'Administrator',
            status: 'active',
            lastLogin: '2026-10-01T10:00:00Z',
            memberSince: '2024-01-01T10:00:00Z',
        },
    },
    activities: [
        {
            id: 1,
            type: 'user-created',
            target: 'Jane Doe',
            createdAt: '2026-10-01T10:00:00Z',
        },
    ],
    recentProducts: [
        {
            id: 1,
            image: '/products/product-1.jpg',
            name: 'Product One',
            category: 'Electronics',
            price: 99.99,
            stockQuantity: 10,
        },
    ],
    experience: [
        {
            id: 1,
            period: '2020 - Present',
            title: 'Frontend Developer',
            organization: 'Tech Company',
            description: 'Developing web applications.',
        },
    ],
    education: [
        {
            id: 1,
            period: '2016 - 2020',
            title: 'Computer Science',
            organization: 'University',
            description: 'Bachelor degree in Computer Science.',
        },
    ],
}

const updatedProfile: UserProfile = {
    ...initialProfile,
    name: 'Jane Doe',
    role: 'Manager',
}

describe('Profile refresh', () => {
    it('keeps previous data while a new request is loading', async () => {
        let requestCount = 0

        server.use(
            http.get('/api/me', async () => {
                requestCount += 1

                if (requestCount === 1) {
                    return HttpResponse.json(initialProfile)
                }

                await delay(100)

                return HttpResponse.json(updatedProfile)
            }),
        )

        const store = setupStore()

        renderWithProviders(<MyProfilePage />, { store })

        await waitFor(() => {
            expect(store.getState().profile.myProfile).toEqual(initialProfile)
        })

        expect(store.getState().profile.loading).toBe(false)

        let refreshPromise: Promise<unknown>

        act(() => {
            refreshPromise = store.dispatch(fetchMyProfile())
        })

        await waitFor(() => {
            expect(store.getState().profile.loading).toBe(true)
        })

        expect(store.getState().profile.myProfile).toEqual(initialProfile)

        await act(async () => {
            await refreshPromise
        })

        await waitFor(() => {
            expect(store.getState().profile.loading).toBe(false)
        })

        expect(store.getState().profile.myProfile).toEqual(updatedProfile)

        expect(
            screen.getByRole('heading', {
                name: 'Jane Doe',
            }),
        ).toBeVisible()

        expect(requestCount).toBe(2)
    })
})

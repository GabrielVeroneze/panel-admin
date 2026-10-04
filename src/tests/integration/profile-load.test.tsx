import { describe, expect, it } from 'vitest'
import { HttpResponse, http } from 'msw'
import { screen } from '@testing-library/react'
import { MyProfilePage } from '@/features/profile'
import { renderWithProviders } from '@/tests/test-utils'
import { setupStore } from '@/tests/setupStore'
import { server } from '@/mocks/server'
import type { UserProfile } from '@/features/profile/types'

const profile: UserProfile = {
    id: 1,
    avatar: '/avatar.jpg',
    name: 'John Doe',
    role: 'Frontend Developer',
    country: 'United States',
    contact: {
        email: 'john.doe@example.com',
        address: '123 Main Street',
        phone: '+1234567890',
    },
    about: 'Frontend developer with experience building web applications.',
    skills: [
        {
            id: 'react',
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
            role: 'Frontend Developer',
            status: 'active',
            lastLogin: '2026-09-01T10:00:00.000Z',
            memberSince: '2024-01-01T00:00:00.000Z',
        },
    },
    activities: [
        {
            id: 1,
            type: 'product-created',
            target: 'Admin Dashboard',
            createdAt: '2026-09-01T10:00:00.000Z',
        },
    ],
    recentProducts: [
        {
            id: 1,
            image: '/product.jpg',
            name: 'Admin Dashboard',
            category: 'Software',
            price: 100,
            stockQuantity: 10,
        },
    ],
    experience: [
        {
            id: 1,
            period: '2022 - Present',
            title: 'Frontend Developer',
            organization: 'Tech Company',
            description: 'Developing modern web applications.',
        },
    ],
    education: [
        {
            id: 1,
            period: '2018 - 2022',
            title: 'Computer Science',
            organization: 'University',
            description: 'Studied computer science and software engineering.',
        },
    ],
}

describe('Profile load', () => {
    it('loads the complete profile successfully', async () => {
        server.use(
            http.get('/api/me', () => {
                return HttpResponse.json(profile)
            }),
        )

        const store = setupStore()

        renderWithProviders(<MyProfilePage />, { store })

        expect(
            await screen.findByRole('heading', {
                level: 2,
                name: 'John Doe',
            }),
        ).toBeInTheDocument()

        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                level: 3,
                name: 'About me',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                level: 3,
                name: 'Software Skills',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                level: 3,
                name: 'Admin Summary',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                level: 3,
                name: 'Recent Activity',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                level: 3,
                name: 'Recently Managed Products',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                level: 3,
                name: 'Experience',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                level: 3,
                name: 'Education',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                level: 4,
                name: 'Frontend Developer',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                level: 4,
                name: 'Computer Science',
            }),
        ).toBeInTheDocument()

        expect(store.getState().profile.loading).toBe(false)
        expect(store.getState().profile.myProfile).not.toBeNull()
    })
})

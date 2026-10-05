import { describe, expect, it } from 'vitest'
import { Route, Routes } from 'react-router'
import { http, HttpResponse } from 'msw'
import { screen } from '@testing-library/react'
import { UserProfilePage } from '@/features/profile'
import { renderWithProviders } from '@/tests/test-utils'
import { setupStore } from '@/tests/setupStore'
import { server } from '@/mocks/server'
import type { UserProfile } from '@/features/profile/types'

const profile: UserProfile = {
    id: 42,
    avatar: '/avatars/test-user.jpg',
    name: 'Test User',
    role: 'Administrator',
    country: 'Brazil',
    contact: {
        email: 'test.user@example.com',
        address: 'Test Street, 123',
        phone: '+55 11 99999-9999',
    },
    about: 'Test user profile description.',
    skills: [
        {
            id: 'typescript',
            label: 'TypeScript',
        },
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
            count: 150,
            variation: 5,
        },
        profile: {
            role: 'Administrator',
            status: 'active',
            lastLogin: '2026-10-01T10:00:00Z',
            memberSince: '2024-01-15T10:00:00Z',
        },
    },
    activities: [
        {
            id: 1,
            type: 'user-created',
            target: 'Test User',
            createdAt: '2026-10-01T10:00:00Z',
        },
    ],
    recentProducts: [
        {
            id: 1,
            image: '/products/test-product.jpg',
            name: 'Test Product',
            category: 'Electronics',
            price: 99.99,
            stockQuantity: 10,
        },
    ],
    experience: [
        {
            id: 1,
            period: '2024 - Present',
            title: 'Senior Developer',
            organization: 'Test Company',
            description:
                'Develops applications and leads technical initiatives.',
        },
    ],
    education: [
        {
            id: 2,
            period: '2020 - 2024',
            title: 'Computer Science',
            organization: 'Test University',
            description: 'Bachelor degree in Computer Science.',
        },
    ],
}

describe('User Profile load', () => {
    it('loads the requested user profile successfully', async () => {
        server.use(
            http.get('/api/users/42', () => {
                return HttpResponse.json(profile)
            }),
        )

        const store = setupStore()

        renderWithProviders(
            <Routes>
                <Route path="/users/:userId" element={<UserProfilePage />} />
            </Routes>,
            {
                initialEntries: ['/users/42'],
                store,
            },
        )

        expect(
            await screen.findByRole('heading', {
                level: 2,
                name: 'Test User',
            }),
        ).toBeInTheDocument()

        expect(screen.getByText('test.user@example.com')).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                level: 3,
                name: 'About me',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByText('Test user profile description.'),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', {
                level: 3,
                name: 'Software Skills',
            }),
        ).toBeInTheDocument()

        expect(screen.getByText('TypeScript')).toBeInTheDocument()
        expect(screen.getByText('React')).toBeInTheDocument()

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

        expect(store.getState().profile.loading).toBe(false)
        expect(store.getState().profile.userProfile).toEqual(profile)
        expect(store.getState().profile.myProfile).toBeNull()
    })
})

import { describe, expect, it } from 'vitest'
import { Link, Route, Routes } from 'react-router'
import { http, HttpResponse } from 'msw'
import { screen } from '@testing-library/react'
import { UserProfilePage } from '@/features/profile'
import { renderWithProviders } from '@/tests/test-utils'
import { setupStore } from '@/tests/setupStore'
import { server } from '@/mocks/server'
import userEvent from '@testing-library/user-event'
import type { UserProfile } from '@/features/profile/types'

const firstProfile: UserProfile = {
    id: 2,
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

const secondProfile: UserProfile = {
    ...firstProfile,
    id: 1,
    name: 'Jane Doe',
    role: 'Manager',
    country: 'Canada',
    contact: {
        ...firstProfile.contact,
        email: 'jane.doe@example.com',
    },
}

describe('User Profile refresh', () => {
    it('reacts to userId changes', async () => {
        const user = userEvent.setup()
        const store = setupStore()

        server.use(
            http.get('/api/users/2', () => {
                return HttpResponse.json(firstProfile)
            }),
            http.get('/api/users/1', () => {
                return HttpResponse.json(secondProfile)
            }),
        )

        renderWithProviders(
            <Routes>
                <Route
                    path="/users/:userId"
                    element={
                        <>
                            <Link to="/users/1">Load another user</Link>
                            <UserProfilePage />
                        </>
                    }
                />
            </Routes>,
            { initialEntries: ['/users/2'], store },
        )

        expect(
            await screen.findByRole('heading', {
                level: 2,
                name: 'John Doe',
            }),
        ).toBeInTheDocument()

        expect(screen.getByText('john.doe@example.com')).toBeInTheDocument()

        await user.click(
            screen.getByRole('link', {
                name: 'Load another user',
            }),
        )

        expect(
            await screen.findByRole('heading', {
                level: 2,
                name: 'Jane Doe',
            }),
        ).toBeInTheDocument()

        expect(screen.getByText('jane.doe@example.com')).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                level: 2,
                name: 'John Doe',
            }),
        ).not.toBeInTheDocument()

        expect(
            screen.queryByText('john.doe@example.com'),
        ).not.toBeInTheDocument()

        expect(store.getState().profile.loading).toBe(false)
        expect(store.getState().profile.userProfile?.id).toBe(1)
        expect(store.getState().profile.myProfile).toBeNull()
    })
})

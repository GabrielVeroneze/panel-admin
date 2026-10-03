import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProfileView } from './ProfileView'
import type { UserProfile } from '@/features/profile/types'

describe('ProfileView', () => {
    const profile: UserProfile = {
        id: 1,
        avatar: '/images/avatar.jpg',
        name: 'John Doe',
        role: 'Administrator',
        country: 'United States',
        contact: {
            email: 'john@example.com',
            address: '123 Main Street',
            phone: '+1 555 123 4567',
        },
        about: 'Administrator profile',
        skills: [{ id: 'react', label: 'React' }],
        summary: {
            products: { count: 120, variation: 12 },
            users: { count: 45, variation: 8 },
            profile: {
                role: 'Administrator',
                status: 'active',
                lastLogin: '2025-01-15T10:00:00.000Z',
                memberSince: '2024-01-15T10:00:00.000Z',
            },
        },
        activities: [
            {
                id: 1,
                type: 'user-created',
                target: 'Jane Doe',
                createdAt: '2025-01-15T10:00:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: '/images/product.jpg',
                name: 'Wireless Headphones',
                category: 'Electronics',
                price: 99.99,
                stockQuantity: 10,
            },
        ],
        experience: [
            {
                id: 1,
                period: '2020 - 2022',
                title: 'Frontend Developer',
                organization: 'Tech Company',
                description: 'Developed and maintained web applications.',
            },
        ],
        education: [
            {
                id: 2,
                period: '2016 - 2020',
                title: 'Computer Science',
                organization: 'University',
                description: 'Bachelor degree in Computer Science.',
            },
        ],
    }

    describe('structure', () => {
        it('renders the profile view container', () => {
            const { container } = render(
                <ProfileView profile={profile} loading={false} />,
            )

            expect(container.firstElementChild?.tagName).toBe('SECTION')
            expect(container.firstElementChild).toHaveClass('layout')
        })

        it('renders the profile sidebar', () => {
            render(<ProfileView profile={profile} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 2,
                    name: 'John Doe',
                }),
            ).toBeInTheDocument()
        })

        it('renders the activity feed', () => {
            render(<ProfileView profile={profile} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Admin Summary',
                }),
            ).toBeInTheDocument()
        })

        it('renders the profile timeline', () => {
            render(<ProfileView profile={profile} loading={false} />)

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
        })
    })

    describe('profile data propagation', () => {
        it('passes the profile data to all profile areas', () => {
            render(<ProfileView profile={profile} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 2,
                    name: 'John Doe',
                }),
            ).toBeInTheDocument()

            expect(screen.getByText('john@example.com')).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Admin Summary',
                }),
            ).toBeInTheDocument()

            expect(screen.getByText('Jane Doe')).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Experience',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    level: 4,
                    name: 'Frontend Developer',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('loading state', () => {
        it('renders the loading state for all profile areas', () => {
            render(<ProfileView profile={profile} loading />)

            expect(
                screen.queryByRole('heading', {
                    level: 2,
                    name: 'John Doe',
                }),
            ).not.toBeInTheDocument()

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Admin Summary',
                }),
            ).not.toBeInTheDocument()

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Experience',
                }),
            ).not.toBeInTheDocument()
        })

        it('keeps the three profile areas in the expected order', () => {
            const { container } = render(
                <ProfileView profile={profile} loading />,
            )

            const layout = container.firstElementChild

            expect(layout?.children).toHaveLength(3)
            expect(layout?.children[0]).toBeInTheDocument()
            expect(layout?.children[1]).toBeInTheDocument()
            expect(layout?.children[2]).toBeInTheDocument()
        })
    })

    describe('unavailable profile', () => {
        it('renders the unavailable state for all profile areas', () => {
            render(<ProfileView profile={null} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Profile details unavailable',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Activity data unavailable',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Timeline unavailable',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('area order', () => {
        it('renders the profile areas in the expected order', () => {
            const { container } = render(
                <ProfileView profile={profile} loading={false} />,
            )

            const layout = container.firstElementChild

            expect(layout?.children).toHaveLength(3)
            expect(layout?.children[0]?.tagName).toBe('ASIDE')
            expect(layout?.children[1]?.tagName).toBe('SECTION')
            expect(layout?.children[2]?.tagName).toBe('SECTION')
        })
    })
})

import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProfileActivityFeed } from './ProfileActivityFeed'
import type { UserProfile } from '@/features/profile/types'

describe('ProfileActivityFeed', () => {
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
        skills: [
            {
                id: 'react',
                label: 'React',
            },
        ],
        summary: {
            products: {
                count: 120,
                variation: 12,
            },
            users: {
                count: 45,
                variation: 8,
            },
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
            {
                id: 2,
                type: 'product-updated',
                target: 'Product A',
                createdAt: '2025-01-14T10:00:00.000Z',
            },
        ],
        recentProducts: [
            {
                id: 1,
                image: '/images/product-1.jpg',
                name: 'Wireless Headphones',
                category: 'Electronics',
                price: 99.99,
                stockQuantity: 10,
            },
            {
                id: 2,
                image: '/images/product-2.jpg',
                name: 'Mechanical Keyboard',
                category: 'Accessories',
                price: 149.99,
                stockQuantity: 5,
            },
        ],
        experience: [],
        education: [],
    }

    describe('loading state', () => {
        it('renders the activity feed skeleton when loading', () => {
            const { container } = render(
                <ProfileActivityFeed profile={profile} loading />,
            )

            expect(container.firstElementChild).toHaveClass('feed')
            expect(container.firstElementChild?.tagName).toBe('SECTION')
        })

        it('does not render the activity data while loading', () => {
            render(<ProfileActivityFeed profile={profile} loading />)

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Admin Summary',
                }),
            ).not.toBeInTheDocument()

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Recent Activity',
                }),
            ).not.toBeInTheDocument()

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Recently Managed Products',
                }),
            ).not.toBeInTheDocument()
        })
    })

    describe('unavailable profile', () => {
        it('renders the empty state when profile is null', () => {
            render(<ProfileActivityFeed profile={null} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Activity data unavailable',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByText(
                    'Recent activity, statistics, and product information could not be loaded.',
                ),
            ).toBeInTheDocument()
        })

        it('does not render the activity sections when profile is unavailable', () => {
            render(<ProfileActivityFeed profile={null} loading={false} />)

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Admin Summary',
                }),
            ).not.toBeInTheDocument()

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Recent Activity',
                }),
            ).not.toBeInTheDocument()

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Recently Managed Products',
                }),
            ).not.toBeInTheDocument()
        })
    })

    describe('profile data', () => {
        it('renders the activity feed container', () => {
            const { container } = render(
                <ProfileActivityFeed profile={profile} loading={false} />,
            )

            expect(container.firstElementChild).toHaveClass('feed')
            expect(container.firstElementChild?.tagName).toBe('SECTION')
        })

        it('renders the admin summary section', () => {
            render(<ProfileActivityFeed profile={profile} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Admin Summary',
                }),
            ).toBeInTheDocument()
        })

        it('renders the recent activity section', () => {
            render(<ProfileActivityFeed profile={profile} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Recent Activity',
                }),
            ).toBeInTheDocument()
        })

        it('renders the recent products section', () => {
            render(<ProfileActivityFeed profile={profile} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Recently Managed Products',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('profile data propagation', () => {
        it('passes summary data to the admin summary section', () => {
            render(<ProfileActivityFeed profile={profile} loading={false} />)

            expect(screen.getByText('120')).toBeInTheDocument()
            expect(screen.getByText('45')).toBeInTheDocument()
            expect(screen.getByText('Administrator')).toBeInTheDocument()
            expect(screen.getByText('active')).toBeInTheDocument()
        })

        it('passes activities to the recent activity section', () => {
            render(<ProfileActivityFeed profile={profile} loading={false} />)

            expect(screen.getByText('Jane Doe')).toBeInTheDocument()
            expect(screen.getByText('Product A')).toBeInTheDocument()
        })

        it('passes recent products to the recent products section', () => {
            render(<ProfileActivityFeed profile={profile} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 4,
                    name: 'Wireless Headphones',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    level: 4,
                    name: 'Mechanical Keyboard',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('section order', () => {
        it('renders the sections in the expected order', () => {
            const { container } = render(
                <ProfileActivityFeed profile={profile} loading={false} />,
            )

            const feed = container.firstElementChild

            expect(feed?.children).toHaveLength(3)
            expect(feed?.children[0]).toHaveTextContent('Admin Summary')
            expect(feed?.children[1]).toHaveTextContent('Recent Activity')
            expect(feed?.children[2]).toHaveTextContent(
                'Recently Managed Products',
            )
        })
    })
})

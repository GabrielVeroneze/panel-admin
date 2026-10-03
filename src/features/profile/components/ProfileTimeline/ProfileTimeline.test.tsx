import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProfileTimeline } from './ProfileTimeline'
import type { UserProfile } from '@/features/profile/types'

describe('ProfileTimeline', () => {
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
        activities: [],
        recentProducts: [],
        experience: [
            {
                id: 1,
                period: '2020 - 2022',
                title: 'Frontend Developer',
                organization: 'Tech Company',
                description:
                    'Developed and maintained web applications using modern frontend technologies.',
            },
            {
                id: 2,
                period: '2018 - 2020',
                title: 'Junior Developer',
                organization: 'Another Company',
                description: 'Worked on web development projects.',
            },
        ],
        education: [
            {
                id: 3,
                period: '2014 - 2018',
                title: 'Computer Science',
                organization: 'University',
                description: 'Bachelor degree in Computer Science.',
            },
            {
                id: 4,
                period: '2012 - 2014',
                title: 'Technical Course',
                organization: 'Technical School',
                description: 'Technical course in software development.',
            },
        ],
    }

    describe('loading state', () => {
        it('renders the timeline skeleton when loading', () => {
            const { container } = render(
                <ProfileTimeline profile={profile} loading />,
            )

            expect(container.firstElementChild).toHaveClass('timeline')
            expect(container.firstElementChild?.tagName).toBe('SECTION')
        })

        it('does not render the timeline sections while loading', () => {
            render(<ProfileTimeline profile={profile} loading />)

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Experience',
                }),
            ).not.toBeInTheDocument()

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Education',
                }),
            ).not.toBeInTheDocument()
        })
    })

    describe('unavailable profile', () => {
        it('renders the empty state when profile is null', () => {
            render(<ProfileTimeline profile={null} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Timeline unavailable',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByText(
                    'Experience and education history could not be loaded.',
                ),
            ).toBeInTheDocument()
        })

        it('does not render the timeline sections when profile is unavailable', () => {
            render(<ProfileTimeline profile={null} loading={false} />)

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Experience',
                }),
            ).not.toBeInTheDocument()

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Education',
                }),
            ).not.toBeInTheDocument()
        })
    })

    describe('profile data', () => {
        it('renders the timeline container', () => {
            const { container } = render(
                <ProfileTimeline profile={profile} loading={false} />,
            )

            expect(container.firstElementChild).toHaveClass('timeline')
            expect(container.firstElementChild?.tagName).toBe('SECTION')
        })

        it('renders the experience section', () => {
            render(<ProfileTimeline profile={profile} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Experience',
                }),
            ).toBeInTheDocument()
        })

        it('renders the education section', () => {
            render(<ProfileTimeline profile={profile} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Education',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('profile data propagation', () => {
        it('renders the experience items', () => {
            render(<ProfileTimeline profile={profile} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 4,
                    name: 'Frontend Developer',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    level: 4,
                    name: 'Junior Developer',
                }),
            ).toBeInTheDocument()
        })

        it('renders the education items', () => {
            render(<ProfileTimeline profile={profile} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 4,
                    name: 'Computer Science',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    level: 4,
                    name: 'Technical Course',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('section order', () => {
        it('renders experience before education', () => {
            const { container } = render(
                <ProfileTimeline profile={profile} loading={false} />,
            )

            const timeline = container.firstElementChild

            expect(timeline?.children).toHaveLength(2)
            expect(timeline?.children[0]).toHaveTextContent('Experience')
            expect(timeline?.children[1]).toHaveTextContent('Education')
        })
    })
})

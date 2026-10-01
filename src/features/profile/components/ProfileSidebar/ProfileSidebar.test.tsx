import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProfileSidebar } from './ProfileSidebar'

describe('ProfileSidebar', () => {
    const profile = {
        id: 1,
        avatar: '/avatar.jpg',
        name: 'John Doe',
        role: 'Administrator',
        country: 'Brazil',
        contact: {
            email: 'john@example.com',
            address: '123 Main Street, São Paulo',
            phone: '+55 11 99999-9999',
        },
        about: 'Software developer with 10 years of experience.',
        skills: [
            {
                id: 'javascript',
                label: 'JavaScript',
            },
            {
                id: 'typescript',
                label: 'TypeScript',
            },
        ],
        summary: {
            products: {
                count: 100,
                variation: 10,
            },
            users: {
                count: 50,
                variation: 5,
            },
            profile: {
                role: 'Administrator',
                status: 'active' as const,
                lastLogin: '2026-09-30',
                memberSince: '2020-01-01',
            },
        },
        activities: [],
        recentProducts: [],
        experience: [],
        education: [],
    }

    describe('loading state', () => {
        it('renders the sidebar skeleton while loading', () => {
            render(<ProfileSidebar profile={null} loading />)

            const sidebar = screen.getByRole('complementary')

            expect(sidebar).toBeInTheDocument()
        })

        it('does not render profile information while loading', () => {
            render(<ProfileSidebar profile={profile} loading />)

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Contact Information',
                }),
            ).not.toBeInTheDocument()

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'About me',
                }),
            ).not.toBeInTheDocument()

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Software Skills',
                }),
            ).not.toBeInTheDocument()
        })
    })

    describe('unavailable profile', () => {
        it('renders the empty state when profile is unavailable', () => {
            render(<ProfileSidebar profile={null} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Profile details unavailable',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByText(
                    'Personal information, contact details, and skills could not be loaded.',
                ),
            ).toBeInTheDocument()
        })

        it('does not render profile information when profile is unavailable', () => {
            render(<ProfileSidebar profile={null} loading={false} />)

            expect(
                screen.queryByRole('heading', {
                    level: 2,
                    name: 'John Doe',
                }),
            ).not.toBeInTheDocument()

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Contact Information',
                }),
            ).not.toBeInTheDocument()
        })
    })

    describe('loaded profile', () => {
        it('renders the profile header information', () => {
            render(<ProfileSidebar profile={profile} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 2,
                    name: 'John Doe',
                }),
            ).toBeInTheDocument()

            expect(screen.getByText('Administrator')).toBeInTheDocument()
            expect(screen.getByText('Brazil')).toBeInTheDocument()
        })

        it('renders the contact information', () => {
            render(<ProfileSidebar profile={profile} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Contact Information',
                }),
            ).toBeInTheDocument()

            expect(screen.getByText('john@example.com')).toBeInTheDocument()

            expect(
                screen.getByText('123 Main Street, São Paulo'),
            ).toBeInTheDocument()

            expect(screen.getByText('+55 11 99999-9999')).toBeInTheDocument()
        })

        it('renders the about section', () => {
            render(<ProfileSidebar profile={profile} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'About me',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByText(
                    'Software developer with 10 years of experience.',
                ),
            ).toBeInTheDocument()
        })

        it('renders the software skills', () => {
            render(<ProfileSidebar profile={profile} loading={false} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Software Skills',
                }),
            ).toBeInTheDocument()

            expect(screen.getByText('JavaScript')).toBeInTheDocument()
            expect(screen.getByText('TypeScript')).toBeInTheDocument()
        })

        it('renders all profile sections inside the sidebar', () => {
            render(<ProfileSidebar profile={profile} loading={false} />)

            expect(screen.getByRole('complementary')).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    level: 2,
                    name: 'John Doe',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Contact Information',
                }),
            ).toBeInTheDocument()

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
        })
    })

    describe('loading priority', () => {
        it('renders the loading state when both profile and loading are provided', () => {
            render(<ProfileSidebar profile={profile} loading />)

            expect(screen.getByRole('complementary')).toBeInTheDocument()

            expect(
                screen.queryByRole('heading', {
                    level: 2,
                    name: 'John Doe',
                }),
            ).not.toBeInTheDocument()

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Profile details unavailable',
                }),
            ).not.toBeInTheDocument()
        })
    })
})

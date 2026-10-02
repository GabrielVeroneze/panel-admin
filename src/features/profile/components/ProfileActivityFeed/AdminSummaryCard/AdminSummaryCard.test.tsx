import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AdminSummaryCard } from './AdminSummaryCard'

vi.mock('@/shared/utils', () => ({
    formatDate: vi.fn(() => 'Jan 15, 2025'),
    formatRelativeTime: vi.fn(() => '2 hours ago'),
}))

describe('AdminSummaryCard', () => {
    const products = {
        count: 120,
        variation: 10,
    }

    const users = {
        count: 85,
        variation: -5,
    }

    const profile = {
        role: 'Administrator',
        status: 'active' as const,
        lastLogin: '2025-01-15T10:00:00.000Z',
        memberSince: '2024-01-15T10:00:00.000Z',
    }

    describe('admin summary', () => {
        it('renders the section title', () => {
            render(
                <AdminSummaryCard
                    products={products}
                    users={users}
                    profile={profile}
                />,
            )

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Admin Summary',
                }),
            ).toBeInTheDocument()
        })

        it('renders the total products statistic', () => {
            render(
                <AdminSummaryCard
                    products={products}
                    users={users}
                    profile={profile}
                />,
            )

            expect(screen.getByText('Total Products')).toBeInTheDocument()
            expect(screen.getByText('120')).toBeInTheDocument()
            expect(screen.getByText('+10 this month')).toBeInTheDocument()
        })

        it('renders the total users statistic', () => {
            render(
                <AdminSummaryCard
                    products={products}
                    users={users}
                    profile={profile}
                />,
            )

            expect(screen.getByText('Total Users')).toBeInTheDocument()
            expect(screen.getByText('85')).toBeInTheDocument()
            expect(screen.getByText('-5 this month')).toBeInTheDocument()
        })

        it('renders the profile role', () => {
            render(
                <AdminSummaryCard
                    products={products}
                    users={users}
                    profile={profile}
                />,
            )

            expect(screen.getByText('Role')).toBeInTheDocument()
            expect(screen.getByText('Administrator')).toBeInTheDocument()
        })

        it('renders the profile status', () => {
            render(
                <AdminSummaryCard
                    products={products}
                    users={users}
                    profile={profile}
                />,
            )

            expect(screen.getByText('Status')).toBeInTheDocument()
            expect(screen.getByText('active')).toBeInTheDocument()
        })

        it('renders the last login using the relative time formatter', () => {
            render(
                <AdminSummaryCard
                    products={products}
                    users={users}
                    profile={profile}
                />,
            )

            expect(screen.getByText('Last Login')).toBeInTheDocument()
            expect(screen.getByText('2 hours ago')).toBeInTheDocument()
        })

        it('renders the member since date using the date formatter', () => {
            render(
                <AdminSummaryCard
                    products={products}
                    users={users}
                    profile={profile}
                />,
            )

            expect(screen.getByText('Member since')).toBeInTheDocument()
            expect(screen.getByText('Jan 15, 2025')).toBeInTheDocument()
        })
    })

    describe('profile status', () => {
        it('renders an active profile with the green badge', () => {
            render(
                <AdminSummaryCard
                    products={products}
                    users={users}
                    profile={profile}
                />,
            )

            const status = screen.getByText('active')

            expect(status).toHaveClass('badge', 'green')
        })

        it('renders an inactive profile with the red badge', () => {
            render(
                <AdminSummaryCard
                    products={products}
                    users={users}
                    profile={{
                        ...profile,
                        status: 'inactive',
                    }}
                />,
            )

            const status = screen.getByText('inactive')

            expect(status).toHaveClass('badge', 'red')
        })
    })

    describe('date formatting', () => {
        it('passes the last login date to the relative time formatter', async () => {
            const { formatRelativeTime } = await import('@/shared/utils')

            render(
                <AdminSummaryCard
                    products={products}
                    users={users}
                    profile={profile}
                />,
            )

            expect(formatRelativeTime).toHaveBeenCalledWith(profile.lastLogin)
        })

        it('passes the member since date to the date formatter', async () => {
            const { formatDate } = await import('@/shared/utils')

            render(
                <AdminSummaryCard
                    products={products}
                    users={users}
                    profile={profile}
                />,
            )

            expect(formatDate).toHaveBeenCalledWith(profile.memberSince)
        })
    })

    describe('structure', () => {
        it('renders the statistics inside the stats container', () => {
            const { container } = render(
                <AdminSummaryCard
                    products={products}
                    users={users}
                    profile={profile}
                />,
            )

            const stats = container.querySelector('[class*="stats"]')

            expect(stats).toBeInTheDocument()
            expect(stats?.children).toHaveLength(2)
        })

        it('renders the details inside the details container', () => {
            const { container } = render(
                <AdminSummaryCard
                    products={products}
                    users={users}
                    profile={profile}
                />,
            )

            const details = container.querySelector('[class*="details"]')

            expect(details).toBeInTheDocument()
            expect(details?.children).toHaveLength(4)
        })

        it('renders all administrative detail labels', () => {
            render(
                <AdminSummaryCard
                    products={products}
                    users={users}
                    profile={profile}
                />,
            )

            expect(screen.getByText('Role')).toBeInTheDocument()
            expect(screen.getByText('Status')).toBeInTheDocument()
            expect(screen.getByText('Last Login')).toBeInTheDocument()
            expect(screen.getByText('Member since')).toBeInTheDocument()
        })
    })

    describe('unavailable information', () => {
        it('renders the empty state when products are unavailable', () => {
            render(
                <AdminSummaryCard
                    products={null as unknown as typeof products}
                    users={users}
                    profile={profile}
                />,
            )

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Admin summary unavailable',
                }),
            ).toBeInTheDocument()
        })

        it('renders the empty state when users are unavailable', () => {
            render(
                <AdminSummaryCard
                    products={products}
                    users={null as unknown as typeof users}
                    profile={profile}
                />,
            )

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Admin summary unavailable',
                }),
            ).toBeInTheDocument()
        })

        it('renders the empty state when profile is unavailable', () => {
            render(
                <AdminSummaryCard
                    products={products}
                    users={users}
                    profile={null as unknown as typeof profile}
                />,
            )

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Admin summary unavailable',
                }),
            ).toBeInTheDocument()
        })

        it('does not render the admin summary when information is unavailable', () => {
            render(
                <AdminSummaryCard
                    products={products}
                    users={null as unknown as typeof users}
                    profile={profile}
                />,
            )

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Admin Summary',
                }),
            ).not.toBeInTheDocument()

            expect(screen.queryByText('Total Products')).not.toBeInTheDocument()
            expect(screen.queryByText('Total Users')).not.toBeInTheDocument()
        })
    })
})

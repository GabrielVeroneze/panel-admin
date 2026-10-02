import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RecentActivityCard } from './RecentActivityCard'

describe('RecentActivityCard', () => {
    const activities = [
        {
            id: 1,
            type: 'user-created' as const,
            target: 'John Doe',
            createdAt: '2025-01-15T10:00:00.000Z',
        },
        {
            id: 2,
            type: 'product-updated' as const,
            target: 'Product A',
            createdAt: '2025-01-14T10:00:00.000Z',
        },
        {
            id: 3,
            type: 'password-changed' as const,
            target: 'Admin account',
            createdAt: '2025-01-13T10:00:00.000Z',
        },
    ]

    describe('activity information', () => {
        it('renders the section title', () => {
            render(<RecentActivityCard activities={activities} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Recent Activity',
                }),
            ).toBeInTheDocument()
        })

        it('renders all activity targets', () => {
            render(<RecentActivityCard activities={activities} />)

            expect(screen.getByText('John Doe')).toBeInTheDocument()
            expect(screen.getByText('Product A')).toBeInTheDocument()
            expect(screen.getByText('Admin account')).toBeInTheDocument()
        })

        it('renders all configured activity titles', () => {
            render(<RecentActivityCard activities={activities} />)

            expect(screen.getByText('Created User')).toBeInTheDocument()
            expect(screen.getByText('Updated Product')).toBeInTheDocument()
            expect(screen.getByText('Changed Password')).toBeInTheDocument()
        })
    })

    describe('activity list', () => {
        it('renders the activities inside the activities container', () => {
            const { container } = render(
                <RecentActivityCard activities={activities} />,
            )

            const activityList = container.querySelector(
                '[class*="activities"]',
            )

            expect(activityList).toBeInTheDocument()
            expect(activityList?.children).toHaveLength(3)
        })

        it('renders an activity item for each activity', () => {
            const { container } = render(
                <RecentActivityCard activities={activities} />,
            )

            const activityList = container.querySelector(
                '[class*="activities"]',
            )

            expect(activityList?.children[0]).toBeInTheDocument()
            expect(activityList?.children[1]).toBeInTheDocument()
            expect(activityList?.children[2]).toBeInTheDocument()
        })

        it('preserves the activity order', () => {
            const { container } = render(
                <RecentActivityCard activities={activities} />,
            )

            const activityList = container.querySelector(
                '[class*="activities"]',
            )
            const items = Array.from(activityList?.children ?? [])

            expect(items[0]).toHaveTextContent('John Doe')
            expect(items[1]).toHaveTextContent('Product A')
            expect(items[2]).toHaveTextContent('Admin account')
        })
    })

    describe('unavailable information', () => {
        it('renders the empty state when activities are empty', () => {
            render(<RecentActivityCard activities={[]} />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Activity history unavailable',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByText(
                    'Recent administrative activity could not be loaded.',
                ),
            ).toBeInTheDocument()
        })

        it('renders the empty state when activities are null', () => {
            render(
                <RecentActivityCard
                    activities={null as unknown as typeof activities}
                />,
            )

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'Activity history unavailable',
                }),
            ).toBeInTheDocument()
        })

        it('does not render the activity section when activities are unavailable', () => {
            render(<RecentActivityCard activities={[]} />)

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'Recent Activity',
                }),
            ).not.toBeInTheDocument()

            expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
        })
    })
})

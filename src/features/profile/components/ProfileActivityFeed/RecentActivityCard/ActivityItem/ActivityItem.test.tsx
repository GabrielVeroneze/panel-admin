import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ActivityItem } from './ActivityItem'

vi.mock('@/shared/utils', () => ({
    formatRelativeTime: vi.fn(() => '2 hours ago'),
}))

describe('ActivityItem', () => {
    const activity = {
        id: 1,
        type: 'user-created' as const,
        target: 'John Doe',
        createdAt: '2025-01-15T10:00:00.000Z',
    }

    describe('activity information', () => {
        it('renders the configured activity title', () => {
            render(<ActivityItem {...activity} />)

            expect(
                screen.getByRole('heading', {
                    level: 4,
                    name: 'Created User',
                }),
            ).toBeInTheDocument()
        })

        it('renders the activity target', () => {
            render(<ActivityItem {...activity} />)

            expect(screen.getByText('John Doe')).toBeInTheDocument()
        })

        it('renders the formatted activity date', () => {
            render(<ActivityItem {...activity} />)

            expect(screen.getByText('2 hours ago')).toBeInTheDocument()
        })
    })

    describe('activity configuration', () => {
        it.each([
            ['user-created', 'Created User', 'green'],
            ['user-updated', 'Updated User', 'blue'],
            ['user-deleted', 'Deleted User', 'red'],
            ['product-created', 'Created Product', 'green'],
            ['product-updated', 'Updated Product', 'blue'],
            ['product-deleted', 'Deleted Product', 'red'],
            ['product-image-uploaded', 'Uploaded Product Image', 'orange'],
            ['profile-avatar-updated', 'Updated Profile Avatar', 'orange'],
            ['password-changed', 'Changed Password', 'purple'],
            ['admin-login', 'Admin Login', 'purple'],
        ] as const)(
            'renders the expected configuration for %s',
            (type, title, variant) => {
                render(<ActivityItem {...activity} type={type} />)

                expect(
                    screen.getByRole('heading', {
                        level: 4,
                        name: title,
                    }),
                ).toBeInTheDocument()

                const iconWrapper = screen.getByRole('heading', {
                    level: 4,
                    name: title,
                }).parentElement?.previousElementSibling

                expect(iconWrapper).toHaveClass('iconWrapper', variant)
            },
        )
    })

    describe('date formatting', () => {
        it('passes the activity creation date to formatRelativeTime', async () => {
            const { formatRelativeTime } = await import('@/shared/utils')

            render(<ActivityItem {...activity} />)

            expect(formatRelativeTime).toHaveBeenCalledWith(activity.createdAt)
        })
    })

    describe('structure', () => {
        it('renders the activity item container', () => {
            const { container } = render(<ActivityItem {...activity} />)

            expect(container.firstElementChild).toHaveClass('item')
        })

        it('renders the activity content inside the content container', () => {
            const { container } = render(<ActivityItem {...activity} />)

            const content = container.querySelector('[class*="content"]')

            expect(content).toBeInTheDocument()
            expect(content).toContainElement(
                screen.getByRole('heading', {
                    level: 4,
                    name: 'Created User',
                }),
            )
            expect(content).toContainElement(screen.getByText('John Doe'))
            expect(content).toContainElement(screen.getByText('2 hours ago'))
        })

        it('renders the activity title as a level-four heading', () => {
            render(<ActivityItem {...activity} />)

            expect(
                screen.getByRole('heading', {
                    level: 4,
                    name: 'Created User',
                }),
            ).toBeInTheDocument()
        })

        it('renders the target as a paragraph', () => {
            render(<ActivityItem {...activity} />)

            const target = screen.getByText('John Doe')

            expect(target.tagName).toBe('P')
            expect(target).toHaveClass('target')
        })

        it('renders the date inside the date container', () => {
            const { container } = render(<ActivityItem {...activity} />)

            const date = container.querySelector('[class*="date"]')

            expect(date).toBeInTheDocument()
            expect(date).toHaveTextContent('2 hours ago')
        })
    })
})

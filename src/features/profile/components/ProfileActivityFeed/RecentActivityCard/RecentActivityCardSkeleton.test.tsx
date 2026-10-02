import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { RecentActivityCardSkeleton } from './RecentActivityCardSkeleton'

describe('RecentActivityCardSkeleton', () => {
    describe('structure', () => {
        it('renders the profile section card skeleton', () => {
            const { container } = render(<RecentActivityCardSkeleton />)

            expect(container.firstElementChild).toHaveClass(
                'card',
                'skeleton',
                'default',
            )
        })

        it('renders the activities container inside the content area', () => {
            const { container } = render(<RecentActivityCardSkeleton />)

            const content = container.querySelector('[class*="content"]')
            const activities = content?.firstElementChild

            expect(content).toBeInTheDocument()
            expect(activities).toBeInTheDocument()
            expect(activities).toHaveClass('activities', 'skeleton')
        })

        it('renders five activity skeletons', () => {
            const { container } = render(<RecentActivityCardSkeleton />)

            const activities = container.querySelector('[class*="activities"]')

            expect(activities?.children).toHaveLength(5)
        })

        it('renders the activities container with the expected skeleton items', () => {
            const { container } = render(<RecentActivityCardSkeleton />)

            const activities = container.querySelector('[class*="activities"]')

            expect(activities?.children).toHaveLength(5)

            Array.from(activities?.children ?? []).forEach((item) => {
                expect(item).toHaveClass('activitySkeleton')
            })
        })
    })
})

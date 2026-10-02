import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { AdminSummaryCardSkeleton } from './AdminSummaryCardSkeleton'

describe('AdminSummaryCardSkeleton', () => {
    describe('structure', () => {
        it('renders the profile section card skeleton', () => {
            const { container } = render(<AdminSummaryCardSkeleton />)

            expect(container.firstElementChild).toHaveClass(
                'card',
                'skeleton',
                'default',
            )
        })

        it('renders the stats container inside the content area', () => {
            const { container } = render(<AdminSummaryCardSkeleton />)

            const content = container.querySelector('[class*="content"]')
            const stats = content?.firstElementChild

            expect(content).toBeInTheDocument()
            expect(stats).toBeInTheDocument()
            expect(stats).toHaveClass('stats', 'skeleton')
        })

        it('renders two statistic skeletons', () => {
            const { container } = render(<AdminSummaryCardSkeleton />)

            const stats = container.querySelector('[class*="stats"]')

            expect(stats?.children).toHaveLength(2)
        })

        it('renders the details container inside the content area', () => {
            const { container } = render(<AdminSummaryCardSkeleton />)

            const content = container.querySelector('[class*="content"]')
            const details = content?.lastElementChild

            expect(content).toBeInTheDocument()
            expect(details).toBeInTheDocument()
            expect(details).toHaveClass('details', 'skeleton')
        })

        it('renders four detail skeletons', () => {
            const { container } = render(<AdminSummaryCardSkeleton />)

            const details = container.querySelector('[class*="details"]')

            expect(details?.children).toHaveLength(4)
        })

        it('renders the stats and details containers in the expected order', () => {
            const { container } = render(<AdminSummaryCardSkeleton />)

            const content = container.querySelector('[class*="content"]')

            expect(content?.children).toHaveLength(2)
            expect(content?.children[0]).toHaveClass('stats', 'skeleton')
            expect(content?.children[1]).toHaveClass('details', 'skeleton')
        })
    })
})

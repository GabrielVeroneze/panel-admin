import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { ProfileActivityFeedSkeleton } from './ProfileActivityFeedSkeleton'

describe('ProfileActivityFeedSkeleton', () => {
    describe('structure', () => {
        it('renders the feed container', () => {
            const { container } = render(<ProfileActivityFeedSkeleton />)

            expect(container.firstElementChild?.tagName).toBe('SECTION')
            expect(container.firstElementChild).toHaveClass('feed')
        })

        it('renders all profile activity skeleton sections', () => {
            const { container } = render(<ProfileActivityFeedSkeleton />)

            const feed = container.firstElementChild

            expect(feed?.children).toHaveLength(3)
        })

        it('renders the admin summary skeleton first', () => {
            const { container } = render(<ProfileActivityFeedSkeleton />)

            const feed = container.firstElementChild

            expect(feed?.children[0]).toBeInTheDocument()
        })

        it('renders the recent activity skeleton second', () => {
            const { container } = render(<ProfileActivityFeedSkeleton />)

            const feed = container.firstElementChild

            expect(feed?.children[1]).toBeInTheDocument()
        })

        it('renders the recent products skeleton third', () => {
            const { container } = render(<ProfileActivityFeedSkeleton />)

            const feed = container.firstElementChild

            expect(feed?.children[2]).toBeInTheDocument()
        })
    })
})

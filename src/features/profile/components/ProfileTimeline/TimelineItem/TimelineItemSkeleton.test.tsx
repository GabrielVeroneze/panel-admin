import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { TimelineItemSkeleton } from './TimelineItemSkeleton'

describe('TimelineItemSkeleton', () => {
    describe('structure', () => {
        it('renders the timeline item container', () => {
            const { container } = render(<TimelineItemSkeleton />)

            expect(container.firstElementChild).toHaveClass('item', 'skeleton')
        })

        it('renders the indicator with dot and line skeletons', () => {
            const { container } = render(<TimelineItemSkeleton />)

            const indicator = container.querySelector('[class*="indicator"]')

            expect(indicator).toBeInTheDocument()
            expect(indicator?.children).toHaveLength(2)
            expect(indicator?.children[0]).toHaveClass('dot')
            expect(indicator?.children[1]).toHaveClass('line')
        })

        it('renders the content container', () => {
            const { container } = render(<TimelineItemSkeleton />)

            const content = container.querySelector('[class*="content"]')

            expect(content).toBeInTheDocument()
            expect(content?.children).toHaveLength(4)
        })

        it('renders the content skeletons in the expected order', () => {
            const { container } = render(<TimelineItemSkeleton />)

            const content = container.querySelector('[class*="content"]')

            expect(content?.children[0]).toHaveClass('periodSkeleton')
            expect(content?.children[1]).toHaveClass('titleSkeleton')
            expect(content?.children[2]).toHaveClass('organizationSkeleton')
            expect(content?.children[3]).toHaveClass('descriptionSkeleton')
        })
    })
})

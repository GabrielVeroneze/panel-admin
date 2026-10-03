import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { TimelineSectionSkeleton } from './TimelineSectionSkeleton'

describe('TimelineSectionSkeleton', () => {
    describe('structure', () => {
        it('renders the profile section card skeleton', () => {
            const { container } = render(<TimelineSectionSkeleton />)

            expect(container.firstElementChild).toHaveClass(
                'card',
                'skeleton',
                'default',
            )
        })

        it('renders the content container', () => {
            const { container } = render(<TimelineSectionSkeleton />)

            const content = container.querySelector('[class*="content"]')

            expect(content).toBeInTheDocument()
        })

        it('renders three timeline item skeletons', () => {
            const { container } = render(<TimelineSectionSkeleton />)

            const content = container.querySelector('[class*="content"]')

            expect(content?.children).toHaveLength(3)
        })

        it('renders the timeline item skeletons in the expected order', () => {
            const { container } = render(<TimelineSectionSkeleton />)

            const content = container.querySelector('[class*="content"]')

            expect(content?.children[0]).toHaveClass('item', 'skeleton')
            expect(content?.children[1]).toHaveClass('item', 'skeleton')
            expect(content?.children[2]).toHaveClass('item', 'skeleton')
        })
    })
})

import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { AboutSectionSkeleton } from './AboutSectionSkeleton'

describe('AboutSectionSkeleton', () => {
    describe('structure', () => {
        it('renders the compact profile section card skeleton', () => {
            const { container } = render(<AboutSectionSkeleton />)

            expect(container.firstElementChild).toHaveClass(
                'card',
                'skeleton',
                'compact',
            )
        })

        it('renders the description skeleton inside the content area', () => {
            const { container } = render(<AboutSectionSkeleton />)

            const content = container.querySelector('[class*="content"]')

            expect(content).toBeInTheDocument()
            expect(content?.children).toHaveLength(1)
        })

        it('renders the description skeleton with the expected structure', () => {
            const { container } = render(<AboutSectionSkeleton />)

            const content = container.querySelector('[class*="content"]')

            const description = content?.firstElementChild

            expect(description).toBeInTheDocument()
            expect(description?.tagName).toBe('DIV')
            expect(description).toHaveClass('description', 'skeleton')
        })

        it('renders a skeleton inside the description container', () => {
            const { container } = render(<AboutSectionSkeleton />)

            const description = container.querySelector(
                '[class*="description"]',
            )

            expect(description).toBeInTheDocument()
            expect(description?.children).toHaveLength(1)
        })
    })
})

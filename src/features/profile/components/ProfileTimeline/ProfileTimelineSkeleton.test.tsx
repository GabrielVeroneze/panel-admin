import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { ProfileTimelineSkeleton } from './ProfileTimelineSkeleton'

describe('ProfileTimelineSkeleton', () => {
    describe('structure', () => {
        it('renders the timeline container', () => {
            const { container } = render(<ProfileTimelineSkeleton />)

            expect(container.firstElementChild?.tagName).toBe('SECTION')
            expect(container.firstElementChild).toHaveClass('timeline')
        })

        it('renders two timeline section skeletons', () => {
            const { container } = render(<ProfileTimelineSkeleton />)

            const timeline = container.firstElementChild

            expect(timeline?.children).toHaveLength(2)
        })

        it('renders the timeline section skeletons in the expected order', () => {
            const { container } = render(<ProfileTimelineSkeleton />)

            const timeline = container.firstElementChild

            expect(timeline?.children[0]).toBeInTheDocument()
            expect(timeline?.children[1]).toBeInTheDocument()
        })
    })
})

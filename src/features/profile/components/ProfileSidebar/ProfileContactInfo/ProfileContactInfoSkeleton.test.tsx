import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { ProfileContactInfoSkeleton } from './ProfileContactInfoSkeleton'

describe('ProfileContactInfoSkeleton', () => {
    describe('structure', () => {
        it('renders the compact profile section card skeleton', () => {
            const { container } = render(<ProfileContactInfoSkeleton />)

            expect(container.firstElementChild).toHaveClass(
                'card',
                'skeleton',
                'compact',
            )
        })

        it('renders the contact items inside the content area', () => {
            const { container } = render(<ProfileContactInfoSkeleton />)

            const content = container.querySelector('[class*="content"]')

            expect(content).toBeInTheDocument()
            expect(content?.children).toHaveLength(1)
        })

        it('renders the contact information list', () => {
            const { container } = render(<ProfileContactInfoSkeleton />)

            const infoList = container.querySelector('[class*="infoList"]')

            expect(infoList).toBeInTheDocument()
            expect(infoList).toHaveClass('skeleton')
        })

        it('renders three contact item skeletons', () => {
            const { container } = render(<ProfileContactInfoSkeleton />)

            const infoList = container.querySelector('[class*="infoList"]')

            expect(infoList?.children).toHaveLength(3)
        })
    })
})

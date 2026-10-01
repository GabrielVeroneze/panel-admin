import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { ProfileHeaderSkeleton } from './ProfileHeaderSkeleton'

describe('ProfileHeaderSkeleton', () => {
    describe('content', () => {
        it('renders the avatar and profile information skeletons', () => {
            const { container } = render(<ProfileHeaderSkeleton />)

            const skeletons = container.querySelectorAll('[class*="skeleton"]')

            expect(skeletons).toHaveLength(5)
        })

        it('renders three information skeletons inside the info container', () => {
            const { container } = render(<ProfileHeaderSkeleton />)

            const info = container.querySelector('[class*="info"]')

            expect(info).toBeInTheDocument()
            expect(info?.children).toHaveLength(3)
        })
    })
})

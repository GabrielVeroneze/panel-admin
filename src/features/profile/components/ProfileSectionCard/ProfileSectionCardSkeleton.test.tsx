import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProfileSectionCardSkeleton } from './ProfileSectionCardSkeleton'

describe('ProfileSectionCardSkeleton', () => {
    describe('content', () => {
        it('renders the icon and title skeletons', () => {
            const { container } = render(
                <ProfileSectionCardSkeleton>
                    Content
                </ProfileSectionCardSkeleton>,
            )

            const skeletons = container.querySelectorAll('[class*="skeleton"]')

            expect(skeletons).toHaveLength(3)
        })

        it('renders the children', () => {
            render(
                <ProfileSectionCardSkeleton>
                    <p>Loading content</p>
                </ProfileSectionCardSkeleton>,
            )

            expect(screen.getByText('Loading content')).toBeInTheDocument()
        })
    })

    describe('variant', () => {
        it('uses the default variant when variant is not provided', () => {
            const { container } = render(
                <ProfileSectionCardSkeleton>
                    Content
                </ProfileSectionCardSkeleton>,
            )

            expect(container.firstElementChild).toHaveClass(
                'card',
                'skeleton',
                'default',
            )
        })

        it('uses the compact variant when provided', () => {
            const { container } = render(
                <ProfileSectionCardSkeleton variant="compact">
                    Content
                </ProfileSectionCardSkeleton>,
            )

            expect(container.firstElementChild).toHaveClass(
                'card',
                'skeleton',
                'compact',
            )
        })
    })
})

import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProfileSectionCard } from './ProfileSectionCard'

describe('ProfileSectionCard', () => {
    describe('content', () => {
        it('renders the title', () => {
            render(
                <ProfileSectionCard icon={<span>Icon</span>} title="About">
                    Content
                </ProfileSectionCard>,
            )

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'About',
                }),
            ).toBeInTheDocument()
        })

        it('renders the icon', () => {
            render(
                <ProfileSectionCard
                    icon={<span data-testid="section-icon">Icon</span>}
                    title="About"
                >
                    Content
                </ProfileSectionCard>,
            )

            expect(screen.getByTestId('section-icon')).toBeInTheDocument()
        })

        it('renders the children', () => {
            render(
                <ProfileSectionCard icon={<span>Icon</span>} title="About">
                    <p>Profile information</p>
                </ProfileSectionCard>,
            )

            expect(screen.getByText('Profile information')).toBeInTheDocument()
        })
    })

    describe('variant', () => {
        it('uses the default variant when variant is not provided', () => {
            const { container } = render(
                <ProfileSectionCard icon={<span>Icon</span>} title="About">
                    Content
                </ProfileSectionCard>,
            )

            expect(container.firstElementChild).toHaveClass('card', 'default')
        })

        it('uses the compact variant when provided', () => {
            const { container } = render(
                <ProfileSectionCard
                    icon={<span>Icon</span>}
                    title="About"
                    variant="compact"
                >
                    Content
                </ProfileSectionCard>,
            )

            expect(container.firstElementChild).toHaveClass('card', 'compact')
        })
    })
})

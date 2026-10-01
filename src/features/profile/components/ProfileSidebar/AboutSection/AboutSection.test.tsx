import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AboutSection } from './AboutSection'

describe('AboutSection', () => {
    describe('about information', () => {
        it('renders the about section with the provided description', () => {
            render(
                <AboutSection about="Software developer with 10 years of experience." />,
            )

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'About me',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByText(
                    'Software developer with 10 years of experience.',
                ),
            ).toBeInTheDocument()
        })

        it('renders the description inside a paragraph', () => {
            render(
                <AboutSection about="Software developer with 10 years of experience." />,
            )

            const description = screen.getByText(
                'Software developer with 10 years of experience.',
            )

            expect(description.tagName).toBe('P')
        })

        it('renders the compact profile section card', () => {
            const { container } = render(
                <AboutSection about="Software developer." />,
            )

            expect(container.firstElementChild).toHaveClass('card', 'compact')
        })
    })

    describe('unavailable information', () => {
        it('renders the empty state when about is empty', () => {
            render(<AboutSection about="" />)

            expect(
                screen.getByRole('heading', {
                    level: 3,
                    name: 'About section unavailable',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByText(
                    'No personal description or biography is available for this profile.',
                ),
            ).toBeInTheDocument()
        })

        it('does not render the about section when information is unavailable', () => {
            render(<AboutSection about="" />)

            expect(
                screen.queryByRole('heading', {
                    level: 3,
                    name: 'About me',
                }),
            ).not.toBeInTheDocument()
        })
    })
})

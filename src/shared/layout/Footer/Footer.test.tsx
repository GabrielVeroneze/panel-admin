import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Footer } from './Footer'

describe('Footer', () => {
    describe('rendering', () => {
        it('renders the current year and copyright text', () => {
            render(<Footer />)

            const currentYear = new Date().getFullYear()

            expect(
                screen.getByText(
                    `© ${currentYear} Gabriel Veroneze. Built for study purposes.`,
                ),
            ).toBeInTheDocument()
        })

        it('renders the social media navigation', () => {
            render(<Footer />)

            expect(
                screen.getByRole('navigation', {
                    name: 'Social media links',
                }),
            ).toBeInTheDocument()
        })

        it.each(['Facebook', 'Twitter', 'GitHub', 'Dribbble'])(
            'renders the %s social link',
            (name) => {
                render(<Footer />)

                expect(screen.getByRole('link', { name })).toBeInTheDocument()
            },
        )
    })

    describe('social links', () => {
        it.each(['Facebook', 'Twitter', 'GitHub', 'Dribbble'])(
            'uses the correct attributes for the %s link',
            (name) => {
                render(<Footer />)

                const link = screen.getByRole('link', { name })

                expect(link).toHaveAttribute('href', '#')
                expect(link).toHaveAttribute('target', '_blank')
                expect(link).toHaveAttribute('rel', 'noopener noreferrer')
            },
        )

        it('renders all four social links', () => {
            render(<Footer />)

            expect(screen.getAllByRole('link')).toHaveLength(4)
        })
    })
})

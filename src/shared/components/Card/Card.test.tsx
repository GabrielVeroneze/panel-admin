import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Card } from './Card'

describe('Card', () => {
    describe('rendering', () => {
        it('renders its children', () => {
            render(<Card data-testid="card">Card content</Card>)

            expect(screen.getByText('Card content')).toBeInTheDocument()
        })

        it('renders as a div by default', () => {
            render(<Card data-testid="card">Card content</Card>)

            expect(screen.getByTestId('card')).toHaveProperty('tagName', 'DIV')
        })

        it('applies the card class', () => {
            render(<Card data-testid="card">Card content</Card>)

            expect(screen.getByTestId('card')).toHaveClass('card')
        })

        it('applies a custom className', () => {
            render(
                <Card data-testid="card" className="featured-card">
                    Card content
                </Card>,
            )

            expect(screen.getByTestId('card')).toHaveClass(
                'card',
                'featured-card',
            )
        })
    })

    describe('polymorphic rendering', () => {
        it('renders as the specified element', () => {
            render(
                <Card as="section" data-testid="card">
                    Section content
                </Card>,
            )

            expect(screen.getByTestId('card')).toHaveProperty(
                'tagName',
                'SECTION',
            )
        })

        it('renders as an article', () => {
            render(
                <Card as="article" data-testid="card">
                    Article content
                </Card>,
            )

            expect(screen.getByTestId('card')).toHaveProperty(
                'tagName',
                'ARTICLE',
            )
        })

        it('renders as a button', () => {
            render(<Card as="button">Clickable card</Card>)

            expect(
                screen.getByRole('button', {
                    name: 'Clickable card',
                }),
            ).toBeInTheDocument()
        })

        it.each(['section', 'article', 'main', 'aside'] as const)(
            'renders as %s when specified',
            (element) => {
                render(
                    <Card as={element} data-testid="card">
                        Card content
                    </Card>,
                )

                expect(screen.getByTestId('card')).toHaveProperty(
                    'tagName',
                    element.toUpperCase(),
                )
            },
        )
    })

    describe('native props', () => {
        it('passes native props to the rendered element', () => {
            render(
                <Card
                    as="section"
                    id="main-card"
                    aria-label="Main card"
                    data-testid="card"
                >
                    Card content
                </Card>,
            )

            const card = screen.getByTestId('card')

            expect(card).toHaveAttribute('id', 'main-card')

            expect(card).toHaveAttribute('aria-label', 'Main card')
        })

        it('passes element-specific props when using a polymorphic element', () => {
            render(
                <Card as="a" href="/details">
                    View details
                </Card>,
            )

            const link = screen.getByRole('link', {
                name: 'View details',
            })

            expect(link).toHaveAttribute('href', '/details')
        })
    })
})

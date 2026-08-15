import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
    describe('rendering', () => {
        it('renders the tooltip', () => {
            render(
                <Tooltip
                    items={[
                        {
                            name: 'Users',
                            value: 42,
                        },
                    ]}
                />,
            )

            expect(screen.getByRole('tooltip')).toBeInTheDocument()
        })

        it('renders the title when provided', () => {
            render(
                <Tooltip
                    title="Statistics"
                    items={[
                        {
                            name: 'Users',
                            value: 42,
                        },
                    ]}
                />,
            )

            expect(screen.getByText('Statistics')).toBeInTheDocument()
        })

        it('does not render the title when not provided', () => {
            render(
                <Tooltip
                    items={[
                        {
                            name: 'Users',
                            value: 42,
                        },
                    ]}
                />,
            )

            expect(screen.queryByText('Statistics')).not.toBeInTheDocument()
        })

        it('renders all items', () => {
            render(
                <Tooltip
                    items={[
                        {
                            name: 'Users',
                            value: 42,
                        },
                        {
                            name: 'Revenue',
                            value: '$1,500',
                        },
                        {
                            name: 'Orders',
                            value: 18,
                        },
                    ]}
                />,
            )

            expect(screen.getByText('Users:')).toBeInTheDocument()

            expect(screen.getByText('42')).toBeInTheDocument()

            expect(screen.getByText('Revenue:')).toBeInTheDocument()

            expect(screen.getByText('$1,500')).toBeInTheDocument()

            expect(screen.getByText('Orders:')).toBeInTheDocument()

            expect(screen.getByText('18')).toBeInTheDocument()
        })

        it('renders the item color when provided', () => {
            render(
                <Tooltip
                    items={[
                        {
                            name: 'Users',
                            value: 42,
                            color: '#3b82f6',
                        },
                    ]}
                />,
            )

            const item = screen.getByText('Users:')
            const dot = item.previousElementSibling

            expect(dot).toBeInTheDocument()
            expect(dot).toHaveStyle({
                backgroundColor: '#3b82f6',
            })
        })

        it('does not render the color dot when color is not provided', () => {
            render(
                <Tooltip
                    items={[
                        {
                            name: 'Users',
                            value: 42,
                        },
                    ]}
                />,
            )

            const item = screen.getByText('Users:')

            expect(item.previousElementSibling).not.toBeInTheDocument()
        })
    })

    describe('arrow', () => {
        it('does not show the arrow by default', () => {
            render(
                <Tooltip
                    items={[
                        {
                            name: 'Users',
                            value: 42,
                        },
                    ]}
                />,
            )

            expect(screen.getByRole('tooltip')).not.toHaveClass('withArrow')
        })

        it('shows the arrow when showArrow is true', () => {
            render(
                <Tooltip
                    showArrow
                    items={[
                        {
                            name: 'Users',
                            value: 42,
                        },
                    ]}
                />,
            )

            expect(screen.getByRole('tooltip')).toHaveClass('withArrow')
        })
    })

    describe('items', () => {
        it.each([
            {
                name: 'Users',
                value: 42,
            },
            {
                name: 'Revenue',
                value: '$1,500',
            },
        ])('renders $name with value $value', ({ name, value }) => {
            render(
                <Tooltip
                    items={[
                        {
                            name,
                            value,
                        },
                    ]}
                />,
            )

            expect(screen.getByText(`${name}:`)).toBeInTheDocument()

            expect(screen.getByText(String(value))).toBeInTheDocument()
        })
    })
})

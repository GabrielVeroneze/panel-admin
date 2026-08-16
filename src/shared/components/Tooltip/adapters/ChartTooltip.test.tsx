import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChartTooltip } from './ChartTooltip'

describe('ChartTooltip', () => {
    describe('rendering', () => {
        it('returns nothing when inactive', () => {
            const { container } = render(
                <ChartTooltip
                    active={false}
                    payload={[]}
                    label="January"
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                />,
            )

            expect(container).toBeEmptyDOMElement()
        })

        it('returns nothing when payload is empty', () => {
            const { container } = render(
                <ChartTooltip
                    active
                    payload={[]}
                    label="January"
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                />,
            )

            expect(container).toBeEmptyDOMElement()
        })

        it('renders the label as the tooltip title', () => {
            render(
                <ChartTooltip
                    active
                    payload={[
                        {
                            name: 'Sales',
                            value: 1500,
                            color: '#3b82f6',
                        },
                    ]}
                    label="January"
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                />,
            )

            expect(screen.getByText('January')).toBeInTheDocument()
        })

        it('renders all payload items', () => {
            render(
                <ChartTooltip
                    active
                    payload={[
                        {
                            name: 'Sales',
                            value: 1500,
                            color: '#3b82f6',
                        },
                        {
                            name: 'Orders',
                            value: 25,
                            color: '#22c55e',
                        },
                    ]}
                    label="January"
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                />,
            )

            expect(screen.getByText('Sales:')).toBeInTheDocument()

            expect(screen.getByText('1500')).toBeInTheDocument()

            expect(screen.getByText('Orders:')).toBeInTheDocument()

            expect(screen.getByText('25')).toBeInTheDocument()
        })
    })

    describe('label formatting', () => {
        it('uses the labelFormatter when provided', () => {
            const labelFormatter = vi.fn(() => 'January 2026')

            render(
                <ChartTooltip
                    active
                    payload={[
                        {
                            name: 'Sales',
                            value: 1500,
                        },
                    ]}
                    label="Jan"
                    labelFormatter={labelFormatter}
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                />,
            )

            expect(screen.getByText('January 2026')).toBeInTheDocument()

            expect(screen.queryByText('Jan')).not.toBeInTheDocument()

            expect(labelFormatter).toHaveBeenCalledTimes(1)

            expect(labelFormatter).toHaveBeenCalledWith(
                'Jan',
                expect.any(Array),
            )
        })

        it('uses the original label when labelFormatter is not provided', () => {
            render(
                <ChartTooltip
                    active
                    payload={[
                        {
                            name: 'Sales',
                            value: 1500,
                        },
                    ]}
                    label="January"
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                />,
            )

            expect(screen.getByText('January')).toBeInTheDocument()
        })

        it('does not render a title when the formatted label is null', () => {
            render(
                <ChartTooltip
                    active
                    payload={[
                        {
                            name: 'Sales',
                            value: 1500,
                        },
                    ]}
                    label="January"
                    labelFormatter={() => null}
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                />,
            )

            expect(screen.queryByText('January')).not.toBeInTheDocument()

            expect(screen.getByText('Sales:')).toBeInTheDocument()
        })
    })

    describe('value formatting', () => {
        it('uses the original value when formatter is not provided', () => {
            render(
                <ChartTooltip
                    active
                    payload={[
                        {
                            name: 'Sales',
                            value: 1500,
                        },
                    ]}
                    label="January"
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                />,
            )

            expect(screen.getByText('1500')).toBeInTheDocument()
        })

        it('uses the formatter when provided', () => {
            const formatter = vi.fn(() => '$1,500')

            render(
                <ChartTooltip
                    active
                    payload={[
                        {
                            name: 'Sales',
                            value: 1500,
                        },
                    ]}
                    label="January"
                    formatter={formatter}
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                />,
            )

            expect(screen.getByText('$1,500')).toBeInTheDocument()

            expect(screen.queryByText('1500')).not.toBeInTheDocument()

            expect(formatter).toHaveBeenCalledTimes(1)

            expect(formatter).toHaveBeenCalledWith(
                1500,
                'Sales',
                expect.objectContaining({
                    name: 'Sales',
                    value: 1500,
                }),
                0,
                expect.any(Array),
            )
        })
    })

    describe('payload mapping', () => {
        it('uses the payload color when provided', () => {
            render(
                <ChartTooltip
                    active
                    payload={[
                        {
                            name: 'Sales',
                            value: 1500,
                            color: '#3b82f6',
                            payload: {
                                fill: '#ef4444',
                            },
                        },
                    ]}
                    label="January"
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                />,
            )

            const label = screen.getByText('Sales:')
            const dot = label.previousElementSibling

            expect(dot).toHaveStyle({
                backgroundColor: '#3b82f6',
            })
        })

        it('uses the payload fill when color is not provided', () => {
            render(
                <ChartTooltip
                    active
                    payload={[
                        {
                            name: 'Sales',
                            value: 1500,
                            payload: {
                                fill: '#ef4444',
                            },
                        },
                    ]}
                    label="January"
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                />,
            )

            const label = screen.getByText('Sales:')
            const dot = label.previousElementSibling

            expect(dot).toHaveStyle({
                backgroundColor: '#ef4444',
            })
        })

        it('does not render a color dot when neither color nor fill is provided', () => {
            render(
                <ChartTooltip
                    active
                    payload={[
                        {
                            name: 'Sales',
                            value: 1500,
                        },
                    ]}
                    label="January"
                    coordinate={undefined}
                    accessibilityLayer={false}
                    activeIndex={undefined}
                />,
            )

            const label = screen.getByText('Sales:')

            expect(label.previousElementSibling).not.toBeInTheDocument()
        })
    })
})

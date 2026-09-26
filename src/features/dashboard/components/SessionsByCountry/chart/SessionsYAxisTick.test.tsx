import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import { SessionsYAxisTick } from './SessionsYAxisTick'
import type { CartesianTickItem, YAxisTickContentProps } from 'recharts'

const createPayload = (
    value: string,
    overrides: Partial<CartesianTickItem> = {},
): CartesianTickItem => ({
    value,
    coordinate: 0,
    index: 0,
    ...overrides,
})

const createProps = (
    overrides: Partial<YAxisTickContentProps> = {},
): YAxisTickContentProps => ({
    x: 200,
    y: 100,
    payload: createPayload('BR'),
    index: 0,
    angle: 0,
    fill: undefined,
    stroke: '',
    textAnchor: 'middle',
    verticalAnchor: 'middle',
    visibleTicksCount: 1,
    orientation: 'left',
    padding: undefined,
    tickFormatter: undefined,
    ...overrides,
})

describe('SessionsYAxisTick', () => {
    it('renders the tick label', () => {
        const { container } = render(
            <svg>
                <SessionsYAxisTick {...createProps()} />
            </svg>,
        )

        expect(container.querySelector('text')).toHaveTextContent('BR')
    })

    it('renders the flag for a supported country code', () => {
        const { container } = render(
            <svg>
                <SessionsYAxisTick {...createProps()} />
            </svg>,
        )

        const group = container.querySelector('g')
        const flag = group?.querySelector('svg')

        expect(flag).toBeInTheDocument()
        expect(flag).toHaveAttribute('height', '14')
        expect(flag).toHaveAttribute('width', '20')
    })

    it('does not render a flag for an unsupported country code', () => {
        const { container } = render(
            <svg>
                <SessionsYAxisTick
                    {...createProps({
                        payload: createPayload('XX'),
                    })}
                />
            </svg>,
        )

        expect(container.querySelector('g > svg')).not.toBeInTheDocument()
        expect(container.querySelector('text')).toHaveTextContent('XX')
    })

    it('uses the tick formatter when provided', () => {
        const tickFormatter = vi.fn((value) => `Country ${value}`)

        const { container } = render(
            <svg>
                <SessionsYAxisTick
                    {...createProps({
                        tickFormatter,
                    })}
                />
            </svg>,
        )

        expect(tickFormatter).toHaveBeenCalledWith('BR', 0)
        expect(container.querySelector('text')).toHaveTextContent('Country BR')
    })

    it('uses the payload value when tick formatter is not provided', () => {
        const { container } = render(
            <svg>
                <SessionsYAxisTick
                    {...createProps({
                        payload: createPayload('US'),
                    })}
                />
            </svg>,
        )

        expect(container.querySelector('text')).toHaveTextContent('US')
    })

    it('renders the group with the expected transform', () => {
        const { container } = render(
            <svg>
                <SessionsYAxisTick
                    {...createProps({
                        x: 200,
                        y: 100,
                    })}
                />
            </svg>,
        )

        expect(container.querySelector('g')).toHaveAttribute(
            'transform',
            'translate(100, 93.5)',
        )
    })

    it('renders the text with the expected attributes', () => {
        const { container } = render(
            <svg>
                <SessionsYAxisTick {...createProps()} />
            </svg>,
        )

        const text = container.querySelector('text')

        expect(text).toHaveAttribute('x', '32')
        expect(text).toHaveAttribute('y', '11')
        expect(text).toHaveAttribute('text-anchor', 'start')
        expect(text).toHaveAttribute('fill', '#18181b')
        expect(text).toHaveAttribute('font-size', '12')
        expect(text).toHaveAttribute('font-weight', '500')
    })
})

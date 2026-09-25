import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { MetricCardSkeleton } from './MetricCardSkeleton'

describe('MetricCardSkeleton', () => {
    it('renders the skeleton container', () => {
        const { container } = render(<MetricCardSkeleton />)

        expect(container.firstElementChild).toHaveClass('container', 'skeleton')
    })

    it('renders the header', () => {
        const { container } = render(<MetricCardSkeleton />)

        expect(container.querySelector('.header')).toBeInTheDocument()
    })

    it('renders the title skeleton', () => {
        const { container } = render(<MetricCardSkeleton />)

        expect(container.querySelector('.titleSkeleton')).toBeInTheDocument()
    })

    it('renders the value skeleton', () => {
        const { container } = render(<MetricCardSkeleton />)

        expect(container.querySelector('.valueSkeleton')).toBeInTheDocument()
    })

    it('renders the variation skeleton', () => {
        const { container } = render(<MetricCardSkeleton />)

        expect(
            container.querySelector('.variationSkeleton'),
        ).toBeInTheDocument()
    })

    it('renders the chart skeleton inside the chart container', () => {
        const { container } = render(<MetricCardSkeleton />)

        const chartContainer =
            container.querySelector<HTMLElement>('.chartContainer')

        const chartSkeleton =
            container.querySelector<HTMLElement>('.chartSkeleton')

        expect(chartContainer).toBeInTheDocument()
        expect(chartSkeleton).toBeInTheDocument()
        expect(chartContainer).toContainElement(chartSkeleton)
    })
})

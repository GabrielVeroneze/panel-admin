import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { SalesChartSkeleton } from './SalesChartSkeleton'

describe('SalesChartSkeleton', () => {
    it('renders the skeleton container', () => {
        const { container } = render(<SalesChartSkeleton />)

        expect(container.firstElementChild).toHaveClass('container', 'skeleton')
    })

    it('renders the header', () => {
        const { container } = render(<SalesChartSkeleton />)

        expect(container.querySelector('.header')).toBeInTheDocument()
    })

    it('renders the title skeleton', () => {
        const { container } = render(<SalesChartSkeleton />)

        expect(container.querySelector('.titleSkeleton')).toBeInTheDocument()
    })

    it('renders the icon skeleton', () => {
        const { container } = render(<SalesChartSkeleton />)

        expect(container.querySelector('.iconSkeleton')).toBeInTheDocument()
    })

    it('renders the group skeleton', () => {
        const { container } = render(<SalesChartSkeleton />)

        expect(container.querySelector('.groupSkeleton')).toBeInTheDocument()
    })

    it('renders three button skeletons', () => {
        const { container } = render(<SalesChartSkeleton />)

        expect(container.querySelectorAll('.buttonSkeleton')).toHaveLength(3)
    })

    it('renders the chart container', () => {
        const { container } = render(<SalesChartSkeleton />)

        expect(container.querySelector('.chartContainer')).toBeInTheDocument()
    })

    it('renders the chart skeleton', () => {
        const { container } = render(<SalesChartSkeleton />)

        expect(
            container.querySelector('.chartContainer > .chart'),
        ).toBeInTheDocument()
    })
})

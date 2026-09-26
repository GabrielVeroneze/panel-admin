import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { SessionsByCountrySkeleton } from './SessionsByCountrySkeleton'

describe('SessionsByCountrySkeleton', () => {
    it('renders the skeleton container', () => {
        const { container } = render(<SessionsByCountrySkeleton />)

        expect(container.firstElementChild).toHaveClass('container', 'skeleton')
    })

    it('renders the header', () => {
        const { container } = render(<SessionsByCountrySkeleton />)

        expect(container.querySelector('.header')).toBeInTheDocument()
    })

    it('renders the title skeleton', () => {
        const { container } = render(<SessionsByCountrySkeleton />)

        expect(container.querySelector('.titleSkeleton')).toBeInTheDocument()
    })

    it('renders the value skeleton', () => {
        const { container } = render(<SessionsByCountrySkeleton />)

        expect(container.querySelector('.valueSkeleton')).toBeInTheDocument()
    })

    it('renders the map container', () => {
        const { container } = render(<SessionsByCountrySkeleton />)

        expect(container.querySelector('.mapContainer')).toBeInTheDocument()
    })

    it('renders the map skeleton', () => {
        const { container } = render(<SessionsByCountrySkeleton />)

        expect(
            container.querySelector('.mapContainer > .mapSkeleton'),
        ).toBeInTheDocument()
    })

    it('renders the chart container', () => {
        const { container } = render(<SessionsByCountrySkeleton />)

        expect(container.querySelector('.chartContainer')).toBeInTheDocument()
    })

    it('renders the chart skeleton', () => {
        const { container } = render(<SessionsByCountrySkeleton />)

        expect(
            container.querySelector('.chartContainer > .chartSkeleton'),
        ).toBeInTheDocument()
    })
})

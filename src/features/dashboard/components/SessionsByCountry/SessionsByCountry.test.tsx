import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SessionsByCountry } from './SessionsByCountry'
import type { CountrySession } from '@/features/dashboard/types'

const data: CountrySession[] = [
    {
        countryCode: 'BR',
        countryName: 'Brazil',
        sessions: 12500,
        previousWeek: 10000,
    },
    {
        countryCode: 'US',
        countryName: 'United States',
        sessions: 9800,
        previousWeek: 10500,
    },
    {
        countryCode: 'DE',
        countryName: 'Germany',
        sessions: 7600,
        previousWeek: 7200,
    },
]

describe('SessionsByCountry', () => {
    it('renders the loading state', () => {
        const { container } = render(<SessionsByCountry loading />)

        expect(container.firstElementChild).toHaveClass('container', 'skeleton')
    })

    it('renders the empty state when data is not provided', () => {
        render(<SessionsByCountry />)

        expect(
            screen.getByRole('heading', { name: 'No session data' }),
        ).toBeVisible()

        expect(screen.getByText('No country sessions available.')).toBeVisible()
    })

    it('renders the title when data is provided', () => {
        render(<SessionsByCountry data={data} />)

        expect(
            screen.getByRole('heading', { name: 'Sessions by Country' }),
        ).toBeVisible()
    })

    it('renders the country with the most sessions as the top country', () => {
        render(<SessionsByCountry data={data} />)

        expect(screen.getByText('Brazil')).toBeVisible()
    })

    it('selects the top country based on sessions rather than input order', () => {
        const countries: CountrySession[] = [
            {
                countryCode: 'DE',
                countryName: 'Germany',
                sessions: 7600,
                previousWeek: 7200,
            },
            {
                countryCode: 'BR',
                countryName: 'Brazil',
                sessions: 12500,
                previousWeek: 10000,
            },
            {
                countryCode: 'US',
                countryName: 'United States',
                sessions: 9800,
                previousWeek: 10500,
            },
        ]

        render(<SessionsByCountry data={countries} />)

        const topCountry = screen.getByText('Brazil')

        expect(topCountry).toBeVisible()
        expect(topCountry.tagName).toBe('STRONG')
    })

    it('renders the map container', () => {
        const { container } = render(<SessionsByCountry data={data} />)

        expect(container.querySelector('.mapContainer')).toBeInTheDocument()
    })

    it('renders the map inside the map container', () => {
        const { container } = render(<SessionsByCountry data={data} />)

        expect(
            container.querySelector('.mapContainer svg.map'),
        ).toBeInTheDocument()
    })

    it('renders the chart container', () => {
        const { container } = render(<SessionsByCountry data={data} />)

        expect(container.querySelector('.chartContainer')).toBeInTheDocument()
    })

    it('renders the chart inside the chart container', () => {
        const { container } = render(<SessionsByCountry data={data} />)

        expect(
            container.querySelector('.chartContainer .chart'),
        ).toBeInTheDocument()
    })

    it('renders the empty state when data is an empty array', () => {
        render(<SessionsByCountry data={[]} />)

        expect(
            screen.getByRole('heading', { name: 'No session data' }),
        ).toBeInTheDocument()
        expect(
            screen.getByText('No country sessions available.'),
        ).toBeInTheDocument()
    })
})

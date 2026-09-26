import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { SessionsChart } from './SessionsChart'
import type { CountrySession } from '@/features/dashboard/types'

const topCountries: CountrySession[] = [
    {
        countryCode: 'BR',
        countryName: 'Brazil',
        sessions: 12500,
        previousWeek: 11000,
    },
    {
        countryCode: 'US',
        countryName: 'United States',
        sessions: 9800,
        previousWeek: 10200,
    },
    {
        countryCode: 'DE',
        countryName: 'Germany',
        sessions: 7600,
        previousWeek: 7200,
    },
]

describe('SessionsChart', () => {
    it('renders the chart', () => {
        const { container } = render(
            <SessionsChart topCountries={topCountries} />,
        )

        expect(container.firstElementChild).toBeInTheDocument()
    })

    it('applies the provided className to the chart', () => {
        const { container } = render(
            <SessionsChart
                className="sessionsChart"
                topCountries={topCountries}
            />,
        )

        expect(container.firstElementChild).toHaveClass('sessionsChart')
    })

    it('renders the chart with an empty data array', () => {
        const { container } = render(<SessionsChart topCountries={[]} />)

        expect(container.firstElementChild).toBeInTheDocument()
    })

    it('renders one chart element for the provided countries', () => {
        const { container } = render(
            <SessionsChart topCountries={topCountries} />,
        )

        expect(container.firstElementChild).toBeInTheDocument()
    })

    it('renders without a className when one is not provided', () => {
        const { container } = render(
            <SessionsChart topCountries={topCountries} />,
        )

        expect(container.firstElementChild).not.toHaveClass('sessionsChart')
    })
})

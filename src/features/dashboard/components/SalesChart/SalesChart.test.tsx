import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SalesChart } from './SalesChart'
import type { Sale } from '@/features/dashboard/types'

describe('SalesChart', () => {
    it('renders the loading state', () => {
        const { container } = render(<SalesChart loading />)

        expect(container.firstElementChild).toHaveClass('container', 'skeleton')
    })

    it('renders the empty state when data is not provided', () => {
        render(<SalesChart />)

        expect(
            screen.getByRole('heading', { name: 'No sales data' }),
        ).toBeVisible()

        expect(screen.getByText('There are no sales to display.')).toBeVisible()
    })

    it('renders the empty state when data is an empty array', () => {
        render(<SalesChart data={[]} />)

        expect(
            screen.getByRole('heading', { name: 'No sales data' }),
        ).toBeVisible()

        expect(screen.getByText('There are no sales to display.')).toBeVisible()
    })

    it('renders the title when data is provided', () => {
        const data: Sale[] = [
            {
                date: 'Jan',
                templates: 120000,
                hosting: 80000,
            },
        ]

        render(<SalesChart data={data} />)

        expect(screen.getByRole('heading', { name: 'Sales' })).toBeVisible()
    })

    it('renders the period filter buttons', () => {
        const data: Sale[] = [
            {
                date: 'Jan',
                templates: 120000,
                hosting: 80000,
            },
        ]

        render(<SalesChart data={data} />)

        expect(screen.getByRole('button', { name: 'Year' })).toBeVisible()
        expect(screen.getByRole('button', { name: 'Month' })).toBeVisible()
        expect(screen.getByRole('button', { name: 'Day' })).toBeVisible()
    })

    it('renders the chart container when data is provided', () => {
        const data: Sale[] = [
            {
                date: 'Jan',
                templates: 120000,
                hosting: 80000,
            },
        ]

        const { container } = render(<SalesChart data={data} />)

        expect(container.querySelector('.chartContainer')).toBeInTheDocument()
    })

    it('renders the chart when data is provided', () => {
        const data: Sale[] = [
            {
                date: 'Jan',
                templates: 120000,
                hosting: 80000,
            },
            {
                date: 'Feb',
                templates: 150000,
                hosting: 95000,
            },
            {
                date: 'Mar',
                templates: 180000,
                hosting: 110000,
            },
        ]

        const { container } = render(<SalesChart data={data} />)

        expect(container.querySelector('.chart')).toBeInTheDocument()
    })
})

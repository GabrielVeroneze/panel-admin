import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TodaySales } from './TodaySales'
import type { TodaySale } from '@/features/dashboard/types'

describe('TodaySales', () => {
    it('renders the loading state', () => {
        const { container } = render(<TodaySales loading />)

        expect(container.firstElementChild).toHaveClass('container', 'skeleton')
    })

    it('renders the empty state when data is not provided', () => {
        render(<TodaySales />)

        expect(screen.getByRole('heading', { name: 'No data' })).toBeVisible()

        expect(screen.getByText('No sales today.')).toBeVisible()
    })

    it('renders the sales summary when data is provided', () => {
        const data: TodaySale = {
            summary: {
                total: 12500,
                variation: 12.5,
            },
            chart: [],
        }

        render(<TodaySales data={data} />)

        expect(
            screen.getByRole('heading', { name: 'Today Sales' }),
        ).toBeVisible()

        expect(screen.getByText('$12,500')).toBeVisible()
        expect(screen.getByText('12.5%')).toBeVisible()
    })

    it('renders the chart when data is provided', () => {
        const data: TodaySale = {
            summary: {
                total: 12500,
                variation: 12.5,
            },
            chart: [
                {
                    time: '09:00',
                    sales: 500,
                    profit: 200,
                },
                {
                    time: '10:00',
                    sales: 750,
                    profit: 300,
                },
            ],
        }

        const { container } = render(<TodaySales data={data} />)

        expect(container.querySelector('.chart')).toBeInTheDocument()
    })

    it('renders a negative variation when sales decreased', () => {
        const data: TodaySale = {
            summary: {
                total: 8500,
                variation: -8.4,
            },
            chart: [],
        }

        render(<TodaySales data={data} />)

        expect(screen.getByText('$8,500')).toBeVisible()
        expect(screen.getByText('-8.4%')).toBeVisible()
    })
})

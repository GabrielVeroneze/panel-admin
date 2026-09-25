import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TodayVisitors } from './TodayVisitors'
import type { TodayVisitor } from '@/features/dashboard/types'

describe('TodayVisitors', () => {
    it('renders the loading state', () => {
        const { container } = render(<TodayVisitors loading />)

        expect(container.firstElementChild).toHaveClass('container', 'skeleton')
    })

    it('renders the empty state when data is not provided', () => {
        render(<TodayVisitors />)

        expect(screen.getByRole('heading', { name: 'No data' })).toBeVisible()

        expect(screen.getByText('No visitors recorded.')).toBeVisible()
    })

    it('renders the visitors summary when data is provided', () => {
        const data: TodayVisitor = {
            summary: {
                total: 12500,
                variation: 12.5,
            },
            chart: [],
        }

        render(<TodayVisitors data={data} />)

        expect(
            screen.getByRole('heading', { name: 'Today Visitors' }),
        ).toBeVisible()

        expect(screen.getByText('12,500')).toBeVisible()
        expect(screen.getByText('12.5%')).toBeVisible()
    })

    it('renders the chart when data is provided', () => {
        const data: TodayVisitor = {
            summary: {
                total: 12500,
                variation: 12.5,
            },
            chart: [
                {
                    time: '09:00',
                    visitors: 500,
                },
                {
                    time: '10:00',
                    visitors: 750,
                },
            ],
        }

        const { container } = render(<TodayVisitors data={data} />)

        expect(container.querySelector('.chart')).toBeInTheDocument()
    })

    it('renders a negative variation when visitors decreased', () => {
        const data: TodayVisitor = {
            summary: {
                total: 8500,
                variation: -8.4,
            },
            chart: [],
        }

        render(<TodayVisitors data={data} />)

        expect(screen.getByText('8,500')).toBeVisible()
        expect(screen.getByText('-8.4%')).toBeVisible()
    })
})

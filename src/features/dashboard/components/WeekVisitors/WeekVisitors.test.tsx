import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WeekVisitors } from './WeekVisitors'
import type { WeekVisitor } from '@/features/dashboard/types'

describe('WeekVisitors', () => {
    it('renders the loading state', () => {
        const { container } = render(<WeekVisitors loading />)

        expect(container.firstElementChild).toHaveClass('container', 'skeleton')
    })

    it('renders the empty state when data is not provided', () => {
        render(<WeekVisitors />)

        expect(screen.getByRole('heading', { name: 'No data' })).toBeVisible()

        expect(screen.getByText('No visitors this week.')).toBeVisible()
    })

    it('renders the visitors summary when data is provided', () => {
        const data: WeekVisitor = {
            summary: {
                total: 12500,
                variation: 12.5,
            },
            chart: [],
        }

        render(<WeekVisitors data={data} />)

        expect(
            screen.getByRole('heading', { name: 'This Week Visitors' }),
        ).toBeVisible()

        expect(screen.getByText('12,500')).toBeVisible()
        expect(screen.getByText('12.5%')).toBeVisible()
    })

    it('renders the chart when data is provided', () => {
        const data: WeekVisitor = {
            summary: {
                total: 12500,
                variation: 12.5,
            },
            chart: [
                {
                    key: 'mon',
                    label: 'Mon',
                    day: 'Monday',
                    users: 1500,
                },
                {
                    key: 'tue',
                    label: 'Tue',
                    day: 'Tuesday',
                    users: 2200,
                },
            ],
        }

        const { container } = render(<WeekVisitors data={data} />)

        expect(container.querySelector('.chart')).toBeInTheDocument()
    })

    it('renders a negative variation when visitors decreased', () => {
        const data: WeekVisitor = {
            summary: {
                total: 8500,
                variation: -8.4,
            },
            chart: [],
        }

        render(<WeekVisitors data={data} />)

        expect(screen.getByText('8,500')).toBeVisible()
        expect(screen.getByText('-8.4%')).toBeVisible()
    })
})

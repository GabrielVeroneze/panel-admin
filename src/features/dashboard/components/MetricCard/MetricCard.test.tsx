import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MetricCard } from './MetricCard'

describe('MetricCard', () => {
    it('renders the title and value', () => {
        render(
            <MetricCard title="Total Sales" value="$12,500">
                <div>Chart</div>
            </MetricCard>,
        )

        expect(
            screen.getByRole('heading', { name: 'Total Sales' }),
        ).toBeVisible()
        expect(screen.getByText('$12,500')).toBeVisible()
    })

    it('renders numeric values', () => {
        render(
            <MetricCard title="Visitors" value={12500}>
                <div>Chart</div>
            </MetricCard>,
        )

        expect(screen.getByText('12500')).toBeVisible()
    })

    it('renders children inside the chart container', () => {
        render(
            <MetricCard title="Sales" value="10K">
                <div data-testid="chart">Chart content</div>
            </MetricCard>,
        )

        expect(screen.getByTestId('chart')).toBeVisible()
        expect(screen.getByText('Chart content')).toBeVisible()
    })

    it('renders a positive variation with an up icon', () => {
        render(
            <MetricCard title="Sales" value="10K" variation={12.5}>
                <div>Chart</div>
            </MetricCard>,
        )

        expect(screen.getByText('12.5%')).toBeVisible()

        const variation = screen.getByText('12.5%').parentElement

        expect(variation).toBeInTheDocument()
        expect(variation?.querySelector('svg')).toBeInTheDocument()
    })

    it('renders a negative variation with a down icon', () => {
        render(
            <MetricCard title="Sales" value="10K" variation={-8.2}>
                <div>Chart</div>
            </MetricCard>,
        )

        expect(screen.getByText('-8.2%')).toBeVisible()

        const variation = screen.getByText('-8.2%').parentElement

        expect(variation).toBeInTheDocument()
        expect(variation?.querySelector('svg')).toBeInTheDocument()
    })

    it('renders a positive variation when variation is zero according to the positive rule', () => {
        render(
            <MetricCard title="Sales" value="10K" variation={0.1}>
                <div>Chart</div>
            </MetricCard>,
        )

        expect(screen.getByText('0.1%')).toBeVisible()
    })

    it('does not render the variation when variation is undefined', () => {
        render(
            <MetricCard title="Sales" value="10K">
                <div>Chart</div>
            </MetricCard>,
        )

        expect(screen.queryByText(/%$/)).not.toBeInTheDocument()
    })

    it('does not render the variation when variation is zero', () => {
        render(
            <MetricCard title="Sales" value="10K" variation={0}>
                <div>Chart</div>
            </MetricCard>,
        )

        expect(screen.queryByText('0%')).not.toBeInTheDocument()
    })
})

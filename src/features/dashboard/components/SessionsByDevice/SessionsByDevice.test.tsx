import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SessionsByDevice } from './SessionsByDevice'
import type { DeviceSession } from '@/features/dashboard/types'

describe('SessionsByDevice', () => {
    it('renders the loading state', () => {
        const { container } = render(<SessionsByDevice loading />)

        expect(container.firstElementChild).toHaveClass('container')
        expect(container.querySelector('.chartContainer')).toBeInTheDocument()
    })

    it('renders the empty state when data is not provided', () => {
        render(<SessionsByDevice />)

        expect(
            screen.getByRole('heading', { name: 'No device data' }),
        ).toBeVisible()

        expect(screen.getByText('No sessions by device.')).toBeVisible()
    })

    it('renders the title when data is provided', () => {
        render(<SessionsByDevice data={[]} />)

        expect(
            screen.getByRole('heading', { name: 'Sessions by Device' }),
        ).toBeVisible()
    })

    it('renders the chart when data is provided', () => {
        const data: DeviceSession[] = [
            {
                metric: 'Desktop',
                device: 'Desktop',
                value: 60,
                fill: '#1c64f2',
            },
            {
                metric: 'Mobile',
                device: 'Mobile',
                value: 30,
                fill: '#ff8a4c',
            },
            {
                metric: 'Tablet',
                device: 'Tablet',
                value: 10,
                fill: '#76a9fa',
            },
        ]

        const { container } = render(<SessionsByDevice data={data} />)

        expect(container.querySelector('.chart')).toBeInTheDocument()
    })

    it('renders the chart container when data is provided', () => {
        const data: DeviceSession[] = [
            {
                metric: 'Desktop',
                device: 'Desktop',
                value: 60,
                fill: '#1c64f2',
            },
        ]

        const { container } = render(<SessionsByDevice data={data} />)

        expect(container.querySelector('.chartContainer')).toBeInTheDocument()
    })

    it('renders the title and chart for an empty data array', () => {
        const { container } = render(<SessionsByDevice data={[]} />)

        expect(
            screen.getByRole('heading', { name: 'Sessions by Device' }),
        ).toBeVisible()

        expect(container.querySelector('.chart')).toBeInTheDocument()
    })
})

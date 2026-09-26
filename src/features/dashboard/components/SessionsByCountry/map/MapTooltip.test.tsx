import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MapTooltip } from './MapTooltip'

const sessionsMap = new Map([
    ['BR', 12500],
    ['US', 9800],
])

const previousMap = new Map([
    ['BR', 10000],
    ['US', 10500],
])

describe('MapTooltip', () => {
    it('renders the country name', () => {
        render(
            <MapTooltip
                x={100}
                y={200}
                countryCode="BR"
                countryName="Brazil"
                sessionsMap={sessionsMap}
                previousMap={previousMap}
            />,
        )

        expect(screen.getByText('Brazil')).toBeVisible()
    })

    it('renders the country flag when the country code is supported', () => {
        const { container } = render(
            <MapTooltip
                x={100}
                y={200}
                countryCode="BR"
                countryName="Brazil"
                sessionsMap={sessionsMap}
                previousMap={previousMap}
            />,
        )

        const flag = container.querySelector('.tooltip-title svg')

        expect(flag).toBeInTheDocument()
        expect(flag).toHaveAttribute('height', '12')
        expect(flag).toHaveAttribute('width', '18')
    })

    it('does not render a flag when the country code is unsupported', () => {
        const { container } = render(
            <MapTooltip
                x={100}
                y={200}
                countryCode="XX"
                countryName="Unknown"
                sessionsMap={sessionsMap}
                previousMap={previousMap}
            />,
        )

        expect(
            container.querySelector('.tooltip-title svg'),
        ).not.toBeInTheDocument()

        expect(screen.getByText('Unknown')).toBeVisible()
    })

    it('renders the visitors metric with compact formatting', () => {
        render(
            <MapTooltip
                x={100}
                y={200}
                countryCode="BR"
                countryName="Brazil"
                sessionsMap={sessionsMap}
                previousMap={previousMap}
            />,
        )

        expect(screen.getByText('Visitors:')).toBeVisible()
        expect(screen.getByText('12.5k')).toBeVisible()
    })

    it('renders the change metric with percentage formatting', () => {
        render(
            <MapTooltip
                x={100}
                y={200}
                countryCode="BR"
                countryName="Brazil"
                sessionsMap={sessionsMap}
                previousMap={previousMap}
            />,
        )

        expect(screen.getByText('Change:')).toBeVisible()
        expect(screen.getByText('25%')).toBeVisible()
    })

    it('renders a negative change percentage', () => {
        render(
            <MapTooltip
                x={100}
                y={200}
                countryCode="US"
                countryName="United States"
                sessionsMap={sessionsMap}
                previousMap={previousMap}
            />,
        )

        expect(screen.getByText('Change:')).toBeVisible()
        expect(screen.getByText('-7%')).toBeVisible()
    })

    it('renders zero change when there is no previous value', () => {
        render(
            <MapTooltip
                x={100}
                y={200}
                countryCode="BR"
                countryName="Brazil"
                sessionsMap={new Map([['BR', 12500]])}
                previousMap={new Map()}
            />,
        )

        expect(screen.getByText('Change:')).toBeVisible()
        expect(screen.getByText('0%')).toBeVisible()
    })

    it('uses zero for missing session metrics', () => {
        render(
            <MapTooltip
                x={100}
                y={200}
                countryCode="BR"
                countryName="Brazil"
                sessionsMap={new Map()}
                previousMap={new Map()}
            />,
        )

        expect(screen.getByText('Visitors:')).toBeVisible()
        expect(screen.getByText('0.0k')).toBeVisible()
        expect(screen.getByText('Change:')).toBeVisible()
        expect(screen.getByText('0%')).toBeVisible()
    })

    it('renders the tooltip with an arrow', () => {
        const { container } = render(
            <MapTooltip
                x={100}
                y={200}
                countryCode="BR"
                countryName="Brazil"
                sessionsMap={sessionsMap}
                previousMap={previousMap}
            />,
        )

        expect(container.querySelector('.withArrow')).toBeInTheDocument()
    })

    it('positions the tooltip using the provided coordinates', () => {
        const { container } = render(
            <MapTooltip
                x={150}
                y={275}
                countryCode="BR"
                countryName="Brazil"
                sessionsMap={sessionsMap}
                previousMap={previousMap}
            />,
        )

        const tooltipContainer = container.firstElementChild

        expect(tooltipContainer).toHaveStyle({
            left: '150px',
            top: '275px',
        })
    })

    it('renders both tooltip metrics', () => {
        render(
            <MapTooltip
                x={100}
                y={200}
                countryCode="BR"
                countryName="Brazil"
                sessionsMap={sessionsMap}
                previousMap={previousMap}
            />,
        )

        expect(screen.getByText('Visitors:')).toBeVisible()
        expect(screen.getByText('12.5k')).toBeVisible()

        expect(screen.getByText('Change:')).toBeVisible()
        expect(screen.getByText('25%')).toBeVisible()
    })
})

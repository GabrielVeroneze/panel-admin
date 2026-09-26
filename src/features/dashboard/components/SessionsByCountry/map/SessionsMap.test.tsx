import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { mapFeatures } from './map.features'
import { SessionsMap } from './SessionsMap'

vi.mock('./MapTooltip', () => ({
    MapTooltip: ({
        countryCode,
        countryName,
        x,
        y,
    }: {
        countryCode: string
        countryName: string
        x: number
        y: number
    }) => (
        <div data-testid="map-tooltip">
            <span>{countryCode}</span>
            <span>{countryName}</span>
            <span>{x}</span>
            <span>{y}</span>
        </div>
    ),
}))

const sessionsMap = new Map([
    ['BR', 100],
    ['US', 60],
])

const previousMap = new Map([
    ['BR', 80],
    ['US', 70],
])

const maxSessions = 100

describe('SessionsMap', () => {
    it('renders the map svg', () => {
        const { container } = render(
            <SessionsMap
                sessionsMap={sessionsMap}
                previousMap={previousMap}
                maxSessions={maxSessions}
            />,
        )

        expect(container.querySelector('svg')).toBeInTheDocument()
    })

    it('renders all map features as paths', () => {
        const { container } = render(
            <SessionsMap
                sessionsMap={sessionsMap}
                previousMap={previousMap}
                maxSessions={maxSessions}
            />,
        )

        const paths = container.querySelectorAll('svg path')

        expect(paths).toHaveLength(mapFeatures.length)
    })

    it('renders each map feature with a generated path', () => {
        const { container } = render(
            <SessionsMap
                sessionsMap={sessionsMap}
                previousMap={previousMap}
                maxSessions={maxSessions}
            />,
        )

        const paths = container.querySelectorAll('svg path')

        paths.forEach((countryPath) => {
            expect(countryPath).toHaveAttribute('d')
            expect(countryPath.getAttribute('d')).not.toBe('')
        })
    })

    it('applies the provided className to the svg', () => {
        const { container } = render(
            <SessionsMap
                className="sessionsMap"
                sessionsMap={sessionsMap}
                previousMap={previousMap}
                maxSessions={maxSessions}
            />,
        )

        expect(container.querySelector('svg')).toHaveClass('sessionsMap')
    })

    it('renders the svg without a className when one is not provided', () => {
        const { container } = render(
            <SessionsMap
                sessionsMap={sessionsMap}
                previousMap={previousMap}
                maxSessions={maxSessions}
            />,
        )

        expect(container.querySelector('svg')).not.toHaveClass('sessionsMap')
    })

    it('uses the default color for countries without sessions', () => {
        const { container } = render(
            <SessionsMap
                sessionsMap={new Map()}
                previousMap={new Map()}
                maxSessions={maxSessions}
            />,
        )

        const paths = container.querySelectorAll('svg path')

        expect(paths.length).toBeGreaterThan(0)

        paths.forEach((countryPath) => {
            expect(countryPath).toHaveAttribute('fill', '#d1d5db')
        })
    })

    it('uses the session intensity to determine a country color', () => {
        const brazilIndex = mapFeatures.findIndex(
            (feature) => feature.properties?.iso_a2 === 'BR',
        )

        expect(brazilIndex).toBeGreaterThanOrEqual(0)

        const { container } = render(
            <SessionsMap
                sessionsMap={new Map([['BR', 100]])}
                previousMap={new Map()}
                maxSessions={100}
            />,
        )

        const brazilPath = container.querySelectorAll('svg path')[brazilIndex]

        expect(brazilPath).toHaveAttribute('fill', '#1a56db')
    })

    it('renders the tooltip after moving over a country', () => {
        const brazilIndex = mapFeatures.findIndex(
            (feature) => feature.properties?.iso_a2 === 'BR',
        )

        expect(brazilIndex).toBeGreaterThanOrEqual(0)

        const { container } = render(
            <SessionsMap
                sessionsMap={sessionsMap}
                previousMap={previousMap}
                maxSessions={maxSessions}
            />,
        )

        const brazilPath = container.querySelectorAll('svg path')[brazilIndex]

        fireEvent.mouseMove(brazilPath, {
            clientX: 250,
            clientY: 150,
        })

        const tooltip = screen.getByTestId('map-tooltip')

        expect(tooltip).toHaveTextContent('BR')
        expect(tooltip).toHaveTextContent('Brazil')
    })

    it('passes the mouse coordinates to the tooltip', () => {
        const brazilIndex = mapFeatures.findIndex(
            (feature) => feature.properties?.iso_a2 === 'BR',
        )

        expect(brazilIndex).toBeGreaterThanOrEqual(0)

        const { container } = render(
            <SessionsMap
                sessionsMap={sessionsMap}
                previousMap={previousMap}
                maxSessions={maxSessions}
            />,
        )

        const brazilPath = container.querySelectorAll('svg path')[brazilIndex]

        fireEvent.mouseMove(brazilPath, {
            clientX: 250,
            clientY: 150,
        })

        const tooltip = screen.getByTestId('map-tooltip')

        expect(tooltip).toHaveTextContent('250')
        expect(tooltip).toHaveTextContent('150')
    })

    it('removes the tooltip when leaving a country', () => {
        const brazilIndex = mapFeatures.findIndex(
            (feature) => feature.properties?.iso_a2 === 'BR',
        )

        expect(brazilIndex).toBeGreaterThanOrEqual(0)

        const { container } = render(
            <SessionsMap
                sessionsMap={sessionsMap}
                previousMap={previousMap}
                maxSessions={maxSessions}
            />,
        )

        const brazilPath = container.querySelectorAll('svg path')[brazilIndex]

        fireEvent.mouseMove(brazilPath, {
            clientX: 250,
            clientY: 150,
        })

        expect(screen.getByText('Brazil')).toBeVisible()

        fireEvent.mouseLeave(brazilPath)

        expect(screen.queryByText('Brazil')).not.toBeInTheDocument()
    })

    it('updates the tooltip when moving between countries', () => {
        const brazilIndex = mapFeatures.findIndex(
            (feature) => feature.properties?.iso_a2 === 'BR',
        )

        const unitedStatesIndex = mapFeatures.findIndex(
            (feature) => feature.properties?.iso_a2 === 'US',
        )

        const { container } = render(
            <SessionsMap
                sessionsMap={sessionsMap}
                previousMap={previousMap}
                maxSessions={maxSessions}
            />,
        )

        const paths = container.querySelectorAll('svg path')

        fireEvent.mouseMove(paths[brazilIndex], {
            clientX: 100,
            clientY: 100,
        })

        expect(screen.getByTestId('map-tooltip')).toHaveTextContent('BR')
        expect(screen.getByTestId('map-tooltip')).toHaveTextContent('Brazil')

        fireEvent.mouseMove(paths[unitedStatesIndex], {
            clientX: 300,
            clientY: 200,
        })

        expect(screen.getByTestId('map-tooltip')).toHaveTextContent('US')
        expect(screen.getByTestId('map-tooltip')).toHaveTextContent(
            'United States',
        )

        expect(screen.getByTestId('map-tooltip')).not.toHaveTextContent(
            'Brazil',
        )
    })
})

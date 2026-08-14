import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusBadge } from './StatusBadge'

describe('StatusBadge', () => {
    describe('rendering', () => {
        it.each([
            ['active', 'Active'],
            ['offline', 'Offline'],
        ] as const)(
            'renders the %s status with the correct label',
            (status, label) => {
                render(<StatusBadge status={status} />)

                expect(screen.getByText(label)).toBeInTheDocument()
            },
        )

        it.each(['active', 'offline'] as const)(
            'applies the %s status class',
            (status) => {
                render(<StatusBadge status={status} />)

                expect(
                    screen.getByText(
                        status === 'active' ? 'Active' : 'Offline',
                    ),
                ).toHaveClass(status)
            },
        )

        it('renders the status indicator', () => {
            const { container } = render(<StatusBadge status="active" />)

            const badge = container.firstElementChild
            const dot = badge?.firstElementChild

            expect(dot).toBeInTheDocument()
        })
    })

    describe('status labels', () => {
        it('renders Active for active status', () => {
            render(<StatusBadge status="active" />)

            expect(screen.getByText('Active')).toBeInTheDocument()

            expect(screen.queryByText('Offline')).not.toBeInTheDocument()
        })

        it('renders Offline for offline status', () => {
            render(<StatusBadge status="offline" />)

            expect(screen.getByText('Offline')).toBeInTheDocument()

            expect(screen.queryByText('Active')).not.toBeInTheDocument()
        })
    })
})

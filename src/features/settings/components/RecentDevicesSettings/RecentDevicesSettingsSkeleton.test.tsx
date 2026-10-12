import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { RecentDevicesSettingsSkeleton } from './RecentDevicesSettingsSkeleton'
import type { ReactNode } from 'react'

vi.mock('@/shared/components', () => ({
    Skeleton: ({ className }: { className?: string }) => (
        <div data-testid="skeleton" className={className} />
    ),
}))

vi.mock('@/features/settings/components', () => ({
    SettingsCardSkeleton: ({
        children,
        description,
        divider,
        className,
    }: {
        children: ReactNode
        description?: boolean
        divider?: boolean
        className?: string
    }) => (
        <section
            data-testid="settings-card-skeleton"
            data-description={String(Boolean(description))}
            data-divider={String(Boolean(divider))}
            className={className}
        >
            {children}
        </section>
    ),
}))

describe('RecentDevicesSettingsSkeleton', () => {
    it('renders the settings card skeleton', () => {
        render(<RecentDevicesSettingsSkeleton />)

        expect(screen.getByTestId('settings-card-skeleton')).toBeInTheDocument()
    })

    it('enables the description placeholder', () => {
        render(<RecentDevicesSettingsSkeleton />)

        expect(screen.getByTestId('settings-card-skeleton')).toHaveAttribute(
            'data-description',
            'true',
        )
    })

    it('does not enable the divider', () => {
        render(<RecentDevicesSettingsSkeleton />)

        expect(screen.getByTestId('settings-card-skeleton')).toHaveAttribute(
            'data-divider',
            'false',
        )
    })

    it('renders the table container', () => {
        render(<RecentDevicesSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')

        expect(card.querySelector('div')).toBeInTheDocument()
    })

    it('renders three row placeholders', () => {
        render(<RecentDevicesSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')
        const table = card.querySelector('div')

        expect(table).not.toBeNull()
        expect(table?.children).toHaveLength(3)
    })

    it('renders five cell placeholders in each row', () => {
        render(<RecentDevicesSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')
        const table = card.querySelector('div')

        expect(table).not.toBeNull()

        Array.from(table!.children).forEach((row) => {
            expect(
                within(row as HTMLElement).getAllByTestId('skeleton'),
            ).toHaveLength(5)
        })
    })

    it('renders fifteen cell placeholders in total', () => {
        render(<RecentDevicesSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(15)
    })

    it('renders all cell placeholders inside the table rows', () => {
        render(<RecentDevicesSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')
        const table = card.querySelector('div')

        expect(table).not.toBeNull()

        const rows = Array.from(table!.children)

        expect(
            rows.reduce(
                (total, row) =>
                    total +
                    within(row as HTMLElement).getAllByTestId('skeleton')
                        .length,
                0,
            ),
        ).toBe(15)
    })

    it('renders consistently when mounted multiple times', () => {
        const { unmount } = render(<RecentDevicesSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(15)

        unmount()

        render(<RecentDevicesSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(15)
    })
})

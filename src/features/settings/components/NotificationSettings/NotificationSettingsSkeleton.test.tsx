import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { NotificationSettingsSkeleton } from './NotificationSettingsSkeleton'
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

    SettingsToggleList: ({ children }: { children: ReactNode }) => (
        <div data-testid="settings-toggle-list">{children}</div>
    ),
}))

describe('NotificationSettingsSkeleton', () => {
    it('renders the settings card skeleton', () => {
        render(<NotificationSettingsSkeleton />)

        expect(screen.getByTestId('settings-card-skeleton')).toBeInTheDocument()
    })

    it('enables the description and divider on the settings card', () => {
        render(<NotificationSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')

        expect(card).toHaveAttribute('data-description', 'true')
        expect(card).toHaveAttribute('data-divider', 'true')
    })

    it('renders the toggle list inside the settings card', () => {
        render(<NotificationSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')

        expect(
            within(card).getByTestId('settings-toggle-list'),
        ).toBeInTheDocument()
    })

    it('renders four skeleton placeholders inside the toggle list', () => {
        render(<NotificationSettingsSkeleton />)

        const list = screen.getByTestId('settings-toggle-list')

        expect(within(list).getAllByTestId('skeleton')).toHaveLength(4)
    })

    it('renders no toggle placeholders outside the toggle list', () => {
        render(<NotificationSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')
        const list = screen.getByTestId('settings-toggle-list')

        expect(card.querySelectorAll('[data-testid="skeleton"]')).toHaveLength(
            4,
        )
        expect(list.querySelectorAll('[data-testid="skeleton"]')).toHaveLength(
            4,
        )
    })

    it('renders consistently when mounted multiple times', () => {
        const { unmount } = render(<NotificationSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(4)

        unmount()

        render(<NotificationSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(4)
    })
})

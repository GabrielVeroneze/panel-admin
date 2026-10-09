import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ConnectedAccountsSettingsSkeleton } from './ConnectedAccountsSettingsSkeleton'

vi.mock('@/shared/components', () => ({
    Skeleton: ({ className }: { className?: string }) => (
        <div data-testid="skeleton-item" className={className} />
    ),
}))

vi.mock('@/features/settings/components', () => ({
    SettingsCardSkeleton: ({
        children,
        className,
    }: {
        children: React.ReactNode
        className?: string
    }) => (
        <div data-testid="settings-card-skeleton" className={className}>
            {children}
        </div>
    ),
}))

describe('ConnectedAccountsSettingsSkeleton', () => {
    it('renders the settings card skeleton', () => {
        render(<ConnectedAccountsSettingsSkeleton />)

        expect(screen.getByTestId('settings-card-skeleton')).toBeInTheDocument()
    })

    it('renders three skeleton items', () => {
        render(<ConnectedAccountsSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton-item')).toHaveLength(3)
    })

    it('renders the skeleton items inside the settings card', () => {
        render(<ConnectedAccountsSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')
        const skeletonItems = screen.getAllByTestId('skeleton-item')

        skeletonItems.forEach((item) => {
            expect(card).toContainElement(item)
        })
    })

    it('renders consistently when mounted multiple times', () => {
        const { unmount } = render(<ConnectedAccountsSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton-item')).toHaveLength(3)

        unmount()

        render(<ConnectedAccountsSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton-item')).toHaveLength(3)
    })
})

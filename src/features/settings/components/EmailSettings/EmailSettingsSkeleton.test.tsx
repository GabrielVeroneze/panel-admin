import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EmailSettingsSkeleton } from './EmailSettingsSkeleton'

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
        children: React.ReactNode
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

    SettingsToggleList: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="settings-toggle-list">{children}</div>
    ),
}))

describe('EmailSettingsSkeleton', () => {
    it('renders the settings card skeleton', () => {
        render(<EmailSettingsSkeleton />)

        expect(screen.getByTestId('settings-card-skeleton')).toBeInTheDocument()
    })

    it('enables the description and divider options', () => {
        render(<EmailSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')

        expect(card).toHaveAttribute('data-description', 'true')
        expect(card).toHaveAttribute('data-divider', 'true')
    })

    it('renders the settings toggle list', () => {
        render(<EmailSettingsSkeleton />)

        expect(screen.getByTestId('settings-toggle-list')).toBeInTheDocument()
    })

    it('renders four skeleton items for the email preferences', () => {
        render(<EmailSettingsSkeleton />)

        const list = screen.getByTestId('settings-toggle-list')

        expect(list.querySelectorAll('[data-testid="skeleton"]')).toHaveLength(
            4,
        )
    })

    it('renders all skeleton items inside the toggle list', () => {
        render(<EmailSettingsSkeleton />)

        const list = screen.getByTestId('settings-toggle-list')
        const skeletons = list.querySelectorAll<HTMLElement>(
            '[data-testid="skeleton"]',
        )

        expect(skeletons).toHaveLength(4)

        skeletons.forEach((skeleton) => {
            expect(list).toContainElement(skeleton)
        })
    })

    it('renders consistently when mounted multiple times', () => {
        const { unmount } = render(<EmailSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(4)

        unmount()

        render(<EmailSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(4)
    })
})

import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { SocialAccountsSettingsSkeleton } from './SocialAccountsSettingsSkeleton'
import type { ReactNode } from 'react'

vi.mock('@/shared/components', () => ({
    Skeleton: ({ className }: { className?: string }) => (
        <div data-testid="skeleton" className={className} />
    ),
}))

vi.mock('@/features/settings/components', () => ({
    SettingsCardSkeleton: ({
        children,
        className,
    }: {
        children: ReactNode
        className?: string
    }) => (
        <section data-testid="settings-card-skeleton" className={className}>
            {children}
        </section>
    ),
}))

describe('SocialAccountsSettingsSkeleton', () => {
    it('renders the settings card skeleton', () => {
        render(<SocialAccountsSettingsSkeleton />)

        expect(screen.getByTestId('settings-card-skeleton')).toBeInTheDocument()
    })

    it('renders the list container', () => {
        render(<SocialAccountsSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')

        expect(card.querySelector('div')).toBeInTheDocument()
    })

    it('renders two item placeholders', () => {
        render(<SocialAccountsSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(2)
    })

    it('renders all item placeholders inside the list', () => {
        render(<SocialAccountsSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')
        const list = card.querySelector('div')

        expect(list).not.toBeNull()
        expect(
            within(list as HTMLElement).getAllByTestId('skeleton'),
        ).toHaveLength(2)
    })

    it('renders the expected number of list items', () => {
        render(<SocialAccountsSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')
        const list = card.querySelector('div')

        expect(list).not.toBeNull()
        expect(list?.children).toHaveLength(2)
    })

    it('renders consistently when mounted multiple times', () => {
        const { unmount } = render(<SocialAccountsSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(2)

        unmount()

        render(<SocialAccountsSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(2)
    })
})

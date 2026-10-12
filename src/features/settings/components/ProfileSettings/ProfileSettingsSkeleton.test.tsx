import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { ProfileSettingsSkeleton } from './ProfileSettingsSkeleton'
import type { ReactNode } from 'react'

vi.mock('@/shared/components', () => ({
    Card: ({
        children,
        className,
    }: {
        children: ReactNode
        className?: string
    }) => (
        <div data-testid="profile-settings-card" className={className}>
            {children}
        </div>
    ),
    Skeleton: ({ className }: { className?: string }) => (
        <div data-testid="skeleton" className={className} />
    ),
}))

describe('ProfileSettingsSkeleton', () => {
    it('renders the profile settings card', () => {
        render(<ProfileSettingsSkeleton />)

        expect(screen.getByTestId('profile-settings-card')).toBeInTheDocument()
    })

    it('renders the information container', () => {
        render(<ProfileSettingsSkeleton />)

        const card = screen.getByTestId('profile-settings-card')

        expect(card.querySelector('div > div')).toBeInTheDocument()
    })

    it('renders four skeleton placeholders', () => {
        render(<ProfileSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(4)
    })

    it('renders the avatar placeholder outside the information container', () => {
        render(<ProfileSettingsSkeleton />)

        const card = screen.getByTestId('profile-settings-card')
        const placeholders = within(card).getAllByTestId('skeleton')

        expect(placeholders[0].parentElement).toBe(card)
    })

    it('renders three placeholders inside the information container', () => {
        render(<ProfileSettingsSkeleton />)

        const card = screen.getByTestId('profile-settings-card')
        const placeholders = within(card).getAllByTestId('skeleton')
        const info = placeholders[1].parentElement

        expect(info).not.toBeNull()
        expect(
            within(info as HTMLElement).getAllByTestId('skeleton'),
        ).toHaveLength(3)
    })

    it('renders all placeholders within the card', () => {
        render(<ProfileSettingsSkeleton />)

        const card = screen.getByTestId('profile-settings-card')

        expect(within(card).getAllByTestId('skeleton')).toHaveLength(4)
    })

    it('renders consistently when mounted multiple times', () => {
        const { unmount } = render(<ProfileSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(4)

        unmount()

        render(<ProfileSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(4)
    })
})

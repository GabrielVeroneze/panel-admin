import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { LanguageTimeSettingsSkeleton } from './LanguageTimeSettingsSkeleton'
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

describe('LanguageTimeSettingsSkeleton', () => {
    it('renders the settings card skeleton', () => {
        render(<LanguageTimeSettingsSkeleton />)

        expect(screen.getByTestId('settings-card-skeleton')).toBeInTheDocument()
    })

    it('renders the form inside the settings card', () => {
        render(<LanguageTimeSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')

        expect(card.querySelector('form')).toBeInTheDocument()
    })

    it('renders two field containers inside the form', () => {
        render(<LanguageTimeSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')
        const form = card.querySelector('form')

        expect(form).not.toBeNull()
        expect(form!.children).toHaveLength(3)

        expect(
            form!.children[0].querySelectorAll('[data-testid="skeleton"]'),
        ).toHaveLength(2)
        expect(
            form!.children[1].querySelectorAll('[data-testid="skeleton"]'),
        ).toHaveLength(2)
    })

    it('renders a label and select placeholder for each field', () => {
        render(<LanguageTimeSettingsSkeleton />)

        const form = screen
            .getByTestId('settings-card-skeleton')
            .querySelector('form')

        expect(form).not.toBeNull()

        const fields = Array.from(form!.children).slice(0, 2)

        fields.forEach((field) => {
            expect(
                field.querySelectorAll('[data-testid="skeleton"]'),
            ).toHaveLength(2)
        })
    })

    it('renders the button placeholder after the fields', () => {
        render(<LanguageTimeSettingsSkeleton />)

        const form = screen
            .getByTestId('settings-card-skeleton')
            .querySelector('form')

        expect(form).not.toBeNull()

        const buttonPlaceholder = form!.lastElementChild

        expect(buttonPlaceholder).toHaveAttribute('data-testid', 'skeleton')
    })

    it('renders five skeleton placeholders in total', () => {
        render(<LanguageTimeSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')

        expect(within(card).getAllByTestId('skeleton')).toHaveLength(5)
    })

    it('renders consistently when mounted multiple times', () => {
        const { unmount } = render(<LanguageTimeSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(5)

        unmount()

        render(<LanguageTimeSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(5)
    })
})

import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { PasswordSettingsSkeleton } from './PasswordSettingsSkeleton'
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

describe('PasswordSettingsSkeleton', () => {
    it('renders the settings card skeleton', () => {
        render(<PasswordSettingsSkeleton />)

        expect(screen.getByTestId('settings-card-skeleton')).toBeInTheDocument()
    })

    it('renders the form inside the settings card', () => {
        render(<PasswordSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')

        expect(card.querySelector('form')).toBeInTheDocument()
    })

    it('renders three field containers', () => {
        render(<PasswordSettingsSkeleton />)

        const form = screen
            .getByTestId('settings-card-skeleton')
            .querySelector('form')

        expect(form).not.toBeNull()
        expect(form!.children).toHaveLength(5)

        const fields = Array.from(form!.children).slice(0, 3)

        fields.forEach((field) => {
            expect(
                field.querySelectorAll('[data-testid="skeleton"]'),
            ).toHaveLength(2)
        })
    })

    it('renders two placeholders for each password field', () => {
        render(<PasswordSettingsSkeleton />)

        const form = screen
            .getByTestId('settings-card-skeleton')
            .querySelector('form')!

        const fields = Array.from(form.children).slice(0, 3)

        fields.forEach((field) => {
            expect(
                within(field as HTMLElement).getAllByTestId('skeleton'),
            ).toHaveLength(2)
        })
    })

    it('renders the password requirements section', () => {
        render(<PasswordSettingsSkeleton />)

        const form = screen
            .getByTestId('settings-card-skeleton')
            .querySelector('form')!

        const requirements = form.children[3]

        expect(requirements).toBeInTheDocument()
        expect(
            requirements.querySelectorAll('[data-testid="skeleton"]'),
        ).toHaveLength(5)
    })

    it('renders the requirements title and description placeholders', () => {
        render(<PasswordSettingsSkeleton />)

        const form = screen
            .getByTestId('settings-card-skeleton')
            .querySelector('form')!

        const requirements = form.children[3]

        expect(
            requirements.querySelectorAll('[data-testid="skeleton"]'),
        ).toHaveLength(5)

        const list = requirements.querySelector('ul')

        expect(list).toBeInTheDocument()
        expect(list!.querySelectorAll('[data-testid="skeleton"]')).toHaveLength(
            3,
        )
    })

    it('renders three placeholders inside the requirements list', () => {
        render(<PasswordSettingsSkeleton />)

        const list = screen
            .getByTestId('settings-card-skeleton')
            .querySelector('form ul')

        expect(list).toBeInTheDocument()
        expect(list!.querySelectorAll('[data-testid="skeleton"]')).toHaveLength(
            3,
        )
    })

    it('renders the button placeholder after the requirements section', () => {
        render(<PasswordSettingsSkeleton />)

        const form = screen
            .getByTestId('settings-card-skeleton')
            .querySelector('form')!

        const buttonPlaceholder = form.lastElementChild

        expect(buttonPlaceholder).toHaveAttribute('data-testid', 'skeleton')
    })

    it('renders twelve skeleton placeholders in total', () => {
        render(<PasswordSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')

        expect(within(card).getAllByTestId('skeleton')).toHaveLength(12)
    })

    it('renders consistently when mounted multiple times', () => {
        const { unmount } = render(<PasswordSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(12)

        unmount()

        render(<PasswordSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(12)
    })
})

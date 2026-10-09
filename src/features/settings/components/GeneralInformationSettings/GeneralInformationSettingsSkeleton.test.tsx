import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { GeneralInformationSettingsSkeleton } from './GeneralInformationSettingsSkeleton'

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
        children: React.ReactNode
        className?: string
    }) => (
        <section data-testid="settings-card-skeleton" className={className}>
            {children}
        </section>
    ),
}))

describe('GeneralInformationSettingsSkeleton', () => {
    it('renders the settings card skeleton', () => {
        render(<GeneralInformationSettingsSkeleton />)

        expect(screen.getByTestId('settings-card-skeleton')).toBeInTheDocument()
    })

    it('renders the form inside the settings card', () => {
        render(<GeneralInformationSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')
        const form = card.querySelector('form')

        expect(form).toBeInTheDocument()
        expect(card).toContainElement(form)
    })

    it('renders twelve field placeholders', () => {
        render(<GeneralInformationSettingsSkeleton />)

        const form = document.querySelector('form')
        const fields = form?.querySelectorAll(':scope > div')

        expect(fields).toHaveLength(13)

        const fieldPlaceholders = Array.from(fields ?? []).filter(
            (field) =>
                field.querySelectorAll('[data-testid="skeleton"]').length === 2,
        )

        expect(fieldPlaceholders).toHaveLength(12)
    })

    it('renders a label and input skeleton for each field', () => {
        render(<GeneralInformationSettingsSkeleton />)

        const form = document.querySelector('form')
        const fields = Array.from(
            form?.querySelectorAll(':scope > div') ?? [],
        ).filter(
            (field) =>
                field.querySelector('[class*="labelSkeleton"]') &&
                field.querySelector('[class*="inputSkeleton"]'),
        )

        expect(fields).toHaveLength(12)

        fields.forEach((field) => {
            expect(
                field.querySelector('[class*="labelSkeleton"]'),
            ).toBeInTheDocument()

            expect(
                field.querySelector('[class*="inputSkeleton"]'),
            ).toBeInTheDocument()
        })
    })

    it('renders twelve label skeletons', () => {
        render(<GeneralInformationSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')

        expect(
            card.querySelectorAll('form > div [class*="labelSkeleton"]'),
        ).toHaveLength(12)
    })

    it('renders twelve input skeletons', () => {
        render(<GeneralInformationSettingsSkeleton />)

        const card = screen.getByTestId('settings-card-skeleton')

        expect(
            card.querySelectorAll('form > div [class*="inputSkeleton"]'),
        ).toHaveLength(12)
    })

    it('renders the button skeleton after the fields', () => {
        render(<GeneralInformationSettingsSkeleton />)

        const form = screen
            .getByTestId('settings-card-skeleton')
            .querySelector('form')

        expect(form).not.toBeNull()

        const skeletons = form!.querySelectorAll('[data-testid="skeleton"]')

        expect(skeletons).toHaveLength(25)
    })

    it('renders consistently when mounted multiple times', () => {
        const { unmount } = render(<GeneralInformationSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(25)

        unmount()

        render(<GeneralInformationSettingsSkeleton />)

        expect(screen.getAllByTestId('skeleton')).toHaveLength(25)
    })
})

import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SettingsCardSkeleton } from './SettingsCardSkeleton'

describe('SettingsCardSkeleton', () => {
    it('renders the title skeleton and children', () => {
        render(
            <SettingsCardSkeleton>
                <div>Content</div>
            </SettingsCardSkeleton>,
        )

        expect(screen.getByText('Content')).toBeInTheDocument()

        const content = screen.getByText('Content')
        const card = content.parentElement?.parentElement

        expect(card).toHaveClass('card')
        expect(card).toHaveClass('skeleton')
    })

    it('renders the description skeleton when description is enabled', () => {
        render(
            <SettingsCardSkeleton description>
                <div>Content</div>
            </SettingsCardSkeleton>,
        )

        const content = screen.getByText('Content')
        const card = content.parentElement?.parentElement
        const header = card?.querySelector('header')

        expect(header).toBeInTheDocument()
        expect(header?.querySelectorAll('div')).toHaveLength(2)
    })

    it('renders only the title skeleton when description is disabled', () => {
        render(
            <SettingsCardSkeleton description={false}>
                <div>Content</div>
            </SettingsCardSkeleton>,
        )

        const content = screen.getByText('Content')
        const card = content.parentElement?.parentElement
        const header = card?.querySelector('header')

        expect(header).toBeInTheDocument()
        expect(header?.querySelectorAll('div')).toHaveLength(1)
    })

    it('does not render the description skeleton by default', () => {
        render(
            <SettingsCardSkeleton>
                <div>Content</div>
            </SettingsCardSkeleton>,
        )

        const content = screen.getByText('Content')
        const card = content.parentElement?.parentElement
        const header = card?.querySelector('header')

        expect(header).toBeInTheDocument()
        expect(header?.querySelectorAll('div')).toHaveLength(1)
    })

    it('applies the divider class when divider is enabled', () => {
        render(
            <SettingsCardSkeleton divider>
                <div>Content</div>
            </SettingsCardSkeleton>,
        )

        const content = screen.getByText('Content')
        const card = content.parentElement?.parentElement

        expect(card).toHaveClass('card')
        expect(card).toHaveClass('skeleton')
        expect(card).toHaveClass('divider')
    })

    it('does not apply the divider class by default', () => {
        render(
            <SettingsCardSkeleton>
                <div>Content</div>
            </SettingsCardSkeleton>,
        )

        const content = screen.getByText('Content')
        const card = content.parentElement?.parentElement

        expect(card).toHaveClass('card')
        expect(card).toHaveClass('skeleton')
        expect(card).not.toHaveClass('divider')
    })

    it('applies the custom className', () => {
        render(
            <SettingsCardSkeleton className="custom-card">
                <div>Content</div>
            </SettingsCardSkeleton>,
        )

        const content = screen.getByText('Content')
        const card = content.parentElement?.parentElement

        expect(card).toHaveClass('card')
        expect(card).toHaveClass('skeleton')
        expect(card).toHaveClass('custom-card')
    })

    it('renders complex ReactNode children', () => {
        render(
            <SettingsCardSkeleton>
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" />
                </div>
            </SettingsCardSkeleton>,
        )

        expect(screen.getByLabelText('Name')).toBeInTheDocument()
    })
})

import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SettingsCard } from './SettingsCard'

describe('SettingsCard', () => {
    it('renders the title and children', () => {
        render(
            <SettingsCard title="General Information">
                <div>Form content</div>
            </SettingsCard>,
        )

        expect(
            screen.getByRole('heading', {
                level: 2,
                name: 'General Information',
            }),
        ).toBeInTheDocument()

        expect(screen.getByText('Form content')).toBeInTheDocument()
    })

    it('renders the description when provided', () => {
        render(
            <SettingsCard
                title="General Information"
                description="Update your personal information"
            >
                <div>Form content</div>
            </SettingsCard>,
        )

        expect(
            screen.getByText('Update your personal information'),
        ).toBeInTheDocument()
    })

    it('does not render the description when it is not provided', () => {
        render(
            <SettingsCard title="General Information">
                <div>Form content</div>
            </SettingsCard>,
        )

        expect(
            screen.queryByText('Update your personal information'),
        ).not.toBeInTheDocument()
    })

    it('renders the description when it is an empty string', () => {
        render(
            <SettingsCard title="General Information" description="">
                <div>Form content</div>
            </SettingsCard>,
        )

        expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
        expect(screen.getByText('Form content')).toBeInTheDocument()
    })

    it('applies the custom className', () => {
        render(
            <SettingsCard title="General Information" className="custom-card">
                <div>Form content</div>
            </SettingsCard>,
        )

        const heading = screen.getByRole('heading', {
            level: 2,
            name: 'General Information',
        })

        const card = heading.closest('div')

        expect(card).toHaveClass('card')
        expect(card).toHaveClass('custom-card')
    })

    it('does not apply the divider class by default', () => {
        render(
            <SettingsCard title="General Information">
                <div>Form content</div>
            </SettingsCard>,
        )

        const heading = screen.getByRole('heading', {
            level: 2,
            name: 'General Information',
        })

        const card = heading.closest('div')

        expect(card).toHaveClass('card')
        expect(card).not.toHaveClass('divider')
    })

    it('applies the divider class when divider is enabled', () => {
        render(
            <SettingsCard title="General Information" divider>
                <div>Form content</div>
            </SettingsCard>,
        )

        const heading = screen.getByRole('heading', {
            level: 2,
            name: 'General Information',
        })

        const card = heading.closest('div')

        expect(card).toHaveClass('card')
        expect(card).toHaveClass('divider')
    })

    it('renders complex ReactNode children', () => {
        render(
            <SettingsCard title="General Information">
                <div>
                    <label htmlFor="name">Name</label>
                    <input id="name" />
                </div>
            </SettingsCard>,
        )

        expect(screen.getByLabelText('Name')).toBeInTheDocument()
    })
})

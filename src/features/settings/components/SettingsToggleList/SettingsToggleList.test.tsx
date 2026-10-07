import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SettingsToggleList } from './SettingsToggleList'

describe('SettingsToggleList', () => {
    it('renders the children', () => {
        render(
            <SettingsToggleList>
                <div>First toggle</div>
                <div>Second toggle</div>
            </SettingsToggleList>,
        )

        expect(screen.getByText('First toggle')).toBeInTheDocument()
        expect(screen.getByText('Second toggle')).toBeInTheDocument()
    })

    it('applies the list class', () => {
        render(
            <SettingsToggleList>
                <div>Toggle</div>
            </SettingsToggleList>,
        )

        const toggle = screen.getByText('Toggle')
        const list = toggle.parentElement

        expect(list).toHaveClass('list')
    })

    it('renders complex ReactNode children', () => {
        render(
            <SettingsToggleList>
                <section>
                    <h3>Notification settings</h3>
                    <button type="button">Save</button>
                </section>
            </SettingsToggleList>,
        )

        expect(
            screen.getByRole('heading', {
                level: 3,
                name: 'Notification settings',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByRole('button', {
                name: 'Save',
            }),
        ).toBeInTheDocument()
    })
})

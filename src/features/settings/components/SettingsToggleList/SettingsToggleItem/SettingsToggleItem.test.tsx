import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { SettingsToggleItem } from './SettingsToggleItem'

describe('SettingsToggleItem', () => {
    const defaultProps = {
        label: 'Company News',
        description: 'Receive updates about company news',
        enabled: false,
        onChange: vi.fn(),
    }

    it('renders the label and description', () => {
        render(<SettingsToggleItem {...defaultProps} />)

        expect(
            screen.getByRole('heading', {
                level: 4,
                name: 'Company News',
            }),
        ).toBeInTheDocument()

        expect(
            screen.getByText('Receive updates about company news'),
        ).toBeInTheDocument()
    })

    it('renders the switch with the enabled state', () => {
        render(<SettingsToggleItem {...defaultProps} enabled={true} />)

        const switchInput = screen.getByRole('checkbox')

        expect(switchInput).toBeChecked()
    })

    it('renders the switch unchecked when disabled', () => {
        render(<SettingsToggleItem {...defaultProps} enabled={false} />)

        const switchInput = screen.getByRole('checkbox')

        expect(switchInput).not.toBeChecked()
    })

    it('calls onChange when the switch is changed', () => {
        const onChange = vi.fn()

        render(<SettingsToggleItem {...defaultProps} onChange={onChange} />)

        const switchInput = screen.getByRole('checkbox')

        fireEvent.click(switchInput)

        expect(onChange).toHaveBeenCalledTimes(1)
    })

    it('passes the large size to the switch', () => {
        render(<SettingsToggleItem {...defaultProps} />)

        const switchInput = screen.getByRole('checkbox')
        const switchContainer = switchInput.parentElement

        expect(switchContainer).toBeInTheDocument()
        expect(switchContainer?.className).toContain('large')
    })
})

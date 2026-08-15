import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Switch } from './Switch'
import userEvent from '@testing-library/user-event'

describe('Switch', () => {
    describe('rendering', () => {
        it('renders the switch', () => {
            render(<Switch />)

            expect(screen.getByRole('checkbox')).toBeInTheDocument()
        })

        it('uses the medium size by default', () => {
            render(<Switch />)

            expect(screen.getByRole('checkbox').parentElement).toHaveClass(
                'medium',
            )
        })

        it.each(['small', 'medium', 'large'] as const)(
            'applies the %s size',
            (size) => {
                render(<Switch size={size} />)

                expect(screen.getByRole('checkbox').parentElement).toHaveClass(
                    size,
                )
            },
        )

        it('renders the label when provided', () => {
            render(<Switch label="Enable notifications" />)

            expect(screen.getByText('Enable notifications')).toBeInTheDocument()
        })

        it('does not render the label when not provided', () => {
            render(<Switch />)

            expect(
                screen.queryByText('Enable notifications'),
            ).not.toBeInTheDocument()
        })

        it('applies a custom className', () => {
            render(<Switch className="custom-switch" />)

            expect(screen.getByRole('checkbox').parentElement).toHaveClass(
                'custom-switch',
            )
        })
    })

    describe('interaction', () => {
        it('is unchecked by default', () => {
            render(<Switch />)

            expect(screen.getByRole('checkbox')).not.toBeChecked()
        })

        it('is checked when checked is true', () => {
            render(<Switch checked readOnly />)

            expect(screen.getByRole('checkbox')).toBeChecked()
        })

        it('toggles when clicked', async () => {
            const user = userEvent.setup()

            render(<Switch />)

            const switchInput = screen.getByRole('checkbox')

            expect(switchInput).not.toBeChecked()

            await user.click(switchInput)

            expect(switchInput).toBeChecked()

            await user.click(switchInput)

            expect(switchInput).not.toBeChecked()
        })

        it('toggles when its label is clicked', async () => {
            const user = userEvent.setup()

            render(<Switch label="Enable notifications" />)

            const switchInput = screen.getByRole('checkbox')

            expect(switchInput).not.toBeChecked()

            await user.click(screen.getByText('Enable notifications'))

            expect(switchInput).toBeChecked()
        })
    })

    describe('disabled state', () => {
        it('is disabled when disabled is true', () => {
            render(<Switch disabled />)

            expect(screen.getByRole('checkbox')).toBeDisabled()
        })

        it('does not toggle when disabled', async () => {
            const user = userEvent.setup()

            render(<Switch disabled />)

            const switchInput = screen.getByRole('checkbox')

            await user.click(switchInput)

            expect(switchInput).not.toBeChecked()
        })
    })

    describe('native input props', () => {
        it('passes native input props', () => {
            render(
                <Switch
                    id="notifications"
                    name="notifications"
                    value="enabled"
                    aria-label="Notifications"
                />,
            )

            const switchInput = screen.getByRole('checkbox', {
                name: 'Notifications',
            })

            expect(switchInput).toHaveAttribute('id', 'notifications')

            expect(switchInput).toHaveAttribute('name', 'notifications')

            expect(switchInput).toHaveAttribute('value', 'enabled')
        })
    })
})

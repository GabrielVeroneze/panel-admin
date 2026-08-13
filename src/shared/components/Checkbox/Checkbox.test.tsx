import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Checkbox } from './Checkbox'
import userEvent from '@testing-library/user-event'

describe('Checkbox', () => {
    describe('rendering', () => {
        it('renders the checkbox', () => {
            render(<Checkbox />)

            expect(screen.getByRole('checkbox')).toBeInTheDocument()
        })

        it('renders the label when provided', () => {
            render(<Checkbox label="Accept terms" />)

            expect(screen.getByText('Accept terms')).toBeInTheDocument()
        })

        it('does not render a label when it is not provided', () => {
            render(<Checkbox />)

            expect(screen.queryByText('Accept terms')).not.toBeInTheDocument()
        })

        it('uses the square variant by default', () => {
            render(<Checkbox />)

            const checkbox = screen.getByRole('checkbox')
            const control = checkbox.nextElementSibling

            expect(control).toHaveClass('square')
        })

        it.each(['square', 'circle'] as const)(
            'applies the %s variant',
            (variant) => {
                render(<Checkbox variant={variant} />)

                const checkbox = screen.getByRole('checkbox')
                const control = checkbox.nextElementSibling

                expect(control).toHaveClass(variant)
            },
        )
    })

    describe('interaction', () => {
        it('checks the checkbox when clicked', async () => {
            const user = userEvent.setup()

            render(<Checkbox />)

            const checkbox = screen.getByRole('checkbox')

            expect(checkbox).not.toBeChecked()

            await user.click(checkbox)

            expect(checkbox).toBeChecked()
        })

        it('unchecks the checkbox when clicked again', async () => {
            const user = userEvent.setup()

            render(<Checkbox />)

            const checkbox = screen.getByRole('checkbox')

            await user.click(checkbox)
            await user.click(checkbox)

            expect(checkbox).not.toBeChecked()
        })

        it('checks the checkbox when its label is clicked', async () => {
            const user = userEvent.setup()

            render(<Checkbox label="Accept terms" />)

            const checkbox = screen.getByRole('checkbox')

            await user.click(screen.getByText('Accept terms'))

            expect(checkbox).toBeChecked()
        })

        it('calls onChange when the checkbox changes', async () => {
            const user = userEvent.setup()
            const handleChange = vi.fn()

            render(<Checkbox onChange={handleChange} />)

            await user.click(screen.getByRole('checkbox'))

            expect(handleChange).toHaveBeenCalledTimes(1)
        })
    })

    describe('checked state', () => {
        it('respects the checked prop', () => {
            render(<Checkbox checked onChange={() => {}} />)

            expect(screen.getByRole('checkbox')).toBeChecked()
        })

        it('respects the defaultChecked prop', () => {
            render(<Checkbox defaultChecked />)

            expect(screen.getByRole('checkbox')).toBeChecked()
        })
    })

    describe('disabled state', () => {
        it('is not disabled by default', () => {
            render(<Checkbox />)

            expect(screen.getByRole('checkbox')).not.toBeDisabled()
        })

        it('is disabled when disabled is true', () => {
            render(<Checkbox disabled />)

            expect(screen.getByRole('checkbox')).toBeDisabled()
        })

        it('does not change when clicked while disabled', async () => {
            const user = userEvent.setup()

            render(<Checkbox disabled />)

            const checkbox = screen.getByRole('checkbox')

            await user.click(checkbox)

            expect(checkbox).not.toBeChecked()
        })
    })

    describe('native input props', () => {
        it('passes native input props to the checkbox', () => {
            render(
                <Checkbox
                    name="terms"
                    value="accepted"
                    required
                    aria-label="Accept terms"
                />,
            )

            const checkbox = screen.getByRole('checkbox', {
                name: 'Accept terms',
            })

            expect(checkbox).toHaveAttribute('name', 'terms')
            expect(checkbox).toHaveAttribute('value', 'accepted')
            expect(checkbox).toBeRequired()
        })
    })
})

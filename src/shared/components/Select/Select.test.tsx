import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Select } from './Select'
import userEvent from '@testing-library/user-event'

describe('Select', () => {
    describe('rendering', () => {
        it('renders the select', () => {
            render(
                <Select>
                    <option value="option-1">Option 1</option>
                </Select>,
            )

            expect(screen.getByRole('combobox')).toBeInTheDocument()
        })

        it('renders its options', () => {
            render(
                <Select>
                    <option value="option-1">Option 1</option>
                    <option value="option-2">Option 2</option>
                </Select>,
            )

            expect(
                screen.getByRole('option', {
                    name: 'Option 1',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('option', {
                    name: 'Option 2',
                }),
            ).toBeInTheDocument()
        })

        it('uses medium size by default', () => {
            render(
                <Select>
                    <option value="option-1">Option 1</option>
                </Select>,
            )

            expect(screen.getByRole('combobox')).toHaveClass('medium')
        })

        it.each(['small', 'medium', 'large'] as const)(
            'applies the %s size',
            (size) => {
                render(
                    <Select size={size}>
                        <option value="option-1">Option 1</option>
                    </Select>,
                )

                expect(screen.getByRole('combobox')).toHaveClass(size)
            },
        )

        it('applies a custom className', () => {
            render(
                <Select className="custom-select">
                    <option value="option-1">Option 1</option>
                </Select>,
            )

            expect(screen.getByRole('combobox')).toHaveClass('custom-select')
        })
    })

    describe('interaction', () => {
        it('allows the user to select an option', async () => {
            const user = userEvent.setup()

            render(
                <Select defaultValue="option-1">
                    <option value="option-1">Option 1</option>
                    <option value="option-2">Option 2</option>
                </Select>,
            )

            const select = screen.getByRole('combobox')

            await user.selectOptions(select, 'option-2')

            expect(select).toHaveValue('option-2')
        })

        it('calls onChange when the selected option changes', async () => {
            const user = userEvent.setup()
            const handleChange = vi.fn()

            render(
                <Select defaultValue="option-1" onChange={handleChange}>
                    <option value="option-1">Option 1</option>
                    <option value="option-2">Option 2</option>
                </Select>,
            )

            await user.selectOptions(screen.getByRole('combobox'), 'option-2')

            expect(handleChange).toHaveBeenCalledTimes(1)
        })
    })

    describe('selected value', () => {
        it('supports a controlled value', () => {
            render(
                <Select value="option-2" onChange={() => {}}>
                    <option value="option-1">Option 1</option>
                    <option value="option-2">Option 2</option>
                </Select>,
            )

            expect(screen.getByRole('combobox')).toHaveValue('option-2')
        })

        it('supports an initial value with defaultValue', () => {
            render(
                <Select defaultValue="option-2">
                    <option value="option-1">Option 1</option>
                    <option value="option-2">Option 2</option>
                </Select>,
            )

            expect(screen.getByRole('combobox')).toHaveValue('option-2')
        })
    })

    describe('disabled state', () => {
        it('is not disabled by default', () => {
            render(
                <Select>
                    <option value="option-1">Option 1</option>
                </Select>,
            )

            expect(screen.getByRole('combobox')).not.toBeDisabled()
        })

        it('is disabled when disabled is true', () => {
            render(
                <Select disabled>
                    <option value="option-1">Option 1</option>
                </Select>,
            )

            expect(screen.getByRole('combobox')).toBeDisabled()
        })
    })

    describe('native select props', () => {
        it('passes native select props to the element', () => {
            render(
                <Select
                    id="country"
                    name="country"
                    required
                    aria-label="Country"
                    autoComplete="country"
                >
                    <option value="br">Brazil</option>
                </Select>,
            )

            const select = screen.getByRole('combobox', {
                name: 'Country',
            })

            expect(select).toHaveAttribute('id', 'country')
            expect(select).toHaveAttribute('name', 'country')
            expect(select).toHaveAttribute('autocomplete', 'country')
            expect(select).toBeRequired()
        })
    })
})

import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SelectOption } from './SelectOption'

describe('SelectOption', () => {
    describe('rendering', () => {
        it('renders the option', () => {
            render(
                <select>
                    <SelectOption value="option-1">Option 1</SelectOption>
                </select>,
            )

            expect(
                screen.getByRole('option', {
                    name: 'Option 1',
                }),
            ).toBeInTheDocument()
        })

        it('renders its children', () => {
            render(
                <select>
                    <SelectOption value="option-1">Option 1</SelectOption>
                </select>,
            )

            expect(
                screen.getByRole('option', {
                    name: 'Option 1',
                }),
            ).toHaveTextContent('Option 1')
        })

        it('applies the option class', () => {
            render(
                <select>
                    <SelectOption value="option-1">Option 1</SelectOption>
                </select>,
            )

            expect(
                screen.getByRole('option', {
                    name: 'Option 1',
                }),
            ).toHaveClass('option')
        })
    })

    describe('native option props', () => {
        it('passes native option props to the element', () => {
            render(
                <select>
                    <SelectOption
                        value="br"
                        label="Brazil"
                        disabled
                        aria-label="Brazil option"
                    >
                        Brazil
                    </SelectOption>
                </select>,
            )

            const option = screen.getByRole('option', {
                name: 'Brazil option',
            })

            expect(option).toHaveAttribute('value', 'br')
            expect(option).toHaveAttribute('label', 'Brazil')
            expect(option).toBeDisabled()
        })

        it('supports the selected option', () => {
            render(
                <select defaultValue="br">
                    <SelectOption value="br">Brazil</SelectOption>
                </select>,
            )

            expect(
                screen.getByRole('option', {
                    name: 'Brazil',
                }),
            ).toHaveProperty('selected', true)
        })
    })
})

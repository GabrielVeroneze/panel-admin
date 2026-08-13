import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Input } from './Input'
import userEvent from '@testing-library/user-event'

describe('Input', () => {
    describe('rendering', () => {
        it('renders the input', () => {
            render(<Input />)

            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('uses medium size by default', () => {
            render(<Input />)

            const input = screen.getByRole('textbox')
            const wrapper = input.parentElement

            expect(wrapper).toHaveClass('medium')
        })

        it.each(['small', 'medium', 'large'] as const)(
            'applies the %s size',
            (size) => {
                render(<Input size={size} />)

                const input = screen.getByRole('textbox')
                const wrapper = input.parentElement

                expect(wrapper).toHaveClass(size)
            },
        )

        it.each(['error', 'success'] as const)(
            'applies the %s status',
            (status) => {
                render(<Input status={status} />)

                const input = screen.getByRole('textbox')
                const wrapper = input.parentElement

                expect(wrapper).toHaveClass(status)
            },
        )
    })

    describe('disabled', () => {
        it('is not disabled by default', () => {
            render(<Input />)

            expect(screen.getByRole('textbox')).not.toBeDisabled()
        })

        it('disables the input when disabled is true', () => {
            render(<Input disabled />)

            expect(screen.getByRole('textbox')).toBeDisabled()
        })

        it('applies the disabled class to the wrapper', () => {
            render(<Input disabled />)

            const input = screen.getByRole('textbox')
            const wrapper = input.parentElement

            expect(wrapper).toHaveClass('disabled')
        })
    })

    describe('icon', () => {
        it('renders the icon when provided', () => {
            render(<Input icon={<span data-testid="input-icon">Icon</span>} />)

            expect(screen.getByTestId('input-icon')).toBeInTheDocument()
        })

        it('does not render the icon when it is not provided', () => {
            render(<Input />)

            expect(screen.queryByTestId('input-icon')).not.toBeInTheDocument()
        })

        it('applies the withIcon class when an icon is provided', () => {
            render(<Input icon={<span data-testid="input-icon">Icon</span>} />)

            const input = screen.getByRole('textbox')
            const wrapper = input.parentElement

            expect(wrapper).toHaveClass('withIcon')
        })
    })

    describe('className', () => {
        it('applies a custom className to the wrapper', () => {
            render(<Input className="custom-input" />)

            const input = screen.getByRole('textbox')
            const wrapper = input.parentElement

            expect(wrapper).toHaveClass('custom-input')
        })
    })

    describe('interaction', () => {
        it('allows the user to type into the input', async () => {
            const user = userEvent.setup()

            render(<Input />)

            const input = screen.getByRole('textbox')

            await user.type(input, 'John Doe')

            expect(input).toHaveValue('John Doe')
        })

        it('calls onChange when the value changes', async () => {
            const user = userEvent.setup()
            const handleChange = vi.fn()

            render(<Input onChange={handleChange} />)

            const input = screen.getByRole('textbox')

            await user.type(input, 'Hello')

            expect(handleChange).toHaveBeenCalled()
        })
    })

    describe('native input props', () => {
        it('passes native input props to the input element', () => {
            render(
                <Input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                />,
            )

            const input = screen.getByRole('textbox')

            expect(input).toHaveAttribute('type', 'email')
            expect(input).toHaveAttribute('name', 'email')
            expect(input).toHaveAttribute('placeholder', 'Enter your email')
            expect(input).toHaveAttribute('autocomplete', 'email')
            expect(input).toBeRequired()
        })

        it('supports a controlled value', () => {
            render(<Input value="John Doe" onChange={() => {}} />)

            expect(screen.getByRole('textbox')).toHaveValue('John Doe')
        })
    })
})

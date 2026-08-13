import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Textarea } from './Textarea'
import userEvent from '@testing-library/user-event'

describe('Textarea', () => {
    describe('rendering', () => {
        it('renders the textarea', () => {
            render(<Textarea />)

            expect(screen.getByRole('textbox')).toBeInTheDocument()
        })

        it('uses medium size by default', () => {
            render(<Textarea />)

            expect(screen.getByRole('textbox')).toHaveClass('medium')
        })

        it.each(['small', 'medium', 'large'] as const)(
            'applies the %s size',
            (size) => {
                render(<Textarea size={size} />)

                expect(screen.getByRole('textbox')).toHaveClass(size)
            },
        )

        it.each(['success', 'error'] as const)(
            'applies the %s status',
            (status) => {
                render(<Textarea status={status} />)

                expect(screen.getByRole('textbox')).toHaveClass(status)
            },
        )

        it('applies a custom className', () => {
            render(<Textarea className="custom-textarea" />)

            expect(screen.getByRole('textbox')).toHaveClass('custom-textarea')
        })
    })

    describe('interaction', () => {
        it('allows the user to type into the textarea', async () => {
            const user = userEvent.setup()

            render(<Textarea />)

            const textarea = screen.getByRole('textbox')

            await user.type(textarea, 'Hello, world!')

            expect(textarea).toHaveValue('Hello, world!')
        })

        it('calls onChange when the value changes', async () => {
            const user = userEvent.setup()
            const handleChange = vi.fn()

            render(<Textarea onChange={handleChange} />)

            await user.type(screen.getByRole('textbox'), 'Hello')

            expect(handleChange).toHaveBeenCalled()
        })
    })

    describe('disabled state', () => {
        it('is not disabled by default', () => {
            render(<Textarea />)

            expect(screen.getByRole('textbox')).not.toBeDisabled()
        })

        it('is disabled when disabled is true', () => {
            render(<Textarea disabled />)

            expect(screen.getByRole('textbox')).toBeDisabled()
        })

        it('applies the disabled class when disabled', () => {
            render(<Textarea disabled />)

            expect(screen.getByRole('textbox')).toHaveClass('disabled')
        })

        it('does not change when clicked while disabled', async () => {
            const user = userEvent.setup()

            render(<Textarea disabled />)

            const textarea = screen.getByRole('textbox')

            await user.click(textarea)

            expect(textarea).toHaveValue('')
        })
    })

    describe('native textarea props', () => {
        it('passes native textarea props to the element', () => {
            render(
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter a description"
                    rows={5}
                    cols={40}
                    required
                    maxLength={100}
                />,
            )

            const textarea = screen.getByRole('textbox')

            expect(textarea).toHaveAttribute('id', 'description')
            expect(textarea).toHaveAttribute('name', 'description')
            expect(textarea).toHaveAttribute(
                'placeholder',
                'Enter a description',
            )
            expect(textarea).toHaveAttribute('rows', '5')
            expect(textarea).toHaveAttribute('cols', '40')
            expect(textarea).toBeRequired()
            expect(textarea).toHaveAttribute('maxlength', '100')
        })

        it('supports a controlled value', () => {
            render(<Textarea value="Existing content" onChange={() => {}} />)

            expect(screen.getByRole('textbox')).toHaveValue('Existing content')
        })

        it('supports an initial value with defaultValue', () => {
            render(<Textarea defaultValue="Initial content" />)

            expect(screen.getByRole('textbox')).toHaveValue('Initial content')
        })
    })
})

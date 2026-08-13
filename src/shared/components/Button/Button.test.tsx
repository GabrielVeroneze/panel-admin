import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'
import userEvent from '@testing-library/user-event'

describe('Button', () => {
    it('renders its children', () => {
        render(<Button>Click me</Button>)

        expect(
            screen.getByRole('button', { name: 'Click me' }),
        ).toBeInTheDocument()
    })

    it('uses the primary variant by default', () => {
        render(<Button>Click me</Button>)

        expect(screen.getByRole('button')).toHaveClass('primary')
    })

    it('uses the md size by default', () => {
        render(<Button>Click me</Button>)

        expect(screen.getByRole('button')).toHaveClass('md')
    })

    it('applies the provided variant', () => {
        render(<Button variant="danger">Delete</Button>)

        expect(screen.getByRole('button')).toHaveClass('danger')
    })

    it('applies the provided size', () => {
        render(<Button size="lg">Save</Button>)

        expect(screen.getByRole('button')).toHaveClass('lg')
    })

    it('applies a custom className', () => {
        render(<Button className="custom-button">Click me</Button>)

        expect(screen.getByRole('button')).toHaveClass('custom-button')
    })

    it('calls onClick when clicked', async () => {
        const user = userEvent.setup()
        const handleClick = vi.fn()

        render(<Button onClick={handleClick}>Click me</Button>)

        await user.click(screen.getByRole('button', { name: 'Click me' }))

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('is disabled when disabled is true', () => {
        render(<Button disabled>Click me</Button>)

        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('is disabled while loading', () => {
        render(<Button loading>Save</Button>)

        expect(screen.getByRole('button')).toBeDisabled()
    })

    it('does not render its children while loading', () => {
        render(<Button loading>Save</Button>)

        expect(screen.getByRole('button')).not.toHaveTextContent('Save')
    })

    it('renders the icon on the left', () => {
        render(
            <Button
                icon={<span data-testid="button-icon">Icon</span>}
                iconPosition="left"
            >
                Save
            </Button>,
        )

        const button = screen.getByRole('button', {
            name: 'Icon Save',
        })

        expect(button).toBeInTheDocument()
        expect(screen.getByTestId('button-icon')).toBeInTheDocument()
    })

    it('renders the icon on the right', () => {
        render(
            <Button
                icon={<span data-testid="button-icon">Icon</span>}
                iconPosition="right"
            >
                Save
            </Button>,
        )

        const button = screen.getByRole('button', {
            name: 'Save Icon',
        })

        expect(button).toBeInTheDocument()
        expect(screen.getByTestId('button-icon')).toBeInTheDocument()
    })

    it('renders only the icon when iconPosition is only', () => {
        render(
            <Button
                icon={<span data-testid="button-icon">Icon</span>}
                iconPosition="only"
            >
                Save
            </Button>,
        )

        const button = screen.getByRole('button', {
            name: 'Icon',
        })

        expect(button).toBeInTheDocument()
        expect(button).not.toHaveTextContent('Save')
    })

    it('renders children without an icon by default', () => {
        render(<Button>Save</Button>)

        expect(screen.getByRole('button', { name: 'Save' })).toHaveTextContent(
            'Save',
        )
    })

    it('passes native button props to the button element', () => {
        render(
            <Button type="submit" aria-label="Submit form" name="submit">
                Submit
            </Button>,
        )

        const button = screen.getByRole('button', {
            name: 'Submit form',
        })

        expect(button).toHaveAttribute('type', 'submit')
        expect(button).toHaveAttribute('name', 'submit')
        expect(button).toHaveAttribute('aria-label', 'Submit form')
    })
})

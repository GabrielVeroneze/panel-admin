import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './Button'
import userEvent from '@testing-library/user-event'

describe('Button', () => {
    describe('rendering', () => {
        it('renders its children', () => {
            render(<Button>Click me</Button>)

            expect(
                screen.getByRole('button', {
                    name: 'Click me',
                }),
            ).toBeInTheDocument()
        })

        it('uses primary variant by default', () => {
            render(<Button>Click me</Button>)

            expect(screen.getByRole('button')).toHaveClass('primary')
        })

        it('uses md size by default', () => {
            render(<Button>Click me</Button>)

            expect(screen.getByRole('button')).toHaveClass('md')
        })

        it.each([
            'primary',
            'black',
            'gray',
            'transparent',
            'danger',
            'success',
            'warning',
        ] as const)('applies the %s variant', (variant) => {
            render(<Button variant={variant}>Click me</Button>)

            expect(screen.getByRole('button')).toHaveClass(variant)
        })

        it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
            'applies the %s size',
            (size) => {
                render(<Button size={size}>Click me</Button>)

                expect(screen.getByRole('button')).toHaveClass(size)
            },
        )

        it('applies a custom className', () => {
            render(<Button className="custom-button">Click me</Button>)

            expect(screen.getByRole('button')).toHaveClass('custom-button')
        })
    })

    describe('interaction', () => {
        it('calls onClick when clicked', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            render(<Button onClick={handleClick}>Click me</Button>)

            await user.click(
                screen.getByRole('button', {
                    name: 'Click me',
                }),
            )

            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('does not call onClick when disabled', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            render(
                <Button disabled onClick={handleClick}>
                    Click me
                </Button>,
            )

            await user.click(
                screen.getByRole('button', {
                    name: 'Click me',
                }),
            )

            expect(handleClick).not.toHaveBeenCalled()
        })

        it('does not call onClick while loading', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            render(
                <Button loading onClick={handleClick}>
                    Save
                </Button>,
            )

            await user.click(screen.getByRole('button'))

            expect(handleClick).not.toHaveBeenCalled()
        })
    })

    describe('disabled', () => {
        it('is not disabled by default', () => {
            render(<Button>Click me</Button>)

            expect(screen.getByRole('button')).not.toBeDisabled()
        })

        it('is disabled when disabled is true', () => {
            render(<Button disabled>Click me</Button>)

            expect(screen.getByRole('button')).toBeDisabled()
        })

        it('is disabled while loading', () => {
            render(<Button loading>Save</Button>)

            expect(screen.getByRole('button')).toBeDisabled()
        })
    })

    describe('loading', () => {
        it('does not render its children while loading', () => {
            render(<Button loading>Save</Button>)

            expect(screen.getByRole('button')).not.toHaveTextContent('Save')
        })
    })

    describe('icon', () => {
        it('renders the icon on the left', () => {
            render(
                <Button
                    icon={<span data-testid="button-icon">Icon</span>}
                    iconPosition="left"
                >
                    Save
                </Button>,
            )

            const button = screen.getByRole('button')
            const icon = screen.getByTestId('button-icon')

            expect(button).toHaveTextContent('IconSave')
            expect(icon).toBeInTheDocument()
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

            const button = screen.getByRole('button')
            const icon = screen.getByTestId('button-icon')

            expect(button).toHaveTextContent('SaveIcon')
            expect(icon).toBeInTheDocument()
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
            expect(button).toHaveTextContent('Icon')
            expect(button).not.toHaveTextContent('Save')
        })

        it('renders children without an icon when iconPosition is none', () => {
            render(
                <Button
                    icon={<span data-testid="button-icon">Icon</span>}
                    iconPosition="none"
                >
                    Save
                </Button>,
            )

            expect(
                screen.getByRole('button', {
                    name: 'Save',
                }),
            ).toBeInTheDocument()

            expect(screen.queryByTestId('button-icon')).not.toBeInTheDocument()
        })
    })

    describe('native button props', () => {
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
})

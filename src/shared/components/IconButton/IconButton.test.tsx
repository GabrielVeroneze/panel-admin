import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { IconButton } from './IconButton'
import userEvent from '@testing-library/user-event'

describe('IconButton', () => {
    describe('rendering', () => {
        it('renders the icon', () => {
            render(<IconButton icon={<span data-testid="icon">Icon</span>} />)

            expect(screen.getByTestId('icon')).toBeInTheDocument()
        })

        it('uses 24px as the default size', () => {
            render(<IconButton icon={<span data-testid="icon">Icon</span>} />)

            const button = screen.getByRole('button')

            expect(button).toHaveStyle({
                width: '24px',
                height: '24px',
            })
        })

        it.each([16, 20, 32, 48] as const)('applies %spx size', (size) => {
            render(
                <IconButton
                    icon={<span data-testid="icon">Icon</span>}
                    size={size}
                />,
            )

            expect(screen.getByRole('button')).toHaveStyle({
                width: `${size}px`,
                height: `${size}px`,
            })
        })

        it('uses button type by default', () => {
            render(<IconButton icon={<span data-testid="icon">Icon</span>} />)

            expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
        })
    })

    describe('interaction', () => {
        it('calls onClick when clicked', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            render(
                <IconButton
                    icon={<span data-testid="icon">Icon</span>}
                    onClick={handleClick}
                />,
            )

            await user.click(screen.getByRole('button'))

            expect(handleClick).toHaveBeenCalledTimes(1)
        })
    })

    describe('disabled state', () => {
        it('is not disabled by default', () => {
            render(<IconButton icon={<span data-testid="icon">Icon</span>} />)

            expect(screen.getByRole('button')).not.toBeDisabled()
        })

        it('is disabled when disabled is true', () => {
            render(
                <IconButton
                    icon={<span data-testid="icon">Icon</span>}
                    disabled
                />,
            )

            expect(screen.getByRole('button')).toBeDisabled()
        })

        it('does not call onClick when disabled', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            render(
                <IconButton
                    icon={<span data-testid="icon">Icon</span>}
                    disabled
                    onClick={handleClick}
                />,
            )

            await user.click(screen.getByRole('button'))

            expect(handleClick).not.toHaveBeenCalled()
        })
    })

    describe('native button props', () => {
        it('passes native button props to the element', () => {
            render(
                <IconButton
                    icon={<span data-testid="icon">Icon</span>}
                    aria-label="Open menu"
                    name="menu"
                    value="open"
                />,
            )

            const button = screen.getByRole('button', {
                name: 'Open menu',
            })

            expect(button).toHaveAttribute('aria-label', 'Open menu')
            expect(button).toHaveAttribute('name', 'menu')
            expect(button).toHaveAttribute('value', 'open')
        })

        it('allows the type to be overridden', () => {
            render(
                <IconButton
                    icon={<span data-testid="icon">Icon</span>}
                    type="submit"
                />,
            )

            expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
        })
    })
})

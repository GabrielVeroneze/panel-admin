import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from './Badge'

describe('Badge', () => {
    describe('rendering', () => {
        it('renders its children', () => {
            render(<Badge>Active</Badge>)

            expect(screen.getByText('Active')).toBeInTheDocument()
        })

        it('uses gray color by default', () => {
            render(<Badge>Active</Badge>)

            expect(screen.getByText('Active')).toHaveClass('gray')
        })

        it('uses md size by default', () => {
            render(<Badge>Active</Badge>)

            expect(screen.getByText('Active')).toHaveClass('md')
        })

        it.each(['gray', 'red', 'yellow', 'green', 'blue'] as const)(
            'applies the %s color',
            (color) => {
                render(<Badge color={color}>Active</Badge>)

                expect(screen.getByText('Active')).toHaveClass(color)
            },
        )

        it.each(['sm', 'md'] as const)('applies the %s size', (size) => {
            render(<Badge size={size}>Active</Badge>)

            expect(screen.getByText('Active')).toHaveClass(size)
        })
    })

    describe('content', () => {
        it('renders ReactNode children', () => {
            render(
                <Badge>
                    <strong>Active</strong>
                </Badge>,
            )

            expect(screen.getByText('Active')).toBeInTheDocument()
        })

        it('renders multiple children', () => {
            render(
                <Badge>
                    <span>Status:</span>
                    <strong>Active</strong>
                </Badge>,
            )

            expect(screen.getByText('Status:')).toBeInTheDocument()

            expect(screen.getByText('Active')).toBeInTheDocument()
        })
    })
})

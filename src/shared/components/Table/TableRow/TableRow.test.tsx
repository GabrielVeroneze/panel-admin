import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TableRow } from './TableRow'

describe('TableRow', () => {
    describe('rendering', () => {
        it('renders the row', () => {
            render(
                <table>
                    <tbody>
                        <TableRow>
                            <td>Name</td>
                        </TableRow>
                    </tbody>
                </table>,
            )

            expect(screen.getByRole('row')).toBeInTheDocument()
        })

        it('renders its children', () => {
            render(
                <table>
                    <tbody>
                        <TableRow>
                            <td>John Doe</td>
                        </TableRow>
                    </tbody>
                </table>,
            )

            expect(screen.getByText('John Doe')).toBeInTheDocument()
        })

        it('uses the md size by default', () => {
            render(
                <table>
                    <tbody>
                        <TableRow>
                            <td>Name</td>
                        </TableRow>
                    </tbody>
                </table>,
            )

            expect(screen.getByRole('row')).toHaveClass('md')
        })
    })

    describe('size', () => {
        it.each(['sm', 'md', 'lg'] as const)('applies the %s size', (size) => {
            render(
                <table>
                    <tbody>
                        <TableRow size={size}>
                            <td>Name</td>
                        </TableRow>
                    </tbody>
                </table>,
            )

            expect(screen.getByRole('row')).toHaveClass(size)
        })
    })

    describe('native row props', () => {
        it('passes native row props', () => {
            render(
                <table>
                    <tbody>
                        <TableRow
                            id="user-row"
                            data-testid="user-row"
                            aria-label="John Doe"
                        >
                            <td>John Doe</td>
                        </TableRow>
                    </tbody>
                </table>,
            )

            const row = screen.getByRole('row', {
                name: 'John Doe',
            })

            expect(row).toHaveAttribute('id', 'user-row')

            expect(row).toHaveAttribute('data-testid', 'user-row')

            expect(row).toHaveAttribute('aria-label', 'John Doe')
        })
    })
})

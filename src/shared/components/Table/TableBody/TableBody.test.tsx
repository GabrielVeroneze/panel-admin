import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TableBody } from './TableBody'

describe('TableBody', () => {
    describe('rendering', () => {
        it('renders a tbody element', () => {
            render(
                <table>
                    <TableBody>
                        <tr>
                            <td>Name</td>
                        </tr>
                    </TableBody>
                </table>,
            )

            expect(screen.getByRole('rowgroup')).toBeInTheDocument()
        })

        it('renders its children', () => {
            render(
                <table>
                    <TableBody>
                        <tr>
                            <td>John Doe</td>
                        </tr>
                    </TableBody>
                </table>,
            )

            expect(
                screen.getByRole('cell', {
                    name: 'John Doe',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('native tbody props', () => {
        it('passes native tbody props', () => {
            render(
                <table>
                    <TableBody
                        id="table-body"
                        data-testid="table-body"
                        aria-label="Table body"
                    >
                        <tr>
                            <td>Name</td>
                        </tr>
                    </TableBody>
                </table>,
            )

            const tableBody = screen.getByRole('rowgroup', {
                name: 'Table body',
            })

            expect(tableBody).toHaveAttribute('id', 'table-body')

            expect(tableBody).toHaveAttribute('data-testid', 'table-body')

            expect(tableBody).toHaveAttribute('aria-label', 'Table body')
        })
    })
})

import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TableHead } from './TableHead'

describe('TableHead', () => {
    describe('rendering', () => {
        it('renders a thead element', () => {
            render(
                <table>
                    <TableHead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </TableHead>
                </table>,
            )

            expect(screen.getByRole('rowgroup')).toBeInTheDocument()
        })

        it('renders its children', () => {
            render(
                <table>
                    <TableHead>
                        <tr>
                            <th>Name</th>
                        </tr>
                    </TableHead>
                </table>,
            )

            expect(
                screen.getByRole('columnheader', {
                    name: 'Name',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('native thead props', () => {
        it('passes native thead props', () => {
            render(
                <table>
                    <TableHead
                        id="table-head"
                        data-testid="table-head"
                        aria-label="Table header"
                    >
                        <tr>
                            <th>Name</th>
                        </tr>
                    </TableHead>
                </table>,
            )

            const tableHead = screen.getByRole('rowgroup', {
                name: 'Table header',
            })

            expect(tableHead).toHaveAttribute('id', 'table-head')

            expect(tableHead).toHaveAttribute('data-testid', 'table-head')

            expect(tableHead).toHaveAttribute('aria-label', 'Table header')
        })
    })
})

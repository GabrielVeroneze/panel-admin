import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Table } from './Table'

describe('Table', () => {
    describe('rendering', () => {
        it('renders the table', () => {
            render(
                <Table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                        </tr>
                    </tbody>
                </Table>,
            )

            expect(screen.getByRole('table')).toBeInTheDocument()
        })

        it('renders its children', () => {
            render(
                <Table>
                    <tbody>
                        <tr>
                            <td>John Doe</td>
                        </tr>
                    </tbody>
                </Table>,
            )

            expect(screen.getByText('John Doe')).toBeInTheDocument()
        })

        it('applies the columns value as a CSS custom property', () => {
            render(
                <Table columns="repeat(3, 1fr)">
                    <tbody>
                        <tr>
                            <td>Name</td>
                        </tr>
                    </tbody>
                </Table>,
            )

            expect(screen.getByRole('table')).toHaveStyle({
                '--table-columns': 'repeat(3, 1fr)',
            })
        })
    })

    describe('styling', () => {
        it('does not apply the striped class by default', () => {
            render(
                <Table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                        </tr>
                    </tbody>
                </Table>,
            )

            expect(screen.getByRole('table')).not.toHaveClass('striped')
        })

        it('applies the striped class when striped is true', () => {
            render(
                <Table striped>
                    <tbody>
                        <tr>
                            <td>Name</td>
                        </tr>
                    </tbody>
                </Table>,
            )

            expect(screen.getByRole('table')).toHaveClass('striped')
        })

        it('does not apply the borderedRows class by default', () => {
            render(
                <Table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                        </tr>
                    </tbody>
                </Table>,
            )

            expect(screen.getByRole('table')).not.toHaveClass('borderedRows')
        })

        it('applies the borderedRows class when borderedRows is true', () => {
            render(
                <Table borderedRows>
                    <tbody>
                        <tr>
                            <td>Name</td>
                        </tr>
                    </tbody>
                </Table>,
            )

            expect(screen.getByRole('table')).toHaveClass('borderedRows')
        })

        it('applies both striped and borderedRows classes', () => {
            render(
                <Table striped borderedRows>
                    <tbody>
                        <tr>
                            <td>Name</td>
                        </tr>
                    </tbody>
                </Table>,
            )

            const table = screen.getByRole('table')

            expect(table).toHaveClass('striped')
            expect(table).toHaveClass('borderedRows')
        })

        it('applies a custom className', () => {
            render(
                <Table className="custom-table">
                    <tbody>
                        <tr>
                            <td>Name</td>
                        </tr>
                    </tbody>
                </Table>,
            )

            expect(screen.getByRole('table')).toHaveClass('custom-table')
        })
    })

    describe('native table props', () => {
        it('passes native table props', () => {
            render(
                <Table
                    id="users-table"
                    data-testid="users-table"
                    aria-label="Users"
                >
                    <tbody>
                        <tr>
                            <td>Name</td>
                        </tr>
                    </tbody>
                </Table>,
            )

            const table = screen.getByRole('table', {
                name: 'Users',
            })

            expect(table).toHaveAttribute('id', 'users-table')

            expect(table).toHaveAttribute('data-testid', 'users-table')

            expect(table).toHaveAttribute('aria-label', 'Users')
        })
    })
})

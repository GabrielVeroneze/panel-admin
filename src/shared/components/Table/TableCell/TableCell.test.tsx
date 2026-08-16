import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TableCell } from './TableCell'

describe('TableCell', () => {
    describe('rendering', () => {
        it('renders a td element by default', () => {
            render(
                <table>
                    <tbody>
                        <tr>
                            <TableCell>Name</TableCell>
                        </tr>
                    </tbody>
                </table>,
            )

            expect(screen.getByRole('cell')).toBeInTheDocument()
        })

        it('renders its children', () => {
            render(
                <table>
                    <tbody>
                        <tr>
                            <TableCell>John Doe</TableCell>
                        </tr>
                    </tbody>
                </table>,
            )

            expect(screen.getByText('John Doe')).toBeInTheDocument()
        })

        it('renders a th element when header is true', () => {
            render(
                <table>
                    <thead>
                        <tr>
                            <TableCell header>Name</TableCell>
                        </tr>
                    </thead>
                </table>,
            )

            expect(screen.getByRole('columnheader')).toBeInTheDocument()
        })

        it('uses the md size by default', () => {
            render(
                <table>
                    <tbody>
                        <tr>
                            <TableCell>Name</TableCell>
                        </tr>
                    </tbody>
                </table>,
            )

            expect(screen.getByRole('cell')).toHaveClass('md')
        })
    })

    describe('size', () => {
        it.each(['md', 'lg'] as const)('applies the %s size', (size) => {
            render(
                <table>
                    <tbody>
                        <tr>
                            <TableCell size={size}>Name</TableCell>
                        </tr>
                    </tbody>
                </table>,
            )

            expect(screen.getByRole('cell')).toHaveClass(size)
        })

        it.each(['md', 'lg'] as const)(
            'applies the %s size to a header cell',
            (size) => {
                render(
                    <table>
                        <thead>
                            <tr>
                                <TableCell header size={size}>
                                    Name
                                </TableCell>
                            </tr>
                        </thead>
                    </table>,
                )

                expect(screen.getByRole('columnheader')).toHaveClass(size)
            },
        )
    })

    describe('header', () => {
        it('applies the header class when header is true', () => {
            render(
                <table>
                    <thead>
                        <tr>
                            <TableCell header>Name</TableCell>
                        </tr>
                    </thead>
                </table>,
            )

            expect(screen.getByRole('columnheader')).toHaveClass('header')
        })

        it('does not apply the header class by default', () => {
            render(
                <table>
                    <tbody>
                        <tr>
                            <TableCell>Name</TableCell>
                        </tr>
                    </tbody>
                </table>,
            )

            expect(screen.getByRole('cell')).not.toHaveClass('header')
        })
    })

    describe('className', () => {
        it('applies a custom className', () => {
            render(
                <table>
                    <tbody>
                        <tr>
                            <TableCell className="custom-cell">Name</TableCell>
                        </tr>
                    </tbody>
                </table>,
            )

            expect(screen.getByRole('cell')).toHaveClass('custom-cell')
        })

        it('applies a custom className to a header cell', () => {
            render(
                <table>
                    <thead>
                        <tr>
                            <TableCell header className="custom-cell">
                                Name
                            </TableCell>
                        </tr>
                    </thead>
                </table>,
            )

            expect(screen.getByRole('columnheader')).toHaveClass('custom-cell')
        })
    })

    describe('native cell props', () => {
        it('passes native cell props', () => {
            render(
                <table>
                    <tbody>
                        <tr>
                            <TableCell
                                id="name-cell"
                                data-testid="name-cell"
                                aria-label="User name"
                            >
                                John Doe
                            </TableCell>
                        </tr>
                    </tbody>
                </table>,
            )

            const cell = screen.getByRole('cell', {
                name: 'User name',
            })

            expect(cell).toHaveAttribute('id', 'name-cell')

            expect(cell).toHaveAttribute('data-testid', 'name-cell')

            expect(cell).toHaveAttribute('aria-label', 'User name')
        })

        it('passes native cell props to a header cell', () => {
            render(
                <table>
                    <thead>
                        <tr>
                            <TableCell
                                header
                                id="name-header"
                                data-testid="name-header"
                                aria-label="Name"
                            >
                                Name
                            </TableCell>
                        </tr>
                    </thead>
                </table>,
            )

            const header = screen.getByRole('columnheader', {
                name: 'Name',
            })

            expect(header).toHaveAttribute('id', 'name-header')

            expect(header).toHaveAttribute('data-testid', 'name-header')

            expect(header).toHaveAttribute('aria-label', 'Name')
        })
    })
})

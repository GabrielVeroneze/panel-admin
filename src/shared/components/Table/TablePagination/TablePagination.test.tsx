import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TablePagination } from './TablePagination'
import userEvent from '@testing-library/user-event'

describe('TablePagination', () => {
    describe('rendering', () => {
        it('renders the current range and total', () => {
            render(
                <TablePagination
                    page={1}
                    pageSize={10}
                    total={50}
                    onPageChange={vi.fn()}
                />,
            )

            expect(screen.getByText('1-10')).toBeInTheDocument()

            expect(screen.getByText('50')).toBeInTheDocument()
        })

        it('renders the provided label', () => {
            render(
                <TablePagination
                    page={1}
                    pageSize={10}
                    total={50}
                    label="users"
                    onPageChange={vi.fn()}
                />,
            )

            expect(screen.getByText(/Showing/)).toHaveTextContent(
                'Showing 1-10 of 50 users',
            )
        })

        it('renders without a label when one is not provided', () => {
            render(
                <TablePagination
                    page={1}
                    pageSize={10}
                    total={50}
                    onPageChange={vi.fn()}
                />,
            )

            expect(screen.getByText(/Showing/)).toHaveTextContent(
                'Showing 1-10 of 50',
            )
        })
    })

    describe('page range', () => {
        it('calculates the range for the first page', () => {
            render(
                <TablePagination
                    page={1}
                    pageSize={10}
                    total={50}
                    onPageChange={vi.fn()}
                />,
            )

            expect(screen.getByText(/Showing/)).toHaveTextContent(
                'Showing 1-10 of 50',
            )
        })

        it('calculates the range for a middle page', () => {
            render(
                <TablePagination
                    page={3}
                    pageSize={10}
                    total={50}
                    onPageChange={vi.fn()}
                />,
            )

            expect(screen.getByText(/Showing/)).toHaveTextContent(
                'Showing 21-30 of 50',
            )
        })

        it('limits the end of the range to the total', () => {
            render(
                <TablePagination
                    page={3}
                    pageSize={10}
                    total={25}
                    onPageChange={vi.fn()}
                />,
            )

            expect(screen.getByText(/Showing/)).toHaveTextContent(
                'Showing 21-25 of 25',
            )
        })
    })

    describe('navigation', () => {
        it('disables the previous button on the first page', () => {
            render(
                <TablePagination
                    page={1}
                    pageSize={10}
                    total={50}
                    onPageChange={vi.fn()}
                />,
            )

            expect(
                screen.getByRole('button', {
                    name: 'Previous page',
                }),
            ).toBeDisabled()
        })

        it('enables the next button when there is a next page', () => {
            render(
                <TablePagination
                    page={1}
                    pageSize={10}
                    total={50}
                    onPageChange={vi.fn()}
                />,
            )

            expect(
                screen.getByRole('button', {
                    name: 'Next page',
                }),
            ).toBeEnabled()
        })

        it('calls onPageChange with the previous page', async () => {
            const user = userEvent.setup()
            const onPageChange = vi.fn()

            render(
                <TablePagination
                    page={3}
                    pageSize={10}
                    total={50}
                    onPageChange={onPageChange}
                />,
            )

            await user.click(
                screen.getByRole('button', {
                    name: 'Previous page',
                }),
            )

            expect(onPageChange).toHaveBeenCalledTimes(1)
            expect(onPageChange).toHaveBeenCalledWith(2)
        })

        it('calls onPageChange with the next page', async () => {
            const user = userEvent.setup()
            const onPageChange = vi.fn()

            render(
                <TablePagination
                    page={2}
                    pageSize={10}
                    total={50}
                    onPageChange={onPageChange}
                />,
            )

            await user.click(
                screen.getByRole('button', {
                    name: 'Next page',
                }),
            )

            expect(onPageChange).toHaveBeenCalledTimes(1)
            expect(onPageChange).toHaveBeenCalledWith(3)
        })

        it('disables the next button on the last page', () => {
            render(
                <TablePagination
                    page={5}
                    pageSize={10}
                    total={50}
                    onPageChange={vi.fn()}
                />,
            )

            expect(
                screen.getByRole('button', {
                    name: 'Next page',
                }),
            ).toBeDisabled()
        })

        it('disables both buttons when there is only one page', () => {
            render(
                <TablePagination
                    page={1}
                    pageSize={10}
                    total={5}
                    onPageChange={vi.fn()}
                />,
            )

            expect(
                screen.getByRole('button', {
                    name: 'Previous page',
                }),
            ).toBeDisabled()

            expect(
                screen.getByRole('button', {
                    name: 'Next page',
                }),
            ).toBeDisabled()
        })
    })
})

import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DataTableFooter } from './DataTableFooter'
import userEvent from '@testing-library/user-event'

describe('DataTableFooter', () => {
    describe('rendering', () => {
        it('renders the table pagination', () => {
            render(
                <DataTableFooter
                    label="users"
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
            ).toBeInTheDocument()

            expect(
                screen.getByRole('button', {
                    name: 'Next page',
                }),
            ).toBeInTheDocument()
        })

        it('renders the pagination information', () => {
            render(
                <DataTableFooter
                    label="users"
                    page={2}
                    pageSize={10}
                    total={50}
                    onPageChange={vi.fn()}
                />,
            )

            expect(screen.getByText(/Showing/)).toHaveTextContent(
                'Showing 11-20 of 50 users',
            )
        })

        it('renders the provided info', () => {
            render(
                <DataTableFooter
                    label="users"
                    page={1}
                    pageSize={10}
                    total={50}
                    onPageChange={vi.fn()}
                    info={<span>50 users selected</span>}
                />,
            )

            expect(screen.getByText('50 users selected')).toBeInTheDocument()
        })

        it('does not render the info when it is not provided', () => {
            render(
                <DataTableFooter
                    label="users"
                    page={1}
                    pageSize={10}
                    total={50}
                    onPageChange={vi.fn()}
                />,
            )

            expect(
                screen.queryByText('50 users selected'),
            ).not.toBeInTheDocument()
        })
    })

    describe('pagination', () => {
        it('passes the label to the table pagination', () => {
            render(
                <DataTableFooter
                    label="products"
                    page={1}
                    pageSize={10}
                    total={50}
                    onPageChange={vi.fn()}
                />,
            )

            expect(screen.getByText(/Showing/)).toHaveTextContent(
                'Showing 1-10 of 50 products',
            )
        })

        it('passes the pagination values to the table pagination', () => {
            render(
                <DataTableFooter
                    label="users"
                    page={3}
                    pageSize={10}
                    total={35}
                    onPageChange={vi.fn()}
                />,
            )

            expect(screen.getByText(/Showing/)).toHaveTextContent(
                'Showing 21-30 of 35 users',
            )
        })

        it('calls onPageChange when navigating to the next page', async () => {
            const user = userEvent.setup()
            const onPageChange = vi.fn()

            render(
                <DataTableFooter
                    label="users"
                    page={1}
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
            expect(onPageChange).toHaveBeenCalledWith(2)
        })

        it('calls onPageChange when navigating to the previous page', async () => {
            const user = userEvent.setup()
            const onPageChange = vi.fn()

            render(
                <DataTableFooter
                    label="users"
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
    })
})

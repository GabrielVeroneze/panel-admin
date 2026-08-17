import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { DataTableToolbar } from './DataTableToolbar'
import userEvent from '@testing-library/user-event'

describe('DataTableToolbar', () => {
    describe('rendering', () => {
        it('renders the search input with the provided placeholder', () => {
            render(
                <DataTableToolbar
                    search=""
                    searchPlaceholder="Search users..."
                    createLabel="Add user"
                    hasSelection={false}
                    onSearchChange={vi.fn()}
                    onCreate={vi.fn()}
                    onDelete={vi.fn()}
                />,
            )

            expect(
                screen.getByPlaceholderText('Search users...'),
            ).toBeInTheDocument()
        })

        it('renders the current search value', () => {
            render(
                <DataTableToolbar
                    search="John"
                    searchPlaceholder="Search users..."
                    createLabel="Add user"
                    hasSelection={false}
                    onSearchChange={vi.fn()}
                    onCreate={vi.fn()}
                    onDelete={vi.fn()}
                />,
            )

            expect(screen.getByDisplayValue('John')).toBeInTheDocument()
        })

        it('renders the create button with the provided label', () => {
            render(
                <DataTableToolbar
                    search=""
                    searchPlaceholder="Search users..."
                    createLabel="Add user"
                    hasSelection={false}
                    onSearchChange={vi.fn()}
                    onCreate={vi.fn()}
                    onDelete={vi.fn()}
                />,
            )

            expect(
                screen.getByRole('button', {
                    name: 'Add user',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('search', () => {
        it('calls onSearchChange with the updated search value', () => {
            const onSearchChange = vi.fn()

            render(
                <DataTableToolbar
                    search=""
                    searchPlaceholder="Search users..."
                    createLabel="Add user"
                    hasSelection={false}
                    onSearchChange={onSearchChange}
                    onCreate={vi.fn()}
                    onDelete={vi.fn()}
                />,
            )

            const input = screen.getByPlaceholderText('Search users...')

            fireEvent.change(input, {
                target: { value: 'John' },
            })

            expect(onSearchChange).toHaveBeenCalledTimes(1)
            expect(onSearchChange).toHaveBeenCalledWith('John')
        })
    })

    describe('selection', () => {
        it('disables the delete button when there is no selection', () => {
            render(
                <DataTableToolbar
                    search=""
                    searchPlaceholder="Search users..."
                    createLabel="Add user"
                    hasSelection={false}
                    onSearchChange={vi.fn()}
                    onCreate={vi.fn()}
                    onDelete={vi.fn()}
                />,
            )

            const buttons = screen.getAllByRole('button')

            expect(buttons).toHaveLength(5)

            expect(buttons[1]).toBeDisabled()
        })

        it('enables the delete button when there is a selection', () => {
            render(
                <DataTableToolbar
                    search=""
                    searchPlaceholder="Search users..."
                    createLabel="Add user"
                    hasSelection={true}
                    onSearchChange={vi.fn()}
                    onCreate={vi.fn()}
                    onDelete={vi.fn()}
                />,
            )

            const buttons = screen.getAllByRole('button')

            expect(buttons[1]).toBeEnabled()
        })
    })

    describe('actions', () => {
        it('calls onDelete when the delete button is clicked', async () => {
            const user = userEvent.setup()
            const onDelete = vi.fn()

            render(
                <DataTableToolbar
                    search=""
                    searchPlaceholder="Search users..."
                    createLabel="Add user"
                    hasSelection={true}
                    onSearchChange={vi.fn()}
                    onCreate={vi.fn()}
                    onDelete={onDelete}
                />,
            )

            const buttons = screen.getAllByRole('button')

            await user.click(buttons[1])

            expect(onDelete).toHaveBeenCalledTimes(1)
        })

        it('calls onCreate when the create button is clicked', async () => {
            const user = userEvent.setup()
            const onCreate = vi.fn()

            render(
                <DataTableToolbar
                    search=""
                    searchPlaceholder="Search users..."
                    createLabel="Add user"
                    hasSelection={false}
                    onSearchChange={vi.fn()}
                    onCreate={onCreate}
                    onDelete={vi.fn()}
                />,
            )

            await user.click(
                screen.getByRole('button', {
                    name: 'Add user',
                }),
            )

            expect(onCreate).toHaveBeenCalledTimes(1)
        })
    })
})

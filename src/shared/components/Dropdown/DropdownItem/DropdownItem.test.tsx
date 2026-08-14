import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DropdownItem } from './DropdownItem'
import userEvent from '@testing-library/user-event'

describe('DropdownItem', () => {
    describe('rendering', () => {
        it('renders its children', () => {
            render(<DropdownItem>Edit profile</DropdownItem>)

            expect(
                screen.getByRole('button', {
                    name: 'Edit profile',
                }),
            ).toBeInTheDocument()
        })

        it('uses the default variant', () => {
            render(<DropdownItem>Edit profile</DropdownItem>)

            expect(
                screen.getByRole('button', {
                    name: 'Edit profile',
                }).parentElement,
            ).toHaveClass('default')
        })

        it.each(['default', 'danger'] as const)(
            'applies the %s variant',
            (variant) => {
                render(<DropdownItem variant={variant}>Delete</DropdownItem>)

                expect(
                    screen.getByRole('button', {
                        name: 'Delete',
                    }).parentElement,
                ).toHaveClass(variant)
            },
        )

        it('renders the icon when provided', () => {
            render(
                <DropdownItem icon={<span data-testid="item-icon">Icon</span>}>
                    Edit
                </DropdownItem>,
            )

            expect(screen.getByTestId('item-icon')).toBeInTheDocument()
        })

        it('does not render the icon when not provided', () => {
            render(<DropdownItem>Edit</DropdownItem>)

            expect(screen.queryByTestId('item-icon')).not.toBeInTheDocument()
        })
    })

    describe('interaction', () => {
        it('calls onClick when clicked', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            render(
                <DropdownItem onClick={handleClick}>Edit profile</DropdownItem>,
            )

            await user.click(
                screen.getByRole('button', {
                    name: 'Edit profile',
                }),
            )

            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('does not call onClick when disabled', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            render(
                <DropdownItem disabled onClick={handleClick}>
                    Delete
                </DropdownItem>,
            )

            const button = screen.getByRole('button', {
                name: 'Delete',
            })

            expect(button).toBeDisabled()

            await user.click(button)

            expect(handleClick).not.toHaveBeenCalled()
        })
    })

    describe('disabled state', () => {
        it('is not disabled by default', () => {
            render(<DropdownItem>Edit profile</DropdownItem>)

            expect(
                screen.getByRole('button', {
                    name: 'Edit profile',
                }),
            ).not.toBeDisabled()
        })

        it('is disabled when disabled is true', () => {
            render(<DropdownItem disabled>Delete</DropdownItem>)

            expect(
                screen.getByRole('button', {
                    name: 'Delete',
                }),
            ).toBeDisabled()
        })
    })
})

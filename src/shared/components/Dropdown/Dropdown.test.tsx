import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Dropdown } from './Dropdown'
import userEvent from '@testing-library/user-event'

describe('Dropdown', () => {
    describe('rendering', () => {
        it('renders the trigger', () => {
            render(
                <Dropdown trigger="Open menu">
                    <li>Menu item</li>
                </Dropdown>,
            )

            expect(
                screen.getByRole('button', {
                    name: 'Open menu',
                }),
            ).toBeInTheDocument()
        })

        it('does not render the dropdown initially', () => {
            render(
                <Dropdown trigger="Open menu">
                    <li>Menu item</li>
                </Dropdown>,
            )

            expect(screen.queryByRole('list')).not.toBeInTheDocument()
        })

        it('uses right alignment by default', async () => {
            const user = userEvent.setup()

            render(
                <Dropdown trigger="Open menu">
                    <li>Menu item</li>
                </Dropdown>,
            )

            await user.click(
                screen.getByRole('button', {
                    name: 'Open menu',
                }),
            )

            expect(screen.getByRole('list')).toHaveClass('right')
        })

        it.each(['left', 'right'] as const)(
            'applies the %s alignment',
            async (align) => {
                const user = userEvent.setup()

                render(
                    <Dropdown trigger="Open menu" align={align}>
                        <li>Menu item</li>
                    </Dropdown>,
                )

                await user.click(
                    screen.getByRole('button', {
                        name: 'Open menu',
                    }),
                )

                expect(screen.getByRole('list')).toHaveClass(align)
            },
        )
    })

    describe('interaction', () => {
        it('opens the dropdown when the trigger is clicked', async () => {
            const user = userEvent.setup()

            render(
                <Dropdown trigger="Open menu">
                    <li>Menu item</li>
                </Dropdown>,
            )

            await user.click(
                screen.getByRole('button', {
                    name: 'Open menu',
                }),
            )

            expect(screen.getByRole('list')).toBeInTheDocument()
        })

        it('renders its children when open', async () => {
            const user = userEvent.setup()

            render(
                <Dropdown trigger="Open menu">
                    <li>Profile</li>
                    <li>Settings</li>
                </Dropdown>,
            )

            await user.click(
                screen.getByRole('button', {
                    name: 'Open menu',
                }),
            )

            expect(screen.getByText('Profile')).toBeInTheDocument()

            expect(screen.getByText('Settings')).toBeInTheDocument()
        })

        it('closes the dropdown when the trigger is clicked again', async () => {
            const user = userEvent.setup()

            render(
                <Dropdown trigger="Open menu">
                    <li>Menu item</li>
                </Dropdown>,
            )

            const trigger = screen.getByRole('button', {
                name: 'Open menu',
            })

            await user.click(trigger)

            expect(screen.getByRole('list')).toBeInTheDocument()

            await user.click(trigger)

            expect(screen.queryByRole('list')).not.toBeInTheDocument()
        })
    })

    describe('accessibility', () => {
        it('sets aria-expanded to false initially', () => {
            render(
                <Dropdown trigger="Open menu">
                    <li>Menu item</li>
                </Dropdown>,
            )

            expect(
                screen.getByRole('button', {
                    name: 'Open menu',
                }),
            ).toHaveAttribute('aria-expanded', 'false')
        })

        it('sets aria-expanded to true when open', async () => {
            const user = userEvent.setup()

            render(
                <Dropdown trigger="Open menu">
                    <li>Menu item</li>
                </Dropdown>,
            )

            const trigger = screen.getByRole('button', {
                name: 'Open menu',
            })

            await user.click(trigger)

            expect(trigger).toHaveAttribute('aria-expanded', 'true')
        })

        it('sets aria-expanded back to false when closed', async () => {
            const user = userEvent.setup()

            render(
                <Dropdown trigger="Open menu">
                    <li>Menu item</li>
                </Dropdown>,
            )

            const trigger = screen.getByRole('button', {
                name: 'Open menu',
            })

            await user.click(trigger)
            await user.click(trigger)

            expect(trigger).toHaveAttribute('aria-expanded', 'false')
        })
    })
})

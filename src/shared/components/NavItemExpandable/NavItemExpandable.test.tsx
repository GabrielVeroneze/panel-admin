import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NavItemExpandable } from './NavItemExpandable'
import userEvent from '@testing-library/user-event'

describe('NavItemExpandable', () => {
    describe('rendering', () => {
        it('renders the label', () => {
            render(
                <ul>
                    <NavItemExpandable label="Settings">
                        <li>Profile</li>
                    </NavItemExpandable>
                </ul>,
            )

            expect(
                screen.getByRole('button', {
                    name: 'Settings',
                }),
            ).toBeInTheDocument()
        })

        it('renders the icon when provided', () => {
            render(
                <ul>
                    <NavItemExpandable
                        label="Settings"
                        icon={<span data-testid="nav-icon">Icon</span>}
                    >
                        <li>Profile</li>
                    </NavItemExpandable>
                </ul>,
            )

            expect(screen.getByTestId('nav-icon')).toBeInTheDocument()
        })

        it('renders the children', () => {
            render(
                <ul>
                    <NavItemExpandable label="Settings">
                        <li>Profile</li>
                        <li>Security</li>
                    </NavItemExpandable>
                </ul>,
            )

            expect(screen.getByText('Profile')).toBeInTheDocument()

            expect(screen.getByText('Security')).toBeInTheDocument()
        })

        it('does not render an icon when one is not provided', () => {
            render(
                <ul>
                    <NavItemExpandable label="Settings">
                        <li>Profile</li>
                    </NavItemExpandable>
                </ul>,
            )

            expect(screen.queryByTestId('nav-icon')).not.toBeInTheDocument()
        })
    })

    describe('expanded state', () => {
        it('is collapsed by default', () => {
            render(
                <ul>
                    <NavItemExpandable label="Settings">
                        <li>Profile</li>
                    </NavItemExpandable>
                </ul>,
            )

            const navItem = screen.getByRole('listitem')
            const submenu = navItem.querySelector('ul')

            expect(submenu).toHaveAttribute('hidden')
            expect(navItem).not.toHaveClass('expanded')
        })

        it('expands when the button is clicked', async () => {
            const user = userEvent.setup()

            render(
                <ul>
                    <NavItemExpandable label="Settings">
                        <li>Profile</li>
                    </NavItemExpandable>
                </ul>,
            )

            const button = screen.getByRole('button', {
                name: 'Settings',
            })

            const navItem = screen.getByRole('listitem')
            const submenu = navItem.querySelector('ul')

            await user.click(button)

            expect(submenu).not.toHaveAttribute('hidden')
            expect(navItem).toHaveClass('expanded')
        })

        it('collapses when the button is clicked again', async () => {
            const user = userEvent.setup()

            render(
                <ul>
                    <NavItemExpandable label="Settings">
                        <li>Profile</li>
                    </NavItemExpandable>
                </ul>,
            )

            const button = screen.getByRole('button', {
                name: 'Settings',
            })

            const navItem = screen.getByRole('listitem')
            const submenu = navItem.querySelector('ul')

            await user.click(button)

            expect(submenu).not.toHaveAttribute('hidden')
            expect(navItem).toHaveClass('expanded')

            await user.click(button)

            expect(submenu).toHaveAttribute('hidden')
            expect(navItem).not.toHaveClass('expanded')
        })
    })
})

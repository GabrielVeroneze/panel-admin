import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/tests/test-utils'
import { NavItem } from './NavItem'

describe('NavItem', () => {
    describe('rendering', () => {
        it('renders the navigation item', () => {
            renderWithProviders(
                <ul>
                    <NavItem to="/dashboard" label="Dashboard" />
                </ul>,
            )

            expect(screen.getByRole('listitem')).toBeInTheDocument()
        })

        it('renders the label', () => {
            renderWithProviders(
                <ul>
                    <NavItem to="/dashboard" label="Dashboard" />
                </ul>,
            )

            expect(
                screen.getByRole('link', {
                    name: 'Dashboard',
                }),
            ).toBeInTheDocument()
        })

        it('renders the icon when provided', () => {
            renderWithProviders(
                <ul>
                    <NavItem
                        to="/dashboard"
                        label="Dashboard"
                        icon={<span data-testid="nav-icon">Icon</span>}
                    />
                </ul>,
            )

            expect(screen.getByTestId('nav-icon')).toBeInTheDocument()
        })

        it('does not render the icon when not provided', () => {
            renderWithProviders(
                <ul>
                    <NavItem to="/dashboard" label="Dashboard" />
                </ul>,
            )

            expect(screen.queryByTestId('nav-icon')).not.toBeInTheDocument()
        })

        it('renders the link with the provided destination', () => {
            renderWithProviders(
                <ul>
                    <NavItem to="/users" label="Users" />
                </ul>,
            )

            expect(
                screen.getByRole('link', {
                    name: 'Users',
                }),
            ).toHaveAttribute('href', '/users')
        })

        it('applies a custom className to the list item', () => {
            renderWithProviders(
                <ul>
                    <NavItem
                        to="/dashboard"
                        label="Dashboard"
                        className="custom-item"
                    />
                </ul>,
            )

            expect(screen.getByRole('listitem')).toHaveClass('custom-item')
        })
    })

    describe('active state', () => {
        it('applies the active class when the current route matches the destination', () => {
            renderWithProviders(
                <ul>
                    <NavItem to="/dashboard" label="Dashboard" />
                </ul>,
                { initialEntries: ['/dashboard'] },
            )

            expect(
                screen.getByRole('link', {
                    name: 'Dashboard',
                }),
            ).toHaveClass('active')
        })

        it('does not apply the active class when the current route does not match the destination', () => {
            renderWithProviders(
                <ul>
                    <NavItem to="/dashboard" label="Dashboard" />
                </ul>,
                { initialEntries: ['/users'] },
            )

            expect(
                screen.getByRole('link', {
                    name: 'Dashboard',
                }),
            ).not.toHaveClass('active')
        })
    })
})

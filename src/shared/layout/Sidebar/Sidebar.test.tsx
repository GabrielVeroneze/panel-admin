import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/tests/test-utils'
import { Sidebar } from './Sidebar'
import userEvent from '@testing-library/user-event'

describe('Sidebar', () => {
    describe('rendering', () => {
        it('renders the sidebar', () => {
            renderWithProviders(<Sidebar isOpen={false} />)

            expect(screen.getByRole('navigation')).toBeInTheDocument()
        })

        it('renders the overview navigation item', () => {
            renderWithProviders(<Sidebar isOpen={false} />)

            expect(
                screen.getByRole('link', { name: 'Overview' }),
            ).toBeInTheDocument()
        })

        it('renders all expandable navigation groups', () => {
            renderWithProviders(<Sidebar isOpen={false} />)

            expect(
                screen.getByRole('button', { name: 'Pages' }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('button', { name: 'Sales' }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('button', { name: 'Authentication' }),
            ).toBeInTheDocument()
        })
    })

    describe('navigation', () => {
        it.each([['Overview', '/']])('links %s to %s', (label, path) => {
            renderWithProviders(<Sidebar isOpen={false} />)

            expect(screen.getByRole('link', { name: label })).toHaveAttribute(
                'href',
                path,
            )
        })

        it('renders the Pages navigation links when expanded', async () => {
            const user = userEvent.setup()

            renderWithProviders(<Sidebar isOpen={false} />)

            await user.click(screen.getByRole('button', { name: 'Pages' }))

            expect(screen.getByRole('link', { name: 'Users' })).toHaveAttribute(
                'href',
                '/users',
            )

            expect(
                screen.getByRole('link', { name: 'Profile' }),
            ).toHaveAttribute('href', '/profile')

            expect(
                screen.getByRole('link', { name: 'Settings' }),
            ).toHaveAttribute('href', '/settings')
        })

        it('renders the Sales navigation link when expanded', async () => {
            const user = userEvent.setup()

            renderWithProviders(<Sidebar isOpen={false} />)

            await user.click(screen.getByRole('button', { name: 'Sales' }))

            expect(
                screen.getByRole('link', { name: 'Product List' }),
            ).toHaveAttribute('href', '/products')
        })

        it('renders the Authentication navigation links when expanded', async () => {
            const user = userEvent.setup()

            renderWithProviders(<Sidebar isOpen={false} />)

            await user.click(
                screen.getByRole('button', { name: 'Authentication' }),
            )

            expect(
                screen.getByRole('link', { name: 'Sign In' }),
            ).toHaveAttribute('href', '/auth/sign-in')

            expect(
                screen.getByRole('link', { name: 'Sign Up' }),
            ).toHaveAttribute('href', '/auth/sign-up')
        })
    })

    describe('expandable navigation', () => {
        it('keeps submenu items hidden initially', () => {
            renderWithProviders(<Sidebar isOpen={false} />)

            expect(screen.getByText('Users')).not.toBeVisible()
            expect(screen.getByText('Profile')).not.toBeVisible()
            expect(screen.getByText('Settings')).not.toBeVisible()
        })

        it('expands the Pages submenu when clicked', async () => {
            const user = userEvent.setup()

            renderWithProviders(<Sidebar isOpen={false} />)

            const button = screen.getByRole('button', { name: 'Pages' })

            await user.click(button)

            expect(screen.getByText('Users')).toBeVisible()
            expect(screen.getByText('Profile')).toBeVisible()
            expect(screen.getByText('Settings')).toBeVisible()
        })

        it('collapses the Pages submenu when clicked again', async () => {
            const user = userEvent.setup()

            renderWithProviders(<Sidebar isOpen={false} />)

            const button = screen.getByRole('button', { name: 'Pages' })

            await user.click(button)

            expect(screen.getByText('Users')).toBeVisible()
            expect(screen.getByText('Profile')).toBeVisible()
            expect(screen.getByText('Settings')).toBeVisible()

            await user.click(button)

            expect(screen.getByText('Users')).not.toBeVisible()
            expect(screen.getByText('Profile')).not.toBeVisible()
            expect(screen.getByText('Settings')).not.toBeVisible()
        })
    })

    describe('open state', () => {
        it('renders the sidebar without the open state when isOpen is false', () => {
            renderWithProviders(<Sidebar isOpen={false} />)

            expect(screen.getByRole('navigation')).not.toHaveClass('open')
        })

        it('renders the sidebar with the open state when isOpen is true', () => {
            renderWithProviders(<Sidebar isOpen />)

            expect(screen.getByRole('navigation')).toHaveClass('open')
        })
    })
})

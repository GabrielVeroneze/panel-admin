import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/tests/test-utils'
import { GuestHeader } from './GuestHeader'

describe('GuestHeader', () => {
    describe('rendering', () => {
        it('renders all navigation links', () => {
            renderWithProviders(<GuestHeader />)

            expect(
                screen.getByRole('link', { name: 'Dashboard' }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('link', { name: 'Team' }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('link', { name: 'Projects' }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('link', { name: 'Calendar' }),
            ).toBeInTheDocument()
        })

        it('renders the login/register link', () => {
            renderWithProviders(<GuestHeader />)

            expect(
                screen.getByRole('link', { name: 'Login/Register' }),
            ).toBeInTheDocument()
        })
    })

    describe('navigation', () => {
        it.each([
            ['Dashboard', '/'],
            ['Team', '/team'],
            ['Projects', '/projects'],
            ['Calendar', '/calendar'],
        ])('links %s to %s', (label, path) => {
            renderWithProviders(<GuestHeader />)

            expect(screen.getByRole('link', { name: label })).toHaveAttribute(
                'href',
                path,
            )
        })

        it('links Login/Register to the sign-up page', () => {
            renderWithProviders(<GuestHeader />)

            expect(
                screen.getByRole('link', { name: 'Login/Register' }),
            ).toHaveAttribute('href', '/auth/sign-up')
        })
    })

    describe('navigation state', () => {
        it('marks the current route as active', () => {
            renderWithProviders(<GuestHeader />, { initialEntries: ['/team'] })

            expect(screen.getByRole('link', { name: 'Team' })).toHaveClass(
                'active',
            )

            expect(
                screen.getByRole('link', { name: 'Dashboard' }),
            ).not.toHaveClass('active')
        })
    })
})

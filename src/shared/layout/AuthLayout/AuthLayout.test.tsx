import { describe, expect, it, vi } from 'vitest'
import { Route, Routes } from 'react-router'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/tests/test-utils'
import { AuthLayout } from './AuthLayout'

vi.mock('@/shared/layout', () => ({
    Header: () => <header>Header</header>,
}))

describe('AuthLayout', () => {
    describe('rendering', () => {
        it('renders the header', () => {
            renderWithProviders(<AuthLayout />)

            expect(screen.getByRole('banner')).toHaveTextContent('Header')
        })

        it('renders the outlet content', () => {
            renderWithProviders(
                <Routes>
                    <Route element={<AuthLayout />}>
                        <Route path="/" element={<div>Auth content</div>} />
                    </Route>
                </Routes>,
                { initialEntries: ['/'] },
            )

            expect(screen.getByText('Auth content')).toBeInTheDocument()
        })

        it('renders the outlet content inside the main element', () => {
            renderWithProviders(
                <Routes>
                    <Route element={<AuthLayout />}>
                        <Route path="/" element={<div>Auth content</div>} />
                    </Route>
                </Routes>,
                { initialEntries: ['/'] },
            )

            const main = screen.getByRole('main')

            expect(main).toHaveTextContent('Auth content')
        })
    })
})

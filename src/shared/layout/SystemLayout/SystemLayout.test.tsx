import { describe, expect, it, vi } from 'vitest'
import { Route, Routes } from 'react-router'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/tests/test-utils'
import { SystemLayout } from './SystemLayout'

vi.mock('@/shared/layout', () => ({
    Header: () => <header>Header</header>,
}))

describe('SystemLayout', () => {
    describe('rendering', () => {
        it('renders the header', () => {
            renderWithProviders(<SystemLayout />)

            expect(screen.getByRole('banner')).toHaveTextContent('Header')
        })

        it('renders the outlet content', () => {
            renderWithProviders(
                <Routes>
                    <Route element={<SystemLayout />}>
                        <Route path="/" element={<div>System content</div>} />
                    </Route>
                </Routes>,
                { initialEntries: ['/'] },
            )

            expect(screen.getByText('System content')).toBeInTheDocument()
        })

        it('renders the outlet content inside the main element', () => {
            renderWithProviders(
                <Routes>
                    <Route element={<SystemLayout />}>
                        <Route path="/" element={<div>System content</div>} />
                    </Route>
                </Routes>,
                { initialEntries: ['/'] },
            )

            expect(screen.getByRole('main')).toHaveTextContent('System content')
        })
    })
})

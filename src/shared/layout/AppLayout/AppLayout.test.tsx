import { describe, expect, it, vi } from 'vitest'
import { Route, Routes } from 'react-router'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/tests/test-utils'
import { AppLayout } from './AppLayout'
import userEvent from '@testing-library/user-event'

vi.mock('@/shared/layout', () => ({
    Header: ({ onToggleSidebar }: { onToggleSidebar?: () => void }) => (
        <header>
            <button onClick={onToggleSidebar}>Toggle sidebar</button>
        </header>
    ),

    Sidebar: ({ isOpen }: { isOpen: boolean }) => (
        <nav aria-label="Sidebar" data-open={isOpen}>
            Sidebar
        </nav>
    ),
}))

describe('AppLayout', () => {
    describe('rendering', () => {
        it('renders the header', () => {
            renderWithProviders(
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<div>Dashboard</div>} />
                    </Route>
                </Routes>,
            )

            expect(
                screen.getByRole('button', { name: 'Toggle sidebar' }),
            ).toBeInTheDocument()
        })

        it('renders the sidebar', () => {
            renderWithProviders(
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<div>Dashboard</div>} />
                    </Route>
                </Routes>,
            )

            expect(
                screen.getByRole('navigation', { name: 'Sidebar' }),
            ).toBeInTheDocument()
        })

        it('renders the outlet content', () => {
            renderWithProviders(
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<div>Dashboard</div>} />
                    </Route>
                </Routes>,
                { initialEntries: ['/'] },
            )

            expect(screen.getByText('Dashboard')).toBeInTheDocument()
        })

        it('starts with the sidebar closed', () => {
            renderWithProviders(
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<div>Dashboard</div>} />
                    </Route>
                </Routes>,
            )

            expect(
                screen.getByRole('navigation', { name: 'Sidebar' }),
            ).toHaveAttribute('data-open', 'false')
        })
    })

    describe('sidebar toggle', () => {
        it('opens the sidebar when the toggle button is clicked', async () => {
            const user = userEvent.setup()

            renderWithProviders(
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<div>Dashboard</div>} />
                    </Route>
                </Routes>,
            )

            await user.click(
                screen.getByRole('button', { name: 'Toggle sidebar' }),
            )

            expect(
                screen.getByRole('navigation', { name: 'Sidebar' }),
            ).toHaveAttribute('data-open', 'true')
        })

        it('closes the sidebar when the toggle button is clicked again', async () => {
            const user = userEvent.setup()

            renderWithProviders(
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route path="/" element={<div>Dashboard</div>} />
                    </Route>
                </Routes>,
            )

            const toggleButton = screen.getByRole('button', {
                name: 'Toggle sidebar',
            })

            await user.click(toggleButton)
            await user.click(toggleButton)

            expect(
                screen.getByRole('navigation', { name: 'Sidebar' }),
            ).toHaveAttribute('data-open', 'false')
        })
    })
})

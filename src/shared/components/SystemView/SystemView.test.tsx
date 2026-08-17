import { describe, expect, it, vi } from 'vitest'
import { Route, Routes } from 'react-router'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/tests/test-utils'
import { SystemView } from './SystemView'
import userEvent from '@testing-library/user-event'

describe('SystemView', () => {
    describe('rendering', () => {
        it('renders the image', () => {
            renderWithProviders(
                <SystemView
                    image="/error.svg"
                    title="Page not found"
                    description="The requested page could not be found."
                    action={{
                        label: 'Go back',
                    }}
                />,
            )

            expect(
                screen.getByRole('img', {
                    name: 'Page not found',
                }),
            ).toHaveAttribute('src', '/error.svg')
        })

        it('renders the title', () => {
            renderWithProviders(
                <SystemView
                    image="/error.svg"
                    title="Page not found"
                    description="The requested page could not be found."
                    action={{
                        label: 'Go back',
                    }}
                />,
            )

            expect(
                screen.getByRole('heading', {
                    name: 'Page not found',
                }),
            ).toBeInTheDocument()
        })

        it('renders the description', () => {
            renderWithProviders(
                <SystemView
                    image="/error.svg"
                    title="Page not found"
                    description="The requested page could not be found."
                    action={{
                        label: 'Go back',
                    }}
                />,
            )

            expect(
                screen.getByText('The requested page could not be found.'),
            ).toBeInTheDocument()
        })

        it('renders the action button', () => {
            renderWithProviders(
                <SystemView
                    image="/error.svg"
                    title="Page not found"
                    description="The requested page could not be found."
                    action={{
                        label: 'Go back',
                    }}
                />,
            )

            expect(
                screen.getByRole('button', {
                    name: 'Go back',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('action', () => {
        it('calls onClick when provided', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            renderWithProviders(
                <SystemView
                    image="/error.svg"
                    title="Error"
                    description="Something went wrong."
                    action={{
                        label: 'Try again',
                        onClick: handleClick,
                    }}
                />,
            )

            await user.click(
                screen.getByRole('button', {
                    name: 'Try again',
                }),
            )

            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('uses onClick instead of navigation when both are provided', async () => {
            const user = userEvent.setup()
            const handleClick = vi.fn()

            renderWithProviders(
                <Routes>
                    <Route
                        path="/error"
                        element={
                            <SystemView
                                image="/error.svg"
                                title="Error"
                                description="Something went wrong."
                                action={{
                                    label: 'Try again',
                                    to: '/dashboard',
                                    onClick: handleClick,
                                }}
                            />
                        }
                    />
                    <Route path="/dashboard" element={<div>Dashboard</div>} />
                </Routes>,
                { initialEntries: ['/error'] },
            )

            await user.click(
                screen.getByRole('button', {
                    name: 'Try again',
                }),
            )

            expect(handleClick).toHaveBeenCalledTimes(1)

            expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
        })

        it('navigates to the provided route when onClick is not provided', async () => {
            const user = userEvent.setup()

            renderWithProviders(
                <Routes>
                    <Route
                        path="/error"
                        element={
                            <SystemView
                                image="/error.svg"
                                title="Error"
                                description="Something went wrong."
                                action={{
                                    label: 'Go to dashboard',
                                    to: '/dashboard',
                                }}
                            />
                        }
                    />
                    <Route path="/dashboard" element={<div>Dashboard</div>} />
                </Routes>,
                { initialEntries: ['/error'] },
            )

            await user.click(
                screen.getByRole('button', {
                    name: 'Go to dashboard',
                }),
            )

            expect(screen.getByText('Dashboard')).toBeInTheDocument()
        })
    })
})

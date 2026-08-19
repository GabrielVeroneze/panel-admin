import { describe, expect, it, vi } from 'vitest'
import { Route, Routes } from 'react-router'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/tests/test-utils'
import { PageLayout } from './PageLayout'

vi.mock('@/shared/layout', () => ({
    Footer: () => <footer>Footer</footer>,
}))

describe('PageLayout', () => {
    describe('rendering', () => {
        it('renders the outlet content', () => {
            renderWithProviders(
                <Routes>
                    <Route element={<PageLayout />}>
                        <Route path="/" element={<div>Page content</div>} />
                    </Route>
                </Routes>,
                { initialEntries: ['/'] },
            )

            expect(screen.getByText('Page content')).toBeInTheDocument()
        })

        it('renders the footer by default', () => {
            renderWithProviders(
                <Routes>
                    <Route element={<PageLayout />}>
                        <Route path="/" element={<div>Page content</div>} />
                    </Route>
                </Routes>,
                { initialEntries: ['/'] },
            )

            expect(screen.getByRole('contentinfo')).toHaveTextContent('Footer')
        })

        it('does not render the footer when variant is plain', () => {
            renderWithProviders(
                <Routes>
                    <Route element={<PageLayout variant="plain" />}>
                        <Route path="/" element={<div>Page content</div>} />
                    </Route>
                </Routes>,
                { initialEntries: ['/'] },
            )

            expect(screen.getByText('Page content')).toBeInTheDocument()
            expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument()
        })
    })

    describe('variant', () => {
        it.each(['default', 'plain'] as const)(
            'renders the outlet for the %s variant',
            (variant) => {
                renderWithProviders(
                    <Routes>
                        <Route element={<PageLayout variant={variant} />}>
                            <Route path="/" element={<div>Page content</div>} />
                        </Route>
                    </Routes>,
                    { initialEntries: ['/'] },
                )

                expect(screen.getByText('Page content')).toBeInTheDocument()
            },
        )
    })
})

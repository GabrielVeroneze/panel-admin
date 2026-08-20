import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Route, Routes, useLocation } from 'react-router'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '@/tests/test-utils'
import { ProtectedRoute } from './ProtectedRoute'

const { useAuthMock } = vi.hoisted(() => ({
    useAuthMock: vi.fn(),
}))

vi.mock('@/features/auth/hooks', () => ({
    useAuth: useAuthMock,
}))

describe('ProtectedRoute', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the outlet when the user is authenticated', () => {
        useAuthMock.mockReturnValue({
            authenticated: true,
        })

        renderWithProviders(
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/dashboard"
                        element={<div>Protected content</div>}
                    />
                </Route>
            </Routes>,
            { initialEntries: ['/dashboard'] },
        )

        expect(screen.getByText('Protected content')).toBeInTheDocument()
    })

    it('redirects to the sign-in page when the user is not authenticated', () => {
        useAuthMock.mockReturnValue({
            authenticated: false,
        })

        renderWithProviders(
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/dashboard"
                        element={<div>Protected content</div>}
                    />
                </Route>
                <Route path="/auth/sign-in" element={<div>Sign in page</div>} />
            </Routes>,
            { initialEntries: ['/dashboard'] },
        )

        expect(screen.getByText('Sign in page')).toBeInTheDocument()
        expect(screen.queryByText('Protected content')).not.toBeInTheDocument()
    })

    it('preserves the current location in the redirect state', () => {
        useAuthMock.mockReturnValue({
            authenticated: false,
        })

        renderWithProviders(
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route
                        path="/dashboard"
                        element={<div>Protected content</div>}
                    />
                </Route>
                <Route path="/auth/sign-in" element={<SignInPage />} />
            </Routes>,
            { initialEntries: ['/dashboard?tab=users'] },
        )

        expect(screen.getByText('From: /dashboard')).toBeInTheDocument()
        expect(screen.getByText('Search: ?tab=users')).toBeInTheDocument()
    })
})

const SignInPage = () => {
    const location = useLocation()
    const from = location.state?.from

    return (
        <div>
            <span>Sign in page</span>
            <span>From: {from.pathname}</span>
            <span>Search: {from.search}</span>
        </div>
    )
}

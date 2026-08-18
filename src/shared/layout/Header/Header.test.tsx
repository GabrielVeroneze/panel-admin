import { describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { useBreakpoint } from '@/shared/hooks'
import { useAuth } from '@/features/auth/hooks'
import { renderWithProviders } from '@/tests/test-utils'
import { Header } from './Header'
import type { AuthUser } from '@/features/auth/types'
import userEvent from '@testing-library/user-event'

vi.mock('@/features/auth/hooks', () => ({
    useAuth: vi.fn(),
}))

vi.mock('@/shared/hooks', () => ({
    useBreakpoint: vi.fn(),
}))

const mockedUseAuth = vi.mocked(useAuth)
const mockedUseBreakpoint = vi.mocked(useBreakpoint)

const user: AuthUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    avatar: '/avatar.jpg',
}

describe('Header', () => {
    describe('rendering', () => {
        it('renders the guest header when the user is not authenticated', () => {
            mockedUseAuth.mockReturnValue({
                user: null,
                authenticated: false,
                loading: false,
                error: null,
                signIn: vi.fn(),
                signUp: vi.fn(),
                logout: vi.fn(),
                fetchCurrentUser: vi.fn(),
            })

            mockedUseBreakpoint.mockReturnValue({
                isMobile: false,
                isTablet: false,
                isDesktop: true,
            })

            renderWithProviders(<Header />)

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

            expect(
                screen.getByRole('link', { name: 'Login/Register' }),
            ).toBeInTheDocument()
        })

        it('renders the authenticated header when the user is authenticated', () => {
            mockedUseAuth.mockReturnValue({
                user,
                authenticated: true,
                loading: false,
                error: null,
                signIn: vi.fn(),
                signUp: vi.fn(),
                logout: vi.fn(),
                fetchCurrentUser: vi.fn(),
            })

            mockedUseBreakpoint.mockReturnValue({
                isMobile: false,
                isTablet: false,
                isDesktop: true,
            })

            renderWithProviders(<Header />)

            expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()

            expect(
                screen.getByRole('button', { name: 'Notificações' }),
            ).toBeInTheDocument()

            expect(
                screen.queryByRole('link', { name: 'Login/Register' }),
            ).not.toBeInTheDocument()
        })

        it('renders the guest header when authenticated but user is unavailable', () => {
            mockedUseAuth.mockReturnValue({
                user: null,
                authenticated: true,
                loading: false,
                error: null,
                signIn: vi.fn(),
                signUp: vi.fn(),
                logout: vi.fn(),
                fetchCurrentUser: vi.fn(),
            })

            mockedUseBreakpoint.mockReturnValue({
                isMobile: false,
                isTablet: false,
                isDesktop: true,
            })

            renderWithProviders(<Header />)

            expect(
                screen.getByRole('link', { name: 'Login/Register' }),
            ).toBeInTheDocument()

            expect(
                screen.queryByPlaceholderText('Search'),
            ).not.toBeInTheDocument()
        })
    })

    describe('sidebar menu', () => {
        it('renders the menu button on mobile', () => {
            mockedUseAuth.mockReturnValue({
                user: null,
                authenticated: false,
                loading: false,
                error: null,
                signIn: vi.fn(),
                signUp: vi.fn(),
                logout: vi.fn(),
                fetchCurrentUser: vi.fn(),
            })

            mockedUseBreakpoint.mockReturnValue({
                isMobile: true,
                isTablet: false,
                isDesktop: false,
            })

            renderWithProviders(<Header />)

            expect(
                screen.getByRole('button', { name: 'Abrir menu' }),
            ).toBeInTheDocument()
        })

        it('renders the menu button on tablet', () => {
            mockedUseAuth.mockReturnValue({
                user: null,
                authenticated: false,
                loading: false,
                error: null,
                signIn: vi.fn(),
                signUp: vi.fn(),
                logout: vi.fn(),
                fetchCurrentUser: vi.fn(),
            })

            mockedUseBreakpoint.mockReturnValue({
                isMobile: false,
                isTablet: true,
                isDesktop: false,
            })

            renderWithProviders(<Header />)

            expect(
                screen.getByRole('button', { name: 'Abrir menu' }),
            ).toBeInTheDocument()
        })

        it('does not render the menu button on desktop', () => {
            mockedUseAuth.mockReturnValue({
                user: null,
                authenticated: false,
                loading: false,
                error: null,
                signIn: vi.fn(),
                signUp: vi.fn(),
                logout: vi.fn(),
                fetchCurrentUser: vi.fn(),
            })

            mockedUseBreakpoint.mockReturnValue({
                isMobile: false,
                isTablet: false,
                isDesktop: true,
            })

            renderWithProviders(<Header />)

            expect(
                screen.queryByRole('button', { name: 'Abrir menu' }),
            ).not.toBeInTheDocument()
        })

        it('calls onToggleSidebar when the menu button is clicked', async () => {
            const userEventInstance = userEvent.setup()
            const onToggleSidebar = vi.fn()

            mockedUseAuth.mockReturnValue({
                user: null,
                authenticated: false,
                loading: false,
                error: null,
                signIn: vi.fn(),
                signUp: vi.fn(),
                logout: vi.fn(),
                fetchCurrentUser: vi.fn(),
            })

            mockedUseBreakpoint.mockReturnValue({
                isMobile: true,
                isTablet: false,
                isDesktop: false,
            })

            renderWithProviders(<Header onToggleSidebar={onToggleSidebar} />)

            await userEventInstance.click(
                screen.getByRole('button', { name: 'Abrir menu' }),
            )

            expect(onToggleSidebar).toHaveBeenCalledTimes(1)
        })

        it('does not throw when the menu button is clicked without onToggleSidebar', async () => {
            const userEventInstance = userEvent.setup()

            mockedUseAuth.mockReturnValue({
                user: null,
                authenticated: false,
                loading: false,
                error: null,
                signIn: vi.fn(),
                signUp: vi.fn(),
                logout: vi.fn(),
                fetchCurrentUser: vi.fn(),
            })

            mockedUseBreakpoint.mockReturnValue({
                isMobile: true,
                isTablet: false,
                isDesktop: false,
            })

            renderWithProviders(<Header />)

            await userEventInstance.click(
                screen.getByRole('button', { name: 'Abrir menu' }),
            )
        })
    })
})

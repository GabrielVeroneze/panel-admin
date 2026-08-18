import { describe, expect, it, vi, beforeEach } from 'vitest'
import { useNavigate } from 'react-router'
import { render, screen } from '@testing-library/react'
import { useAuth } from '@/features/auth/hooks'
import { AuthenticatedHeader } from './AuthenticatedHeader'
import type { AuthUser } from '@/features/auth/types'
import userEvent from '@testing-library/user-event'

vi.mock('@/features/auth/hooks', () => ({
    useAuth: vi.fn(),
}))

vi.mock('react-router', async () => {
    const actual =
        await vi.importActual<typeof import('react-router')>('react-router')

    return {
        ...actual,
        useNavigate: vi.fn(),
    }
})

describe('AuthenticatedHeader', () => {
    const user: AuthUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin',
        avatar: '/avatar.jpg',
    }

    const logout = vi.fn()

    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useNavigate).mockReturnValue(vi.fn())

        vi.mocked(useAuth).mockReturnValue({
            signIn: vi.fn(),
            signUp: vi.fn(),
            logout,
            fetchCurrentUser: vi.fn(),
            user: null,
            authenticated: true,
            loading: false,
            error: null,
        })
    })

    describe('rendering', () => {
        it('renders the search input', () => {
            render(<AuthenticatedHeader user={user} />)

            expect(screen.getByRole('textbox')).toHaveAttribute(
                'placeholder',
                'Search',
            )
        })

        it('renders the notifications button', () => {
            render(<AuthenticatedHeader user={user} />)

            expect(
                screen.getByRole('button', {
                    name: 'Notificações',
                }),
            ).toBeInTheDocument()
        })

        it('renders the user avatar', () => {
            render(<AuthenticatedHeader user={user} />)

            expect(
                screen.getByRole('img', {
                    name: 'Avatar do usuário',
                }),
            ).toHaveAttribute('src', user.avatar)
        })
    })

    describe('user dropdown', () => {
        it('does not render the menu items initially', () => {
            render(<AuthenticatedHeader user={user} />)

            expect(
                screen.queryByRole('button', {
                    name: 'Your Profile',
                }),
            ).not.toBeInTheDocument()

            expect(
                screen.queryByRole('button', {
                    name: 'Settings',
                }),
            ).not.toBeInTheDocument()

            expect(
                screen.queryByRole('button', {
                    name: 'Sign out',
                }),
            ).not.toBeInTheDocument()
        })

        it('opens the dropdown when the user avatar is clicked', async () => {
            const userEventInstance = userEvent.setup()

            render(<AuthenticatedHeader user={user} />)

            await userEventInstance.click(
                screen.getByRole('button', {
                    name: 'Avatar do usuário',
                }),
            )

            expect(
                screen.getByRole('button', {
                    name: 'Your Profile',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('button', {
                    name: 'Settings',
                }),
            ).toBeInTheDocument()

            expect(
                screen.getByRole('button', {
                    name: 'Sign out',
                }),
            ).toBeInTheDocument()
        })

        it('renders the authenticated user information in the dropdown', async () => {
            const userEventInstance = userEvent.setup()

            render(<AuthenticatedHeader user={user} />)

            await userEventInstance.click(
                screen.getByRole('button', {
                    name: 'Avatar do usuário',
                }),
            )

            expect(screen.getByText(user.name)).toBeInTheDocument()
            expect(screen.getByText(user.email)).toBeInTheDocument()
        })

        it('renders the profile action', async () => {
            const userEventInstance = userEvent.setup()

            render(<AuthenticatedHeader user={user} />)

            await userEventInstance.click(
                screen.getByRole('button', {
                    name: 'Avatar do usuário',
                }),
            )

            expect(
                screen.getByRole('button', {
                    name: 'Your Profile',
                }),
            ).toBeInTheDocument()
        })

        it('renders the settings action', async () => {
            const userEventInstance = userEvent.setup()

            render(<AuthenticatedHeader user={user} />)

            await userEventInstance.click(
                screen.getByRole('button', {
                    name: 'Avatar do usuário',
                }),
            )

            expect(
                screen.getByRole('button', {
                    name: 'Settings',
                }),
            ).toBeInTheDocument()
        })

        it('renders the sign out action', async () => {
            const userEventInstance = userEvent.setup()

            render(<AuthenticatedHeader user={user} />)

            await userEventInstance.click(
                screen.getByRole('button', {
                    name: 'Avatar do usuário',
                }),
            )

            expect(
                screen.getByRole('button', {
                    name: 'Sign out',
                }),
            ).toBeInTheDocument()
        })

        it('renders the delete action as a danger item', async () => {
            const userEventInstance = userEvent.setup()

            render(<AuthenticatedHeader user={user} />)

            await userEventInstance.click(
                screen.getByRole('button', {
                    name: 'Avatar do usuário',
                }),
            )

            expect(
                screen.getByRole('button', {
                    name: 'Delete',
                }),
            ).toBeInTheDocument()
        })
    })

    describe('navigation', () => {
        it('navigates to the profile page when Your Profile is clicked', async () => {
            const userEventInstance = userEvent.setup()
            const navigate = vi.fn()

            vi.mocked(useNavigate).mockReturnValue(navigate)

            render(<AuthenticatedHeader user={user} />)

            await userEventInstance.click(
                screen.getByRole('button', {
                    name: 'Avatar do usuário',
                }),
            )

            await userEventInstance.click(
                screen.getByRole('button', {
                    name: 'Your Profile',
                }),
            )

            expect(navigate).toHaveBeenCalledTimes(1)
            expect(navigate).toHaveBeenCalledWith('/profile')
        })

        it('navigates to the settings page when Settings is clicked', async () => {
            const userEventInstance = userEvent.setup()
            const navigate = vi.fn()

            vi.mocked(useNavigate).mockReturnValue(navigate)

            render(<AuthenticatedHeader user={user} />)

            await userEventInstance.click(
                screen.getByRole('button', {
                    name: 'Avatar do usuário',
                }),
            )

            await userEventInstance.click(
                screen.getByRole('button', {
                    name: 'Settings',
                }),
            )

            expect(navigate).toHaveBeenCalledTimes(1)
            expect(navigate).toHaveBeenCalledWith('/settings')
        })
    })

    describe('logout', () => {
        it('calls logout when Sign out is clicked', async () => {
            const userEventInstance = userEvent.setup()

            logout.mockResolvedValue(undefined)

            render(<AuthenticatedHeader user={user} />)

            await userEventInstance.click(
                screen.getByRole('button', {
                    name: 'Avatar do usuário',
                }),
            )

            await userEventInstance.click(
                screen.getByRole('button', {
                    name: 'Sign out',
                }),
            )

            expect(logout).toHaveBeenCalledTimes(1)
        })

        it('navigates to sign-in after logout completes', async () => {
            const userEventInstance = userEvent.setup()
            const navigate = vi.fn()

            logout.mockResolvedValue(undefined)
            vi.mocked(useNavigate).mockReturnValue(navigate)

            render(<AuthenticatedHeader user={user} />)

            await userEventInstance.click(
                screen.getByRole('button', {
                    name: 'Avatar do usuário',
                }),
            )

            await userEventInstance.click(
                screen.getByRole('button', {
                    name: 'Sign out',
                }),
            )

            expect(logout).toHaveBeenCalledTimes(1)
            expect(navigate).toHaveBeenCalledTimes(1)
            expect(navigate).toHaveBeenCalledWith('/auth/sign-in')
        })

        it('waits for logout to complete before navigating', async () => {
            const userEventInstance = userEvent.setup()
            const navigate = vi.fn()

            let resolveLogout!: () => void

            logout.mockImplementation(
                () =>
                    new Promise<void>((resolve) => {
                        resolveLogout = resolve
                    }),
            )

            vi.mocked(useNavigate).mockReturnValue(navigate)

            render(<AuthenticatedHeader user={user} />)

            await userEventInstance.click(
                screen.getByRole('button', {
                    name: 'Avatar do usuário',
                }),
            )

            const signOutButton = screen.getByRole('button', {
                name: 'Sign out',
            })

            await userEventInstance.click(signOutButton)

            expect(logout).toHaveBeenCalledTimes(1)
            expect(navigate).not.toHaveBeenCalled()

            resolveLogout()

            await vi.waitFor(() => {
                expect(navigate).toHaveBeenCalledWith('/auth/sign-in')
            })
        })
    })
})

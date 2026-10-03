import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useMyProfile } from '@/features/profile/hooks'
import { ProfileView } from '@/features/profile/components'
import { MyProfilePage } from './MyProfilePage'
import type { UserProfile } from '@/features/profile/types'

vi.mock('@/features/profile/hooks', () => ({
    useMyProfile: vi.fn(),
}))

vi.mock('@/features/profile/components', () => ({
    ProfileView: vi.fn(({ profile, loading }) => (
        <div data-testid="profile-view">
            <span data-testid="profile">{profile?.name ?? 'null'}</span>
            <span data-testid="loading">{String(loading)}</span>
        </div>
    )),
}))

describe('MyProfilePage', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    const profile: UserProfile = {
        id: 1,
        avatar: '/images/avatar.jpg',
        name: 'John Doe',
        role: 'Administrator',
        country: 'United States',
        contact: {
            email: 'john@example.com',
            address: '123 Main Street',
            phone: '+1 555 123 4567',
        },
        about: 'Administrator profile',
        skills: [{ id: 'react', label: 'React' }],
        summary: {
            products: { count: 120, variation: 12 },
            users: { count: 45, variation: 8 },
            profile: {
                role: 'Administrator',
                status: 'active',
                lastLogin: '2025-01-15T10:00:00.000Z',
                memberSince: '2024-01-15T10:00:00.000Z',
            },
        },
        activities: [],
        recentProducts: [],
        experience: [],
        education: [],
    }

    describe('profile data', () => {
        it('passes the profile returned by useMyProfile to ProfileView', () => {
            vi.mocked(useMyProfile).mockReturnValue({
                profile,
                loading: false,
            })

            render(<MyProfilePage />)

            expect(screen.getByTestId('profile')).toHaveTextContent('John Doe')

            expect(ProfileView).toHaveBeenCalledWith(
                {
                    profile,
                    loading: false,
                },
                undefined,
            )
        })

        it('passes a null profile to ProfileView', () => {
            vi.mocked(useMyProfile).mockReturnValue({
                profile: null,
                loading: false,
            })

            render(<MyProfilePage />)

            expect(screen.getByTestId('profile')).toHaveTextContent('null')

            expect(ProfileView).toHaveBeenCalledWith(
                {
                    profile: null,
                    loading: false,
                },
                undefined,
            )
        })
    })

    describe('loading state', () => {
        it('passes the loading state to ProfileView', () => {
            vi.mocked(useMyProfile).mockReturnValue({
                profile: null,
                loading: true,
            })

            render(<MyProfilePage />)

            expect(screen.getByTestId('loading')).toHaveTextContent('true')

            expect(ProfileView).toHaveBeenCalledWith(
                {
                    profile: null,
                    loading: true,
                },
                undefined,
            )
        })

        it('passes the non-loading state to ProfileView', () => {
            vi.mocked(useMyProfile).mockReturnValue({
                profile,
                loading: false,
            })

            render(<MyProfilePage />)

            expect(screen.getByTestId('loading')).toHaveTextContent('false')
        })
    })

    describe('composition', () => {
        it('renders ProfileView', () => {
            vi.mocked(useMyProfile).mockReturnValue({
                profile,
                loading: false,
            })

            render(<MyProfilePage />)

            expect(screen.getByTestId('profile-view')).toBeInTheDocument()
        })

        it('calls useMyProfile once when the page mounts', () => {
            vi.mocked(useMyProfile).mockReturnValue({
                profile,
                loading: false,
            })

            render(<MyProfilePage />)

            expect(useMyProfile).toHaveBeenCalledTimes(1)
        })
    })
})

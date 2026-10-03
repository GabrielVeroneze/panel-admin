import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useParams } from 'react-router'
import { render, screen } from '@testing-library/react'
import { useUserProfile } from '@/features/profile/hooks'
import { ProfileView } from '@/features/profile/components'
import { UserProfilePage } from './UserProfilePage'
import type { UserProfile } from '@/features/profile/types'

vi.mock('react-router', () => ({
    useParams: vi.fn(),
}))

vi.mock('@/features/profile/hooks', () => ({
    useUserProfile: vi.fn(),
}))

vi.mock('@/features/profile/components', () => ({
    ProfileView: vi.fn(({ profile, loading }) => (
        <div data-testid="profile-view">
            <span data-testid="profile">{profile?.name ?? 'null'}</span>
            <span data-testid="loading">{String(loading)}</span>
        </div>
    )),
}))

describe('UserProfilePage', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    const profile: UserProfile = {
        id: 2,
        avatar: '/images/avatar.jpg',
        name: 'Jane Doe',
        role: 'Manager',
        country: 'Brazil',
        contact: {
            email: 'jane@example.com',
            address: '456 Main Street',
            phone: '+55 11 99999-9999',
        },
        about: 'Manager profile',
        skills: [{ id: 'typescript', label: 'TypeScript' }],
        summary: {
            products: { count: 80, variation: 10 },
            users: { count: 30, variation: 5 },
            profile: {
                role: 'Manager',
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

    describe('user id', () => {
        it('passes the userId from the route params to useUserProfile', () => {
            vi.mocked(useParams).mockReturnValue({
                userId: '2',
            })

            vi.mocked(useUserProfile).mockReturnValue({
                profile,
                loading: false,
            })

            render(<UserProfilePage />)

            expect(useUserProfile).toHaveBeenCalledWith('2')
        })

        it('passes undefined to useUserProfile when userId is not present', () => {
            vi.mocked(useParams).mockReturnValue({})

            vi.mocked(useUserProfile).mockReturnValue({
                profile: null,
                loading: false,
            })

            render(<UserProfilePage />)

            expect(useUserProfile).toHaveBeenCalledWith(undefined)
        })
    })

    describe('profile data', () => {
        it('passes the profile returned by useUserProfile to ProfileView', () => {
            vi.mocked(useParams).mockReturnValue({
                userId: '2',
            })

            vi.mocked(useUserProfile).mockReturnValue({
                profile,
                loading: false,
            })

            render(<UserProfilePage />)

            expect(screen.getByTestId('profile')).toHaveTextContent('Jane Doe')

            expect(ProfileView).toHaveBeenCalledWith(
                {
                    profile,
                    loading: false,
                },
                undefined,
            )
        })

        it('passes a null profile to ProfileView', () => {
            vi.mocked(useParams).mockReturnValue({
                userId: '2',
            })

            vi.mocked(useUserProfile).mockReturnValue({
                profile: null,
                loading: false,
            })

            render(<UserProfilePage />)

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
            vi.mocked(useParams).mockReturnValue({
                userId: '2',
            })

            vi.mocked(useUserProfile).mockReturnValue({
                profile: null,
                loading: true,
            })

            render(<UserProfilePage />)

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
            vi.mocked(useParams).mockReturnValue({
                userId: '2',
            })

            vi.mocked(useUserProfile).mockReturnValue({
                profile,
                loading: false,
            })

            render(<UserProfilePage />)

            expect(screen.getByTestId('loading')).toHaveTextContent('false')
        })
    })

    describe('composition', () => {
        it('renders ProfileView', () => {
            vi.mocked(useParams).mockReturnValue({
                userId: '2',
            })

            vi.mocked(useUserProfile).mockReturnValue({
                profile,
                loading: false,
            })

            render(<UserProfilePage />)

            expect(screen.getByTestId('profile-view')).toBeInTheDocument()
        })
    })
})

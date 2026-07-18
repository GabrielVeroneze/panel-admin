import { usersProfilesDatabase } from '../database'
import { getCurrentUser } from './'
import type { AuthUser } from '@/features/auth/types'
import type { UserProfile } from '@/features/profile/types'

export const createProfile = (user: AuthUser): UserProfile => {
    const profile: UserProfile = {
        id: user.id,
        avatar: user.avatar,
        name: user.name,
        role: 'User',
        country: 'United States',
        contact: {
            email: user.email,
            address: '',
            phone: '',
        },
        about: 'This user has not added an about section yet.',
        skills: [],
        summary: {
            products: {
                count: 0,
                variation: 0,
            },
            users: {
                count: 0,
                variation: 0,
            },
            profile: {
                role: 'User',
                status: 'active',
                lastLogin: new Date().toISOString(),
                memberSince: new Date().toISOString(),
            },
        },
        activities: [],
        recentProducts: [],
        experience: [],
        education: [],
    }

    usersProfilesDatabase.push(profile)

    return profile
}

export const findProfileByUserId = (userId: number): UserProfile | null => {
    const profile = usersProfilesDatabase.find(
        (profile) => profile.id === userId,
    )

    if (!profile) {
        return null
    }

    return profile
}

export const getCurrentProfile = (): UserProfile | null => {
    const currentUser = getCurrentUser()

    if (!currentUser) {
        return null
    }

    return findProfileByUserId(currentUser.id)
}

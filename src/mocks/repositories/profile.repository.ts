import { usersProfilesDatabase } from '../database'
import { getCurrentUser } from './'
import type { UserProfile } from '@/features/profile/types'

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

import { createAsyncThunk } from '@reduxjs/toolkit'
import { getMyProfile, getUserProfile } from '../api'
import type { UserProfile } from '../types'

type FetchUserProfileParams = {
    id: number
}

export const fetchMyProfile = createAsyncThunk<UserProfile>(
    'profile/fetchMyProfile',
    async () => {
        return await getMyProfile()
    },
)

export const fetchUserProfile = createAsyncThunk<
    UserProfile,
    FetchUserProfileParams
>('profile/fetchUserProfile', async ({ id }) => {
    return await getUserProfile(id)
})

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMyProfile, getUserProfile } from '../api'
import type { UserProfile } from '../types'

type ProfileState = {
    myProfile: UserProfile | null
    userProfile: UserProfile | null
    loading: boolean
}

type FetchUserProfileParams = {
    id: number
}

const initialState: ProfileState = {
    myProfile: null,
    userProfile: null,
    loading: false,
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

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchMyProfile.fulfilled, (state, action) => {
                state.loading = false
                state.myProfile = action.payload
            })
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false
                state.userProfile = action.payload
            })
    },
})

export default profileSlice.reducer

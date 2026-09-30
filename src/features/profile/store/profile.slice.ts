import { createSlice } from '@reduxjs/toolkit'
import { fetchMyProfile, fetchUserProfile } from './profile.thunks'
import type { UserProfile } from '../types'

type ProfileState = {
    myProfile: UserProfile | null
    userProfile: UserProfile | null
    loading: boolean
}

const initialState: ProfileState = {
    myProfile: null,
    userProfile: null,
    loading: false,
}

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
            .addCase(fetchMyProfile.rejected, (state) => {
                state.loading = false
                state.myProfile = null
            })
            .addCase(fetchUserProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.loading = false
                state.userProfile = action.payload
            })
            .addCase(fetchUserProfile.rejected, (state) => {
                state.loading = false
                state.userProfile = null
            })
    },
})

export default profileSlice.reducer

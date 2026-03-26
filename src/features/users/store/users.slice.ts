import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUsers } from '../api'
import type { UsersData } from '../types'

type UsersState = {
    data: UsersData | null
    loading: boolean
}

type FetchUsersParams = {
    page: number
    pageSize: number
}

const initialState: UsersState = {
    data: null,
    loading: false,
}

export const fetchUsers = createAsyncThunk<UsersData, FetchUsersParams>(
    'users/fetchUsers',
    async ({ page, pageSize }) => {
        return await getUsers({ page, pageSize })
    },
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
    },
})

export default usersSlice.reducer

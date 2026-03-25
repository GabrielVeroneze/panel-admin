import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUsers } from '../api'
import type { User } from '../types'

type UsersState = {
    list: User[]
    loading: boolean
}

const initialState: UsersState = {
    list: [],
    loading: false,
}

export const fetchUsers = createAsyncThunk<User[]>(
    'users/fetchUsers',
    async () => {
        return await getUsers()
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
                state.list = action.payload
            })
    },
})

export default usersSlice.reducer

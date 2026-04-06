import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    getUsers,
    createUser as createUserRequest,
} from '../api'
import type {
    CreateUserPayload,
    PaginatedUsers,
    User,
} from '../types'

type UsersState = {
    data: PaginatedUsers | null
    loading: boolean
}

type FetchUsersParams = {
    page: number
    pageSize: number
}

type CreateUserParams = {
    payload: CreateUserPayload
}

const initialState: UsersState = {
    data: null,
    loading: false,
}

export const fetchUsers = createAsyncThunk<PaginatedUsers, FetchUsersParams>(
    'users/fetchUsers',
    async ({ page, pageSize }) => {
        return await getUsers({ page, pageSize })
    },
)

export const createUser = createAsyncThunk<User, CreateUserParams>(
    'users/createUser',
    async ({ payload }) => {
        return await createUserRequest(payload)
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

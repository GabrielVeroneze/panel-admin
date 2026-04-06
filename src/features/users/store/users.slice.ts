import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    getUsers,
    createUser as createUserRequest,
    updateUser as updateUserRequest,
} from '../api'
import type {
    CreateUserPayload,
    PaginatedUsers,
    UpdateUserPayload,
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

type UpdateUserParams = {
    id: number
    payload: UpdateUserPayload
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

export const updateUser = createAsyncThunk<User, UpdateUserParams>(
    'users/updateUser',
    async ({ id, payload }) => {
        return await updateUserRequest(id, payload)
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

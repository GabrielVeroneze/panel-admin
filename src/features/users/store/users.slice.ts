import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    getUsers,
    createUser as createUserRequest,
    deleteUser as deleteUserRequest,
    deleteUsers as deleteUsersRequest,
    updateUser as updateUserRequest,
} from '../api'
import type { AsyncState, PaginationParams } from '@/shared/types'
import type {
    CreateUserPayload,
    PaginatedUsers,
    UpdateUserPayload,
    User,
} from '../types'

type UsersState = AsyncState<PaginatedUsers>

type CreateUserParams = {
    payload: CreateUserPayload
}

type UpdateUserParams = {
    id: number
    payload: UpdateUserPayload
}

type DeleteUserParams = {
    id: number
}

type DeleteUsersParams = {
    ids: number[]
}

const initialState: UsersState = {
    data: null,
    loading: false,
}

export const fetchUsers = createAsyncThunk<PaginatedUsers, PaginationParams>(
    'users/fetchUsers',
    async ({ page, pageSize, search }) => {
        return await getUsers({ page, pageSize, search })
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

export const deleteUser = createAsyncThunk<void, DeleteUserParams>(
    'users/deleteUser',
    async ({ id }) => {
        await deleteUserRequest(id)
    },
)

export const deleteUsers = createAsyncThunk<void, DeleteUsersParams>(
    'users/deleteUsers',
    async ({ ids }) => {
        await deleteUsersRequest(ids)
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
            .addCase(createUser.fulfilled, (state, action) => {
                if (!state.data) return

                state.data.list.unshift(action.payload)
                state.data.total += 1
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                if (!state.data) return

                const updatedUser = action.payload

                const index = state.data.list.findIndex(
                    (user) => user.id === updatedUser.id,
                )

                if (index !== -1) {
                    state.data.list[index] = updatedUser
                }
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                if (!state.data) return

                const id = action.meta.arg.id

                state.data.list = state.data.list.filter(
                    (user) => user.id !== id,
                )
                state.data.total -= 1
            })
            .addCase(deleteUsers.fulfilled, (state, action) => {
                if (!state.data) return

                const ids = action.meta.arg.ids

                state.data.list = state.data.list.filter(
                    (user) => !ids.includes(user.id),
                )
                state.data.total -= ids.length
            })
    },
})

export default usersSlice.reducer

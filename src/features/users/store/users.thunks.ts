import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchCurrentUserThunk } from '@/features/auth/store'
import {
    getUsers,
    createUser as createUserRequest,
    deleteUser as deleteUserRequest,
    deleteUsers as deleteUsersRequest,
    updateUser as updateUserRequest,
} from '../api'
import type { PaginationParams } from '@/shared/types'
import type {
    CreateUserPayload,
    PaginatedUsers,
    UpdateUserPayload,
    User,
} from '../types'

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
    async ({ id, payload }, { dispatch, rejectWithValue }) => {
        try {
            const user = await updateUserRequest(id, payload)

            await dispatch(fetchCurrentUserThunk()).unwrap()

            return user
        } catch {
            return rejectWithValue('Unable to update user')
        }
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

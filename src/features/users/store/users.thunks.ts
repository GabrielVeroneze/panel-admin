import { createAsyncThunk } from '@reduxjs/toolkit'
import { getApiErrorMessage } from '@/shared/utils'
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

export const createUser = createAsyncThunk<
    User,
    CreateUserParams,
    { rejectValue: string }
>('users/createUser', async ({ payload }, { rejectWithValue }) => {
    try {
        return await createUserRequest(payload)
    } catch (error) {
        return rejectWithValue(
            getApiErrorMessage(error, {
                fallback: 'Unable to create user. Please try again.',
            }),
        )
    }
})

export const updateUser = createAsyncThunk<
    User,
    UpdateUserParams,
    { rejectValue: string }
>(
    'users/updateUser',
    async ({ id, payload }, { dispatch, rejectWithValue }) => {
        try {
            const user = await updateUserRequest(id, payload)

            await dispatch(fetchCurrentUserThunk())

            return user
        } catch (error) {
            return rejectWithValue(
                getApiErrorMessage(error, {
                    fallback: 'Unable to update user. Please try again.',
                }),
            )
        }
    },
)

export const deleteUser = createAsyncThunk<
    void,
    DeleteUserParams,
    { rejectValue: string }
>('users/deleteUser', async ({ id }, { rejectWithValue }) => {
    try {
        await deleteUserRequest(id)
    } catch (error) {
        return rejectWithValue(
            getApiErrorMessage(error, {
                fallback: 'Unable to delete user. Please try again.',
            }),
        )
    }
})

export const deleteUsers = createAsyncThunk<
    void,
    DeleteUsersParams,
    { rejectValue: string }
>('users/deleteUsers', async ({ ids }, { rejectWithValue }) => {
    try {
        await deleteUsersRequest(ids)
    } catch (error) {
        return rejectWithValue(
            getApiErrorMessage(error, {
                fallback: 'Unable to delete selected users. Please try again.',
            }),
        )
    }
})

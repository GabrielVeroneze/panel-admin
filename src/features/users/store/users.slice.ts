import { createSlice } from '@reduxjs/toolkit'
import {
    createUser,
    deleteUser,
    deleteUsers,
    fetchUsers,
    updateUser,
} from './users.thunks'
import type { AsyncState } from '@/shared/types'
import type { PaginatedUsers } from '../types'

type UsersState = AsyncState<PaginatedUsers> & {
    createLoading: boolean
    createError: string | null
    updateLoading: boolean
    updateError: string | null
}

const initialState: UsersState = {
    data: null,
    loading: false,
    createLoading: false,
    createError: null,
    updateLoading: false,
    updateError: null,
}

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
            .addCase(fetchUsers.rejected, (state) => {
                state.loading = false
            })
            .addCase(createUser.pending, (state) => {
                state.createLoading = true
                state.createError = null
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.createLoading = false
                state.createError = null

                if (!state.data) return

                state.data.list.unshift(action.payload)
                state.data.total += 1
            })
            .addCase(createUser.rejected, (state, action) => {
                state.createLoading = false
                state.createError =
                    action.payload ?? 'Unable to create user. Please try again.'
            })
            .addCase(updateUser.pending, (state) => {
                state.updateLoading = true
                state.updateError = null
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.updateLoading = false
                state.updateError = null

                if (!state.data) return

                const updatedUser = action.payload

                const index = state.data.list.findIndex(
                    (user) => user.id === updatedUser.id,
                )

                if (index !== -1) {
                    state.data.list[index] = updatedUser
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.updateLoading = false
                state.updateError =
                    action.payload ?? 'Unable to update user. Please try again.'
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

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

type UsersState = AsyncState<PaginatedUsers>

const initialState: UsersState = {
    data: null,
    loading: false,
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

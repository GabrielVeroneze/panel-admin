import { createSlice } from '@reduxjs/toolkit'
import { fetchDashboard } from './dashboard.thunks'
import type { DashboardData } from '../types'

type DashboardState = {
    data: DashboardData | null
    loading: boolean
}

const initialState: DashboardState = {
    data: null,
    loading: false,
}

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboard.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchDashboard.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
    },
})

export default dashboardSlice.reducer

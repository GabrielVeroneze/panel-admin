import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getDashboard } from '../api'
import type { DashboardData } from '../types'

type DashboardState = {
    data: DashboardData | null
    loading: boolean
}

const initialState: DashboardState = {
    data: null,
    loading: false,
}

export const fetchDashboard = createAsyncThunk<DashboardData>(
    'dashboard/fetchDashboard',
    async () => {
        return await getDashboard()
    },
)

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

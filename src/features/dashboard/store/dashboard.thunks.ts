import { createAsyncThunk } from '@reduxjs/toolkit'
import { getDashboard } from '../api'
import type { DashboardData } from '../types'

export const fetchDashboard = createAsyncThunk<DashboardData>(
    'dashboard/fetchDashboard',
    async () => {
        return await getDashboard()
    },
)

import { configureStore } from '@reduxjs/toolkit'
import { dashboardReducer } from '@/features/dashboard/store'
import { usersReducer } from '@/features/users/store'

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        users: usersReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

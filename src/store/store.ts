import { configureStore } from '@reduxjs/toolkit'
import { dashboardReducer } from '@/features/dashboard/store'
import { usersReducer } from '@/features/users/store'
import { productsReducer } from '@/features/products/store'
import { profileReducer } from '@/features/profile/store'
import { settingsReducer } from '@/features/settings/store'
import { authReducer } from '@/features/auth/store'

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
        users: usersReducer,
        products: productsReducer,
        profile: profileReducer,
        settings: settingsReducer,
        auth: authReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { dashboardHandlers } from './dashboard.handlers'
import { usersHandlers } from './users.handlers'
import { productsHandlers } from './products.handlers'
import { profileHandlers } from './profile.handlers'
import { settingsHandlers } from './settings.handlers'
import { authHandlers } from './auth.handlers'

export const handlers = [
    ...dashboardHandlers,
    ...usersHandlers,
    ...productsHandlers,
    ...profileHandlers,
    ...settingsHandlers,
    ...authHandlers,
]

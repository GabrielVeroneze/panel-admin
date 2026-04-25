import { dashboardHandlers } from './dashboard.handlers'
import { usersHandlers } from './users.handlers'
import { productsHandlers } from './products.handlers'

export const handlers = [
    ...dashboardHandlers,
    ...usersHandlers,
    ...productsHandlers,
]

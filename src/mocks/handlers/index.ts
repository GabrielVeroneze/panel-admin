import { dashboardHandlers } from './dashboard.handlers'
import { usersHandlers } from './users.handlers'

export const handlers = [...dashboardHandlers, ...usersHandlers]

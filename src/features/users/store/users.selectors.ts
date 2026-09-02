import { createSelector } from '@reduxjs/toolkit'
import { mapUserToListItem } from '../mappers'
import type { RootState } from '@/store'
import type { User } from '../types'

const EMPTY_USERS: User[] = []

export const selectUsersList = createSelector(
    (state: RootState) => state.users.data?.list ?? EMPTY_USERS,
    (users) => users.map(mapUserToListItem),
)

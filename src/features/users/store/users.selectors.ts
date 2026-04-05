import { createSelector } from '@reduxjs/toolkit'
import { mapUserToListItem } from '../mappers'
import type { RootState } from '@/store'

export const selectUsersList = createSelector(
    (state: RootState) => state.users.data?.list ?? [],
    (users) => users.map(mapUserToListItem),
)

import { createSelector } from '@reduxjs/toolkit'
import { mapProductToListItem } from '../mappers'
import type { RootState } from '@/store'

export const selectProductsList = createSelector(
    (state: RootState) => state.products.data?.list ?? [],
    (products) => products.map(mapProductToListItem),
)

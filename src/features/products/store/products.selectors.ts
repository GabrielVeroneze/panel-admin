import { createSelector } from '@reduxjs/toolkit'
import { mapProductToListItem } from '../mappers'
import type { RootState } from '@/store'
import type { Product } from '../types'

const EMPTY_PRODUCTS: Product[] = []

export const selectProductsList = createSelector(
    (state: RootState) => state.products.data?.list ?? EMPTY_PRODUCTS,
    (products) => products.map(mapProductToListItem),
)

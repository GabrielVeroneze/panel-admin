import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getProducts } from '../api'
import type { AsyncState, PaginationParams } from '@/shared/types'
import type { PaginatedProducts } from '../types'

type ProductsState = AsyncState<PaginatedProducts>

const initialState: ProductsState = {
    data: null,
    loading: false,
}

export const fetchProducts = createAsyncThunk<
    PaginatedProducts,
    PaginationParams
>('products/fetchProducts', async ({ page, pageSize, search }) => {
    return await getProducts({ page, pageSize, search })
})

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
    },
})

export default productsSlice.reducer

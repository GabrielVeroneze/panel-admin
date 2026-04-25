import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getProducts } from '../api'
import type { PaginatedProducts } from '../types'

type ProductsState = {
    data: PaginatedProducts | null
    loading: boolean
}

type FetchProductsParams = {
    page: number
    pageSize: number
    search?: string
}

const initialState: ProductsState = {
    data: null,
    loading: false,
}

export const fetchProducts = createAsyncThunk<
    PaginatedProducts,
    FetchProductsParams
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

import { createSlice } from '@reduxjs/toolkit'
import type { AsyncState } from '@/shared/types'
import type { PaginatedProducts } from '../types'
import {
    createProduct,
    deleteProduct,
    deleteProducts,
    fetchProducts,
    updateProduct,
} from './products.thunks'

type ProductsState = AsyncState<PaginatedProducts> & {
    createLoading: boolean
    createError: string | null
    updateLoading: boolean
    updateError: string | null
}

const initialState: ProductsState = {
    data: null,
    loading: false,
    createLoading: false,
    createError: null,
    updateLoading: false,
    updateError: null,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearCreateError: (state) => {
            state.createError = null
        },
        clearUpdateError: (state) => {
            state.updateError = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false
            })
            .addCase(createProduct.pending, (state) => {
                state.createLoading = true
                state.createError = null
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.createLoading = false

                if (!state.data) return

                state.data.list.unshift(action.payload)
                state.data.total += 1
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.createLoading = false
                state.createError =
                    action.payload ??
                    'Unable to create product. Please try again.'
            })
            .addCase(updateProduct.pending, (state) => {
                state.updateLoading = true
                state.updateError = null
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.updateLoading = false

                if (!state.data) return

                const updatedProduct = action.payload

                const index = state.data.list.findIndex(
                    (product) => product.id === updatedProduct.id,
                )

                if (index !== -1) {
                    state.data.list[index] = updatedProduct
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.updateLoading = false
                state.updateError =
                    action.payload ??
                    'Unable to update product. Please try again.'
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                if (!state.data) return

                const id = action.meta.arg.id

                state.data.list = state.data.list.filter(
                    (product) => product.id !== id,
                )
                state.data.total -= 1
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                if (!state.data) return

                const ids = action.meta.arg.ids

                state.data.list = state.data.list.filter(
                    (product) => !ids.includes(product.id),
                )
                state.data.total -= ids.length
            })
    },
})

export const { clearCreateError, clearUpdateError } = productsSlice.actions

export default productsSlice.reducer

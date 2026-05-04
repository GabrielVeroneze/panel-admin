import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    getProducts,
    createProduct as createProductRequest,
    deleteProduct as deleteProductRequest,
    updateProduct as updateProductRequest,
} from '../api'
import type { AsyncState, PaginationParams } from '@/shared/types'
import type {
    CreateProductPayload,
    PaginatedProducts,
    Product,
    UpdateProductPayload,
} from '../types'

type ProductsState = AsyncState<PaginatedProducts>

type CreateProductParams = {
    payload: CreateProductPayload
}

type UpdateProductParams = {
    id: number
    payload: UpdateProductPayload
}

type DeleteProductParams = {
    id: number
}

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

export const createProduct = createAsyncThunk<Product, CreateProductParams>(
    'products/createProduct',
    async ({ payload }) => {
        return await createProductRequest(payload)
    },
)

export const updateProduct = createAsyncThunk<Product, UpdateProductParams>(
    'products/updateProduct',
    async ({ id, payload }) => {
        return await updateProductRequest(id, payload)
    },
)

export const deleteProduct = createAsyncThunk<void, DeleteProductParams>(
    'products/deleteProduct',
    async ({ id }) => {
        await deleteProductRequest(id)
    },
)

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
            .addCase(createProduct.fulfilled, (state, action) => {
                if (!state.data) return

                state.data.list.unshift(action.payload)
                state.data.total += 1
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                if (!state.data) return

                const updatedProduct = action.payload

                const index = state.data.list.findIndex(
                    (product) => product.id === updatedProduct.id,
                )

                if (index !== -1) {
                    state.data.list[index] = updatedProduct
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                if (!state.data) return

                const id = action.meta.arg.id

                state.data.list = state.data.list.filter(
                    (product) => product.id !== id,
                )
                state.data.total -= 1
            })
    },
})

export default productsSlice.reducer

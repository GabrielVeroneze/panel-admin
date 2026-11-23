import { createAsyncThunk } from '@reduxjs/toolkit'
import { getApiErrorMessage } from '@/shared/utils'
import {
    getProducts,
    createProduct as createProductRequest,
    deleteProduct as deleteProductRequest,
    deleteProducts as deleteProductsRequest,
    updateProduct as updateProductRequest,
} from '../api'
import type { PaginationParams } from '@/shared/types'
import type {
    CreateProductPayload,
    PaginatedProducts,
    Product,
    UpdateProductPayload,
} from '../types'

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

type DeleteProductsParams = {
    ids: number[]
}

export const fetchProducts = createAsyncThunk<
    PaginatedProducts,
    PaginationParams
>('products/fetchProducts', async ({ page, pageSize, search }) => {
    return await getProducts({ page, pageSize, search })
})

export const createProduct = createAsyncThunk<
    Product,
    CreateProductParams,
    { rejectValue: string }
>('products/createProduct', async ({ payload }, { rejectWithValue }) => {
    try {
        return await createProductRequest(payload)
    } catch (error) {
        return rejectWithValue(
            getApiErrorMessage(error, {
                fallback: 'Unable to create product. Please try again.',
            }),
        )
    }
})

export const updateProduct = createAsyncThunk<
    Product,
    UpdateProductParams,
    { rejectValue: string }
>('products/updateProduct', async ({ id, payload }, { rejectWithValue }) => {
    try {
        return await updateProductRequest(id, payload)
    } catch (error) {
        return rejectWithValue(
            getApiErrorMessage(error, {
                fallback: 'Unable to update product. Please try again.',
            }),
        )
    }
})

export const deleteProduct = createAsyncThunk<
    void,
    DeleteProductParams,
    { rejectValue: string }
>('products/deleteProduct', async ({ id }, { rejectWithValue }) => {
    try {
        await deleteProductRequest(id)
    } catch (error) {
        return rejectWithValue(
            getApiErrorMessage(error, {
                fallback: 'Unable to delete product. Please try again.',
            }),
        )
    }
})

export const deleteProducts = createAsyncThunk<
    void,
    DeleteProductsParams,
    { rejectValue: string }
>('products/deleteProducts', async ({ ids }, { rejectWithValue }) => {
    try {
        await deleteProductsRequest(ids)
    } catch (error) {
        return rejectWithValue(
            getApiErrorMessage(error, {
                fallback:
                    'Unable to delete selected products. Please try again.',
            }),
        )
    }
})

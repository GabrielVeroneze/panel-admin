import { createAsyncThunk } from '@reduxjs/toolkit'
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

export const deleteProducts = createAsyncThunk<void, DeleteProductsParams>(
    'products/deleteProducts',
    async ({ ids }) => {
        await deleteProductsRequest(ids)
    },
)

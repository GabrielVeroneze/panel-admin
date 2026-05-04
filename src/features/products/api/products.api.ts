import { api } from '@/services/api'
import { toFormData } from '@/shared/utils'
import type { PaginationParams } from '@/shared/types'
import type {
    CreateProductPayload,
    PaginatedProducts,
    Product,
    UpdateProductPayload,
} from '../types'

export const getProducts = async (params: PaginationParams) => {
    const { data } = await api.get<PaginatedProducts>('/products', {
        params,
    })

    return data
}

export const createProduct = async (payload: CreateProductPayload) => {
    const formData = toFormData(payload)

    const { data } = await api.post<Product>('/products', formData)

    return data
}

export const updateProduct = async (
    id: number,
    payload: UpdateProductPayload,
) => {
    const formData = toFormData(payload)

    const { data } = await api.put<Product>(`/products/${id}`, formData)

    return data
}

export const deleteProduct = async (id: number) => {
    await api.delete(`/products/${id}`)
}

export const deleteProducts = async (ids: number[]) => {
    await api.delete('/products', {
        data: { ids },
    })
}

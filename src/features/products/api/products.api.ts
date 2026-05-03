import { api } from '@/services/api'
import { toFormData } from '@/shared/utils'
import type { PaginationParams } from '@/shared/types'
import type { CreateProductPayload, PaginatedProducts, Product } from '../types'

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

import { api } from '@/services/api'
import type { PaginatedProducts } from '../types'

type GetProductsParams = {
    page: number
    pageSize: number
    search?: string
}

export const getProducts = async (params: GetProductsParams) => {
    const { data } = await api.get<PaginatedProducts>('/products', {
        params,
    })

    return data
}

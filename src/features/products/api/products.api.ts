import { api } from '@/services/api'
import type { PaginatedProducts } from '../types'

export const getProducts = async (params: GetProductsParams) => {
    const { data } = await api.get<PaginatedProducts>('/products', {
        params,
    })

    return data
}

import { api } from '@/services/api'
import type { PaginationParams } from '@/shared/types'
import type { PaginatedProducts } from '../types'

export const getProducts = async (params: PaginationParams) => {
    const { data } = await api.get<PaginatedProducts>('/products', {
        params,
    })

    return data
}

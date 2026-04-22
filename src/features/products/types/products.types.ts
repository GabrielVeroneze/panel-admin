import type { PaginatedResponse } from '@/shared/types'

export type Product = {
    id: number
    name: string
    category: string
    brand: string
    price: number
    description: string
    images: string[]
}

export type ProductListItem = {
    id: number
    name: string
    category: string
    brand: string
    price: string
    image: string
}

export type PaginatedProducts = PaginatedResponse<Product>

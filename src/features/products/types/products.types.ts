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

export type CreateProductPayload = {
    name: string
    category: string
    brand: string
    price: number
    description: string
    images: File[]
}

export type UpdateProductPayload = {
    name?: string
    category?: string
    brand?: string
    price?: number
    description?: string
    images?: File[]
}

export type PaginatedProducts = PaginatedResponse<Product>

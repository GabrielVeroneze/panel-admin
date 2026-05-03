import { formatCurrency } from '@/shared/utils'
import type {
    CreateProductFormValues,
    UpdateProductFormValues,
} from '../schemas'
import type {
    CreateProductPayload,
    Product,
    ProductListItem,
    UpdateProductPayload,
} from '../types'

export const mapProductToUpdateFormValues = (
    product: Product,
): UpdateProductFormValues => ({
    name: product.name,
    category: product.category,
    brand: product.brand,
    price: product.price,
    details: product.description,
    images: [],
})

export const mapProductToListItem = (product: Product): ProductListItem => ({
    id: product.id,
    name: product.name,
    category: product.category,
    brand: product.brand,
    price: formatCurrency(product.price),
    image: product.images[0] ?? '',
})

export const mapFormToCreatePayload = (
    data: CreateProductFormValues,
): CreateProductPayload => ({
    name: data.name,
    category: data.category,
    brand: data.brand,
    price: Number(data.price),
    description: data.details,
    images: data.images,
})

export const mapFormToUpdatePayload = (
    data: UpdateProductFormValues,
): UpdateProductPayload => ({
    name: data.name || undefined,
    category: data.category || undefined,
    brand: data.brand || undefined,
    price: data.price ? Number(data.price) : undefined,
    description: data.details || undefined,
    images: data.images?.length ? data.images : undefined,
})

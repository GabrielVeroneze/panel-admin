import { formatCurrency } from '@/shared/utils'
import type { UpdateProductFormValues } from '../schemas'
import type { Product, ProductListItem } from '../types'

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

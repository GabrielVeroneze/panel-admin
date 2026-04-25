import { formatCurrency } from '@/shared/utils'
import type { Product, ProductListItem } from '../types'

export const mapProductToListItem = (product: Product): ProductListItem => ({
    id: product.id,
    name: product.name,
    category: product.category,
    brand: product.brand,
    price: formatCurrency(product.price),
    image: product.images[0] ?? '',
})

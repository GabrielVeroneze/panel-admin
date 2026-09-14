import { describe, expect, it } from 'vitest'
import { selectProductsList } from './products.selectors'
import type { RootState } from '@/store'
import type { Product } from '../types'

const product: Product = {
    id: 1,
    name: 'Product',
    category: 'Category',
    brand: 'Brand',
    price: 99.99,
    description: 'Product description',
    images: ['https://example.com/product.png'],
}

const secondProduct: Product = {
    id: 2,
    name: 'Second Product',
    category: 'Electronics',
    brand: 'Brand X',
    price: 1499.99,
    description: 'Second product description',
    images: [
        'https://example.com/second-product.png',
        'https://example.com/second-product-2.png',
    ],
}

const createState = (products: Product[] | null): RootState => {
    return {
        products: {
            data: products
                ? {
                      list: products,
                      total: products.length,
                      page: 1,
                      pageSize: 15,
                  }
                : null,
            loading: false,
        },
    } as RootState
}

describe('selectProductsList', () => {
    it('returns an empty list when products data is null', () => {
        const state = createState(null)

        const result = selectProductsList(state)

        expect(result).toEqual([])
    })

    it('returns an empty list when products list is empty', () => {
        const state = createState([])

        const result = selectProductsList(state)

        expect(result).toEqual([])
    })

    it('maps products to list items', () => {
        const state = createState([product])

        const result = selectProductsList(state)

        expect(result).toEqual([
            {
                id: 1,
                name: 'Product',
                category: 'Category',
                brand: 'Brand',
                price: '$100',
                image: 'https://example.com/product.png',
            },
        ])
    })

    it('maps multiple products', () => {
        const state = createState([product, secondProduct])

        const result = selectProductsList(state)

        expect(result).toEqual([
            {
                id: 1,
                name: 'Product',
                category: 'Category',
                brand: 'Brand',
                price: '$100',
                image: 'https://example.com/product.png',
            },
            {
                id: 2,
                name: 'Second Product',
                category: 'Electronics',
                brand: 'Brand X',
                price: '$1,500',
                image: 'https://example.com/second-product.png',
            },
        ])
    })

    it('uses an empty string when a product has no images', () => {
        const state = createState([
            {
                ...product,
                images: [],
            },
        ])

        const result = selectProductsList(state)

        expect(result).toEqual([
            {
                id: 1,
                name: 'Product',
                category: 'Category',
                brand: 'Brand',
                price: '$100',
                image: '',
            },
        ])
    })

    it('preserves the product order', () => {
        const state = createState([secondProduct, product])

        const result = selectProductsList(state)

        expect(result.map((item) => item.id)).toEqual([2, 1])
    })

    it('returns the same reference when the products list has not changed', () => {
        const state = createState([product, secondProduct])

        const firstResult = selectProductsList(state)
        const secondResult = selectProductsList(state)

        expect(secondResult).toBe(firstResult)
    })

    it('recalculates when the products list changes', () => {
        const firstState = createState([product])
        const secondState = createState([product, secondProduct])

        const firstResult = selectProductsList(firstState)
        const secondResult = selectProductsList(secondState)

        expect(secondResult).not.toBe(firstResult)
        expect(secondResult).toHaveLength(2)
    })
})

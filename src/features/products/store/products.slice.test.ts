import { describe, expect, it, vi } from 'vitest'
import reducer from './products.slice'
import {
    createProduct,
    deleteProduct,
    deleteProducts,
    fetchProducts,
    updateProduct,
} from './products.thunks'
import type { PaginatedProducts, Product } from '../types'

vi.mock('@/services/api', () => ({
    api: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}))

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
    category: 'Category',
    brand: 'Brand',
    price: 149.99,
    description: 'Second product description',
    images: ['https://example.com/second-product.png'],
}

const thirdProduct: Product = {
    id: 3,
    name: 'Third Product',
    category: 'Category',
    brand: 'Brand',
    price: 199.99,
    description: 'Third product description',
    images: ['https://example.com/third-product.png'],
}

const productsData: PaginatedProducts = {
    list: [product, secondProduct, thirdProduct],
    total: 3,
    page: 1,
    pageSize: 15,
}

describe('products reducer', () => {
    it('returns the initial state', () => {
        const state = reducer(undefined, { type: 'unknown' })

        expect(state).toEqual({
            data: null,
            loading: false,
        })
    })

    describe('fetchProducts', () => {
        it('sets loading to true when the request is pending', () => {
            const state = reducer(
                undefined,
                fetchProducts.pending('request-id', {
                    page: 1,
                    pageSize: 15,
                }),
            )

            expect(state.loading).toBe(true)
            expect(state.data).toBeNull()
        })

        it('stores the products and stops loading when the request succeeds', () => {
            const state = reducer(
                {
                    data: null,
                    loading: true,
                },
                fetchProducts.fulfilled(productsData, 'request-id', {
                    page: 1,
                    pageSize: 15,
                }),
            )

            expect(state).toEqual({
                data: productsData,
                loading: false,
            })
        })

        it('replaces previously loaded data with the new result', () => {
            const previousData: PaginatedProducts = {
                list: [product],
                total: 1,
                page: 1,
                pageSize: 15,
            }

            const state = reducer(
                {
                    data: previousData,
                    loading: true,
                },
                fetchProducts.fulfilled(productsData, 'request-id', {
                    page: 2,
                    pageSize: 15,
                }),
            )

            expect(state.data).toEqual(productsData)
            expect(state.loading).toBe(false)
        })
    })

    describe('createProduct', () => {
        it('adds the created product to the beginning of the list', () => {
            const createdProduct: Product = {
                id: 4,
                name: 'Created Product',
                category: 'Category',
                brand: 'Brand',
                price: 249.99,
                description: 'Created product description',
                images: [],
            }

            const state = reducer(
                {
                    data: productsData,
                    loading: false,
                },
                createProduct.fulfilled(createdProduct, 'request-id', {
                    payload: {
                        name: 'Created Product',
                        category: 'Category',
                        brand: 'Brand',
                        price: 249.99,
                        description: 'Created product description',
                        images: [],
                    },
                }),
            )

            expect(state.data?.list).toEqual([
                createdProduct,
                product,
                secondProduct,
                thirdProduct,
            ])
        })

        it('increments the total after creating a product', () => {
            const createdProduct: Product = {
                ...product,
                id: 4,
                name: 'Created Product',
            }

            const state = reducer(
                {
                    data: productsData,
                    loading: false,
                },
                createProduct.fulfilled(createdProduct, 'request-id', {
                    payload: {
                        name: 'Created Product',
                        category: 'Category',
                        brand: 'Brand',
                        price: 99.99,
                        description: 'Product description',
                        images: [],
                    },
                }),
            )

            expect(state.data?.total).toBe(4)
        })

        it('does not change the state when data is null', () => {
            const createdProduct: Product = {
                ...product,
                id: 4,
            }

            const state = reducer(
                {
                    data: null,
                    loading: false,
                },
                createProduct.fulfilled(createdProduct, 'request-id', {
                    payload: {
                        name: 'Created Product',
                        category: 'Category',
                        brand: 'Brand',
                        price: 99.99,
                        description: 'Product description',
                        images: [],
                    },
                }),
            )

            expect(state).toEqual({
                data: null,
                loading: false,
            })
        })
    })

    describe('updateProduct', () => {
        it('replaces the matching product', () => {
            const updatedProduct: Product = {
                ...product,
                name: 'Updated Product',
                price: 199.99,
            }

            const state = reducer(
                {
                    data: productsData,
                    loading: false,
                },
                updateProduct.fulfilled(updatedProduct, 'request-id', {
                    id: product.id,
                    payload: {
                        name: 'Updated Product',
                        price: 199.99,
                    },
                }),
            )

            expect(state.data?.list).toEqual([
                updatedProduct,
                secondProduct,
                thirdProduct,
            ])
        })

        it('does not change the total when updating a product', () => {
            const updatedProduct: Product = {
                ...product,
                name: 'Updated Product',
            }

            const state = reducer(
                {
                    data: productsData,
                    loading: false,
                },
                updateProduct.fulfilled(updatedProduct, 'request-id', {
                    id: product.id,
                    payload: {
                        name: 'Updated Product',
                    },
                }),
            )

            expect(state.data?.total).toBe(3)
        })

        it('does not change the list when the product does not exist', () => {
            const updatedProduct: Product = {
                ...product,
                id: 999,
                name: 'Updated Product',
            }

            const state = reducer(
                {
                    data: productsData,
                    loading: false,
                },
                updateProduct.fulfilled(updatedProduct, 'request-id', {
                    id: 999,
                    payload: {
                        name: 'Updated Product',
                    },
                }),
            )

            expect(state.data?.list).toEqual(productsData.list)
            expect(state.data?.total).toBe(3)
        })

        it('does not change the state when data is null', () => {
            const updatedProduct: Product = {
                ...product,
                name: 'Updated Product',
            }

            const state = reducer(
                {
                    data: null,
                    loading: false,
                },
                updateProduct.fulfilled(updatedProduct, 'request-id', {
                    id: product.id,
                    payload: {
                        name: 'Updated Product',
                    },
                }),
            )

            expect(state).toEqual({
                data: null,
                loading: false,
            })
        })
    })

    describe('deleteProduct', () => {
        it('removes the product with the requested id', () => {
            const state = reducer(
                {
                    data: productsData,
                    loading: false,
                },
                deleteProduct.fulfilled(undefined, 'request-id', {
                    id: secondProduct.id,
                }),
            )

            expect(state.data?.list).toEqual([product, thirdProduct])
        })

        it('decrements the total after deleting a product', () => {
            const state = reducer(
                {
                    data: productsData,
                    loading: false,
                },
                deleteProduct.fulfilled(undefined, 'request-id', {
                    id: secondProduct.id,
                }),
            )

            expect(state.data?.total).toBe(2)
        })

        it('does not change the state when data is null', () => {
            const state = reducer(
                {
                    data: null,
                    loading: false,
                },
                deleteProduct.fulfilled(undefined, 'request-id', {
                    id: product.id,
                }),
            )

            expect(state).toEqual({
                data: null,
                loading: false,
            })
        })
    })

    describe('deleteProducts', () => {
        it('removes all products with the requested ids', () => {
            const state = reducer(
                {
                    data: productsData,
                    loading: false,
                },
                deleteProducts.fulfilled(undefined, 'request-id', {
                    ids: [product.id, thirdProduct.id],
                }),
            )

            expect(state.data?.list).toEqual([secondProduct])
        })

        it('decrements the total by the number of deleted ids', () => {
            const state = reducer(
                {
                    data: productsData,
                    loading: false,
                },
                deleteProducts.fulfilled(undefined, 'request-id', {
                    ids: [product.id, thirdProduct.id],
                }),
            )

            expect(state.data?.total).toBe(1)
        })

        it('does not change the state when data is null', () => {
            const state = reducer(
                {
                    data: null,
                    loading: false,
                },
                deleteProducts.fulfilled(undefined, 'request-id', {
                    ids: [product.id, secondProduct.id],
                }),
            )

            expect(state).toEqual({
                data: null,
                loading: false,
            })
        })
    })

    describe('unhandled actions', () => {
        it('does not change the state for an unknown action', () => {
            const state = reducer(
                {
                    data: productsData,
                    loading: false,
                },
                {
                    type: 'products/unknown',
                },
            )

            expect(state).toEqual({
                data: productsData,
                loading: false,
            })
        })

        it('does not change the state when fetchProducts is rejected', () => {
            const state = reducer(
                {
                    data: productsData,
                    loading: true,
                },
                fetchProducts.rejected(
                    new Error('Failed to fetch products'),
                    'request-id',
                    {
                        page: 1,
                        pageSize: 15,
                    },
                ),
            )

            expect(state).toEqual({
                data: productsData,
                loading: true,
            })
        })
    })
})

import { describe, expect, it, vi } from 'vitest'
import {
    createProduct as createProductRequest,
    deleteProduct as deleteProductRequest,
    deleteProducts as deleteProductsRequest,
    getProducts,
    updateProduct as updateProductRequest,
} from '../api'
import {
    createProduct,
    deleteProduct,
    deleteProducts,
    fetchProducts,
    updateProduct,
} from './products.thunks'
import type { PaginationParams } from '@/shared/types'
import type {
    CreateProductPayload,
    PaginatedProducts,
    Product,
    UpdateProductPayload,
} from '../types'

vi.mock('../api', () => ({
    getProducts: vi.fn(),
    createProduct: vi.fn(),
    updateProduct: vi.fn(),
    deleteProduct: vi.fn(),
    deleteProducts: vi.fn(),
}))

const mockedGetProducts = vi.mocked(getProducts)
const mockedCreateProductRequest = vi.mocked(createProductRequest)
const mockedUpdateProductRequest = vi.mocked(updateProductRequest)
const mockedDeleteProductRequest = vi.mocked(deleteProductRequest)
const mockedDeleteProductsRequest = vi.mocked(deleteProductsRequest)

const product: Product = {
    id: 1,
    name: 'Product',
    category: 'Category',
    brand: 'Brand',
    price: 99.99,
    description: 'Product description',
    images: ['https://example.com/image.png'],
}

const paginatedProducts: PaginatedProducts = {
    list: [product],
    total: 1,
    page: 1,
    pageSize: 15,
}

const createFile = (name = 'image.png', size = 1024, type = 'image/png') => {
    return new File([new Uint8Array(size)], name, { type })
}

describe('products thunks', () => {
    describe('fetchProducts', () => {
        it('calls getProducts with pagination parameters', async () => {
            const params: PaginationParams = {
                page: 2,
                pageSize: 15,
                search: 'laptop',
            }

            mockedGetProducts.mockResolvedValue(paginatedProducts)

            const result = await fetchProducts(params)(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(mockedGetProducts).toHaveBeenCalledTimes(1)
            expect(mockedGetProducts).toHaveBeenCalledWith(params)
            expect(result.type).toBe('products/fetchProducts/fulfilled')
        })

        it('returns the products received from the API', async () => {
            mockedGetProducts.mockResolvedValue(paginatedProducts)

            const result = await fetchProducts({
                page: 1,
                pageSize: 15,
            })(vi.fn(), vi.fn(), undefined)

            expect(result).toEqual(
                expect.objectContaining({
                    type: 'products/fetchProducts/fulfilled',
                    payload: paginatedProducts,
                }),
            )
        })

        it('works without a search parameter', async () => {
            mockedGetProducts.mockResolvedValue(paginatedProducts)

            await fetchProducts({
                page: 1,
                pageSize: 15,
            })(vi.fn(), vi.fn(), undefined)

            expect(mockedGetProducts).toHaveBeenCalledWith({
                page: 1,
                pageSize: 15,
                search: undefined,
            })
        })

        it('rejects when the API request fails', async () => {
            const error = new Error('Failed to fetch products')

            mockedGetProducts.mockRejectedValue(error)

            const result = await fetchProducts({
                page: 1,
                pageSize: 15,
            })(vi.fn(), vi.fn(), undefined)

            expect(result).toMatchObject({
                type: 'products/fetchProducts/rejected',
                error: {
                    message: 'Failed to fetch products',
                },
            })
        })
    })

    describe('createProduct', () => {
        const payload: CreateProductPayload = {
            name: 'Product',
            category: 'Category',
            brand: 'Brand',
            price: 99.99,
            description: 'Product description',
            images: [createFile()],
        }

        it('calls the create product API with the payload', async () => {
            mockedCreateProductRequest.mockResolvedValue(product)

            const result = await createProduct({ payload })(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(mockedCreateProductRequest).toHaveBeenCalledTimes(1)
            expect(mockedCreateProductRequest).toHaveBeenCalledWith(payload)
            expect(result.type).toBe('products/createProduct/fulfilled')
        })

        it('returns the created product', async () => {
            mockedCreateProductRequest.mockResolvedValue(product)

            const result = await createProduct({ payload })(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(result).toEqual(
                expect.objectContaining({
                    type: 'products/createProduct/fulfilled',
                    payload: product,
                }),
            )
        })

        it('rejects when the API request fails', async () => {
            const error = new Error('Failed to create product')

            mockedCreateProductRequest.mockRejectedValue(error)

            const result = await createProduct({ payload })(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(result).toMatchObject({
                type: 'products/createProduct/rejected',
                error: {
                    message: 'Failed to create product',
                },
            })
        })
    })

    describe('updateProduct', () => {
        const payload: UpdateProductPayload = {
            name: 'Updated Product',
            category: 'Updated Category',
            brand: 'Updated Brand',
            price: 149.99,
            description: 'Updated description',
            images: [createFile('updated-image.png')],
        }

        it('calls the update product API with the id and payload', async () => {
            mockedUpdateProductRequest.mockResolvedValue(product)

            const result = await updateProduct({
                id: 42,
                payload,
            })(vi.fn(), vi.fn(), undefined)

            expect(mockedUpdateProductRequest).toHaveBeenCalledTimes(1)
            expect(mockedUpdateProductRequest).toHaveBeenCalledWith(42, payload)
            expect(result.type).toBe('products/updateProduct/fulfilled')
        })

        it('returns the updated product', async () => {
            mockedUpdateProductRequest.mockResolvedValue(product)

            const result = await updateProduct({
                id: 42,
                payload,
            })(vi.fn(), vi.fn(), undefined)

            expect(result).toEqual(
                expect.objectContaining({
                    type: 'products/updateProduct/fulfilled',
                    payload: product,
                }),
            )
        })

        it('rejects when the API request fails', async () => {
            const error = new Error('Failed to update product')

            mockedUpdateProductRequest.mockRejectedValue(error)

            const result = await updateProduct({
                id: 42,
                payload,
            })(vi.fn(), vi.fn(), undefined)

            expect(result).toMatchObject({
                type: 'products/updateProduct/rejected',
                error: {
                    message: 'Failed to update product',
                },
            })
        })
    })

    describe('deleteProduct', () => {
        it('calls the delete product API with the product id', async () => {
            mockedDeleteProductRequest.mockResolvedValue(undefined)

            const result = await deleteProduct({ id: 42 })(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(mockedDeleteProductRequest).toHaveBeenCalledTimes(1)
            expect(mockedDeleteProductRequest).toHaveBeenCalledWith(42)
            expect(result.type).toBe('products/deleteProduct/fulfilled')
        })

        it('returns undefined after successful deletion', async () => {
            mockedDeleteProductRequest.mockResolvedValue(undefined)

            const result = await deleteProduct({ id: 42 })(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(result).toEqual(
                expect.objectContaining({
                    type: 'products/deleteProduct/fulfilled',
                    payload: undefined,
                }),
            )
        })

        it('rejects when the API request fails', async () => {
            const error = new Error('Failed to delete product')

            mockedDeleteProductRequest.mockRejectedValue(error)

            const result = await deleteProduct({ id: 42 })(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(result).toMatchObject({
                type: 'products/deleteProduct/rejected',
                error: {
                    message: 'Failed to delete product',
                },
            })
        })
    })

    describe('deleteProducts', () => {
        it('calls the delete products API with the product ids', async () => {
            const ids = [1, 2, 3]

            mockedDeleteProductsRequest.mockResolvedValue(undefined)

            const result = await deleteProducts({ ids })(
                vi.fn(),
                vi.fn(),
                undefined,
            )

            expect(mockedDeleteProductsRequest).toHaveBeenCalledTimes(1)
            expect(mockedDeleteProductsRequest).toHaveBeenCalledWith(ids)
            expect(result.type).toBe('products/deleteProducts/fulfilled')
        })

        it('returns undefined after successful deletion', async () => {
            mockedDeleteProductsRequest.mockResolvedValue(undefined)

            const result = await deleteProducts({
                ids: [1, 2, 3],
            })(vi.fn(), vi.fn(), undefined)

            expect(result).toEqual(
                expect.objectContaining({
                    type: 'products/deleteProducts/fulfilled',
                    payload: undefined,
                }),
            )
        })

        it('rejects when the API request fails', async () => {
            const error = new Error('Failed to delete products')

            mockedDeleteProductsRequest.mockRejectedValue(error)

            const result = await deleteProducts({
                ids: [1, 2, 3],
            })(vi.fn(), vi.fn(), undefined)

            expect(result).toMatchObject({
                type: 'products/deleteProducts/rejected',
                error: {
                    message: 'Failed to delete products',
                },
            })
        })
    })
})

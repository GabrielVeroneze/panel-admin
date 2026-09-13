import { beforeEach, describe, expect, it, vi } from 'vitest'
import { api } from '@/services/api'
import {
    createProduct,
    deleteProduct,
    deleteProducts,
    getProducts,
    updateProduct,
} from './products.api'
import type {
    CreateProductPayload,
    PaginatedProducts,
    Product,
    UpdateProductPayload,
} from '@/features/products/types'

vi.mock('@/services/api', () => ({
    api: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}))

const mockedApi = vi.mocked(api)

const createFile = (name = 'image.png', size = 1024, type = 'image/png') => {
    return new File([new Uint8Array(size)], name, { type })
}

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

describe('products api', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    describe('getProducts', () => {
        it('gets products with pagination parameters', async () => {
            mockedApi.get.mockResolvedValue({
                data: paginatedProducts,
            })

            const params = {
                page: 1,
                pageSize: 15,
            }

            const result = await getProducts(params)

            expect(mockedApi.get).toHaveBeenCalledWith('/products', {
                params,
            })

            expect(result).toEqual(paginatedProducts)
        })

        it('includes the search parameter when provided', async () => {
            mockedApi.get.mockResolvedValue({
                data: paginatedProducts,
            })

            const params = {
                page: 2,
                pageSize: 15,
                search: 'laptop',
            }

            await getProducts(params)

            expect(mockedApi.get).toHaveBeenCalledWith('/products', {
                params,
            })
        })

        it('returns the data received from the API', async () => {
            mockedApi.get.mockResolvedValue({
                data: paginatedProducts,
            })

            const result = await getProducts({
                page: 1,
                pageSize: 15,
            })

            expect(result).toBe(paginatedProducts)
        })

        it('propagates API errors', async () => {
            const error = new Error('Failed to fetch products')

            mockedApi.get.mockRejectedValue(error)

            await expect(
                getProducts({
                    page: 1,
                    pageSize: 15,
                }),
            ).rejects.toBe(error)
        })
    })

    describe('createProduct', () => {
        const payload: CreateProductPayload = {
            name: 'Product',
            category: 'Category',
            brand: 'Brand',
            price: 99.99,
            description: 'Product description',
            images: [createFile('image-1.png'), createFile('image-2.png')],
        }

        it('creates a product using the products endpoint', async () => {
            mockedApi.post.mockResolvedValue({
                data: product,
            })

            await createProduct(payload)

            expect(mockedApi.post).toHaveBeenCalledTimes(1)

            expect(mockedApi.post).toHaveBeenCalledWith(
                '/products',
                expect.any(FormData),
            )
        })

        it('sends the product fields as FormData', async () => {
            mockedApi.post.mockResolvedValue({
                data: product,
            })

            await createProduct(payload)

            const formData = mockedApi.post.mock.calls[0][1]

            expect(formData).toBeInstanceOf(FormData)

            expect(formData).toEqual(
                expect.objectContaining({
                    append: expect.any(Function),
                }),
            )

            expect(formData).toBeDefined()

            if (formData instanceof FormData) {
                expect(formData.get('name')).toBe('Product')
                expect(formData.get('category')).toBe('Category')
                expect(formData.get('brand')).toBe('Brand')
                expect(formData.get('price')).toBe('99.99')
                expect(formData.get('description')).toBe('Product description')
            }
        })

        it('sends all product images in FormData', async () => {
            mockedApi.post.mockResolvedValue({
                data: product,
            })

            await createProduct(payload)

            const formData = mockedApi.post.mock.calls[0][1]

            expect(formData).toBeInstanceOf(FormData)

            if (formData instanceof FormData) {
                expect(formData.getAll('images')).toHaveLength(2)
                expect(formData.getAll('images')[0]).toBe(payload.images[0])
                expect(formData.getAll('images')[1]).toBe(payload.images[1])
            }
        })

        it('returns the created product', async () => {
            mockedApi.post.mockResolvedValue({
                data: product,
            })

            const result = await createProduct(payload)

            expect(result).toBe(product)
        })

        it('propagates API errors', async () => {
            const error = new Error('Failed to create product')

            mockedApi.post.mockRejectedValue(error)

            await expect(createProduct(payload)).rejects.toBe(error)
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

        it('updates a product using its id in the endpoint', async () => {
            mockedApi.put.mockResolvedValue({
                data: product,
            })

            await updateProduct(42, payload)

            expect(mockedApi.put).toHaveBeenCalledTimes(1)

            expect(mockedApi.put).toHaveBeenCalledWith(
                '/products/42',
                expect.any(FormData),
            )
        })

        it('sends the updated product fields as FormData', async () => {
            mockedApi.put.mockResolvedValue({
                data: product,
            })

            await updateProduct(42, payload)

            const formData = mockedApi.put.mock.calls[0][1]

            expect(formData).toBeInstanceOf(FormData)

            if (formData instanceof FormData) {
                expect(formData.get('name')).toBe('Updated Product')
                expect(formData.get('category')).toBe('Updated Category')
                expect(formData.get('brand')).toBe('Updated Brand')
                expect(formData.get('price')).toBe('149.99')
                expect(formData.get('description')).toBe('Updated description')
            }
        })

        it('sends updated images in FormData', async () => {
            mockedApi.put.mockResolvedValue({
                data: product,
            })

            await updateProduct(42, payload)

            const formData = mockedApi.put.mock.calls[0][1]

            expect(formData).toBeInstanceOf(FormData)

            if (formData instanceof FormData) {
                expect(formData.getAll('images')).toEqual(payload.images)
            }
        })

        it('does not include undefined fields in FormData', async () => {
            mockedApi.put.mockResolvedValue({
                data: product,
            })

            const partialPayload: UpdateProductPayload = {
                name: 'Updated Product',
                price: 149.99,
            }

            await updateProduct(42, partialPayload)

            const formData = mockedApi.put.mock.calls[0][1]

            expect(formData).toBeInstanceOf(FormData)

            if (formData instanceof FormData) {
                expect(formData.get('name')).toBe('Updated Product')
                expect(formData.get('price')).toBe('149.99')
                expect(formData.has('category')).toBe(false)
                expect(formData.has('brand')).toBe(false)
                expect(formData.has('description')).toBe(false)
                expect(formData.has('images')).toBe(false)
            }
        })

        it('returns the updated product', async () => {
            mockedApi.put.mockResolvedValue({
                data: product,
            })

            const result = await updateProduct(42, payload)

            expect(result).toBe(product)
        })

        it('propagates API errors', async () => {
            const error = new Error('Failed to update product')

            mockedApi.put.mockRejectedValue(error)

            await expect(updateProduct(42, payload)).rejects.toBe(error)
        })
    })

    describe('deleteProduct', () => {
        it('deletes a product using its id in the endpoint', async () => {
            mockedApi.delete.mockResolvedValue({
                data: undefined,
            })

            await deleteProduct(42)

            expect(mockedApi.delete).toHaveBeenCalledTimes(1)
            expect(mockedApi.delete).toHaveBeenCalledWith('/products/42')
        })

        it('does not return a value', async () => {
            mockedApi.delete.mockResolvedValue({
                data: undefined,
            })

            const result = await deleteProduct(42)

            expect(result).toBeUndefined()
        })

        it('propagates API errors', async () => {
            const error = new Error('Failed to delete product')

            mockedApi.delete.mockRejectedValue(error)

            await expect(deleteProduct(42)).rejects.toBe(error)
        })
    })

    describe('deleteProducts', () => {
        it('deletes multiple products using their ids', async () => {
            mockedApi.delete.mockResolvedValue({
                data: undefined,
            })

            const ids = [1, 2, 3]

            await deleteProducts(ids)

            expect(mockedApi.delete).toHaveBeenCalledTimes(1)

            expect(mockedApi.delete).toHaveBeenCalledWith('/products', {
                data: { ids },
            })
        })

        it('sends the complete ids array', async () => {
            mockedApi.delete.mockResolvedValue({
                data: undefined,
            })

            const ids = [10, 25, 42, 100]

            await deleteProducts(ids)

            expect(mockedApi.delete).toHaveBeenCalledWith('/products', {
                data: { ids },
            })
        })

        it('does not return a value', async () => {
            mockedApi.delete.mockResolvedValue({
                data: undefined,
            })

            const result = await deleteProducts([1, 2, 3])

            expect(result).toBeUndefined()
        })

        it('propagates API errors', async () => {
            const error = new Error('Failed to delete products')

            mockedApi.delete.mockRejectedValue(error)

            await expect(deleteProducts([1, 2, 3])).rejects.toBe(error)
        })
    })
})

import { describe, expect, it } from 'vitest'
import {
    mapFormToCreatePayload,
    mapFormToUpdatePayload,
    mapProductToListItem,
    mapProductToUpdateFormValues,
} from './product.mapper'
import type {
    CreateProductFormValues,
    UpdateProductFormValues,
} from '@/features/products/schemas'
import type { Product } from '@/features/products/types'

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
    images: [
        'https://example.com/image-1.png',
        'https://example.com/image-2.png',
    ],
}

describe('product mapper', () => {
    describe('mapProductToUpdateFormValues', () => {
        it('maps product data to update form values', () => {
            const result = mapProductToUpdateFormValues(product)

            expect(result).toEqual({
                name: 'Product',
                category: 'Category',
                brand: 'Brand',
                price: 99.99,
                details: 'Product description',
                images: [],
            })
        })

        it('maps description to details', () => {
            const result = mapProductToUpdateFormValues({
                ...product,
                description: 'Updated product description',
            })

            expect(result.details).toBe('Updated product description')
        })

        it('initializes images as an empty array', () => {
            const result = mapProductToUpdateFormValues(product)

            expect(result.images).toEqual([])
        })
    })

    describe('mapProductToListItem', () => {
        it('maps product data to a list item', () => {
            const result = mapProductToListItem(product)

            expect(result).toEqual({
                id: 1,
                name: 'Product',
                category: 'Category',
                brand: 'Brand',
                price: '$100',
                image: 'https://example.com/image-1.png',
            })
        })

        it('uses the first product image', () => {
            const result = mapProductToListItem(product)

            expect(result.image).toBe('https://example.com/image-1.png')
        })

        it('uses an empty string when the product has no images', () => {
            const result = mapProductToListItem({
                ...product,
                images: [],
            })

            expect(result.image).toBe('')
        })

        it('formats the product price as currency', () => {
            const result = mapProductToListItem({
                ...product,
                price: 1250,
            })

            expect(result.price).toBe('$1,250')
        })

        it('preserves the remaining product information', () => {
            const result = mapProductToListItem({
                ...product,
                id: 42,
                name: 'Laptop',
                category: 'Electronics',
                brand: 'Brand X',
            })

            expect(result).toMatchObject({
                id: 42,
                name: 'Laptop',
                category: 'Electronics',
                brand: 'Brand X',
            })
        })
    })

    describe('mapFormToCreatePayload', () => {
        const formValues: CreateProductFormValues = {
            name: 'Product',
            category: 'Category',
            brand: 'Brand',
            price: 99.99,
            details: 'Product details',
            images: [createFile()],
        }

        it('maps create form values to the API payload', () => {
            const result = mapFormToCreatePayload(formValues)

            expect(result).toEqual({
                name: 'Product',
                category: 'Category',
                brand: 'Brand',
                price: 99.99,
                description: 'Product details',
                images: formValues.images,
            })
        })

        it('maps details to description', () => {
            const result = mapFormToCreatePayload({
                ...formValues,
                details: 'New product details',
            })

            expect(result.description).toBe('New product details')
        })

        it('converts the price to a number', () => {
            const result = mapFormToCreatePayload({
                ...formValues,
                price: '149.99' as unknown as number,
            })

            expect(result.price).toBe(149.99)
            expect(typeof result.price).toBe('number')
        })

        it('preserves the selected image files', () => {
            const images = [
                createFile('image-1.png'),
                createFile('image-2.png'),
            ]

            const result = mapFormToCreatePayload({
                ...formValues,
                images,
            })

            expect(result.images).toBe(images)
        })
    })

    describe('mapFormToUpdatePayload', () => {
        const formValues: UpdateProductFormValues = {
            name: 'Product',
            category: 'Category',
            brand: 'Brand',
            price: 99.99,
            details: 'Product details',
            images: [createFile()],
        }

        it('maps update form values to the API payload', () => {
            const result = mapFormToUpdatePayload(formValues)

            expect(result).toEqual({
                name: 'Product',
                category: 'Category',
                brand: 'Brand',
                price: 99.99,
                description: 'Product details',
                images: formValues.images,
            })
        })

        it('maps details to description', () => {
            const result = mapFormToUpdatePayload({
                ...formValues,
                details: 'Updated details',
            })

            expect(result.description).toBe('Updated details')
        })

        it('converts the price to a number', () => {
            const result = mapFormToUpdatePayload({
                ...formValues,
                price: '149.99' as unknown as number,
            })

            expect(result.price).toBe(149.99)
            expect(typeof result.price).toBe('number')
        })

        it('omits empty string fields', () => {
            const result = mapFormToUpdatePayload({
                ...formValues,
                name: '',
                category: '',
                brand: '',
                details: '',
            })

            expect(result).toEqual({
                name: undefined,
                category: undefined,
                brand: undefined,
                price: 99.99,
                description: undefined,
                images: formValues.images,
            })
        })

        it('omits the price when its value is zero', () => {
            const result = mapFormToUpdatePayload({
                ...formValues,
                price: 0,
            })

            expect(result.price).toBeUndefined()
        })

        it('omits the price when its value is empty', () => {
            const result = mapFormToUpdatePayload({
                ...formValues,
                price: '' as unknown as number,
            })

            expect(result.price).toBeUndefined()
        })

        it('preserves the price when it has a positive value', () => {
            const result = mapFormToUpdatePayload({
                ...formValues,
                price: 250,
            })

            expect(result.price).toBe(250)
        })

        it('omits images when the images array is empty', () => {
            const result = mapFormToUpdatePayload({
                ...formValues,
                images: [],
            })

            expect(result.images).toBeUndefined()
        })

        it('omits images when images are undefined', () => {
            const result = mapFormToUpdatePayload({
                ...formValues,
                images: undefined,
            })

            expect(result.images).toBeUndefined()
        })

        it('preserves the image files when images are provided', () => {
            const images = [
                createFile('image-1.png'),
                createFile('image-2.png'),
            ]

            const result = mapFormToUpdatePayload({
                ...formValues,
                images,
            })

            expect(result.images).toBe(images)
        })
    })
})

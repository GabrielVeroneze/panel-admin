import { describe, expect, it } from 'vitest'
import { updateProductSchema } from './update-product.schema'

const createFile = (name = 'image.png', size = 1024, type = 'image/png') => {
    return new File([new Uint8Array(size)], name, { type })
}

const validProduct = {
    name: 'Product',
    category: 'Category',
    brand: 'Brand',
    price: 99.99,
    details: 'Product details',
    images: [createFile()],
}

describe('updateProductSchema', () => {
    describe('images validation', () => {
        it('accepts product data without images', () => {
            const { images: _, ...productWithoutImages } = validProduct

            const result = updateProductSchema.safeParse(productWithoutImages)

            expect(result.success).toBe(true)
        })

        it('accepts an empty images array', () => {
            const result = updateProductSchema.safeParse({
                ...validProduct,
                images: [],
            })

            expect(result.success).toBe(true)
        })

        it('accepts one image', () => {
            const result = updateProductSchema.safeParse({
                ...validProduct,
                images: [createFile()],
            })

            expect(result.success).toBe(true)
        })

        it('accepts up to 5 images', () => {
            const result = updateProductSchema.safeParse({
                ...validProduct,
                images: Array.from({ length: 5 }, (_, index) =>
                    createFile(`image-${index}.png`),
                ),
            })

            expect(result.success).toBe(true)
        })

        it('rejects more than 5 images', () => {
            const result = updateProductSchema.safeParse({
                ...validProduct,
                images: Array.from({ length: 6 }, (_, index) =>
                    createFile(`image-${index}.png`),
                ),
            })

            expect(result.success).toBe(false)
        })

        it('rejects an image larger than 5MB', () => {
            const maxFileSize = 5 * 1024 * 1024

            const result = updateProductSchema.safeParse({
                ...validProduct,
                images: [createFile('large-image.png', maxFileSize + 1)],
            })

            expect(result.success).toBe(false)
        })

        it('rejects an invalid image format', () => {
            const result = updateProductSchema.safeParse({
                ...validProduct,
                images: [createFile('image.gif', 1024, 'image/gif')],
            })

            expect(result.success).toBe(false)
        })
    })

    describe('inherited validation', () => {
        it('accepts valid product data', () => {
            const result = updateProductSchema.safeParse(validProduct)

            expect(result.success).toBe(true)
        })

        it('rejects an invalid product name', () => {
            const result = updateProductSchema.safeParse({
                ...validProduct,
                name: 'A',
            })

            expect(result.success).toBe(false)
        })

        it('rejects a negative price', () => {
            const result = updateProductSchema.safeParse({
                ...validProduct,
                price: -1,
            })

            expect(result.success).toBe(false)
        })

        it('rejects an invalid image format', () => {
            const result = updateProductSchema.safeParse({
                ...validProduct,
                images: [createFile('image.gif', 1024, 'image/gif')],
            })

            expect(result.success).toBe(false)
        })
    })
})

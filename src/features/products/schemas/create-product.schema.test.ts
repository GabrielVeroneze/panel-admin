import { describe, expect, it } from 'vitest'
import { createProductSchema } from './create-product.schema'

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

describe('createProductSchema', () => {
    describe('images validation', () => {
        it('accepts exactly one image', () => {
            const result = createProductSchema.safeParse({
                ...validProduct,
                images: [createFile()],
            })

            expect(result.success).toBe(true)
        })

        it('rejects an empty images array', () => {
            const result = createProductSchema.safeParse({
                ...validProduct,
                images: [],
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'At least one image is required',
                )
            }
        })

        it('accepts up to 5 images', () => {
            const result = createProductSchema.safeParse({
                ...validProduct,
                images: Array.from({ length: 5 }, (_, index) =>
                    createFile(`image-${index}.png`),
                ),
            })

            expect(result.success).toBe(true)
        })
    })

    describe('inherited validation', () => {
        it('accepts valid product data', () => {
            const result = createProductSchema.safeParse(validProduct)

            expect(result.success).toBe(true)
        })

        it('rejects an invalid product name', () => {
            const result = createProductSchema.safeParse({
                ...validProduct,
                name: 'A',
            })

            expect(result.success).toBe(false)
        })

        it('rejects a negative price', () => {
            const result = createProductSchema.safeParse({
                ...validProduct,
                price: -1,
            })

            expect(result.success).toBe(false)
        })

        it('rejects an invalid image format', () => {
            const result = createProductSchema.safeParse({
                ...validProduct,
                images: [createFile('image.gif', 1024, 'image/gif')],
            })

            expect(result.success).toBe(false)
        })
    })
})

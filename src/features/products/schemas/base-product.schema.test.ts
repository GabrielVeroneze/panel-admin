import { describe, expect, it } from 'vitest'
import { baseProductSchema } from './base-product.schema'

const MAX_FILE_SIZE = 5 * 1024 * 1024

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

describe('baseProductSchema', () => {
    describe('valid data', () => {
        it('accepts valid product data', () => {
            const result = baseProductSchema.safeParse(validProduct)

            expect(result.success).toBe(true)
        })

        it('accepts an empty images array', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                images: [],
            })

            expect(result.success).toBe(true)
        })

        it('accepts up to 5 images', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                images: Array.from({ length: 5 }, (_, index) =>
                    createFile(`image-${index}.png`),
                ),
            })

            expect(result.success).toBe(true)
        })

        it('accepts images with exactly the maximum file size', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                images: [createFile('large-image.png', MAX_FILE_SIZE)],
            })

            expect(result.success).toBe(true)
        })

        it.each(['image/jpeg', 'image/jpg', 'image/png', 'image/webp'])(
            'accepts the %s image format',
            (type) => {
                const result = baseProductSchema.safeParse({
                    ...validProduct,
                    images: [createFile('image', 1024, type)],
                })

                expect(result.success).toBe(true)
            },
        )

        it('trims surrounding whitespace from string fields', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                name: '  Product  ',
                category: '  Category  ',
                brand: '  Brand  ',
                details: '  Product details  ',
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.name).toBe('Product')
                expect(result.data.category).toBe('Category')
                expect(result.data.brand).toBe('Brand')
                expect(result.data.details).toBe('Product details')
            }
        })

        it('accepts a price of zero', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                price: 0,
            })

            expect(result.success).toBe(true)
        })

        it('accepts the maximum length for text fields', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                name: 'a'.repeat(100),
                category: 'a'.repeat(100),
                brand: 'a'.repeat(100),
                details: 'a'.repeat(1000),
            })

            expect(result.success).toBe(true)
        })
    })

    describe('name validation', () => {
        it('rejects a name shorter than 2 characters', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                name: 'A',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Product name must have at least 2 characters',
                )
            }
        })

        it('rejects a name longer than 100 characters', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                name: 'a'.repeat(101),
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Product name must have at most 100 characters',
                )
            }
        })

        it('rejects a name that becomes empty after trimming', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                name: '   ',
            })

            expect(result.success).toBe(false)
        })
    })

    describe('category validation', () => {
        it('rejects a category shorter than 2 characters', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                category: 'A',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Category must have at least 2 characters',
                )
            }
        })

        it('rejects a category longer than 100 characters', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                category: 'a'.repeat(101),
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Category must have at most 100 characters',
                )
            }
        })

        it('rejects a category that becomes empty after trimming', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                category: '   ',
            })

            expect(result.success).toBe(false)
        })
    })

    describe('brand validation', () => {
        it('rejects a brand shorter than 2 characters', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                brand: 'A',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Brand must have at least 2 characters',
                )
            }
        })

        it('rejects a brand longer than 100 characters', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                brand: 'a'.repeat(101),
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Brand must have at most 100 characters',
                )
            }
        })

        it('rejects a brand that becomes empty after trimming', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                brand: '   ',
            })

            expect(result.success).toBe(false)
        })
    })

    describe('price validation', () => {
        it('rejects a negative price', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                price: -0.01,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Price must be greater than or equal to 0',
                )
            }
        })

        it('rejects a non-number price', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                price: '99.99',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Price must be a number',
                )
            }
        })

        it('rejects NaN as a price', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                price: NaN,
            })

            expect(result.success).toBe(false)
        })
    })

    describe('details validation', () => {
        it('rejects details shorter than 5 characters', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                details: 'Test',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Details must have at least 5 characters',
                )
            }
        })

        it('rejects details longer than 1000 characters', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                details: 'a'.repeat(1001),
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Details must have at most 1000 characters',
                )
            }
        })

        it('rejects details that become empty after trimming', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                details: '    ',
            })

            expect(result.success).toBe(false)
        })
    })

    describe('images validation', () => {
        it('rejects more than 5 images', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                images: Array.from({ length: 6 }, (_, index) =>
                    createFile(`image-${index}.png`),
                ),
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'You can upload up to 5 images',
                )
            }
        })

        it('rejects an image larger than 5MB', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                images: [createFile('large-image.png', MAX_FILE_SIZE + 1)],
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Image must be smaller than 5MB',
                )
            }
        })

        it('rejects an unsupported image format', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                images: [createFile('image.gif', 1024, 'image/gif')],
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Invalid image format',
                )
            }
        })

        it('rejects images that are not File instances', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                images: ['image.png'],
            })

            expect(result.success).toBe(false)
        })

        it('rejects the entire images array when one image is too large', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                images: [
                    createFile('valid.png', 1024, 'image/png'),
                    createFile('large.png', MAX_FILE_SIZE + 1, 'image/png'),
                ],
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        message: 'Image must be smaller than 5MB',
                    }),
                )
            }
        })

        it('rejects the entire images array when one image has an invalid format', () => {
            const result = baseProductSchema.safeParse({
                ...validProduct,
                images: [
                    createFile('valid.png', 1024, 'image/png'),
                    createFile('invalid.gif', 1024, 'image/gif'),
                ],
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        message: 'Invalid image format',
                    }),
                )
            }
        })
    })

    describe('required fields', () => {
        it.each(['name', 'category', 'brand', 'price', 'details', 'images'])(
            'rejects data without %s',
            (field) => {
                const data = { ...validProduct }

                delete data[field as keyof typeof data]

                const result = baseProductSchema.safeParse(data)

                expect(result.success).toBe(false)
            },
        )
    })
})

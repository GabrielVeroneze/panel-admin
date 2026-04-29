import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]

export const baseProductSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Product name must have at least 2 characters')
        .max(100, 'Product name must have at most 100 characters'),
    category: z
        .string()
        .trim()
        .min(2, 'Category must have at least 2 characters')
        .max(100, 'Category must have at most 100 characters'),
    brand: z
        .string()
        .trim()
        .min(2, 'Brand must have at least 2 characters')
        .max(100, 'Brand must have at most 100 characters'),
    price: z
        .number({
            error: 'Price must be a number',
        })
        .min(0, 'Price must be greater than or equal to 0'),
    details: z
        .string()
        .trim()
        .min(5, 'Details must have at least 5 characters')
        .max(1000, 'Details must have at most 1000 characters'),
    images: z
        .array(
            z
                .instanceof(File)
                .refine((file) => file.size <= MAX_FILE_SIZE, {
                    message: 'Image must be smaller than 5MB',
                })
                .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
                    message: 'Invalid image format',
                }),
        )
        .min(1, 'At least one image is required')
        .max(5, 'You can upload up to 5 images'),
})

export type BaseProductFieldsValues = z.infer<typeof baseProductSchema>

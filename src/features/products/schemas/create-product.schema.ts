import { z } from 'zod'
import { baseProductSchema } from './'

export const createProductSchema = baseProductSchema.extend({
    images: baseProductSchema.shape.images.min(
        1,
        'At least one image is required',
    ),
})

export type CreateProductFormValues = z.infer<typeof createProductSchema>

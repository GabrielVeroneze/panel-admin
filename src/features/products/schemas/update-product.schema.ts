import { z } from 'zod'
import { baseProductSchema } from './'

export const updateProductSchema = baseProductSchema.extend({
    images: baseProductSchema.shape.images.optional(),
})

export type UpdateProductFormValues = z.infer<typeof updateProductSchema>

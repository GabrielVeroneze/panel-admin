import { z } from 'zod'
import { baseProductSchema } from './'

export const createProductSchema = baseProductSchema

export type CreateProductFormValues = z.infer<typeof createProductSchema>

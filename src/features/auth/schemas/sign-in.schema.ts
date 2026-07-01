import { z } from 'zod'

export const signInSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, 'Email is required')
        .max(100, 'Email must have at most 100 characters')
        .refine((value) => z.email().safeParse(value).success, {
            error: 'Invalid email format',
        })
        .transform((value) => value.toLowerCase()),
    password: z.string().min(1, 'Password is required'),
    rememberMe: z.boolean(),
})

export type SignInFormValues = z.infer<typeof signInSchema>

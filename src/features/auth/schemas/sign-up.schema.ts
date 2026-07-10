import { z } from 'zod'

const nameRegex = /^[A-Za-zÀ-ÿ'-\s]+$/

export const signUpSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(2, 'Name must have at least 2 characters')
            .max(50, 'Name must have at most 50 characters')
            .regex(nameRegex, 'Name contains invalid characters'),
        email: z
            .string()
            .trim()
            .min(1, 'Email is required')
            .max(100, 'Email must have at most 100 characters')
            .refine((value) => z.email().safeParse(value).success, {
                error: 'Invalid email format',
            })
            .transform((value) => value.toLowerCase()),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .max(100, 'Password must have at most 100 characters')
            .regex(
                /[A-Z]/,
                'Password must contain at least one uppercase letter',
            )
            .regex(
                /[a-z]/,
                'Password must contain at least one lowercase letter',
            )
            .regex(/\d/, 'Password must contain at least one number')
            .regex(
                /[@$!%*?&]/,
                'Password must contain at least one special character',
            ),
        confirmPassword: z.string().min(1, 'Confirm password is required'),
        terms: z.boolean(),
    })
    .superRefine((data, ctx) => {
        const { password, confirmPassword, terms } = data

        if (password !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                path: ['confirmPassword'],
                message: 'Passwords do not match',
            })
        }

        if (!terms) {
            ctx.addIssue({
                code: 'custom',
                path: ['terms'],
                message: 'You must accept the terms and conditions',
            })
        }
    })

export type SignUpFormValues = z.infer<typeof signUpSchema>

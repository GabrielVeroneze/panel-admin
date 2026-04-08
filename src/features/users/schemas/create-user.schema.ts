import { z } from 'zod'
import { baseUserSchema } from './'

export const createUserSchema = baseUserSchema
    .extend({
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
    })
    .superRefine((data, ctx) => {
        const { password, confirmPassword } = data

        if (password !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'Passwords do not match',
                path: ['confirmPassword'],
            })
        }
    })

export type CreateUserFormValues = z.infer<typeof createUserSchema>

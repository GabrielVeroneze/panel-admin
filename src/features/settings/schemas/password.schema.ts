import { z } from 'zod'

export const passwordSchema = z
    .object({
        currentPassword: z.string().min(1, 'Current password is required'),
        newPassword: z
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
                /[@$!*?&%]/,
                'Password must contain at least one special character',
            ),
        confirmPassword: z.string().min(1, 'Confirm password is required'),
    })
    .superRefine((data, ctx) => {
        const { currentPassword, newPassword, confirmPassword } = data

        if (newPassword !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                path: ['confirmPassword'],
                message: 'Passwords do not match',
            })
        }

        if (currentPassword === newPassword) {
            ctx.addIssue({
                code: 'custom',
                path: ['newPassword'],
                message: 'New password must be different from current password',
            })
        }
    })

export type PasswordFormValues = z.infer<typeof passwordSchema>

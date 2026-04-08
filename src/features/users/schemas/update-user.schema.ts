import { z } from 'zod'
import { baseUserSchema } from './'

export const updateUserSchema = baseUserSchema
    .extend({
        currentPassword: z
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
            )
            .optional(),
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
                /[@$!%*?&]/,
                'Password must contain at least one special character',
            )
            .optional(),
    })
    .superRefine((data, ctx) => {
        const { currentPassword, newPassword } = data

        if (currentPassword && !newPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'New password is required when changing password',
                path: ['newPassword'],
            })
        }

        if (!currentPassword && newPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'Current password is required to set a new password',
                path: ['currentPassword'],
            })
        }

        if (currentPassword && newPassword && currentPassword === newPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'New password must be different from current password',
                path: ['newPassword'],
            })
        }
    })

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>

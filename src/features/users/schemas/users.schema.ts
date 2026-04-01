import { z } from 'zod'

const nameRegex = /^[A-Za-zÀ-ÿ'-\s]+$/
const phoneRegex = /^\+?[1-9]\d{7,14}$/

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]

export const userFormSchema = z
    .object({
        firstName: z
            .string()
            .trim()
            .min(2, 'First name must have at least 2 characters')
            .max(50, 'First name must have at most 50 characters')
            .regex(nameRegex, 'First name contains invalid characters'),
        lastName: z
            .string()
            .trim()
            .min(2, 'Last name must have at least 2 characters')
            .max(50, 'Last name must have at most 50 characters')
            .regex(nameRegex, 'Last name contains invalid characters'),
        email: z
            .string()
            .trim()
            .min(1, 'Email is required')
            .max(100, 'Email must have at most 100 characters')
            .refine((val) => z.email().safeParse(val).success, {
                error: 'Invalid email format',
            })
            .transform((val) => val.toLowerCase()),
        phone: z
            .string()
            .trim()
            .min(8, 'Phone must have at least 8 digits')
            .max(20, 'Phone must have at most 20 digits')
            .regex(
                phoneRegex,
                'Invalid phone format (use international format)',
            ),
        company: z
            .string()
            .trim()
            .min(2, 'Company must have at least 2 characters')
            .max(100, 'Company must have at most 100 characters'),
        department: z
            .string()
            .trim()
            .min(2, 'Department must have at least 2 characters')
            .max(100, 'Department must have at most 100 characters'),
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
        avatar: z
            .instanceof(File)
            .refine((file) => file.size <= MAX_FILE_SIZE, {
                message: 'Image must be smaller than 5MB',
            })
            .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
                message: 'Invalid image format',
            })
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

export type UserFormValues = z.infer<typeof userFormSchema>

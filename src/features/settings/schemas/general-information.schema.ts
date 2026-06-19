import { z } from 'zod'
import { isValidPhoneNumber } from 'react-phone-number-input'

const nameRegex = /^[A-Za-zÀ-ÿ'-\s]+$/

export const generalInformationSchema = z.object({
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
    role: z
        .string()
        .trim()
        .min(2, 'Role must have at least 2 characters')
        .max(100, 'Role must have at most 100 characters'),
    phone: z
        .string()
        .min(1, 'Phone is required')
        .refine((value) => isValidPhoneNumber(value), {
            message: 'Invalid phone number',
        }),
    birthDate: z.string().min(1, 'Birth date is required'),
    organization: z
        .string()
        .trim()
        .min(2, 'Organization must have at least 2 characters')
        .max(100, 'Organization must have at most 100 characters'),
    department: z
        .string()
        .trim()
        .min(2, 'Department must have at least 2 characters')
        .max(100, 'Department must have at most 100 characters'),
    address: z
        .string()
        .trim()
        .min(5, 'Address must have at least 5 characters')
        .max(200, 'Address must have at most 200 characters'),
    city: z
        .string()
        .trim()
        .min(2, 'City must have at least 2 characters')
        .max(100, 'City must have at most 100 characters'),
    country: z
        .string()
        .trim()
        .min(2, 'Country must have at least 2 characters')
        .max(100, 'Country must have at most 100 characters'),
    zipCode: z
        .string()
        .trim()
        .min(3, 'ZIP code must have at least 3 characters')
        .max(20, 'ZIP code must have at most 20 characters'),
})

export type GeneralInformationFormValues = z.infer<
    typeof generalInformationSchema
>

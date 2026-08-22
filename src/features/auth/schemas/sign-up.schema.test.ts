import { describe, expect, it } from 'vitest'
import { signUpSchema } from './sign-up.schema'

describe('signUpSchema', () => {
    describe('valid data', () => {
        it('accepts valid data', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(true)
        })

        it('accepts terms as true', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(true)
        })
    })

    describe('name', () => {
        it('rejects a name with less than 2 characters', () => {
            const result = signUpSchema.safeParse({
                name: 'A',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['name'],
                        message: 'Name must have at least 2 characters',
                    }),
                )
            }
        })

        it('accepts a name with exactly 2 characters', () => {
            const result = signUpSchema.safeParse({
                name: 'Jo',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(true)
        })

        it('rejects a name longer than 50 characters', () => {
            const result = signUpSchema.safeParse({
                name: 'A'.repeat(51),
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['name'],
                        message: 'Name must have at most 50 characters',
                    }),
                )
            }
        })

        it('accepts a name with exactly 50 characters', () => {
            const result = signUpSchema.safeParse({
                name: 'A'.repeat(50),
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(true)
        })

        it('rejects a name containing numbers', () => {
            const result = signUpSchema.safeParse({
                name: 'John123',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['name'],
                        message: 'Name contains invalid characters',
                    }),
                )
            }
        })

        it('rejects a name containing invalid symbols', () => {
            const result = signUpSchema.safeParse({
                name: 'John@Doe',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['name'],
                        message: 'Name contains invalid characters',
                    }),
                )
            }
        })

        it('accepts a name containing accents', () => {
            const result = signUpSchema.safeParse({
                name: 'João da Silva',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(true)
        })

        it('accepts a name containing an apostrophe', () => {
            const result = signUpSchema.safeParse({
                name: "O'Connor",
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(true)
        })

        it('accepts a name containing a hyphen', () => {
            const result = signUpSchema.safeParse({
                name: 'Jean-Pierre',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(true)
        })

        it('trims whitespace from the name', () => {
            const result = signUpSchema.safeParse({
                name: '  John Doe  ',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.name).toBe('John Doe')
            }
        })
    })

    describe('email', () => {
        it('rejects an empty email', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: '',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['email'],
                        message: 'Email is required',
                    }),
                )
            }
        })

        it('rejects an email containing only whitespace', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: '   ',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['email'],
                        message: 'Email is required',
                    }),
                )
            }
        })

        it('rejects an email longer than 100 characters', () => {
            const email = `${'a'.repeat(89)}@example.com`

            expect(email).toHaveLength(101)

            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email,
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['email'],
                        message: 'Email must have at most 100 characters',
                    }),
                )
            }
        })

        it('accepts an email with exactly 100 characters', () => {
            const email = `${'a'.repeat(88)}@example.com`

            expect(email).toHaveLength(100)

            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email,
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(true)
        })

        it('rejects an invalid email format', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'invalid-email',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['email'],
                        message: 'Invalid email format',
                    }),
                )
            }
        })

        it('trims whitespace from the email', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: '  john@example.com  ',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.email).toBe('john@example.com')
            }
        })

        it('converts the email to lowercase', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'JOHN@EXAMPLE.COM',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.email).toBe('john@example.com')
            }
        })

        it('trims and converts the email to lowercase', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: '  JOHN@EXAMPLE.COM  ',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.email).toBe('john@example.com')
            }
        })
    })

    describe('password', () => {
        it('rejects a password with less than 8 characters', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Pass1!',
                confirmPassword: 'Pass1!',
                terms: true,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['password'],
                        message: 'Password must be at least 8 characters',
                    }),
                )
            }
        })

        it('accepts a password with exactly 8 characters', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Pass123!',
                confirmPassword: 'Pass123!',
                terms: true,
            })

            expect(result.success).toBe(true)
        })

        it('rejects a password longer than 100 characters', () => {
            const password = `A${'a'.repeat(97)}1!`

            expect(password).toHaveLength(100)

            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: `${password}a`,
                confirmPassword: `${password}a`,
                terms: true,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['password'],
                        message: 'Password must have at most 100 characters',
                    }),
                )
            }
        })

        it('accepts a password with exactly 100 characters', () => {
            const password = `A${'a'.repeat(97)}1!`

            expect(password).toHaveLength(100)

            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password,
                confirmPassword: password,
                terms: true,
            })

            expect(result.success).toBe(true)
        })

        it('rejects a password without an uppercase letter', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password1!',
                confirmPassword: 'password1!',
                terms: true,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['password'],
                        message:
                            'Password must contain at least one uppercase letter',
                    }),
                )
            }
        })

        it('rejects a password without a lowercase letter', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'PASSWORD1!',
                confirmPassword: 'PASSWORD1!',
                terms: true,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['password'],
                        message:
                            'Password must contain at least one lowercase letter',
                    }),
                )
            }
        })

        it('rejects a password without a number', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password!',
                confirmPassword: 'Password!',
                terms: true,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['password'],
                        message: 'Password must contain at least one number',
                    }),
                )
            }
        })

        it('rejects a password without a special character', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1',
                confirmPassword: 'Password1',
                terms: true,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['password'],
                        message:
                            'Password must contain at least one special character',
                    }),
                )
            }
        })

        it('accepts a password containing all required character types', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(true)
        })
    })

    describe('confirmPassword', () => {
        it('rejects an empty confirmation password', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: '',
                terms: true,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['confirmPassword'],
                        message: 'Confirm password is required',
                    }),
                )
            }
        })

        it('rejects when passwords do not match', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password2!',
                terms: true,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['confirmPassword'],
                        message: 'Passwords do not match',
                    }),
                )
            }
        })

        it('accepts matching passwords', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(true)
        })
    })

    describe('terms', () => {
        it('rejects a non-boolean value', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: 'true',
            })

            expect(result.success).toBe(false)
        })

        it('rejects an omitted terms value', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
            })

            expect(result.success).toBe(false)
        })

        it('rejects false terms', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: false,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['terms'],
                        message: 'You must accept the terms and conditions',
                    }),
                )
            }
        })

        it('accepts true terms', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(true)
        })
    })

    describe('required fields', () => {
        it('rejects when name is omitted', () => {
            const result = signUpSchema.safeParse({
                email: 'john@example.com',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(false)
        })

        it('rejects when email is omitted', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                password: 'Password1!',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(false)
        })

        it('rejects when password is omitted', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                confirmPassword: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(false)
        })

        it('rejects when confirmPassword is omitted', () => {
            const result = signUpSchema.safeParse({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'Password1!',
                terms: true,
            })

            expect(result.success).toBe(false)
        })

        it('rejects when all fields are omitted', () => {
            const result = signUpSchema.safeParse({})

            expect(result.success).toBe(false)
        })
    })
})

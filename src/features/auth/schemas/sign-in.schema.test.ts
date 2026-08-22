import { describe, expect, it } from 'vitest'
import { signInSchema } from './sign-in.schema'

describe('signInSchema', () => {
    describe('valid data', () => {
        it('accepts valid data', () => {
            const result = signInSchema.safeParse({
                email: 'user@example.com',
                password: 'password123',
                rememberMe: false,
            })

            expect(result.success).toBe(true)
        })

        it('accepts rememberMe as true', () => {
            const result = signInSchema.safeParse({
                email: 'user@example.com',
                password: 'password123',
                rememberMe: true,
            })

            expect(result.success).toBe(true)
        })
    })

    describe('email', () => {
        it('rejects an empty email', () => {
            const result = signInSchema.safeParse({
                email: '',
                password: 'password123',
                rememberMe: false,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe('Email is required')
            }
        })

        it('rejects an email containing only whitespace', () => {
            const result = signInSchema.safeParse({
                email: '   ',
                password: 'password123',
                rememberMe: false,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe('Email is required')
            }
        })

        it('rejects an email longer than 100 characters', () => {
            const result = signInSchema.safeParse({
                email: `${'a'.repeat(89)}@example.com`,
                password: 'password123',
                rememberMe: false,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Email must have at most 100 characters',
                )
            }
        })

        it('accepts an email with exactly 100 characters', () => {
            const email = `${'a'.repeat(88)}@example.com`

            expect(email).toHaveLength(100)

            const result = signInSchema.safeParse({
                email,
                password: 'password123',
                rememberMe: false,
            })

            expect(result.success).toBe(true)
        })

        it('rejects an invalid email format', () => {
            const result = signInSchema.safeParse({
                email: 'invalid-email',
                password: 'password123',
                rememberMe: false,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Invalid email format',
                )
            }
        })

        it('trims whitespace from the email', () => {
            const result = signInSchema.safeParse({
                email: '  user@example.com  ',
                password: 'password123',
                rememberMe: false,
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.email).toBe('user@example.com')
            }
        })

        it('converts the email to lowercase', () => {
            const result = signInSchema.safeParse({
                email: 'USER@EXAMPLE.COM',
                password: 'password123',
                rememberMe: false,
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.email).toBe('user@example.com')
            }
        })

        it('trims and converts the email to lowercase', () => {
            const result = signInSchema.safeParse({
                email: '  USER@EXAMPLE.COM  ',
                password: 'password123',
                rememberMe: false,
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.email).toBe('user@example.com')
            }
        })
    })

    describe('password', () => {
        it('rejects an empty password', () => {
            const result = signInSchema.safeParse({
                email: 'user@example.com',
                password: '',
                rememberMe: false,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Password is required',
                )
            }
        })

        it('accepts a non-empty password', () => {
            const result = signInSchema.safeParse({
                email: 'user@example.com',
                password: 'a',
                rememberMe: false,
            })

            expect(result.success).toBe(true)
        })
    })

    describe('rememberMe', () => {
        it('rejects a non-boolean value', () => {
            const result = signInSchema.safeParse({
                email: 'user@example.com',
                password: 'password123',
                rememberMe: 'true',
            })

            expect(result.success).toBe(false)
        })

        it('rejects an omitted rememberMe value', () => {
            const result = signInSchema.safeParse({
                email: 'user@example.com',
                password: 'password123',
            })

            expect(result.success).toBe(false)
        })
    })

    describe('required fields', () => {
        it('rejects when email is omitted', () => {
            const result = signInSchema.safeParse({
                password: 'password123',
                rememberMe: false,
            })

            expect(result.success).toBe(false)
        })

        it('rejects when password is omitted', () => {
            const result = signInSchema.safeParse({
                email: 'user@example.com',
                rememberMe: false,
            })

            expect(result.success).toBe(false)
        })

        it('rejects when all fields are omitted', () => {
            const result = signInSchema.safeParse({})

            expect(result.success).toBe(false)
        })
    })
})

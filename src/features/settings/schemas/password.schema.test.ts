import { describe, expect, it } from 'vitest'
import { passwordSchema } from './password.schema'

const validData = {
    currentPassword: 'Current@123',
    newPassword: 'NewPassword@123',
    confirmPassword: 'NewPassword@123',
}

describe('password.schema', () => {
    it('accepts valid data', () => {
        const result = passwordSchema.safeParse(validData)

        expect(result.success).toBe(true)

        if (result.success) {
            expect(result.data).toEqual(validData)
        }
    })

    describe('currentPassword', () => {
        it('rejects an empty password', () => {
            const result = passwordSchema.safeParse({
                ...validData,
                currentPassword: '',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['currentPassword'],
                        message: 'Current password is required',
                    }),
                )
            }
        })

        it('accepts a non-empty password', () => {
            const result = passwordSchema.safeParse({
                ...validData,
                currentPassword: 'a',
            })

            expect(result.success).toBe(true)
        })
    })

    describe('newPassword', () => {
        it.each([
            ['short', 'Password must be at least 8 characters'],
            ['A'.repeat(101), 'Password must have at most 100 characters'],
            [
                'newpassword@123',
                'Password must contain at least one uppercase letter',
            ],
            [
                'NEWPASSWORD@123',
                'Password must contain at least one lowercase letter',
            ],
            ['NewPassword@', 'Password must contain at least one number'],
            [
                'NewPassword123',
                'Password must contain at least one special character',
            ],
        ])('rejects invalid value "%s"', (value, message) => {
            const result = passwordSchema.safeParse({
                ...validData,
                newPassword: value,
                confirmPassword: value,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['newPassword'],
                        message,
                    }),
                )
            }
        })

        it.each([
            'Password@123',
            'Password$123',
            'Password!123',
            'Password*123',
            'Password?123',
            'Password&123',
            'Password%123',
        ])('accepts supported special character in "%s"', (password) => {
            const result = passwordSchema.safeParse({
                ...validData,
                newPassword: password,
                confirmPassword: password,
            })

            expect(result.success).toBe(true)
        })

        it('accepts a password with exactly 8 characters', () => {
            const password = 'Aa1@aaaa'

            const result = passwordSchema.safeParse({
                ...validData,
                newPassword: password,
                confirmPassword: password,
            })

            expect(result.success).toBe(true)
        })

        it('accepts a password with exactly 100 characters', () => {
            const password = `Aa1@${'a'.repeat(96)}`

            expect(password).toHaveLength(100)

            const result = passwordSchema.safeParse({
                ...validData,
                newPassword: password,
                confirmPassword: password,
            })

            expect(result.success).toBe(true)
        })
    })

    describe('confirmPassword', () => {
        it('rejects an empty confirmation password', () => {
            const result = passwordSchema.safeParse({
                ...validData,
                confirmPassword: '',
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
            const result = passwordSchema.safeParse({
                ...validData,
                confirmPassword: 'DifferentPassword@123',
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

        it('accepts when passwords match', () => {
            const result = passwordSchema.safeParse({
                ...validData,
                confirmPassword: validData.newPassword,
            })

            expect(result.success).toBe(true)
        })
    })

    describe('password relationship rules', () => {
        it('rejects when the new password is equal to the current password', () => {
            const password = 'CurrentPassword@123'

            const result = passwordSchema.safeParse({
                currentPassword: password,
                newPassword: password,
                confirmPassword: password,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['newPassword'],
                        message:
                            'New password must be different from current password',
                    }),
                )
            }
        })

        it('allows the new password when it differs from the current password', () => {
            const result = passwordSchema.safeParse({
                currentPassword: 'CurrentPassword@123',
                newPassword: 'NewPassword@123',
                confirmPassword: 'NewPassword@123',
            })

            expect(result.success).toBe(true)
        })

        it('reports both relationship errors when passwords are equal and confirmation differs', () => {
            const password = 'CurrentPassword@123'

            const result = passwordSchema.safeParse({
                currentPassword: password,
                newPassword: password,
                confirmPassword: 'DifferentPassword@123',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['confirmPassword'],
                        message: 'Passwords do not match',
                    }),
                )

                expect(result.error.issues).toContainEqual(
                    expect.objectContaining({
                        path: ['newPassword'],
                        message:
                            'New password must be different from current password',
                    }),
                )
            }
        })
    })
})

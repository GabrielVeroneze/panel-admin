import { describe, expect, it } from 'vitest'
import { updateUserSchema } from './update-user.schema'

const validBaseUser = {
    firstName: 'Gabriel',
    lastName: 'Veroneze',
    email: 'gabriel@example.com',
    phone: '+5511987654321',
    company: 'Acme',
    department: 'Engineering',
}

const validCurrentPassword = 'Current1!'
const validNewPassword = 'NewPass1!'

describe('updateUserSchema', () => {
    describe('password fields', () => {
        it('accepts an update without password fields', () => {
            const result = updateUserSchema.safeParse(validBaseUser)

            expect(result.success).toBe(true)
        })

        it('accepts empty password fields', () => {
            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                currentPassword: '',
                newPassword: '',
            })

            expect(result.success).toBe(true)
        })

        it('transforms an empty current password into undefined', () => {
            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                currentPassword: '',
                newPassword: '',
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.currentPassword).toBeUndefined()
            }
        })

        it('transforms an empty new password into undefined', () => {
            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                currentPassword: '',
                newPassword: '',
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.newPassword).toBeUndefined()
            }
        })
    })

    describe('currentPassword', () => {
        it('accepts a valid current password without changing the password', () => {
            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                currentPassword: validCurrentPassword,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) =>
                            issue.path[0] === 'newPassword' &&
                            issue.message ===
                                'New password is required when changing password',
                    ),
                ).toBe(true)
            }
        })

        it('rejects an invalid current password', () => {
            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                currentPassword: 'password',
                newPassword: validNewPassword,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) =>
                            issue.path[0] === 'currentPassword' &&
                            issue.message ===
                                'Password must contain at least one uppercase letter',
                    ),
                ).toBe(true)
            }
        })
    })

    describe('newPassword', () => {
        it('rejects a new password without a current password', () => {
            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                newPassword: validNewPassword,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) =>
                            issue.path[0] === 'currentPassword' &&
                            issue.message ===
                                'Current password is required to set a new password',
                    ),
                ).toBe(true)
            }
        })

        it('rejects a new password with fewer than 8 characters', () => {
            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                currentPassword: validCurrentPassword,
                newPassword: 'New1!',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) =>
                            issue.path[0] === 'newPassword' &&
                            issue.message ===
                                'Password must be at least 8 characters',
                    ),
                ).toBe(true)
            }
        })

        it('rejects a new password with more than 100 characters', () => {
            const newPassword = `A${'a'.repeat(98)}1!`

            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                currentPassword: validCurrentPassword,
                newPassword,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) =>
                            issue.path[0] === 'newPassword' &&
                            issue.message ===
                                'Password must have at most 100 characters',
                    ),
                ).toBe(true)
            }
        })

        it('rejects a new password without an uppercase letter', () => {
            const newPassword = 'newpass1!'

            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                currentPassword: validCurrentPassword,
                newPassword,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) =>
                            issue.path[0] === 'newPassword' &&
                            issue.message ===
                                'Password must contain at least one uppercase letter',
                    ),
                ).toBe(true)
            }
        })

        it('rejects a new password without a lowercase letter', () => {
            const newPassword = 'NEWPASS1!'

            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                currentPassword: validCurrentPassword,
                newPassword,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) =>
                            issue.path[0] === 'newPassword' &&
                            issue.message ===
                                'Password must contain at least one lowercase letter',
                    ),
                ).toBe(true)
            }
        })

        it('rejects a new password without a number', () => {
            const newPassword = 'NewPass!!'

            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                currentPassword: validCurrentPassword,
                newPassword,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) =>
                            issue.path[0] === 'newPassword' &&
                            issue.message ===
                                'Password must contain at least one number',
                    ),
                ).toBe(true)
            }
        })

        it('rejects a new password without a special character', () => {
            const newPassword = 'NewPass12'

            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                currentPassword: validCurrentPassword,
                newPassword,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) =>
                            issue.path[0] === 'newPassword' &&
                            issue.message ===
                                'Password must contain at least one special character',
                    ),
                ).toBe(true)
            }
        })

        it('accepts a new password with exactly 8 characters', () => {
            const newPassword = 'NewPass1!'

            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                currentPassword: validCurrentPassword,
                newPassword,
            })

            expect(result.success).toBe(true)
        })

        it('accepts a new password with exactly 100 characters', () => {
            const newPassword = `A${'a'.repeat(97)}1!`

            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                currentPassword: validCurrentPassword,
                newPassword,
            })

            expect(result.success).toBe(true)
        })
    })

    describe('password relationship', () => {
        it('requires a new password when current password is provided', () => {
            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                currentPassword: validCurrentPassword,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                const issue = result.error.issues.find(
                    (issue) =>
                        issue.message ===
                        'New password is required when changing password',
                )

                expect(issue).toBeDefined()
                expect(issue?.path).toEqual(['newPassword'])
            }
        })

        it('requires the current password when a new password is provided', () => {
            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                newPassword: validNewPassword,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                const issue = result.error.issues.find(
                    (issue) =>
                        issue.message ===
                        'Current password is required to set a new password',
                )

                expect(issue).toBeDefined()
                expect(issue?.path).toEqual(['currentPassword'])
            }
        })

        it('rejects when current and new passwords are identical', () => {
            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                currentPassword: validCurrentPassword,
                newPassword: validCurrentPassword,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                const issue = result.error.issues.find(
                    (issue) =>
                        issue.message ===
                        'New password must be different from current password',
                )

                expect(issue).toBeDefined()
                expect(issue?.path).toEqual(['newPassword'])
            }
        })

        it('accepts different current and new passwords', () => {
            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                currentPassword: validCurrentPassword,
                newPassword: validNewPassword,
            })

            expect(result.success).toBe(true)
        })
    })

    describe('complete object', () => {
        it('accepts a valid user update without password change', () => {
            const result = updateUserSchema.safeParse({
                ...validBaseUser,
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data).toMatchObject(validBaseUser)
                expect(result.data.currentPassword).toBeUndefined()
                expect(result.data.newPassword).toBeUndefined()
            }
        })

        it('accepts a valid user update with a password change', () => {
            const result = updateUserSchema.safeParse({
                ...validBaseUser,
                currentPassword: validCurrentPassword,
                newPassword: validNewPassword,
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data).toMatchObject({
                    ...validBaseUser,
                    currentPassword: validCurrentPassword,
                    newPassword: validNewPassword,
                })
            }
        })
    })
})

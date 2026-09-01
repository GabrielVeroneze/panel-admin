import { describe, expect, it } from 'vitest'
import { createUserSchema } from './create-user.schema'

const validBaseUser = {
    firstName: 'Gabriel',
    lastName: 'Veroneze',
    email: 'gabriel@example.com',
    phone: '+5511987654321',
    company: 'Acme',
    department: 'Engineering',
}

const validPassword = 'Password1!'

describe('createUserSchema', () => {
    describe('password', () => {
        it('accepts a valid password', () => {
            const result = createUserSchema.safeParse({
                ...validBaseUser,
                password: validPassword,
                confirmPassword: validPassword,
            })

            expect(result.success).toBe(true)
        })

        it('rejects passwords with fewer than 8 characters', () => {
            const result = createUserSchema.safeParse({
                ...validBaseUser,
                password: 'Pass1!',
                confirmPassword: 'Pass1!',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) =>
                            issue.path[0] === 'password' &&
                            issue.message ===
                                'Password must be at least 8 characters',
                    ),
                ).toBe(true)
            }
        })

        it('rejects passwords with more than 100 characters', () => {
            const password = `A${'a'.repeat(98)}1!`

            const result = createUserSchema.safeParse({
                ...validBaseUser,
                password,
                confirmPassword: password,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) =>
                            issue.path[0] === 'password' &&
                            issue.message ===
                                'Password must have at most 100 characters',
                    ),
                ).toBe(true)
            }
        })

        it('accepts a password with exactly 8 characters', () => {
            const password = 'Passwo1!'

            const result = createUserSchema.safeParse({
                ...validBaseUser,
                password,
                confirmPassword: password,
            })

            expect(result.success).toBe(true)
        })

        it('rejects passwords without an uppercase letter', () => {
            const password = 'password1!'

            const result = createUserSchema.safeParse({
                ...validBaseUser,
                password,
                confirmPassword: password,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) =>
                            issue.path[0] === 'password' &&
                            issue.message ===
                                'Password must contain at least one uppercase letter',
                    ),
                ).toBe(true)
            }
        })

        it('rejects passwords without a lowercase letter', () => {
            const password = 'PASSWORD1!'

            const result = createUserSchema.safeParse({
                ...validBaseUser,
                password,
                confirmPassword: password,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) =>
                            issue.path[0] === 'password' &&
                            issue.message ===
                                'Password must contain at least one lowercase letter',
                    ),
                ).toBe(true)
            }
        })

        it('rejects passwords without a number', () => {
            const password = 'Password!'

            const result = createUserSchema.safeParse({
                ...validBaseUser,
                password,
                confirmPassword: password,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) =>
                            issue.path[0] === 'password' &&
                            issue.message ===
                                'Password must contain at least one number',
                    ),
                ).toBe(true)
            }
        })

        it('rejects passwords without a special character', () => {
            const password = 'Password1'

            const result = createUserSchema.safeParse({
                ...validBaseUser,
                password,
                confirmPassword: password,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) =>
                            issue.path[0] === 'password' &&
                            issue.message ===
                                'Password must contain at least one special character',
                    ),
                ).toBe(true)
            }
        })
    })

    describe('confirmPassword', () => {
        it('accepts a confirmation matching the password', () => {
            const result = createUserSchema.safeParse({
                ...validBaseUser,
                password: validPassword,
                confirmPassword: validPassword,
            })

            expect(result.success).toBe(true)
        })

        it('rejects an empty confirmation', () => {
            const result = createUserSchema.safeParse({
                ...validBaseUser,
                password: validPassword,
                confirmPassword: '',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) =>
                            issue.path[0] === 'confirmPassword' &&
                            issue.message === 'Confirm password is required',
                    ),
                ).toBe(true)
            }
        })

        it('rejects a confirmation that does not match the password', () => {
            const result = createUserSchema.safeParse({
                ...validBaseUser,
                password: validPassword,
                confirmPassword: 'Different1!',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) =>
                            issue.path[0] === 'confirmPassword' &&
                            issue.message === 'Passwords do not match',
                    ),
                ).toBe(true)
            }
        })

        it('assigns the password mismatch error to confirmPassword', () => {
            const result = createUserSchema.safeParse({
                ...validBaseUser,
                password: validPassword,
                confirmPassword: 'Different1!',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                const issue = result.error.issues.find(
                    (issue) => issue.message === 'Passwords do not match',
                )

                expect(issue).toBeDefined()
                expect(issue?.path).toEqual(['confirmPassword'])
            }
        })
    })

    describe('complete object', () => {
        it('accepts a valid user with password fields', () => {
            const result = createUserSchema.safeParse({
                ...validBaseUser,
                password: validPassword,
                confirmPassword: validPassword,
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data).toMatchObject({
                    ...validBaseUser,
                    password: validPassword,
                    confirmPassword: validPassword,
                })
            }
        })
    })
})

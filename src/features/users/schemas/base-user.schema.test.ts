import { describe, expect, it } from 'vitest'
import { baseUserSchema } from './base-user.schema'

describe('baseUserSchema', () => {
    describe('firstName', () => {
        it('accepts a valid first name', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(true)
        })

        it('trims leading and trailing whitespace', () => {
            const result = baseUserSchema.safeParse({
                firstName: '  Gabriel  ',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.firstName).toBe('Gabriel')
            }
        })

        it('rejects names with fewer than 2 characters', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'G',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'First name must have at least 2 characters',
                )
            }
        })

        it('rejects names with more than 50 characters', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'G'.repeat(51),
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'First name must have at most 50 characters',
                )
            }
        })

        it('accepts names with letters, accents, apostrophes, hyphens and spaces', () => {
            const result = baseUserSchema.safeParse({
                firstName: "José-Luís D'Ávila",
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(true)
        })

        it('rejects names with invalid characters', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel123',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'First name contains invalid characters',
                )
            }
        })
    })

    describe('lastName', () => {
        it('rejects last names with fewer than 2 characters', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'S',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Last name must have at least 2 characters',
                )
            }
        })

        it('rejects last names with more than 50 characters', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'S'.repeat(51),
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Last name must have at most 50 characters',
                )
            }
        })

        it('trims leading and trailing whitespace', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: '  Silva  ',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.lastName).toBe('Silva')
            }
        })

        it('rejects last names with invalid characters', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva@',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Last name contains invalid characters',
                )
            }
        })
    })

    describe('email', () => {
        it('accepts a valid email', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(true)
        })

        it('rejects an empty email', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: '',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe('Email is required')
            }
        })

        it('rejects an invalid email format', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'invalid-email',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Invalid email format',
                )
            }
        })

        it('rejects emails with more than 100 characters', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: `${'a'.repeat(90)}@example.com`,
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Email must have at most 100 characters',
                )
            }
        })

        it('trims whitespace and converts the email to lowercase', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: '  GABRIEL@EXAMPLE.COM  ',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.email).toBe('gabriel@example.com')
            }
        })
    })

    describe('phone', () => {
        it('accepts a valid phone number', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(true)
        })

        it('rejects an empty phone number', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe('Phone is required')
            }
        })

        it('rejects an invalid phone number', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '123',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Invalid phone number',
                )
            }
        })
    })

    describe('company', () => {
        it('rejects companies with fewer than 2 characters', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'A',
                department: 'Engineering',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Company must have at least 2 characters',
                )
            }
        })

        it('rejects companies with more than 100 characters', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'A'.repeat(101),
                department: 'Engineering',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Company must have at most 100 characters',
                )
            }
        })

        it('trims leading and trailing whitespace', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: '  Acme  ',
                department: 'Engineering',
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.company).toBe('Acme')
            }
        })
    })

    describe('department', () => {
        it('rejects departments with fewer than 2 characters', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'A',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Department must have at least 2 characters',
                )
            }
        })

        it('rejects departments with more than 100 characters', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'A'.repeat(101),
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Department must have at most 100 characters',
                )
            }
        })

        it('trims leading and trailing whitespace', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: '  Engineering  ',
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.department).toBe('Engineering')
            }
        })
    })

    describe('avatar', () => {
        it('accepts an omitted avatar', () => {
            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
            })

            expect(result.success).toBe(true)
        })

        it('accepts a JPEG image', () => {
            const file = new File(['image'], 'avatar.jpg', {
                type: 'image/jpeg',
            })

            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
                avatar: file,
            })

            expect(result.success).toBe(true)
        })

        it('accepts a JPG image', () => {
            const file = new File(['image'], 'avatar.jpg', {
                type: 'image/jpg',
            })

            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
                avatar: file,
            })

            expect(result.success).toBe(true)
        })

        it('accepts a PNG image', () => {
            const file = new File(['image'], 'avatar.png', {
                type: 'image/png',
            })

            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
                avatar: file,
            })

            expect(result.success).toBe(true)
        })

        it('accepts a WebP image', () => {
            const file = new File(['image'], 'avatar.webp', {
                type: 'image/webp',
            })

            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
                avatar: file,
            })

            expect(result.success).toBe(true)
        })

        it('accepts an image with exactly 5MB', () => {
            const file = new File(
                [new Uint8Array(5 * 1024 * 1024)],
                'avatar.png',
                {
                    type: 'image/png',
                },
            )

            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
                avatar: file,
            })

            expect(result.success).toBe(true)
        })

        it('rejects an image larger than 5MB', () => {
            const file = new File(
                [new Uint8Array(5 * 1024 * 1024 + 1)],
                'avatar.png',
                {
                    type: 'image/png',
                },
            )

            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
                avatar: file,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) =>
                            issue.message === 'Image must be smaller than 5MB',
                    ),
                ).toBe(true)
            }
        })

        it('rejects an unsupported image format', () => {
            const file = new File(['image'], 'avatar.gif', {
                type: 'image/gif',
            })

            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Silva',
                email: 'gabriel@example.com',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
                avatar: file,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(
                    result.error.issues.some(
                        (issue) => issue.message === 'Invalid image format',
                    ),
                ).toBe(true)
            }
        })
    })

    describe('complete object', () => {
        it('accepts a valid user with all fields', () => {
            const avatar = new File(['image'], 'avatar.png', {
                type: 'image/png',
            })

            const result = baseUserSchema.safeParse({
                firstName: 'Gabriel',
                lastName: 'Veroneze',
                email: 'GABRIEL@EXAMPLE.COM',
                phone: '+5511987654321',
                company: 'Acme',
                department: 'Engineering',
                avatar,
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data).toMatchObject({
                    firstName: 'Gabriel',
                    lastName: 'Veroneze',
                    email: 'gabriel@example.com',
                    phone: '+5511987654321',
                    company: 'Acme',
                    department: 'Engineering',
                    avatar,
                })
            }
        })
    })
})

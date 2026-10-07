import { describe, expect, it } from 'vitest'
import { generalInformationSchema } from './general-information.schema'

const validData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'Administrator',
    phone: '+5511999999999',
    birthDate: '1990-01-01',
    organization: 'Acme Corporation',
    department: 'Engineering',
    address: 'Main Street, 123',
    city: 'São Paulo',
    country: 'Brazil',
    zipCode: '01000-000',
}

describe('general-information.schema', () => {
    it('accepts valid data', () => {
        const result = generalInformationSchema.safeParse(validData)

        expect(result.success).toBe(true)

        if (result.success) {
            expect(result.data).toEqual(validData)
        }
    })

    describe('firstName', () => {
        it.each([
            ['', 'First name must have at least 2 characters'],
            ['A', 'First name must have at least 2 characters'],
            ['A'.repeat(51), 'First name must have at most 50 characters'],
            ['John123', 'First name contains invalid characters'],
            ['John@Doe', 'First name contains invalid characters'],
        ])('rejects invalid value "%s"', (value, message) => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                firstName: value,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(message)
            }
        })

        it.each([
            'John',
            'Mary Jane',
            "O'Connor",
            'Jean-Luc',
            'João',
            'José',
            'Ana Maria',
        ])('accepts valid value "%s"', (value) => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                firstName: value,
            })

            expect(result.success).toBe(true)
        })

        it('trims surrounding whitespace', () => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                firstName: '  John  ',
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.firstName).toBe('John')
            }
        })
    })

    describe('lastName', () => {
        it.each([
            ['', 'Last name must have at least 2 characters'],
            ['D', 'Last name must have at least 2 characters'],
            ['D'.repeat(51), 'Last name must have at most 50 characters'],
            ['Doe123', 'Last name contains invalid characters'],
            ['Doe@Smith', 'Last name contains invalid characters'],
        ])('rejects invalid value "%s"', (value, message) => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                lastName: value,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(message)
            }
        })

        it.each([
            'Doe',
            'Mary Jane',
            "O'Connor",
            'Smith-Jones',
            'Gonçalves',
            'Müller',
        ])('accepts valid value "%s"', (value) => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                lastName: value,
            })

            expect(result.success).toBe(true)
        })

        it('trims surrounding whitespace', () => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                lastName: '  Doe  ',
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.lastName).toBe('Doe')
            }
        })
    })

    describe('email', () => {
        it.each([
            ['', 'Email is required'],
            ['   ', 'Email is required'],
            ['invalid-email', 'Invalid email format'],
            ['john@', 'Invalid email format'],
            ['@example.com', 'Invalid email format'],
        ])('rejects invalid value "%s"', (value, message) => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                email: value,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(message)
            }
        })

        it('rejects emails longer than 100 characters', () => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                email: `${'a'.repeat(92)}@test.com`,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Email must have at most 100 characters',
                )
            }
        })

        it('trims surrounding whitespace and converts the email to lowercase', () => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                email: '  JOHN.DOE@EXAMPLE.COM  ',
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.email).toBe('john.doe@example.com')
            }
        })

        it.each([
            'john@example.com',
            'john.doe@example.com',
            'john+test@example.com',
        ])('accepts valid email "%s"', (email) => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                email,
            })

            expect(result.success).toBe(true)
        })
    })

    describe('role', () => {
        it.each([
            ['', 'Role must have at least 2 characters'],
            ['A', 'Role must have at least 2 characters'],
            ['A'.repeat(101), 'Role must have at most 100 characters'],
        ])('rejects invalid value "%s"', (value, message) => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                role: value,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(message)
            }
        })

        it('trims surrounding whitespace', () => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                role: '  Administrator  ',
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.role).toBe('Administrator')
            }
        })
    })

    describe('phone', () => {
        it('rejects an empty phone number', () => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                phone: '',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe('Phone is required')
            }
        })

        it('rejects an invalid phone number', () => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                phone: '+5511',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Invalid phone number',
                )
            }
        })

        it('accepts a valid phone number', () => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                phone: '+5511999999999',
            })

            expect(result.success).toBe(true)
        })
    })

    describe('birthDate', () => {
        it('rejects an empty birth date', () => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                birthDate: '',
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(
                    'Birth date is required',
                )
            }
        })

        it('accepts a non-empty birth date', () => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                birthDate: '1990-01-01',
            })

            expect(result.success).toBe(true)
        })
    })

    describe('organization', () => {
        it.each([
            ['', 'Organization must have at least 2 characters'],
            ['A', 'Organization must have at least 2 characters'],
            ['A'.repeat(101), 'Organization must have at most 100 characters'],
        ])('rejects invalid value "%s"', (value, message) => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                organization: value,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(message)
            }
        })

        it('trims surrounding whitespace', () => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                organization: '  Acme  ',
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.organization).toBe('Acme')
            }
        })
    })

    describe('department', () => {
        it.each([
            ['', 'Department must have at least 2 characters'],
            ['A', 'Department must have at least 2 characters'],
            ['A'.repeat(101), 'Department must have at most 100 characters'],
        ])('rejects invalid value "%s"', (value, message) => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                department: value,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(message)
            }
        })

        it('trims surrounding whitespace', () => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                department: '  Engineering  ',
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.department).toBe('Engineering')
            }
        })
    })

    describe('address', () => {
        it.each([
            ['', 'Address must have at least 5 characters'],
            ['1234', 'Address must have at least 5 characters'],
            ['A'.repeat(201), 'Address must have at most 200 characters'],
        ])('rejects invalid value "%s"', (value, message) => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                address: value,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(message)
            }
        })

        it('trims surrounding whitespace', () => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                address: '  Main Street, 123  ',
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.address).toBe('Main Street, 123')
            }
        })
    })

    describe('city', () => {
        it.each([
            ['', 'City must have at least 2 characters'],
            ['A', 'City must have at least 2 characters'],
            ['A'.repeat(101), 'City must have at most 100 characters'],
        ])('rejects invalid value "%s"', (value, message) => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                city: value,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(message)
            }
        })

        it('trims surrounding whitespace', () => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                city: '  São Paulo  ',
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.city).toBe('São Paulo')
            }
        })
    })

    describe('country', () => {
        it.each([
            ['', 'Country must have at least 2 characters'],
            ['B', 'Country must have at least 2 characters'],
            ['A'.repeat(101), 'Country must have at most 100 characters'],
        ])('rejects invalid value "%s"', (value, message) => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                country: value,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(message)
            }
        })

        it('trims surrounding whitespace', () => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                country: '  Brazil  ',
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.country).toBe('Brazil')
            }
        })
    })

    describe('zipCode', () => {
        it.each([
            ['', 'ZIP code must have at least 3 characters'],
            ['12', 'ZIP code must have at least 3 characters'],
            ['A'.repeat(21), 'ZIP code must have at most 20 characters'],
        ])('rejects invalid value "%s"', (value, message) => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                zipCode: value,
            })

            expect(result.success).toBe(false)

            if (!result.success) {
                expect(result.error.issues[0].message).toBe(message)
            }
        })

        it('trims surrounding whitespace', () => {
            const result = generalInformationSchema.safeParse({
                ...validData,
                zipCode: '  01000-000  ',
            })

            expect(result.success).toBe(true)

            if (result.success) {
                expect(result.data.zipCode).toBe('01000-000')
            }
        })
    })

    it('rejects data when a required field is missing', () => {
        const { firstName: _firstName, ...dataWithoutFirstName } = validData

        const result = generalInformationSchema.safeParse(dataWithoutFirstName)

        expect(result.success).toBe(false)
    })
})

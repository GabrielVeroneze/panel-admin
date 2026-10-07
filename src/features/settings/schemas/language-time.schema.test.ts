import { describe, expect, it } from 'vitest'
import { languageTimeSchema } from './language-time.schema'

const validData = {
    language: 'English',
    timezone: 'America/Sao_Paulo',
}

describe('language-time.schema', () => {
    it('accepts valid data', () => {
        const result = languageTimeSchema.safeParse(validData)

        expect(result.success).toBe(true)

        if (result.success) {
            expect(result.data).toEqual(validData)
        }
    })

    it.each([
        ['language', 'Language is required'],
        ['timezone', 'Timezone is required'],
    ] as const)('rejects an empty %s', (field, message) => {
        const result = languageTimeSchema.safeParse({
            ...validData,
            [field]: '',
        })

        expect(result.success).toBe(false)

        if (!result.success) {
            expect(result.error.issues[0].message).toBe(message)
        }
    })

    it.each([
        ['language', 'Language is required'],
        ['timezone', 'Timezone is required'],
    ] as const)('rejects whitespace-only %s', (field, message) => {
        const result = languageTimeSchema.safeParse({
            ...validData,
            [field]: '   ',
        })

        expect(result.success).toBe(false)

        if (!result.success) {
            expect(result.error.issues[0].message).toBe(message)
        }
    })

    it('trims surrounding whitespace from language', () => {
        const result = languageTimeSchema.safeParse({
            ...validData,
            language: '  English  ',
        })

        expect(result.success).toBe(true)

        if (result.success) {
            expect(result.data.language).toBe('English')
        }
    })

    it('trims surrounding whitespace from timezone', () => {
        const result = languageTimeSchema.safeParse({
            ...validData,
            timezone: '  America/Sao_Paulo  ',
        })

        expect(result.success).toBe(true)

        if (result.success) {
            expect(result.data.timezone).toBe('America/Sao_Paulo')
        }
    })

    it('rejects data when language is missing', () => {
        const { language: _language, ...dataWithoutLanguage } = validData

        const result = languageTimeSchema.safeParse(dataWithoutLanguage)

        expect(result.success).toBe(false)
    })

    it('rejects data when timezone is missing', () => {
        const { timezone: _timezone, ...dataWithoutTimezone } = validData

        const result = languageTimeSchema.safeParse(dataWithoutTimezone)

        expect(result.success).toBe(false)
    })
})

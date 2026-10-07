import { describe, expect, it } from 'vitest'
import { languageOptions, timezoneOptions } from './languageTimeOptions'

describe('languageTimeOptions', () => {
    describe('languageOptions', () => {
        it('contains all available languages', () => {
            expect(languageOptions).toHaveLength(3)
        })

        it('contains the expected language options', () => {
            expect(languageOptions).toEqual([
                {
                    label: 'English',
                    value: 'en',
                },
                {
                    label: 'Português',
                    value: 'pt-BR',
                },
                {
                    label: 'Español',
                    value: 'es',
                },
            ])
        })

        it('has a unique value for each language', () => {
            const values = languageOptions.map((option) => option.value)

            expect(new Set(values).size).toBe(values.length)
        })

        it('has a non-empty label and value for every option', () => {
            languageOptions.forEach((option) => {
                expect(option.label).toBeTruthy()
                expect(option.value).toBeTruthy()
            })
        })
    })

    describe('timezoneOptions', () => {
        it('contains all available timezones', () => {
            expect(timezoneOptions).toHaveLength(3)
        })

        it('contains the expected timezone options', () => {
            expect(timezoneOptions).toEqual([
                {
                    label: '(UTC-03:00) São Paulo',
                    value: 'America/Sao_Paulo',
                },
                {
                    label: '(UTC-05:00) New York',
                    value: 'America/New_York',
                },
                {
                    label: '(UTC+00:00) London',
                    value: 'Europe/London',
                },
            ])
        })

        it('has a unique value for each timezone', () => {
            const values = timezoneOptions.map((option) => option.value)

            expect(new Set(values).size).toBe(values.length)
        })

        it('has a non-empty label and value for every option', () => {
            timezoneOptions.forEach((option) => {
                expect(option.label).toBeTruthy()
                expect(option.value).toBeTruthy()
            })
        })
    })
})

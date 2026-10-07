import { describe, expect, it } from 'vitest'
import { countryOptions } from './countryOptions'

describe('countryOptions', () => {
    it('contains all available countries', () => {
        expect(countryOptions).toHaveLength(8)
    })

    it('contains the expected country options', () => {
        expect(countryOptions).toEqual([
            {
                label: 'United States',
                value: 'US',
            },
            {
                label: 'Brazil',
                value: 'BR',
            },
            {
                label: 'Canada',
                value: 'CA',
            },
            {
                label: 'United Kingdom',
                value: 'GB',
            },
            {
                label: 'Germany',
                value: 'DE',
            },
            {
                label: 'France',
                value: 'FR',
            },
            {
                label: 'Spain',
                value: 'ES',
            },
            {
                label: 'Portugal',
                value: 'PT',
            },
        ])
    })

    it('has a unique value for each country', () => {
        const values = countryOptions.map((option) => option.value)

        expect(new Set(values).size).toBe(values.length)
    })

    it('has a non-empty label and value for every option', () => {
        countryOptions.forEach((option) => {
            expect(option.label).toBeTruthy()
            expect(option.value).toBeTruthy()
        })
    })
})

import { describe, expect, it } from 'vitest'
import {
    formatCountryTooltipLabel,
    formatSessionsTooltip,
    getSessionsData,
} from './sessions.utils'
import type { CountrySession } from '@/features/dashboard/types'

describe('sessions.utils', () => {
    describe('formatSessionsTooltip', () => {
        it('formats numeric values as compact numbers with one decimal place', () => {
            expect(formatSessionsTooltip!(12500, '', {} as never, 0, [])).toBe(
                '12.5k',
            )
        })

        it('returns non-numeric values unchanged', () => {
            expect(
                formatSessionsTooltip!(
                    '12.5k' as never,
                    '',
                    {} as never,
                    0,
                    [],
                ),
            ).toBe('12.5k')
        })
    })

    describe('formatCountryTooltipLabel', () => {
        it('returns the country name from the first payload item', () => {
            const payload = [
                {
                    payload: {
                        countryName: 'Brazil',
                    },
                },
            ] as never

            expect(formatCountryTooltipLabel!('', payload)).toBe('Brazil')
        })

        it('returns an empty string when the payload is empty', () => {
            expect(formatCountryTooltipLabel!('', [])).toBe('')
        })

        it('returns an empty string when the payload is undefined', () => {
            expect(formatCountryTooltipLabel!('', undefined as never)).toBe('')
        })

        it('returns an empty string when the first payload has no country name', () => {
            const payload = [
                {
                    payload: {},
                },
            ] as never

            expect(formatCountryTooltipLabel!('', payload)).toBe('')
        })
    })

    describe('getSessionsData', () => {
        const data: CountrySession[] = [
            {
                countryCode: 'BR',
                countryName: 'Brazil',
                sessions: 5000,
                previousWeek: 4500,
            },
            {
                countryCode: 'US',
                countryName: 'United States',
                sessions: 8000,
                previousWeek: 7000,
            },
            {
                countryCode: 'DE',
                countryName: 'Germany',
                sessions: 3000,
                previousWeek: 3200,
            },
        ]

        it('sorts countries by sessions in descending order', () => {
            const result = getSessionsData(data)

            expect(result.topCountries).toEqual([data[1], data[0], data[2]])
        })

        it('limits top countries to seven items', () => {
            const countries: CountrySession[] = Array.from(
                { length: 10 },
                (_, index) => ({
                    countryCode: `C${index}`,
                    countryName: `Country ${index}`,
                    sessions: index * 1000,
                    previousWeek: index * 900,
                }),
            )

            const result = getSessionsData(countries)

            expect(result.topCountries).toHaveLength(7)
            expect(
                result.topCountries.map((country) => country.countryCode),
            ).toEqual(['C9', 'C8', 'C7', 'C6', 'C5', 'C4', 'C3'])
        })

        it('creates a map with sessions indexed by country code', () => {
            const result = getSessionsData(data)

            expect(result.sessionsMap).toEqual(
                new Map([
                    ['BR', 5000],
                    ['US', 8000],
                    ['DE', 3000],
                ]),
            )
        })

        it('creates a map with previous week sessions indexed by country code', () => {
            const result = getSessionsData(data)

            expect(result.previousMap).toEqual(
                new Map([
                    ['BR', 4500],
                    ['US', 7000],
                    ['DE', 3200],
                ]),
            )
        })

        it('returns the highest sessions value as maxSessions', () => {
            const result = getSessionsData(data)

            expect(result.maxSessions).toBe(8000)
        })

        it('returns zero as maxSessions when the data is empty', () => {
            const result = getSessionsData([])

            expect(result.maxSessions).toBe(0)
        })

        it('does not mutate the original data when sorting countries', () => {
            const originalData = [...data]

            getSessionsData(data)

            expect(data).toEqual(originalData)
        })
    })
})

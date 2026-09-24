import { describe, expect, it } from 'vitest'
import { getCountryColor, getCountryMetrics } from './map.utils'

describe('map.utils', () => {
    describe('getCountryMetrics', () => {
        it('returns sessions and previous week values for a country', () => {
            const sessionsMap = new Map([['BR', 8000]])

            const previousMap = new Map([['BR', 7000]])

            expect(getCountryMetrics('BR', sessionsMap, previousMap)).toEqual({
                sessions: 8000,
                previous: 7000,
            })
        })

        it('returns zero for sessions when the country is not found', () => {
            const sessionsMap = new Map([['BR', 8000]])

            const previousMap = new Map([['BR', 7000]])

            expect(getCountryMetrics('US', sessionsMap, previousMap)).toEqual({
                sessions: 0,
                previous: 0,
            })
        })

        it('returns zero independently for missing values in each map', () => {
            const sessionsMap = new Map([['BR', 8000]])

            const previousMap = new Map<string, number>()

            expect(getCountryMetrics('BR', sessionsMap, previousMap)).toEqual({
                sessions: 8000,
                previous: 0,
            })

            expect(getCountryMetrics('US', sessionsMap, previousMap)).toEqual({
                sessions: 0,
                previous: 0,
            })
        })
    })

    describe('getCountryColor', () => {
        const sessionsMap = new Map([
            ['BR', 1000],
            ['US', 750],
            ['DE', 500],
            ['FR', 250],
            ['JP', 100],
        ])

        const maxSessions = 1000

        it('returns gray when the country has no sessions', () => {
            expect(getCountryColor('CA', sessionsMap, maxSessions)).toBe(
                '#d1d5db',
            )
        })

        it('returns the darkest blue when intensity is above 75%', () => {
            expect(getCountryColor('BR', sessionsMap, maxSessions)).toBe(
                '#1a56db',
            )
        })

        it('returns the second blue when intensity is above 50%', () => {
            expect(getCountryColor('US', sessionsMap, maxSessions)).toBe(
                '#3f83f8',
            )
        })

        it('returns the third blue when intensity is above 25%', () => {
            expect(getCountryColor('DE', sessionsMap, maxSessions)).toBe(
                '#76a9fa',
            )
        })

        it('returns the lightest blue when intensity is 25% or below', () => {
            expect(getCountryColor('FR', sessionsMap, maxSessions)).toBe(
                '#a4cafe',
            )

            expect(getCountryColor('JP', sessionsMap, maxSessions)).toBe(
                '#a4cafe',
            )
        })

        it('uses the lightest blue when intensity is exactly 50%', () => {
            expect(getCountryColor('DE', sessionsMap, 1000)).toBe('#76a9fa')
        })

        it('uses the second blue when intensity is exactly 75%', () => {
            expect(getCountryColor('US', sessionsMap, 1000)).toBe('#3f83f8')
        })
    })
})

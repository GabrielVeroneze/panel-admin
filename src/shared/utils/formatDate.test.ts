import { describe, expect, it } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
    describe('default locale', () => {
        it('formats the date using the en-US locale by default', () => {
            expect(formatDate('2026-01-15T12:00:00.000Z')).toBe('Jan 15, 2026')
        })
    })

    describe('custom locale', () => {
        it('formats the date using the provided locale', () => {
            expect(formatDate('2026-01-15T12:00:00.000Z', 'pt-BR')).toBe(
                '15 de jan. de 2026',
            )
        })

        it('formats the date using the provided locale with another date format', () => {
            expect(formatDate('2026-07-04T12:00:00.000Z', 'en-GB')).toBe(
                '4 Jul 2026',
            )
        })
    })

    describe('date values', () => {
        it('formats single-digit days correctly', () => {
            expect(formatDate('2026-03-05T12:00:00.000Z')).toBe('Mar 5, 2026')
        })

        it('formats dates from different months correctly', () => {
            expect(formatDate('2026-11-21T12:00:00.000Z')).toBe('Nov 21, 2026')
        })
    })
})

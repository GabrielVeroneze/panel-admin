import { afterEach, describe, expect, it, vi } from 'vitest'
import { formatRelativeTime } from './formatRelativeTime'

describe('formatRelativeTime', () => {
    const now = new Date('2026-08-20T12:00:00.000Z').getTime()

    afterEach(() => {
        vi.restoreAllMocks()
    })

    describe('relative time', () => {
        it.each([
            ['1 second in the future', 1, 'in 1 second'],
            ['30 seconds in the future', 30, 'in 1 minute'],
            ['1 minute in the future', 60, 'in 1 minute'],
            ['5 minutes in the future', 5 * 60, 'in 5 minutes'],
            ['1 hour in the future', 60 * 60, 'in 1 hour'],
            ['3 hours in the future', 3 * 60 * 60, 'in 3 hours'],
            ['1 day in the future', 24 * 60 * 60, 'tomorrow'],
            ['2 days in the future', 2 * 24 * 60 * 60, 'in 2 days'],
            ['1 week in the future', 7 * 24 * 60 * 60, 'next week'],
            ['2 weeks in the future', 2 * 7 * 24 * 60 * 60, 'in 2 weeks'],
            ['1 month in the future', 30 * 24 * 60 * 60, 'next month'],
            ['2 months in the future', 2 * 30 * 24 * 60 * 60, 'in 2 months'],
            ['1 year in the future', 365 * 24 * 60 * 60, 'next year'],
            ['2 years in the future', 2 * 365 * 24 * 60 * 60, 'in 2 years'],
        ])('%s', (_, seconds, expected) => {
            vi.spyOn(Date, 'now').mockReturnValue(now)

            const date = new Date(now + seconds * 1000).toISOString()

            expect(formatRelativeTime(date)).toBe(expected)
        })

        it.each([
            ['1 second in the past', -1, '1 second ago'],
            ['30 seconds in the past', -30, '30 seconds ago'],
            ['1 minute in the past', -60, '1 minute ago'],
            ['5 minutes in the past', -5 * 60, '5 minutes ago'],
            ['1 hour in the past', -60 * 60, '1 hour ago'],
            ['3 hours in the past', -3 * 60 * 60, '3 hours ago'],
            ['1 day in the past', -24 * 60 * 60, 'yesterday'],
            ['2 days in the past', -2 * 24 * 60 * 60, '2 days ago'],
            ['1 week in the past', -7 * 24 * 60 * 60, 'last week'],
            ['2 weeks in the past', -2 * 7 * 24 * 60 * 60, '2 weeks ago'],
            ['1 month in the past', -30 * 24 * 60 * 60, 'last month'],
            ['2 months in the past', -2 * 30 * 24 * 60 * 60, '2 months ago'],
            ['1 year in the past', -365 * 24 * 60 * 60, 'last year'],
            ['2 years in the past', -2 * 365 * 24 * 60 * 60, '2 years ago'],
        ])('%s', (_, seconds, expected) => {
            vi.spyOn(Date, 'now').mockReturnValue(now)

            const date = new Date(now + seconds * 1000).toISOString()

            expect(formatRelativeTime(date)).toBe(expected)
        })
    })

    describe('just now', () => {
        it('returns "in 1 second" when the difference is 500 milliseconds', () => {
            vi.spyOn(Date, 'now').mockReturnValue(now)

            const date = new Date(now + 500).toISOString()

            expect(formatRelativeTime(date)).toBe('in 1 second')
        })
    })

    describe('custom locale', () => {
        it('formats the relative time using the provided locale', () => {
            vi.spyOn(Date, 'now').mockReturnValue(now)

            const date = new Date(now + 60 * 1000).toISOString()

            expect(formatRelativeTime(date, 'pt')).toBe('em 1 minuto')
        })
    })

    describe('rounding', () => {
        it('rounds the difference to the nearest second', () => {
            vi.spyOn(Date, 'now').mockReturnValue(now)

            const date = new Date(now + 1500).toISOString()

            expect(formatRelativeTime(date)).toBe('in 2 seconds')
        })
    })
})

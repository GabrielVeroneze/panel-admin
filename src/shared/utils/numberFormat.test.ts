import { describe, expect, it } from 'vitest'
import {
    formatChangePercent,
    formatCompactNumber,
    formatCurrency,
    formatNumber,
    formatPercent,
} from './numberFormat'

describe('numberFormat', () => {
    describe('formatNumber', () => {
        it.each([
            [0, '0'],
            [123, '123'],
            [1234, '1,234'],
            [1234567, '1,234,567'],
        ])('formats %s using the en-US locale', (value, expected) => {
            expect(formatNumber(value)).toBe(expected)
        })

        it('formats decimal values using the default of zero decimals', () => {
            expect(formatNumber(1234.56)).toBe('1,235')
        })

        it.each([
            [1234.5, 1, '1,234.5'],
            [1234.56, 2, '1,234.56'],
            [1234.567, 2, '1,234.57'],
        ])('formats %s with %s decimal places', (value, decimals, expected) => {
            expect(formatNumber(value, { decimals })).toBe(expected)
        })

        it('accepts options without decimals', () => {
            expect(formatNumber(1234, {})).toBe('1,234')
        })

        it('formats negative numbers correctly', () => {
            expect(formatNumber(-1234.56, { decimals: 2 })).toBe('-1,234.56')
        })
    })

    describe('formatCompactNumber', () => {
        it.each([
            [1000, '1k'],
            [5000, '5k'],
            [12500, '13k'],
            [100000, '100k'],
        ])('formats %s using the default options', (value, expected) => {
            expect(formatCompactNumber(value)).toBe(expected)
        })

        it.each([
            [12500, 1, '12.5k'],
            [12500, 2, '12.50k'],
            [123456, 2, '123.46k'],
        ])('formats %s with %s decimal places', (value, decimals, expected) => {
            expect(formatCompactNumber(value, { decimals })).toBe(expected)
        })

        it('uses a custom suffix', () => {
            expect(
                formatCompactNumber(12500, {
                    decimals: 1,
                    suffix: 'K',
                }),
            ).toBe('12.5K')
        })

        it('uses a custom suffix without decimals', () => {
            expect(
                formatCompactNumber(25000, {
                    suffix: ' thousand',
                }),
            ).toBe('25 thousand')
        })

        it('formats values below one thousand', () => {
            expect(formatCompactNumber(500)).toBe('1k')
        })
    })

    describe('formatCurrency', () => {
        it.each([
            [0, '$0'],
            [100, '$100'],
            [1234, '$1,234'],
            [1234567, '$1,234,567'],
        ])('formats %s as USD using standard notation', (value, expected) => {
            expect(formatCurrency(value)).toBe(expected)
        })

        it.each([
            [1234.5, 1, '$1,234.5'],
            [1234.56, 2, '$1,234.56'],
        ])('formats %s with %s decimal places', (value, decimals, expected) => {
            expect(formatCurrency(value, { decimals })).toBe(expected)
        })

        it.each([
            [1000, '$1K'],
            [1000000, '$1M'],
            [2500000, '$2.5M'],
        ])('formats %s using compact notation', (value, expected) => {
            expect(
                formatCurrency(value, {
                    compact: true,
                    decimals: value === 2500000 ? 1 : 0,
                }),
            ).toBe(expected)
        })

        it('uses standard notation by default', () => {
            expect(formatCurrency(1500)).toBe('$1,500')
        })

        it('uses compact notation when compact is true', () => {
            expect(
                formatCurrency(1500, {
                    compact: true,
                }),
            ).toBe('$2K')
        })

        it('formats negative currency values correctly', () => {
            expect(formatCurrency(-1234.56, { decimals: 2 })).toBe('-$1,234.56')
        })
    })

    describe('formatChangePercent', () => {
        it.each([
            [110, 100, '10%'],
            [90, 100, '-10%'],
            [100, 100, '0%'],
            [150, 100, '50%'],
            [50, 100, '-50%'],
        ])(
            'formats the change from %s to %s',
            (current, previous, expected) => {
                expect(formatChangePercent(current, previous)).toBe(expected)
            },
        )

        it.each([
            [105, 100, '5%'],
            [104, 100, '4%'],
            [106, 100, '6%'],
        ])(
            'rounds the percentage change from %s to %s',
            (current, previous, expected) => {
                expect(formatChangePercent(current, previous)).toBe(expected)
            },
        )

        it('returns 0% when the previous value is zero', () => {
            expect(formatChangePercent(100, 0)).toBe('0%')
        })

        it('returns 0% when the previous value is negative zero', () => {
            expect(formatChangePercent(100, -0)).toBe('0%')
        })
    })

    describe('formatPercent', () => {
        it.each([
            [0, '0%'],
            [10, '10%'],
            [50, '50%'],
            [100, '100%'],
        ])(
            'formats %s using the default of zero decimals',
            (value, expected) => {
                expect(formatPercent(value)).toBe(expected)
            },
        )

        it.each([
            [12.5, 1, '12.5%'],
            [12.5, 2, '12.50%'],
            [12.345, 2, '12.35%'],
        ])('formats %s with %s decimal places', (value, decimals, expected) => {
            expect(formatPercent(value, { decimals })).toBe(expected)
        })

        it('accepts options without decimals', () => {
            expect(formatPercent(25, {})).toBe('25%')
        })

        it('formats negative percentages correctly', () => {
            expect(formatPercent(-12.5, { decimals: 1 })).toBe('-12.5%')
        })
    })
})

import { describe, expect, it } from 'vitest'
import { chartConfig } from './salesChart.config'

describe('chartConfig', () => {
    it('contains the mobile configuration', () => {
        expect(chartConfig.mobile).toEqual({
            margin: {
                top: 5,
                right: 0,
                bottom: 24,
                left: 0,
            },
            padding: {
                left: 15,
                right: 20,
            },
            xAxisAngle: -45,
            showYAxis: false,
        })
    })

    it('contains the tablet configuration', () => {
        expect(chartConfig.tablet).toEqual({
            margin: {
                top: 0,
                right: 0,
                bottom: 18,
                left: 0,
            },
            padding: {
                left: 0,
                right: 20,
            },
            xAxisAngle: -45,
            showYAxis: true,
        })
    })

    it('contains the desktop configuration', () => {
        expect(chartConfig.desktop).toEqual({
            margin: {
                top: 0,
                right: 0,
                bottom: 18,
                left: 0,
            },
            padding: {
                left: 0,
                right: 20,
            },
            xAxisAngle: 0,
            showYAxis: true,
        })
    })
})

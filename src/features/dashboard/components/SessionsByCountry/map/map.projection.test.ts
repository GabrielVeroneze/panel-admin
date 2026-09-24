import { describe, expect, it } from 'vitest'
import { path, projection } from './map.projection'

describe('map projection', () => {
    describe('projection', () => {
        it('uses the expected scale', () => {
            expect(projection.scale()).toBe(150)
        })

        it('uses the expected translation', () => {
            expect(projection.translate()).toEqual([400, 250])
        })

        it('projects geographic coordinates to screen coordinates', () => {
            const result = projection([0, 0])

            expect(result).toBeDefined()
            expect(result).toHaveLength(2)
            expect(result?.[0]).toBeCloseTo(400)
            expect(result?.[1]).toBeCloseTo(250)
        })
    })

    describe('path', () => {
        it('generates an SVG path from geographic geometry', () => {
            const geometry = {
                type: 'Polygon' as const,
                coordinates: [
                    [
                        [-10, -10],
                        [10, -10],
                        [10, 10],
                        [-10, 10],
                        [-10, -10],
                    ],
                ],
            }

            const result = path(geometry)

            expect(result).toBeDefined()
            expect(result).toMatch(/^M/)
        })
    })
})

import { describe, expect, it } from 'vitest'
import { mapFeatures } from './map.features'

describe('mapFeatures', () => {
    it('exports an array of map features', () => {
        expect(Array.isArray(mapFeatures)).toBe(true)
    })

    it('exports the features from the world GeoJSON data', () => {
        expect(mapFeatures.length).toBeGreaterThan(0)
    })

    it('contains valid GeoJSON features', () => {
        expect(mapFeatures.every((feature) => feature.type === 'Feature')).toBe(
            true,
        )
    })
})

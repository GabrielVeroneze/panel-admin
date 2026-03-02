import { maxSessions, sessionsMap } from '../sessions.data'
import { getColor } from '../sessions.utils'
import type { Feature } from 'geojson'

export const geoJsonStyle  = (feature?: Feature) => {
    if (!feature) {
        return {
            fillColor: '#d1d5db',
            weight: 1,
            color: '#ffffff',
            fillOpacity: 1,
        }
    }

    const isoCode = feature.properties?.iso_a2
    const sessions = sessionsMap.get(isoCode) ?? 0

    return {
        fillColor: getColor(sessions, maxSessions),
        weight: 1,
        color: '#ffffff',
        fillOpacity: 1,
    }
}

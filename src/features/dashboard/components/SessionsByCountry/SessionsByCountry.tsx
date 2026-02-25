import { MapContainer, GeoJSON } from 'react-leaflet'
import type { Feature } from 'geojson'
import worldGeoJson from './world.geo.json'
import styles from './SessionsByCountry.module.scss'

const data = [
    { countryCode: 'US', sessions: 35000 },
    { countryCode: 'CA', sessions: 25000 },
    { countryCode: 'MX', sessions: 20000 },
    { countryCode: 'CO', sessions: 5000 },
    { countryCode: 'PE', sessions: 15000 },
    { countryCode: 'BO', sessions: 15000 },
    { countryCode: 'ES', sessions: 10000 },
    { countryCode: 'FR', sessions: 10000 },
    { countryCode: 'IT', sessions: 10000 },
    { countryCode: 'RU', sessions: 5000 },
    { countryCode: 'IR', sessions: 5000 },
    { countryCode: 'PK', sessions: 5000 },
    { countryCode: 'IN', sessions: 15000 },
    { countryCode: 'CN', sessions: 15000 },
    { countryCode: 'MY', sessions: 5000 },
    { countryCode: 'ID', sessions: 20000 },
    { countryCode: 'AU', sessions: 20000 },
    { countryCode: 'SD', sessions: 5000 },
    { countryCode: 'SS', sessions: 5000 },
    { countryCode: 'AO', sessions: 5000 },
]

export const SessionsByCountry = () => {
    const maxSessions = Math.max(...data.map((c) => c.sessions), 0)

    const sessionsMap = new Map(data.map((c) => [c.countryCode, c.sessions]))

    const getColor = (value: number, max: number) => {
        if (!value) return '#d1d5db'

        const intensity = value / max

        if (intensity > 0.75) return '#1a56db'
        if (intensity > 0.5) return '#3f83f8'
        if (intensity > 0.25) return '#76a9fa'

        return '#a4cafe'
    }

    const style = (feature: Feature) => {
        const isoCode = feature.properties?.iso_a2
        const sessions = sessionsMap.get(isoCode) ?? 0

        return {
            fillColor: getColor(sessions, maxSessions),
            weight: 1,
            color: '#ffffff',
            fillOpacity: 1,
        }
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.title}>Sessions by Country</h2>
                <strong className={styles.value}>United States</strong>
            </header>
            <div className={styles.mapContainer}>
                <MapContainer
                    className={styles.map}
                    center={[25, 0]}
                    zoom={1}
                    dragging={false}
                    zoomControl={false}
                    attributionControl={false}
                    doubleClickZoom={false}
                    keyboard={false}
                >
                    <GeoJSON data={worldGeoJson as any} style={style} />
                </MapContainer>
            </div>
            <div className={styles.list}>list</div>
        </div>
    )
}

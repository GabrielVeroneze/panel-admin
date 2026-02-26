import { MapContainer, GeoJSON } from 'react-leaflet'
import {
    Bar,
    BarChart,
    Tooltip,
    YAxis,
    type YAxisTickContentProps,
} from 'recharts'
import { AU, CA, FR, IN, IT, US } from '@/shared/assets/flags'
import type { Feature, FeatureCollection } from 'geojson'
import L from 'leaflet'
import worldGeoJson from './world.geo.json'
import styles from './SessionsByCountry.module.scss'
import 'proj4leaflet'

const robinsonCrs = new L.Proj.CRS(
    'ESRI:54030',
    '+proj=robin +lon_0=0 +x_0=0 +y_0=0 +units=m +no_defs',
    {
        origin: [0, 0],
        resolutions: [65536, 32768, 16384, 8192, 4096, 2048, 1024, 512, 256],
    },
)

const flagMap: Record<string, React.ElementType> = {
    'United States': US,
    Canada: CA,
    France: FR,
    Italy: IT,
    Australia: AU,
    India: IN,
}

const dataMap = [
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

const dataChart = [
    { country: 'United States', value: 40000 },
    { country: 'Canada', value: 30000 },
    { country: 'France', value: 25000 },
    { country: 'Italy', value: 20000 },
    { country: 'Australia', value: 18000 },
    { country: 'India', value: 15000 },
]

const CustomYAxisTick = ({ x, y, payload }: YAxisTickContentProps) => {
    const Flag = flagMap[payload.value]

    return (
        <g transform={`translate(${Number(x) - 100}, ${Number(y) - 6.5})`}>
            {Flag && <Flag height={14} width={20} />}
            <text
                x={32}
                y={11}
                textAnchor="start"
                fill="#18181b"
                fontSize={12}
                fontWeight={500}
            >
                {payload.value}
            </text>
        </g>
    )
}

export const SessionsByCountry = () => {
    const maxSessions = Math.max(...dataMap.map((c) => c.sessions), 0)

    const sessionsMap = new Map(dataMap.map((c) => [c.countryCode, c.sessions]))

    const getColor = (value: number, max: number) => {
        if (!value) return '#d1d5db'

        const intensity = value / max

        if (intensity > 0.75) return '#1a56db'
        if (intensity > 0.5) return '#3f83f8'
        if (intensity > 0.25) return '#76a9fa'

        return '#a4cafe'
    }

    const style = (feature?: Feature) => {
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

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.title}>Sessions by Country</h2>
                <strong className={styles.value}>United States</strong>
            </header>
            <div className={styles.mapContainer}>
                <MapContainer
                    className={styles.map}
                    crs={robinsonCrs}
                    center={[10, 15]}
                    zoom={0.2}
                    zoomSnap={0}
                    zoomControl={false}
                    dragging={false}
                    doubleClickZoom={false}
                    scrollWheelZoom={false}
                    attributionControl={false}
                >
                    <GeoJSON
                        data={worldGeoJson as FeatureCollection}
                        style={style}
                    />
                </MapContainer>
            </div>
            <div className={styles.chartContainer}>
                <BarChart
                    className={styles.chart}
                    layout="vertical"
                    data={dataChart}
                    barSize={16}
                    responsive
                    margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <YAxis
                        type="category"
                        dataKey="country"
                        tick={CustomYAxisTick}
                        axisLine={false}
                        tickLine={false}
                        tickMargin={46}
                        width={152}
                    />
                    <Tooltip cursor={false} />
                    <Bar
                        dataKey="value"
                        name="Value"
                        fill="#1c64f2"
                        radius={4}
                        background={{ fill: '#f4f4f5', radius: 4 }}
                    />
                </BarChart>
            </div>
        </div>
    )
}

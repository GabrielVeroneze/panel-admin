import { renderToString } from 'react-dom/server'
import { MapContainer, GeoJSON } from 'react-leaflet'
import {
    Bar,
    BarChart,
    Tooltip as RechartsTooltip,
    XAxis,
    YAxis,
    type TooltipProps,
    type YAxisTickContentProps,
} from 'recharts'
import { formatChangePercent, formatCompactNumber } from '@/shared/utils'
import { ChartTooltip, Tooltip } from '@/shared/components'
import type { Feature, FeatureCollection } from 'geojson'
import * as Flags from '@/shared/assets/flags'
import L from 'leaflet'
import worldGeoJson from './world.geo.json'
import styles from './SessionsByCountry.module.scss'
import 'proj4leaflet'
import 'leaflet/dist/leaflet.css'

type FlagKey = keyof typeof Flags

const robinsonCrs = new L.Proj.CRS(
    'ESRI:54030',
    '+proj=robin +lon_0=0 +x_0=0 +y_0=0 +units=m +no_defs',
    {
        origin: [0, 0],
        resolutions: [65536, 32768, 16384, 8192, 4096, 2048, 1024, 512, 256],
    },
)

const data = [
    {
        countryCode: 'US',
        countryName: 'United States',
        sessions: 40000,
        previousWeek: 30000,
    },
    {
        countryCode: 'CA',
        countryName: 'Canada',
        sessions: 30000,
        previousWeek: 20000,
    },
    {
        countryCode: 'MX',
        countryName: 'Mexico',
        sessions: 20000,
        previousWeek: 18000,
    },
    {
        countryCode: 'CO',
        countryName: 'Colombia',
        sessions: 5000,
        previousWeek: 4000,
    },
    {
        countryCode: 'PE',
        countryName: 'Peru',
        sessions: 15000,
        previousWeek: 12000,
    },
    {
        countryCode: 'BO',
        countryName: 'Bolivia',
        sessions: 15000,
        previousWeek: 13000,
    },
    {
        countryCode: 'ES',
        countryName: 'Spain',
        sessions: 10000,
        previousWeek: 9000,
    },
    {
        countryCode: 'FR',
        countryName: 'France',
        sessions: 25000,
        previousWeek: 8000,
    },
    {
        countryCode: 'IT',
        countryName: 'Italy',
        sessions: 20000,
        previousWeek: 9500,
    },
    {
        countryCode: 'RU',
        countryName: 'Russia',
        sessions: 5000,
        previousWeek: 6000,
    },
    {
        countryCode: 'IR',
        countryName: 'Iran',
        sessions: 5000,
        previousWeek: 4000,
    },
    {
        countryCode: 'PK',
        countryName: 'Pakistan',
        sessions: 5000,
        previousWeek: 4500,
    },
    {
        countryCode: 'IN',
        countryName: 'India',
        sessions: 15000,
        previousWeek: 12000,
    },
    {
        countryCode: 'CN',
        countryName: 'China',
        sessions: 15000,
        previousWeek: 14000,
    },
    {
        countryCode: 'MY',
        countryName: 'Malaysia',
        sessions: 5000,
        previousWeek: 4800,
    },
    {
        countryCode: 'ID',
        countryName: 'Indonesia',
        sessions: 15000,
        previousWeek: 18000,
    },
    {
        countryCode: 'AU',
        countryName: 'Australia',
        sessions: 18000,
        previousWeek: 17000,
    },
    {
        countryCode: 'SD',
        countryName: 'Sudan',
        sessions: 5000,
        previousWeek: 4000,
    },
    {
        countryCode: 'SS',
        countryName: 'South Sudan',
        sessions: 5000,
        previousWeek: 4500,
    },
    {
        countryCode: 'AO',
        countryName: 'Angola',
        sessions: 5000,
        previousWeek: 4200,
    },
]

const topCountries = [...data]
    .sort((a, b) => b.sessions - a.sessions)
    .slice(0, 6)

const CustomYAxisTick = ({
    x,
    y,
    payload,
    index,
    tickFormatter,
}: YAxisTickContentProps) => {
    const isoCode = payload.value

    const Flag = Flags[isoCode as FlagKey]

    const label = tickFormatter
        ? tickFormatter(payload.value, index)
        : payload.value

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
                {label}
            </text>
        </g>
    )
}

export const SessionsByCountry = () => {
    const maxSessions = Math.max(...data.map((c) => c.sessions), 0)

    const sessionsMap = new Map(data.map((c) => [c.countryCode, c.sessions]))

    const previousMap = new Map(
        data.map((c) => [c.countryCode, c.previousWeek]),
    )

    const onEachFeature = (feature: Feature, layer: L.Layer) => {
        const isoCode = feature.properties?.iso_a2
        const countryName = feature.properties?.name
        const sessions = sessionsMap.get(isoCode) ?? 0
        const previous = previousMap.get(isoCode) ?? 0

        const Flag = Flags[isoCode as FlagKey]

        const tooltipHtml = renderToString(
            <Tooltip
                showArrow
                title={
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                        }}
                    >
                        {Flag && <Flag height={12} width={18} />}
                        <span>{countryName}</span>
                    </div>
                }
                items={[
                    {
                        name: 'Visitors',
                        value: formatCompactNumber(sessions, { decimals: 1 }),
                    },
                    {
                        name: 'Change',
                        value: formatChangePercent(sessions, previous),
                    },
                ]}
            />,
        )

        layer.bindTooltip(tooltipHtml, {
            sticky: true,
            direction: 'top',
        })
    }

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

    const formatTooltip: TooltipProps<number, string>['formatter'] = (value) =>
        value ? formatCompactNumber(value, { decimals: 1 }) : ''

    const formatTooltipLabel: TooltipProps<number, string>['labelFormatter'] = (
        _label,
        payload,
    ) => {
        return payload[0].payload.countryName
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
                        onEachFeature={onEachFeature}
                        style={style}
                    />
                </MapContainer>
            </div>
            <div className={styles.chartContainer}>
                <BarChart
                    className={styles.chart}
                    layout="vertical"
                    data={topCountries}
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
                        dataKey="countryCode"
                        tick={CustomYAxisTick}
                        tickFormatter={(_value, index) =>
                            topCountries[index].countryName
                        }
                        axisLine={false}
                        tickLine={false}
                        tickMargin={46}
                        width={152}
                    />
                    <XAxis type="number" hide />
                    <RechartsTooltip
                        content={ChartTooltip}
                        labelFormatter={formatTooltipLabel}
                        formatter={formatTooltip}
                        cursor={false}
                    />
                    <Bar
                        dataKey="sessions"
                        name="Sessions"
                        fill="#1c64f2"
                        radius={4}
                        background={{ fill: '#f4f4f5', radius: 4 }}
                    />
                </BarChart>
            </div>
        </div>
    )
}

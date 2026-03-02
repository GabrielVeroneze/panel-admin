import { MapContainer, GeoJSON } from 'react-leaflet'
import {
    Bar,
    BarChart,
    Tooltip as RechartsTooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { ChartTooltip, Tooltip } from '@/shared/components'
import type { Feature, FeatureCollection } from 'geojson'
import worldGeoJson from './world.geo.json'
import styles from './SessionsByCountry.module.scss'

export const SessionsByCountry = () => {

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

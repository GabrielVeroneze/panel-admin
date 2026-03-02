import { SessionsMap } from './map/SessionsMap'
import { SessionsChart } from './chart/SessionsChart'
import { topCountries } from './sessions.data'
import styles from './SessionsByCountry.module.scss'

export const SessionsByCountry = () => {
    const topCountry = topCountries[0]

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2 className={styles.title}>Sessions by Country</h2>
                <strong className={styles.value}>
                    {topCountry.countryName}
                </strong>
            </header>
            <div className={styles.mapContainer}>
                <SessionsMap className={styles.map} />
            </div>
            <div className={styles.chartContainer}>
                <SessionsChart className={styles.chart} />
            </div>
        </div>
    )
}

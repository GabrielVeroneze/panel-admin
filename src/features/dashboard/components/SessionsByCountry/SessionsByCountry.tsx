import { EmptyState } from '@/shared/components'
import { ExclamationCircleIcon } from '@/shared/assets/icons'
import { SessionsMap } from './map/SessionsMap'
import { SessionsChart } from './chart/SessionsChart'
import { SessionsByCountrySkeleton } from './SessionsByCountrySkeleton'
import { getSessionsData } from './sessions.utils'
import type { CountrySession } from '@/features/dashboard/types'
import styles from './SessionsByCountry.module.scss'

type SessionsByCountryProps = {
    data?: CountrySession[]
    loading?: boolean
}

export const SessionsByCountry = ({
    data,
    loading,
}: SessionsByCountryProps) => {
    if (loading) return <SessionsByCountrySkeleton />

    if (!data) {
        return (
            <EmptyState
                icon={<ExclamationCircleIcon />}
                title="No session data"
                description="No country sessions available."
            />
        )
    }

    const { topCountries, sessionsMap, previousMap, maxSessions } =
        getSessionsData(data)

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
                <SessionsMap
                    className={styles.map}
                    sessionsMap={sessionsMap}
                    previousMap={previousMap}
                    maxSessions={maxSessions}
                />
            </div>
            <div className={styles.chartContainer}>
                <SessionsChart
                    className={styles.chart}
                    topCountries={topCountries}
                />
            </div>
        </div>
    )
}

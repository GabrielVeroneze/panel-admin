import { Skeleton } from '@/shared/components'
import styles from './SessionsByCountry.module.scss'

export const SessionsByCountrySkeleton = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Skeleton width={140} height={18} />
                <Skeleton width={150} height={28} />
            </header>
            <div className={styles.mapContainer}>
                <Skeleton height={275} />
            </div>
            <div className={styles.chartContainer}>
                <Skeleton height={242} />
            </div>
        </div>
    )
}

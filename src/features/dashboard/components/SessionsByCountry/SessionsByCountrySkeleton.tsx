import { Skeleton } from '@/shared/components'
import clsx from 'clsx'
import styles from './SessionsByCountry.module.scss'

export const SessionsByCountrySkeleton = () => {
    return (
        <div className={clsx(styles.container, styles.skeleton)}>
            <header className={styles.header}>
                <Skeleton className={styles.titleSkeleton} />
                <Skeleton className={styles.valueSkeleton} />
            </header>
            <div className={styles.mapContainer}>
                <Skeleton className={styles.mapSkeleton} />
            </div>
            <div className={styles.chartContainer}>
                <Skeleton className={styles.chartSkeleton} />
            </div>
        </div>
    )
}

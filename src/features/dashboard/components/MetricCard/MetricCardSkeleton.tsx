import { Skeleton } from '@/shared/components'
import clsx from 'clsx'
import styles from './MetricCard.module.scss'

export const MetricCardSkeleton = () => {
    return (
        <div className={clsx(styles.container, styles.skeleton)}>
            <header className={styles.header}>
                <div className={styles.titleWrapper}>
                    <Skeleton className={styles.titleSkeleton} />
                    <Skeleton className={styles.valueSkeleton} />
                </div>
                <Skeleton className={styles.variationSkeleton} />
            </header>
            <div className={styles.chartContainer}>
                <Skeleton className={styles.chartSkeleton} />
            </div>
        </div>
    )
}

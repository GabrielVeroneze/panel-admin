import { Skeleton } from '@/shared/components'
import clsx from 'clsx'
import styles from './SalesChart.module.scss'

export const SalesChartSkeleton = () => {
    return (
        <div className={clsx(styles.container, styles.skeleton)}>
            <header className={styles.header}>
                <div className={styles.titleWrapper}>
                    <Skeleton className={styles.titleSkeleton} />
                    <Skeleton className={styles.iconSkeleton} />
                </div>
                <div className={styles.groupSkeleton}>
                    <Skeleton className={styles.buttonSkeleton} />
                    <Skeleton className={styles.buttonSkeleton} />
                    <Skeleton className={styles.buttonSkeleton} />
                </div>
            </header>
            <div className={styles.chartContainer}>
                <Skeleton className={styles.chart} />
            </div>
        </div>
    )
}

import { Skeleton } from '@/shared/components'
import styles from './MetricCard.module.scss'

export const MetricCardSkeleton = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleWrapper}>
                    <Skeleton width={120} height={18} />
                    <Skeleton width={90} height={28} />
                </div>
                <Skeleton width={55} height={18} />
            </header>
            <div className={styles.chartContainer}>
                <Skeleton height={245} />
            </div>
        </div>
    )
}

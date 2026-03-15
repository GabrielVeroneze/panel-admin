import { Skeleton } from '@/shared/components'
import styles from './SalesChart.module.scss'

export const SalesChartSkeleton = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.titleWrapper}>
                    <Skeleton width={50} height={20} />
                    <Skeleton width={22} height={22} />
                </div>
                <div style={{ display: 'flex' }}>
                    <Skeleton width={55} height={32} />
                    <Skeleton width={65} height={32} />
                    <Skeleton width={50} height={32} />
                </div>
            </header>
            <div className={styles.chartContainer}>
                <Skeleton height={330} />
            </div>
        </div>
    )
}

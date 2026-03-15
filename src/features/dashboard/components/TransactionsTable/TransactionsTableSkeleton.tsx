import { Skeleton } from '@/shared/components'
import styles from './TransactionsTable.module.scss'

const ROWS = 7

export const TransactionsTableSkeleton = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.title}>
                    <Skeleton width={110} height={20} />
                </div>
                <Skeleton width={200} height={15} />
            </header>
            <div className={styles.tableContainer}>
                <div
                    style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    {Array.from({ length: ROWS }).map((_, index) => (
                        <div key={index} style={{ display: 'flex', gap: 2 }}>
                            <Skeleton width="42%" height={42} />
                            <Skeleton width="28%" height={42} />
                            <Skeleton width="15%" height={42} />
                            <Skeleton width="15%" height={42} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

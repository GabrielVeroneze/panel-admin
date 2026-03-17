import { Skeleton } from '@/shared/components'
import clsx from 'clsx'
import styles from './TransactionsTable.module.scss'

const ROWS = 7

export const TransactionsTableSkeleton = () => {
    return (
        <div className={clsx(styles.container, styles.skeleton)}>
            <header className={styles.header}>
                <div className={styles.title}>
                    <Skeleton className={styles.titleSkeleton} />
                </div>
                <Skeleton className={styles.textSkeleton} />
            </header>
            <div className={styles.tableContainer}>
                <div className={styles.tableSkeleton}>
                    {Array.from({ length: ROWS }).map((_, index) => (
                        <div key={index} style={{ display: 'flex', gap: 2 }}>
                            <Skeleton className={styles.transactionSkeleton} />
                            <Skeleton className={styles.dateSkeleton} />
                            <Skeleton className={styles.amountSkeleton} />
                            <Skeleton className={styles.statusSkeleton} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

import { Skeleton } from '@/shared/components'
import clsx from 'clsx'
import styles from './UsersTable.module.scss'

const ROWS = 15

export const UsersTableSkeleton = () => {
    return (
        <div className={clsx(styles.wrapper, styles.skeleton)}>
            <div className={styles.tableSkeleton}>
                {Array.from({ length: ROWS }).map((_, index) => (
                    <div key={index} className={styles.rowSkeleton}>
                        <Skeleton className={styles.checkboxSkeleton} />
                        <Skeleton className={styles.nameSkeleton} />
                        <Skeleton className={styles.positionSkeleton} />
                        <Skeleton className={styles.countrySkeleton} />
                        <Skeleton className={styles.statusSkeleton} />
                        <Skeleton className={styles.actionsSkeleton} />
                    </div>
                ))}
            </div>
        </div>
    )
}

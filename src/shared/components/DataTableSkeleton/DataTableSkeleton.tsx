import { Skeleton } from '@/shared/components'
import clsx from 'clsx'
import styles from './DataTableSkeleton.module.scss'

type DataTableSkeletonProps = {
    rows?: number
    columns?: number
    className?: string
}

export const DataTableSkeleton = ({
    rows = 15,
    columns = 6,
    className,
}: DataTableSkeletonProps) => {
    return (
        <div className={styles.wrapper}>
            <div className={clsx(styles.table, className)}>
                {Array.from({ length: rows }).map((_, rowIndex) => (
                    <div key={rowIndex} className={styles.row}>
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <Skeleton key={colIndex} className={styles.cell} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

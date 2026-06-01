import { Skeleton } from '@/shared/components'
import clsx from 'clsx'
import styles from './TimelineItem.module.scss'

export const TimelineItemSkeleton = () => {
    return (
        <div className={clsx(styles.item, styles.skeleton)}>
            <div className={styles.indicator}>
                <Skeleton className={styles.dot} />
                <Skeleton className={styles.line} />
            </div>
            <div className={styles.content}>
                <Skeleton className={styles.periodSkeleton} />
                <Skeleton className={styles.titleSkeleton} />
                <Skeleton className={styles.organizationSkeleton} />
                <Skeleton className={styles.descriptionSkeleton} />
            </div>
        </div>
    )
}

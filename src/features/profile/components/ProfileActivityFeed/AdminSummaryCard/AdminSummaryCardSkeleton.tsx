import { Skeleton } from '@/shared/components'
import { ProfileSectionCardSkeleton } from '@/features/profile/components'
import clsx from 'clsx'
import styles from './AdminSummaryCard.module.scss'

export const AdminSummaryCardSkeleton = () => {
    return (
        <ProfileSectionCardSkeleton>
            <div className={clsx(styles.stats, styles.skeleton)}>
                <Skeleton className={styles.statSkeleton} />
                <Skeleton className={styles.statSkeleton} />
            </div>
            <div className={clsx(styles.details, styles.skeleton)}>
                <Skeleton className={styles.itemSkeleton} />
                <Skeleton className={styles.itemSkeleton} />
                <Skeleton className={styles.itemSkeleton} />
                <Skeleton className={styles.itemSkeleton} />
            </div>
        </ProfileSectionCardSkeleton>
    )
}

import { Skeleton } from '@/shared/components'
import { ProfileSectionCardSkeleton } from '@/features/profile/components'
import clsx from 'clsx'
import styles from './RecentActivityCard.module.scss'

export const RecentActivityCardSkeleton = () => {
    const items = Array.from({ length: 5 })

    return (
        <ProfileSectionCardSkeleton>
            <div className={clsx(styles.activities, styles.skeleton)}>
                {items.map((_, index) => (
                    <Skeleton key={index} className={styles.activitySkeleton} />
                ))}
            </div>
        </ProfileSectionCardSkeleton>
    )
}

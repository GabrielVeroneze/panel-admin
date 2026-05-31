import { Skeleton } from '@/shared/components'
import { ProfileSectionCardSkeleton } from '@/features/profile/components'
import clsx from 'clsx'
import styles from './ProfileContactInfo.module.scss'

export const ProfileContactInfoSkeleton = () => {
    return (
        <ProfileSectionCardSkeleton variant="compact">
            <div className={clsx(styles.infoList, styles.skeleton)}>
                <Skeleton className={styles.itemSkeleton} />
                <Skeleton className={styles.itemSkeleton} />
                <Skeleton className={styles.itemSkeleton} />
            </div>
        </ProfileSectionCardSkeleton>
    )
}

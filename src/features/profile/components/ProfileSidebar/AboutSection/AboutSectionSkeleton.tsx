import { Skeleton } from '@/shared/components'
import { ProfileSectionCardSkeleton } from '@/features/profile/components'
import clsx from 'clsx'
import styles from './AboutSection.module.scss'

export const AboutSectionSkeleton = () => {
    return (
        <ProfileSectionCardSkeleton variant="compact">
            <div className={clsx(styles.description, styles.skeleton)}>
                <Skeleton className={styles.descriptionSkeleton} />
            </div>
        </ProfileSectionCardSkeleton>
    )
}

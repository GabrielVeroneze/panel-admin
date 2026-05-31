import { Skeleton } from '@/shared/components'
import { ProfileSectionCardSkeleton } from '@/features/profile/components'
import clsx from 'clsx'
import styles from './SoftwareSkills.module.scss'

export const SoftwareSkillsSkeleton = () => {
    const items = Array.from({ length: 6 })

    return (
        <ProfileSectionCardSkeleton variant="compact">
            <div className={clsx(styles.skills, styles.skeleton)}>
                {items.map((_, index) => (
                    <Skeleton key={index} className={styles.skillSkeleton} />
                ))}
            </div>
        </ProfileSectionCardSkeleton>
    )
}

import { Skeleton } from '@/shared/components'
import { ProfileSectionCardSkeleton } from '@/features/profile/components'
import clsx from 'clsx'
import styles from './RecentProductsCard.module.scss'

export const RecentProductsCardSkeleton = () => {
    const items = Array.from({ length: 3 })

    return (
        <ProfileSectionCardSkeleton>
            <div className={clsx(styles.products, styles.skeleton)}>
                {items.map((_, index) => (
                    <Skeleton key={index} className={styles.productSkeleton} />
                ))}
            </div>
        </ProfileSectionCardSkeleton>
    )
}

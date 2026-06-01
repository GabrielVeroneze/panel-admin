import { AdminSummaryCardSkeleton } from './AdminSummaryCard/AdminSummaryCardSkeleton'
import { RecentActivityCardSkeleton } from './RecentActivityCard/RecentActivityCardSkeleton'
import { RecentProductsCardSkeleton } from './RecentProductsCard/RecentProductsCardSkeleton'
import styles from './ProfileActivityFeed.module.scss'

export const ProfileActivityFeedSkeleton = () => {
    return (
        <section className={styles.feed}>
            <AdminSummaryCardSkeleton />
            <RecentActivityCardSkeleton />
            <RecentProductsCardSkeleton />
        </section>
    )
}

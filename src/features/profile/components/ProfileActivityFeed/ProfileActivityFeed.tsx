import { AdminSummaryCard } from './AdminSummaryCard/AdminSummaryCard'
import { RecentActivityCard } from './RecentActivityCard/RecentActivityCard'
import { RecentProductsCard } from './RecentProductsCard/RecentProductsCard'
import type { ProfileActivityFeedData } from '@/features/profile/types'
import styles from './ProfileActivityFeed.module.scss'

type ProfileActivityFeedProps = {
    feed: ProfileActivityFeedData
}

export const ProfileActivityFeed = ({ feed }: ProfileActivityFeedProps) => {
    return (
        <section className={styles.feed}>
            <AdminSummaryCard
                products={feed.products}
                users={feed.users}
                profile={feed.profile}
            />
            <RecentActivityCard activities={feed.activities} />
            <RecentProductsCard products={feed.recentProducts} />
        </section>
    )
}

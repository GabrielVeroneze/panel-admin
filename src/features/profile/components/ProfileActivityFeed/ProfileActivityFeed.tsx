import { AdminSummaryCard } from './AdminSummaryCard/AdminSummaryCard'
import { RecentActivityCard } from './RecentActivityCard/RecentActivityCard'
import { RecentProductsCard } from './RecentProductsCard/RecentProductsCard'
import type { UserProfile } from '@/features/profile/types'
import styles from './ProfileActivityFeed.module.scss'

type ProfileActivityFeedProps = {
    profile: UserProfile
}

export const ProfileActivityFeed = ({ profile }: ProfileActivityFeedProps) => {
    return (
        <section className={styles.feed}>
            <AdminSummaryCard
                products={profile.summary.products}
                users={profile.summary.users}
                profile={profile.summary.profile}
            />
            <RecentActivityCard activities={profile.activities} />
            <RecentProductsCard products={profile.recentProducts} />
        </section>
    )
}

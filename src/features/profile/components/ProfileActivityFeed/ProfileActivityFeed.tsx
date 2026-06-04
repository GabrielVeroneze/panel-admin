import { Card, EmptyState } from '@/shared/components'
import { ExclamationCircleIcon } from '@/shared/assets/icons'
import { AdminSummaryCard } from './AdminSummaryCard/AdminSummaryCard'
import { RecentActivityCard } from './RecentActivityCard/RecentActivityCard'
import { RecentProductsCard } from './RecentProductsCard/RecentProductsCard'
import { ProfileActivityFeedSkeleton } from './ProfileActivityFeedSkeleton'
import type { UserProfile } from '@/features/profile/types'
import styles from './ProfileActivityFeed.module.scss'

type ProfileActivityFeedProps = {
    profile: UserProfile | null
    loading: boolean
}

export const ProfileActivityFeed = ({
    profile,
    loading,
}: ProfileActivityFeedProps) => {
    if (loading) return <ProfileActivityFeedSkeleton />

    if (!profile) {
        return (
            <Card className={styles.feed}>
                <EmptyState
                    icon={<ExclamationCircleIcon />}
                    title="Activity data unavailable"
                    description="Recent activity, statistics, and product information could not be loaded."
                />
            </Card>
        )
    }

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

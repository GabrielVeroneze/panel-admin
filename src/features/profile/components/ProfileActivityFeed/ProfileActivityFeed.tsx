import { AdminSummaryCard } from './AdminSummaryCard/AdminSummaryCard'
import { RecentActivityCard } from './RecentActivityCard/RecentActivityCard'
import { RecentProductsCard } from './RecentProductsCard/RecentProductsCard'
import type {
    Activity,
    ProfileSummary,
    RecentProduct,
    StatValue,
} from '@/features/profile/types'
import styles from './ProfileActivityFeed.module.scss'

type ProfileActivityFeedProps = {
    products: StatValue
    users: StatValue
    profile: ProfileSummary
    activities: Activity[]
    recentProducts: RecentProduct[]
}

export const ProfileActivityFeed = ({
    products,
    users,
    profile,
    activities,
    recentProducts,
}: ProfileActivityFeedProps) => {
    return (
        <section className={styles.feed}>
            <AdminSummaryCard
                products={products}
                users={users}
                profile={profile}
            />
            <RecentActivityCard activities={activities} />
            <RecentProductsCard products={recentProducts} />
        </section>
    )
}

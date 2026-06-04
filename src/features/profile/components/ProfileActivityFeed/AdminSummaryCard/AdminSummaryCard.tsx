import { Badge, Card, EmptyState } from '@/shared/components'
import {
    CalendarIcon,
    ChartBarIcon,
    ClockIcon,
    CubeIcon,
    ExclamationCircleIcon,
    ShieldExclamationIcon,
    StatusOnlineIcon,
    UsersIcon,
} from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import { SummaryStat } from './SummaryStat/SummaryStat'
import { SummaryDetailItem } from './SummaryDetailItem/SummaryDetailItem'
import type { ProfileSummary, SummaryMetric } from '@/features/profile/types'
import styles from './AdminSummaryCard.module.scss'

type AdminSummaryCardProps = {
    products: SummaryMetric
    users: SummaryMetric
    profile: ProfileSummary
}

export const AdminSummaryCard = ({
    products,
    users,
    profile,
}: AdminSummaryCardProps) => {
    if (!products || !users || !profile) {
        return (
            <Card>
                <EmptyState
                    icon={<ExclamationCircleIcon />}
                    title="Admin summary unavailable"
                    description="Administrative statistics and account summary information could not be loaded."
                />
            </Card>
        )
    }

    return (
        <ProfileSectionCard icon={<ChartBarIcon />} title="Admin Summary">
            <div className={styles.stats}>
                <SummaryStat
                    label="Total Products"
                    value={products.count}
                    icon={<CubeIcon />}
                    variation={products.variation}
                    color="purple"
                />
                <SummaryStat
                    label="Total Users"
                    value={users.count}
                    icon={<UsersIcon />}
                    variation={users.variation}
                    color="green"
                />
            </div>
            <div className={styles.details}>
                <SummaryDetailItem
                    icon={<ShieldExclamationIcon />}
                    label="Role"
                    value={
                        <span className={styles.highlightValue}>
                            {profile.role}
                        </span>
                    }
                    color="blue"
                />
                <SummaryDetailItem
                    icon={<StatusOnlineIcon />}
                    label="Status"
                    value={
                        <Badge
                            color={
                                profile.status === 'active' ? 'green' : 'red'
                            }
                        >
                            {profile.status}
                        </Badge>
                    }
                    color="green"
                />
                <SummaryDetailItem
                    icon={<ClockIcon />}
                    label="Last Login"
                    value={profile.lastLogin}
                    color="orange"
                />
                <SummaryDetailItem
                    icon={<CalendarIcon />}
                    label="Member since"
                    value={profile.memberSince}
                    color="purple"
                />
            </div>
        </ProfileSectionCard>
    )
}

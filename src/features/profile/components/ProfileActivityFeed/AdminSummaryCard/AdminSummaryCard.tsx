import { Badge } from '@/shared/components'
import {
    CalendarIcon,
    ChartBarIcon,
    ClockIcon,
    CubeIcon,
    ShieldExclamationIcon,
    StatusOnlineIcon,
    UsersIcon,
} from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import { SummaryStat } from './SummaryStat/SummaryStat'
import { SummaryDetailItem } from './SummaryDetailItem/SummaryDetailItem'
import type { ProfileSummary, StatValue } from '@/features/profile/types'
import styles from './AdminSummaryCard.module.scss'

type AdminSummaryCardProps = {
    products: StatValue
    users: StatValue
    profile: ProfileSummary
}

export const AdminSummaryCard = ({
    products,
    users,
    profile,
}: AdminSummaryCardProps) => {
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

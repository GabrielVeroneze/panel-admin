import { Badge, Card } from '@/shared/components'
import {
    CalendarIcon,
    ChartBarIcon,
    ClockIcon,
    CubeIcon,
    ShieldExclamationIcon,
    StatusOnlineIcon,
    UsersIcon,
} from '@/shared/assets/icons'
import { SummaryStat } from './SummaryStat/SummaryStat'
import { SummaryDetailItem } from './SummaryDetailItem/SummaryDetailItem'
import styles from './AdminSummaryCard.module.scss'

type StatValue = {
    count: number
    variation: number
}

type ProfileSummary = {
    role: string
    status: 'active' | 'inactive'
    lastLogin: string
    memberSince: string
}

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
        <Card className={styles.card}>
            <header className={styles.header}>
                <ChartBarIcon className={styles.icon} />
                <h3 className={styles.title}>Admin Summary</h3>
            </header>
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
        </Card>
    )
}

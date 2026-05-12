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

type AdminSummaryCardProps = {
    totalProducts: number
    totalUsers: number
    role: string
    status: 'active' | 'inactive'
    lastLogin: string
    memberSince: string
}

export const AdminSummaryCard = ({
    totalProducts,
    totalUsers,
    role,
    status,
    lastLogin,
    memberSince,
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
                    value={totalProducts}
                    icon={<CubeIcon />}
                    variation={12}
                    color="purple"
                />
                <SummaryStat
                    label="Total Users"
                    value={totalUsers}
                    icon={<UsersIcon />}
                    variation={5}
                    color="green"
                />
            </div>
            <div className={styles.details}>
                <SummaryDetailItem
                    icon={<ShieldExclamationIcon />}
                    label="Role"
                    value={
                        <span className={styles.highlightValue}>{role}</span>
                    }
                    color="blue"
                />
                <SummaryDetailItem
                    icon={<StatusOnlineIcon />}
                    label="Status"
                    value={
                        <Badge color={status === 'active' ? 'green' : 'red'}>
                            {status}
                        </Badge>
                    }
                    color="green"
                />
                <SummaryDetailItem
                    icon={<ClockIcon />}
                    label="Last Login"
                    value={lastLogin}
                    color="orange"
                />
                <SummaryDetailItem
                    icon={<CalendarIcon />}
                    label="Member since"
                    value={memberSince}
                    color="purple"
                />
            </div>
        </Card>
    )
}

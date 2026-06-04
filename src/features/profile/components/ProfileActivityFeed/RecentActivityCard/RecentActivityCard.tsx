import { Card, EmptyState } from '@/shared/components'
import { ExclamationCircleIcon, LightningBoltIcon } from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import { ActivityItem } from './ActivityItem/ActivityItem'
import type { Activity } from '@/features/profile/types'
import styles from './RecentActivityCard.module.scss'

type RecentActivityCardProps = {
    activities: Activity[]
}

export const RecentActivityCard = ({ activities }: RecentActivityCardProps) => {
    if (!activities || activities.length === 0) {
        return (
            <Card>
                <EmptyState
                    icon={<ExclamationCircleIcon />}
                    title="Activity history unavailable"
                    description="Recent administrative activity could not be loaded."
                />
            </Card>
        )
    }

    return (
        <ProfileSectionCard
            icon={<LightningBoltIcon />}
            title="Recent Activity"
        >
            <div className={styles.activities}>
                {activities.map((activity) => (
                    <ActivityItem key={activity.id} {...activity} />
                ))}
            </div>
        </ProfileSectionCard>
    )
}

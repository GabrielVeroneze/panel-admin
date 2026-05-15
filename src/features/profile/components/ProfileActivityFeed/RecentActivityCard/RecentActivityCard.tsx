import { LightningBoltIcon } from '@/shared/assets/icons'
import { ProfileSectionCard } from '@/features/profile/components'
import { ActivityItem } from './ActivityItem/ActivityItem'
import type { Activity } from '@/features/profile/types'
import styles from './RecentActivityCard.module.scss'

type RecentActivityCardProps = {
    activities: Activity[]
}

export const RecentActivityCard = ({ activities }: RecentActivityCardProps) => {
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

import { ClockIcon } from '@/shared/assets/icons'
import { activityConfig } from './ActivityItem.config'
import type { ActivityType } from '@/features/profile/types'
import clsx from 'clsx'
import styles from './ActivityItem.module.scss'

type ActivityItemProps = {
    type: ActivityType
    target: string
    createdAt: string
}

export const ActivityItem = ({
    type,
    target,
    createdAt,
}: ActivityItemProps) => {
    const activity = activityConfig[type]
    const Icon = activity.icon

    return (
        <div className={styles.item}>
            <div className={clsx(styles.iconWrapper, styles[activity.variant])}>
                <Icon className={styles.icon} />
            </div>
            <div className={styles.content}>
                <h4 className={styles.title}>{activity.title}</h4>
                <p className={styles.target}>{target}</p>
                <span className={styles.date}>
                    <ClockIcon />
                    {createdAt}
                </span>
            </div>
        </div>
    )
}

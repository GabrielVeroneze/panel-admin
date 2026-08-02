import { formatRelativeTime } from '@/shared/utils'
import { ClockIcon } from '@/shared/assets/icons'
import { activityConfig } from './ActivityItem.config'
import type { Activity } from '@/features/profile/types'
import clsx from 'clsx'
import styles from './ActivityItem.module.scss'

type ActivityItemProps = Activity

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
                    {formatRelativeTime(createdAt)}
                </span>
            </div>
        </div>
    )
}

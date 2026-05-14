import { ClockIcon } from '@/shared/assets/icons'
import type { ReactNode } from 'react'
import styles from './ActivityItem.module.scss'

type ActivityItemProps = {
    icon?: ReactNode
    title: string
    target: string
    createdAt: string
}

export const ActivityItem = ({
    icon,
    title,
    target,
    createdAt,
}: ActivityItemProps) => {
    return (
        <div className={styles.item}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.content}>
                <h4 className={styles.title}>{title}</h4>
                <p className={styles.target}>{target}</p>
                <span className={styles.date}>
                    <ClockIcon />
                    {createdAt}
                </span>
            </div>
        </div>
    )
}

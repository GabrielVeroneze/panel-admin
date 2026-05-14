import { ClockIcon } from '@/shared/assets/icons'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './ActivityItem.module.scss'

type ActivityItemProps = {
    icon?: ReactNode
    title: string
    target: string
    createdAt: string
    color?: 'red' | 'blue' | 'green' | 'orange' | 'purple'
}

export const ActivityItem = ({
    icon,
    title,
    target,
    createdAt,
    color = 'blue',
}: ActivityItemProps) => {
    return (
        <div className={styles.item}>
            <div className={clsx(styles.icon, styles[color])}>{icon}</div>
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

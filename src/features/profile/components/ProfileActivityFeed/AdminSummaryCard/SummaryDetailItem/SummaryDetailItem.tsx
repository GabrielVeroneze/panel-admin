import type { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './SummaryDetailItem.module.scss'

type SummaryDetailItemProps = {
    icon: ReactNode
    label: string
    value: ReactNode
    color?: 'purple' | 'green' | 'blue' | 'orange'
}

export const SummaryDetailItem = ({
    icon,
    label,
    value,
    color = 'blue',
}: SummaryDetailItemProps) => {
    return (
        <div className={styles.item}>
            <div className={styles.header}>
                <div className={clsx(styles.icon, styles[color])}>{icon}</div>
                <span className={styles.label}>{label}</span>
            </div>
            <span className={styles.value}>{value}</span>
        </div>
    )
}

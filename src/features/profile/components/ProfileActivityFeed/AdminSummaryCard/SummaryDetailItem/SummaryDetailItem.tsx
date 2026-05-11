import type { ReactNode } from 'react'
import styles from './SummaryDetailItem.module.scss'

type SummaryDetailItemProps = {
    icon: ReactNode
    label: string
    value: ReactNode
}

export const SummaryDetailItem = ({
    icon,
    label,
    value,
}: SummaryDetailItemProps) => {
    return (
        <div className={styles.item}>
            <div className={styles.header}>
                <div className={styles.icon}>{icon}</div>
                <span className={styles.label}>{label}</span>
            </div>
            <span className={styles.value}>{value}</span>
        </div>
    )
}

import type { ReactNode } from 'react'
import styles from './InfoItem.module.scss'

type InfoItemProps = {
    icon: ReactNode
    label: string
    value: string
}

export const InfoItem = ({ icon, label, value }: InfoItemProps) => {
    return (
        <div className={styles.item}>
            <div className={styles.icon}>{icon}</div>
            <div className={styles.content}>
                <h3 className={styles.label}>{label}</h3>
                <p className={styles.value}>{value}</p>
            </div>
        </div>
    )
}

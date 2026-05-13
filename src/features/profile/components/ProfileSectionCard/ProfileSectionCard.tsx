import { Card } from '@/shared/components'
import type { ReactNode } from 'react'
import styles from './ProfileSectionCard.module.scss'

type ProfileSectionCardProps = {
    icon: ReactNode
    title: string
    children: ReactNode
}

export const ProfileSectionCard = ({
    icon,
    title,
    children,
}: ProfileSectionCardProps) => {
    return (
        <Card className={styles.card}>
            <header className={styles.header}>
                <div className={styles.icon}>{icon}</div>
                <h3 className={styles.title}>{title}</h3>
            </header>
            <div className={styles.content}>{children}</div>
        </Card>
    )
}

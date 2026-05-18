import { Card } from '@/shared/components'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './ProfileSectionCard.module.scss'

type ProfileSectionCardProps = {
    icon: ReactNode
    title: string
    children: ReactNode
    variant?: 'default' | 'compact'
}

export const ProfileSectionCard = ({
    icon,
    title,
    children,
    variant = 'default',
}: ProfileSectionCardProps) => {
    return (
        <Card className={clsx(styles.card, styles[variant])}>
            <header className={styles.header}>
                <div className={styles.icon}>{icon}</div>
                <h3 className={styles.title}>{title}</h3>
            </header>
            <div className={styles.content}>{children}</div>
        </Card>
    )
}

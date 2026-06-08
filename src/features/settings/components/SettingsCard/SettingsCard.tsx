import { Card } from '@/shared/components'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './SettingsCard.module.scss'

type SettingsCardProps = {
    children: ReactNode
    title: string
    description?: string
    className?: string
    divider?: boolean
}

export const SettingsCard = ({
    children,
    title,
    description,
    className,
    divider = false,
}: SettingsCardProps) => {
    return (
        <Card
            className={clsx(styles.card, className, divider && styles.divider)}
        >
            <header className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                {description && (
                    <p className={styles.description}>{description}</p>
                )}
            </header>
            <div className={styles.content}>{children}</div>
        </Card>
    )
}

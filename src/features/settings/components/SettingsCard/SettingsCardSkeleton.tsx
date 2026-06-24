import { Card, Skeleton } from '@/shared/components'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './SettingsCard.module.scss'

type SettingsCardSkeletonProps = {
    children: ReactNode
    description?: boolean
    divider?: boolean
    className?: string
}

export const SettingsCardSkeleton = ({
    children,
    description,
    divider,
    className,
}: SettingsCardSkeletonProps) => {
    return (
        <Card
            className={clsx(
                styles.card,
                styles.skeleton,
                divider && styles.divider,
                className,
            )}
        >
            <header className={styles.header}>
                <Skeleton className={styles.titleSkeleton} />
                {description && (
                    <Skeleton className={styles.descriptionSkeleton} />
                )}
            </header>
            <div className={styles.content}>{children}</div>
        </Card>
    )
}

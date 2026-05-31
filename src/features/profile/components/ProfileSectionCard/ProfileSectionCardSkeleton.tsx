import { Card, Skeleton } from '@/shared/components'
import type { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './ProfileSectionCard.module.scss'

type ProfileSectionCardSkeletonProps = {
    children: ReactNode
    variant?: 'default' | 'compact'
}

export const ProfileSectionCardSkeleton = ({
    children,
    variant = 'default',
}: ProfileSectionCardSkeletonProps) => {
    return (
        <Card className={clsx(styles.card, styles.skeleton, styles[variant])}>
            <header className={styles.header}>
                <Skeleton className={styles.iconSkeleton} />
                <Skeleton className={styles.titleSkeleton} />
            </header>
            <div className={styles.content}>{children}</div>
        </Card>
    )
}

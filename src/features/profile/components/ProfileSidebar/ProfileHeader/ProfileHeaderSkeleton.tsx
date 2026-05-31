import { Card, Skeleton } from '@/shared/components'
import clsx from 'clsx'
import styles from './ProfileHeader.module.scss'

export const ProfileHeaderSkeleton = () => {
    return (
        <Card className={clsx(styles.header, styles.skeleton)}>
            <Skeleton className={styles.avatarSkeleton} />
            <div className={styles.info}>
                <Skeleton className={styles.nameSkeleton} />
                <Skeleton className={styles.roleSkeleton} />
                <Skeleton className={styles.countrySkeleton} />
            </div>
        </Card>
    )
}

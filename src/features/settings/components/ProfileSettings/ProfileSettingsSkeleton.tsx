import { Card, Skeleton } from '@/shared/components'
import clsx from 'clsx'
import styles from './ProfileSettings.module.scss'

export const ProfileSettingsSkeleton = () => {
    return (
        <Card className={clsx(styles.card, styles.skeleton)}>
            <Skeleton className={styles.avatar} />
            <div className={styles.info}>
                <Skeleton className={styles.nameSkeleton} />
                <Skeleton className={styles.roleSkeleton} />
                <Skeleton className={styles.buttonSkeleton} />
            </div>
        </Card>
    )
}

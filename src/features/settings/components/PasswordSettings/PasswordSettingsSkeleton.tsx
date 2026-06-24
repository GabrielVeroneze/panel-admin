import { Skeleton } from '@/shared/components'
import { SettingsCardSkeleton } from '@/features/settings/components'
import clsx from 'clsx'
import styles from './PasswordSettings.module.scss'

export const PasswordSettingsSkeleton = () => {
    return (
        <SettingsCardSkeleton className={clsx(styles.card, styles.skeleton)}>
            <form className={styles.form}>
                <div className={styles.field}>
                    <Skeleton className={styles.labelSkeleton} />
                    <Skeleton className={styles.inputSkeleton} />
                </div>
                <div className={styles.field}>
                    <Skeleton className={styles.labelSkeleton} />
                    <Skeleton className={styles.inputSkeleton} />
                </div>
                <div className={styles.field}>
                    <Skeleton className={styles.labelSkeleton} />
                    <Skeleton className={styles.inputSkeleton} />
                </div>
                <div className={styles.requirements}>
                    <Skeleton className={styles.titleSkeleton} />
                    <Skeleton className={styles.descriptionSkeleton} />
                    <ul className={styles.list}>
                        <Skeleton className={styles.itemSkeleton} />
                        <Skeleton className={styles.itemSkeleton} />
                        <Skeleton className={styles.itemSkeleton} />
                    </ul>
                </div>
                <Skeleton className={styles.buttonSkeleton} />
            </form>
        </SettingsCardSkeleton>
    )
}

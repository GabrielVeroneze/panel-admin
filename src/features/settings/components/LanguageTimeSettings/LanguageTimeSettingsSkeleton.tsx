import { Skeleton } from '@/shared/components'
import { SettingsCardSkeleton } from '@/features/settings/components'
import clsx from 'clsx'
import styles from './LanguageTimeSettings.module.scss'

export const LanguageTimeSettingsSkeleton = () => {
    return (
        <SettingsCardSkeleton className={clsx(styles.card, styles.skeleton)}>
            <form className={styles.form}>
                <div className={styles.field}>
                    <Skeleton className={styles.labelSkeleton} />
                    <Skeleton className={styles.selectSkeleton} />
                </div>
                <div className={styles.field}>
                    <Skeleton className={styles.labelSkeleton} />
                    <Skeleton className={styles.selectSkeleton} />
                </div>
                <Skeleton className={styles.buttonSkeleton} />
            </form>
        </SettingsCardSkeleton>
    )
}

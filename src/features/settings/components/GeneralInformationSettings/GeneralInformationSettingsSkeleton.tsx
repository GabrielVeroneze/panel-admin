import { Skeleton } from '@/shared/components'
import { SettingsCardSkeleton } from '@/features/settings/components'
import clsx from 'clsx'
import styles from './GeneralInformationSettings.module.scss'

export const GeneralInformationSettingsSkeleton = () => {
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
                <Skeleton className={styles.buttonSkeleton} />
            </form>
        </SettingsCardSkeleton>
    )
}

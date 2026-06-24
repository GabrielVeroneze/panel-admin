import { Skeleton } from '@/shared/components'
import { SettingsCardSkeleton } from '@/features/settings/components'
import clsx from 'clsx'
import styles from './ConnectedAccountsSettings.module.scss'

export const ConnectedAccountsSettingsSkeleton = () => {
    const items = Array.from({ length: 3 })

    return (
        <SettingsCardSkeleton className={clsx(styles.card, styles.skeleton)}>
            <div className={styles.list}>
                {items.map((_, index) => (
                    <Skeleton key={index} className={styles.itemSkeleton} />
                ))}
            </div>
        </SettingsCardSkeleton>
    )
}

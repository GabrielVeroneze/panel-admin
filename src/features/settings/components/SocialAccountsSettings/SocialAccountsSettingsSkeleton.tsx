import { Skeleton } from '@/shared/components'
import { SettingsCardSkeleton } from '@/features/settings/components'
import clsx from 'clsx'
import styles from './SocialAccountsSettings.module.scss'

export const SocialAccountsSettingsSkeleton = () => {
    const items = Array.from({ length: 2 })

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

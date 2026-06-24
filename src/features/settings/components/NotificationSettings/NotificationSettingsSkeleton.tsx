import { Skeleton } from '@/shared/components'
import {
    SettingsCardSkeleton,
    SettingsToggleList,
} from '@/features/settings/components'
import clsx from 'clsx'
import styles from './NotificationSettings.module.scss'

export const NotificationSettingsSkeleton = () => {
    const items = Array.from({ length: 4 })

    return (
        <SettingsCardSkeleton
            className={clsx(styles.card, styles.skeleton)}
            description
            divider
        >
            <SettingsToggleList>
                {items.map((_, index) => (
                    <Skeleton key={index} className={styles.itemSkeleton} />
                ))}
            </SettingsToggleList>
        </SettingsCardSkeleton>
    )
}

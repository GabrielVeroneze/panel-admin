import { Skeleton } from '@/shared/components'
import { SettingsCardSkeleton } from '@/features/settings/components'
import clsx from 'clsx'
import styles from './RecentDevicesSettings.module.scss'

export const RecentDevicesSettingsSkeleton = () => {
    const rows = Array.from({ length: 3 })
    const columns = Array.from({ length: 5 })

    return (
        <SettingsCardSkeleton
            className={clsx(styles.card, styles.skeleton)}
            description
        >
            <div className={styles.table}>
                {rows.map((_, rowIndex) => (
                    <div key={rowIndex} className={styles.rowSkeleton}>
                        {columns.map((_, colIndex) => (
                            <Skeleton
                                key={colIndex}
                                className={styles.cellSkeleton}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </SettingsCardSkeleton>
    )
}

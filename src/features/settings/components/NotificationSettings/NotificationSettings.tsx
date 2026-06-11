import {
    SettingsCard,
    SettingsToggleList,
} from '@/features/settings/components'
import type { SettingsToggle } from '@/features/settings/types'
import styles from './NotificationSettings.module.scss'

type NotificationSettingsProps = {
    notifications: SettingsToggle[] | null
    loading: boolean
}

export const NotificationSettings = ({
    notifications,
    loading,
}: NotificationSettingsProps) => {
    if (loading) return null

    if (!notifications || notifications.length === 0) {
        return null
    }

    return (
        <SettingsCard
            className={styles.card}
            title="Alerts & Notifications"
            description="Manage how and when you receive notifications"
        >
            <SettingsToggleList items={notifications} />
        </SettingsCard>
    )
}

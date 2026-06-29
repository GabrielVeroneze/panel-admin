import { useNotificationPreferences } from '@/features/settings/hooks'
import {
    SettingsCard,
    SettingsToggleItem,
    SettingsToggleList,
} from '@/features/settings/components'
import { NotificationSettingsSkeleton } from './NotificationSettingsSkeleton'
import type { NotificationPreferences } from '@/features/settings/types'
import styles from './NotificationSettings.module.scss'

type NotificationSettingsProps = {
    notificationPreferences: NotificationPreferences
    loading: boolean
}

export const NotificationSettings = ({
    notificationPreferences,
    loading,
}: NotificationSettingsProps) => {
    const { updateNotification } = useNotificationPreferences(
        notificationPreferences,
    )

    if (loading) return <NotificationSettingsSkeleton />

    return (
        <SettingsCard
            className={styles.card}
            title="Alerts & Notifications"
            description="Manage how and when you receive notifications"
        >
            <SettingsToggleList>
                <SettingsToggleItem
                    label="Company News"
                    description="Receive news, announcements, and updates about the platform"
                    enabled={notificationPreferences.companyNews}
                    onChange={() => updateNotification('companyNews')}
                />
                <SettingsToggleItem
                    label="Account Activity"
                    description="Receive important notifications about your account and recent activity"
                    enabled={notificationPreferences.accountActivity}
                    onChange={() => updateNotification('accountActivity')}
                />
                <SettingsToggleItem
                    label="Meetups Near You"
                    description="Receive notifications about events and meetups happening near your location"
                    enabled={notificationPreferences.meetupsNearYou}
                    onChange={() => updateNotification('meetupsNearYou')}
                />
                <SettingsToggleItem
                    label="New Messages"
                    description="Receive notifications when you get new messages or conversations"
                    enabled={notificationPreferences.newMessages}
                    onChange={() => updateNotification('newMessages')}
                />
            </SettingsToggleList>
        </SettingsCard>
    )
}

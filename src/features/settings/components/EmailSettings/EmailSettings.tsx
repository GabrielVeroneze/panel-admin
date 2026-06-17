import {
    SettingsCard,
    SettingsToggleItem,
    SettingsToggleList,
} from '@/features/settings/components'
import type { EmailPreferences } from '@/features/settings/types'
import styles from './EmailSettings.module.scss'

type EmailSettingsProps = {
    emailPreferences: EmailPreferences | null
    loading: boolean
}

export const EmailSettings = ({
    emailPreferences,
    loading,
}: EmailSettingsProps) => {
    if (loading) return null

    if (!emailPreferences) {
        return null
    }

    return (
        <SettingsCard
            className={styles.card}
            title="Email Settings"
            description="Manage which emails you want to receive"
        >
            <SettingsToggleList>
                <SettingsToggleItem
                    label="Rating reminders"
                    description="Send an email reminding me to rate an item a week after purchase"
                    enabled={emailPreferences.ratingReminders}
                />
                <SettingsToggleItem
                    label="Item update notifications"
                    description="Send an email when an item I've purchased is updated"
                    enabled={emailPreferences.itemUpdateNotifications}
                />
                <SettingsToggleItem
                    label="Item comment notifications"
                    description="Send me an email when someone comments on one of my items"
                    enabled={emailPreferences.itemCommentNotifications}
                />
                <SettingsToggleItem
                    label="Buyer review notifications"
                    description="Send me an email when someone leaves a review with their rating"
                    enabled={emailPreferences.buyerReviewNotifications}
                />
            </SettingsToggleList>
        </SettingsCard>
    )
}

import {
    SettingsCard,
    SettingsToggleList,
} from '@/features/settings/components'
import type { SettingsToggle } from '@/features/settings/types'
import styles from './EmailSettings.module.scss'

type EmailSettingsProps = {
    emailSettings: SettingsToggle[] | null
    loading: boolean
}

export const EmailSettings = ({
    emailSettings,
    loading,
}: EmailSettingsProps) => {
    if (loading) return null

    if (!emailSettings || emailSettings.length === 0) {
        return null
    }

    return (
        <SettingsCard
            className={styles.card}
            title="Email Settings"
            description="Manage which emails you want to receive"
        >
            <SettingsToggleList items={emailSettings} />
        </SettingsCard>
    )
}

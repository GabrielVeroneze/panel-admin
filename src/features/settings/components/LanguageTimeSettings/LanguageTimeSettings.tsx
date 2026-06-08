import { FormField, Select, SelectOption } from '@/shared/components'
import { SettingsCard } from '@/features/settings/components'
import type { SettingsPreferences } from '@/features/settings/types'
import styles from './LanguageTimeSettings.module.scss'

type LanguageTimeSettingsProps = {
    preferences: SettingsPreferences | null
    loading: boolean
}

export const LanguageTimeSettings = ({
    preferences,
    loading,
}: LanguageTimeSettingsProps) => {
    if (loading) return null

    if (!preferences) {
        return null
    }

    return (
        <SettingsCard className={styles.card} title="Language & Time">
            <form className={styles.form}>
                <FormField id="language" label="Select Language" size="large">
                    <Select size="medium">
                        <SelectOption>English (UK)</SelectOption>
                    </Select>
                </FormField>
                <FormField id="timezone" label="Select Timezone" size="large">
                    <Select size="medium">
                        <SelectOption>GMT+01:00</SelectOption>
                    </Select>
                </FormField>
            </form>
        </SettingsCard>
    )
}

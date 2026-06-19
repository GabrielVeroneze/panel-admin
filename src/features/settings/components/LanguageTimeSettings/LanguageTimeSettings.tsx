import { FormField, Select, SelectOption } from '@/shared/components'
import { SettingsCard } from '@/features/settings/components'
import { languageOptions, timezoneOptions } from './languageTimeOptions'
import type { SettingsPreferences } from '@/features/settings/types'
import styles from './LanguageTimeSettings.module.scss'

type LanguageTimeSettingsProps = {
    preferences?: SettingsPreferences
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
                <FormField
                    className={styles.field}
                    id="language"
                    label="Select Language"
                    size="large"
                >
                    <Select size="medium">
                        {languageOptions.map((language) => (
                            <SelectOption
                                key={language.value}
                                value={language.value}
                            >
                                {language.label}
                            </SelectOption>
                        ))}
                    </Select>
                </FormField>
                <FormField
                    className={styles.field}
                    id="timezone"
                    label="Select Timezone"
                    size="large"
                >
                    <Select size="medium">
                        {timezoneOptions.map((timezone) => (
                            <SelectOption
                                key={timezone.value}
                                value={timezone.value}
                            >
                                {timezone.label}
                            </SelectOption>
                        ))}
                    </Select>
                </FormField>
            </form>
        </SettingsCard>
    )
}

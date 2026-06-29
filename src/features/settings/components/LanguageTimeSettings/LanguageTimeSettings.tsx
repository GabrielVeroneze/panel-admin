import { Button, FormField, Select, SelectOption } from '@/shared/components'
import { useLanguageTimeForm } from '@/features/settings/hooks'
import { SettingsCard } from '@/features/settings/components'
import { languageOptions, timezoneOptions } from './languageTimeOptions'
import { LanguageTimeSettingsSkeleton } from './LanguageTimeSettingsSkeleton'
import type { SettingsPreferences } from '@/features/settings/types'
import styles from './LanguageTimeSettings.module.scss'

type LanguageTimeSettingsProps = {
    preferences: SettingsPreferences
    loading: boolean
}

export const LanguageTimeSettings = ({
    preferences,
    loading,
}: LanguageTimeSettingsProps) => {
    const {
        register,
        onSubmit,
        formState: { errors },
    } = useLanguageTimeForm(preferences)

    if (loading) return <LanguageTimeSettingsSkeleton />

    return (
        <SettingsCard className={styles.card} title="Language & Time">
            <form className={styles.form} onSubmit={onSubmit}>
                <FormField
                    className={styles.field}
                    id="language"
                    label="Select Language"
                    size="large"
                    status={errors.language && 'error'}
                    message={errors.language?.message}
                >
                    <Select size="medium" {...register('language')}>
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
                    status={errors.timezone && 'error'}
                    message={errors.timezone?.message}
                >
                    <Select size="medium" {...register('timezone')}>
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
                <Button className={styles.button} type="submit" size="lg">
                    Update
                </Button>
            </form>
        </SettingsCard>
    )
}

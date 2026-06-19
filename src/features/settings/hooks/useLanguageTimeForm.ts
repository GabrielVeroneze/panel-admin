import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { languageTimeSchema, type LanguageTimeFormValues } from '../schemas'
import type { SettingsPreferences } from '../types'

const defaultValues: LanguageTimeFormValues = {
    language: 'en',
    timezone: 'America/New_York',
}

export const useLanguageTimeForm = (preferences?: SettingsPreferences) => {
    const form = useForm({
        resolver: zodResolver(languageTimeSchema),
        defaultValues: preferences
            ? {
                  language: preferences.language,
                  timezone: preferences.timezone,
              }
            : defaultValues,
        mode: 'onTouched',
    })

    return form
}

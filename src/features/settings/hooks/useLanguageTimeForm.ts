import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '@/store'
import { Toast } from '@/shared/lib'
import { savePreferences } from '../store'
import { languageTimeSchema, type LanguageTimeFormValues } from '../schemas'
import type { SettingsPreferences } from '../types'

const defaultValues: LanguageTimeFormValues = {
    language: 'en',
    timezone: 'America/New_York',
}

export const useLanguageTimeForm = (preferences?: SettingsPreferences) => {
    const dispatch = useAppDispatch()

    const preferencesLoading = useAppSelector(
        (state) => state.settings.preferencesLoading,
    )

    const form = useForm<LanguageTimeFormValues>({
        resolver: zodResolver(languageTimeSchema),
        defaultValues: preferences ?? defaultValues,
        mode: 'onTouched',
    })

    const { handleSubmit, setError, clearErrors } = form

    const onSubmit = handleSubmit(async (data) => {
        clearErrors('root.server')

        try {
            await dispatch(savePreferences(data)).unwrap()

            Toast.success(
                'Language and timezone preferences updated successfully.',
            )
        } catch (error) {
            setError('root.server', {
                type: 'server',
                message:
                    typeof error === 'string'
                        ? error
                        : 'Unable to update language and timezone preferences. Please try again.',
            })
        }
    })

    return {
        ...form,
        onSubmit,
        preferencesLoading,
    }
}

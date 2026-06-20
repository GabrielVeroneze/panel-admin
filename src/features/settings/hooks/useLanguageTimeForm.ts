import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@/store'
import { savePreferences } from '../store'
import { languageTimeSchema, type LanguageTimeFormValues } from '../schemas'
import type { SettingsPreferences } from '../types'

const defaultValues: LanguageTimeFormValues = {
    language: 'en',
    timezone: 'America/New_York',
}

export const useLanguageTimeForm = (preferences?: SettingsPreferences) => {
    const dispatch = useAppDispatch()

    const form = useForm<LanguageTimeFormValues>({
        resolver: zodResolver(languageTimeSchema),
        defaultValues: preferences ? preferences : defaultValues,
        mode: 'onTouched',
    })

    const { handleSubmit } = form

    const onSubmit = handleSubmit(async (data) => {
        await dispatch(savePreferences(data))
    })

    return {
        ...form,
        onSubmit,
    }
}

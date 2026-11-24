import { Toast } from '@/shared/lib'
import { getApiErrorMessage } from '@/shared/utils'
import { useAppDispatch, useAppSelector } from '@/store'
import { saveEmailSettings } from '../store'
import type { EmailPreferences } from '../types'

export const useEmailPreferences = (emailPreferences?: EmailPreferences) => {
    const dispatch = useAppDispatch()

    const emailSettingsLoading = useAppSelector(
        (state) => state.settings.emailSettingsLoading,
    )

    const updateEmailPreference = async (field: keyof EmailPreferences) => {
        if (!emailPreferences || emailSettingsLoading) {
            return
        }

        try {
            await dispatch(
                saveEmailSettings({
                    ...emailPreferences,
                    [field]: !emailPreferences[field],
                }),
            ).unwrap()

            Toast.success('Email preferences updated successfully.')
        } catch (error) {
            Toast.error(
                getApiErrorMessage(error, {
                    fallback:
                        'Unable to update email preferences. Please try again.',
                }),
            )
        }
    }

    return {
        updateEmailPreference,
        emailSettingsLoading,
    }
}

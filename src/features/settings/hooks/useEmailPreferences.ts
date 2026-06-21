import { useAppDispatch } from '@/store'
import { saveEmailSettings } from '../store'
import type { EmailPreferences } from '../types'

export const useEmailPreferences = (emailPreferences?: EmailPreferences) => {
    const dispatch = useAppDispatch()

    const updateEmailPreference = async (field: keyof EmailPreferences) => {
        if (!emailPreferences) {
            return
        }

        await dispatch(
            saveEmailSettings({
                ...emailPreferences,
                [field]: !emailPreferences[field],
            }),
        )
    }

    return {
        updateEmailPreference,
    }
}

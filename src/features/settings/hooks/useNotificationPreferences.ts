import { Toast } from '@/shared/lib'
import { getApiErrorMessage } from '@/shared/utils'
import { useAppDispatch, useAppSelector } from '@/store'
import { saveNotifications } from '../store'
import type { NotificationPreferences } from '../types'

export const useNotificationPreferences = (
    notificationPreferences?: NotificationPreferences,
) => {
    const dispatch = useAppDispatch()

    const notificationsLoading = useAppSelector(
        (state) => state.settings.notificationsLoading,
    )

    const updateNotification = async (field: keyof NotificationPreferences) => {
        if (!notificationPreferences || notificationsLoading) {
            return
        }

        try {
            await dispatch(
                saveNotifications({
                    ...notificationPreferences,
                    [field]: !notificationPreferences[field],
                }),
            ).unwrap()

            Toast.success('Notification preferences updated successfully.')
        } catch (error) {
            Toast.error(
                getApiErrorMessage(error, {
                    fallback:
                        'Unable to update notification preferences. Please try again.',
                }),
            )
        }
    }

    return {
        updateNotification,
        notificationsLoading,
    }
}

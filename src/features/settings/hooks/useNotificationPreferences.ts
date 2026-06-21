import { useAppDispatch } from '@/store'
import { saveNotifications } from '../store'
import type { NotificationPreferences } from '../types'

export const useNotificationPreferences = (
    notificationPreferences?: NotificationPreferences,
) => {
    const dispatch = useAppDispatch()

    const updateNotification = async (field: keyof NotificationPreferences) => {
        if (!notificationPreferences) {
            return
        }

        await dispatch(
            saveNotifications({
                ...notificationPreferences,
                [field]: !notificationPreferences[field],
            }),
        )
    }

    return {
        updateNotification,
    }
}

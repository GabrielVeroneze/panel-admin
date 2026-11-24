import { Toast } from '@/shared/lib'
import { getApiErrorMessage } from '@/shared/utils'
import { useAppDispatch, useAppSelector } from '@/store'
import { removeDeviceSession } from '../store'
import type { DeviceSession } from '../types'

export const useDeviceSessions = () => {
    const dispatch = useAppDispatch()

    const recentDevicesLoading = useAppSelector(
        (state) => state.settings.recentDevicesLoading,
    )

    const disconnectSession = async (sessionId: DeviceSession['id']) => {
        if (recentDevicesLoading.includes(sessionId)) return

        try {
            await dispatch(removeDeviceSession(sessionId)).unwrap()

            Toast.success('Device disconnected successfully.')
        } catch (error) {
            Toast.error(
                typeof error === 'string'
                    ? error
                    : getApiErrorMessage(error, {
                          fallback:
                              'Unable to disconnect device. Please try again.',
                      }),
            )
        }
    }

    return {
        disconnectSession,
        recentDevicesLoading,
    }
}

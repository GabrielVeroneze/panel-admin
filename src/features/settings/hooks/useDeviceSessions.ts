import { useAppDispatch } from '@/store'
import { removeDeviceSession } from '../store'
import type { DeviceSession } from '../types'

export const useDeviceSessions = () => {
    const dispatch = useAppDispatch()

    const disconnectSession = (sessionId: DeviceSession['id']) => {
        dispatch(removeDeviceSession(sessionId))
    }

    return {
        disconnectSession,
    }
}

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAppDispatch, useAppSelector } from '@/store'
import { Toast } from '@/shared/lib'
import { removeDeviceSession } from '../store'
import { useDeviceSessions } from './useDeviceSessions'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn(),
}))

vi.mock('../store', () => ({
    removeDeviceSession: vi.fn(),
}))

vi.mock('@/shared/lib', () => ({
    Toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}))

describe('useDeviceSessions', () => {
    const dispatch = vi.fn()

    const removeDeviceSessionAction = {
        type: 'settings/removeDeviceSession',
    }

    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useAppDispatch).mockReturnValue(dispatch)
        vi.mocked(useAppSelector).mockReturnValue([])

        vi.mocked(removeDeviceSession).mockReturnValue(
            removeDeviceSessionAction as never,
        )

        dispatch.mockReturnValue({
            unwrap: vi.fn().mockResolvedValue(undefined),
        } as never)
    })

    it('returns the disconnectSession function', () => {
        const { result } = renderHook(() => useDeviceSessions())

        expect(result.current.disconnectSession).toEqual(expect.any(Function))
    })

    it('does not dispatch when disconnectSession has not been called', () => {
        renderHook(() => useDeviceSessions())

        expect(removeDeviceSession).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
    })

    it('dispatches removeDeviceSession with the session id', async () => {
        const { result } = renderHook(() => useDeviceSessions())

        await result.current.disconnectSession(42)

        expect(removeDeviceSession).toHaveBeenCalledTimes(1)
        expect(removeDeviceSession).toHaveBeenCalledWith(42)

        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(removeDeviceSessionAction)
    })

    it.each([1, 42, 999])(
        'disconnects the session with id %s',
        async (sessionId) => {
            vi.mocked(removeDeviceSession).mockReturnValue({
                type: 'settings/removeDeviceSession',
                payload: sessionId,
            } as never)

            const { result } = renderHook(() => useDeviceSessions())

            await result.current.disconnectSession(sessionId)

            expect(removeDeviceSession).toHaveBeenCalledWith(sessionId)
            expect(dispatch).toHaveBeenCalledWith({
                type: 'settings/removeDeviceSession',
                payload: sessionId,
            })
        },
    )

    it('dispatches a new action for each disconnected session', async () => {
        const { result } = renderHook(() => useDeviceSessions())

        await result.current.disconnectSession(10)
        await result.current.disconnectSession(20)

        expect(removeDeviceSession).toHaveBeenCalledTimes(2)
        expect(removeDeviceSession).toHaveBeenNthCalledWith(1, 10)
        expect(removeDeviceSession).toHaveBeenNthCalledWith(2, 20)

        expect(dispatch).toHaveBeenCalledTimes(2)
    })

    it('does not disconnect a session that is already loading', async () => {
        vi.mocked(useAppSelector).mockReturnValue([42])

        const { result } = renderHook(() => useDeviceSessions())

        await result.current.disconnectSession(42)

        expect(removeDeviceSession).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
    })

    it('shows a success toast after disconnecting a session', async () => {
        const { result } = renderHook(() => useDeviceSessions())

        await result.current.disconnectSession(42)

        expect(Toast.success).toHaveBeenCalledWith(
            'Device disconnected successfully.',
        )
    })
})

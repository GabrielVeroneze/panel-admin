import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAppDispatch } from '@/store'
import { removeDeviceSession } from '../store'
import { useDeviceSessions } from './useDeviceSessions'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
}))

vi.mock('../store', () => ({
    removeDeviceSession: vi.fn(),
}))

describe('useDeviceSessions', () => {
    const dispatch = vi.fn()

    const removeDeviceSessionAction = {
        type: 'settings/removeDeviceSession',
    }

    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useAppDispatch).mockReturnValue(dispatch)

        vi.mocked(removeDeviceSession).mockReturnValue(
            removeDeviceSessionAction as never,
        )
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

    it('dispatches removeDeviceSession with the session id', () => {
        const { result } = renderHook(() => useDeviceSessions())

        result.current.disconnectSession(42)

        expect(removeDeviceSession).toHaveBeenCalledTimes(1)
        expect(removeDeviceSession).toHaveBeenCalledWith(42)

        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(removeDeviceSessionAction)
    })

    it.each([1, 42, 999])('disconnects the session with id %s', (sessionId) => {
        vi.mocked(removeDeviceSession).mockReturnValue({
            type: 'settings/removeDeviceSession',
            payload: sessionId,
        } as never)

        const { result } = renderHook(() => useDeviceSessions())

        result.current.disconnectSession(sessionId)

        expect(removeDeviceSession).toHaveBeenCalledWith(sessionId)
        expect(dispatch).toHaveBeenCalledWith({
            type: 'settings/removeDeviceSession',
            payload: sessionId,
        })
    })

    it('dispatches a new action for each disconnected session', () => {
        const { result } = renderHook(() => useDeviceSessions())

        result.current.disconnectSession(10)
        result.current.disconnectSession(20)

        expect(removeDeviceSession).toHaveBeenCalledTimes(2)
        expect(removeDeviceSession).toHaveBeenNthCalledWith(1, 10)
        expect(removeDeviceSession).toHaveBeenNthCalledWith(2, 20)

        expect(dispatch).toHaveBeenCalledTimes(2)
    })
})

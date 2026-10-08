import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAppDispatch } from '@/store'
import { saveNotifications } from '../store'
import { useNotificationPreferences } from './useNotificationPreferences'
import type { NotificationPreferences } from '../types'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
}))

vi.mock('../store', () => ({
    saveNotifications: vi.fn(),
}))

describe('useNotificationPreferences', () => {
    const dispatch = vi.fn()

    const saveNotificationsAction = {
        type: 'settings/saveNotifications',
    }

    const notificationPreferences: NotificationPreferences = {
        companyNews: true,
        accountActivity: false,
        meetupsNearYou: true,
        newMessages: false,
    }

    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useAppDispatch).mockReturnValue(dispatch)

        vi.mocked(saveNotifications).mockReturnValue(
            saveNotificationsAction as never,
        )
    })

    it('returns the updateNotification function', () => {
        const { result } = renderHook(() =>
            useNotificationPreferences(notificationPreferences),
        )

        expect(result.current.updateNotification).toEqual(expect.any(Function))
    })

    it('does not dispatch when notification preferences are undefined', async () => {
        const { result } = renderHook(() => useNotificationPreferences())

        await result.current.updateNotification('companyNews')

        expect(saveNotifications).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
    })

    it.each([
        'companyNews',
        'accountActivity',
        'meetupsNearYou',
        'newMessages',
    ] as const)('toggles the %s notification preference', async (field) => {
        const { result } = renderHook(() =>
            useNotificationPreferences(notificationPreferences),
        )

        await result.current.updateNotification(field)

        expect(saveNotifications).toHaveBeenCalledTimes(1)
        expect(saveNotifications).toHaveBeenCalledWith({
            ...notificationPreferences,
            [field]: !notificationPreferences[field],
        })

        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(saveNotificationsAction)
    })

    it('preserves the other preferences when updating one field', async () => {
        const { result } = renderHook(() =>
            useNotificationPreferences(notificationPreferences),
        )

        await result.current.updateNotification('companyNews')

        const payload = vi.mocked(saveNotifications).mock.calls[0][0]

        expect(payload).toEqual({
            companyNews: false,
            accountActivity: false,
            meetupsNearYou: true,
            newMessages: false,
        })
    })

    it('toggles a true preference to false', async () => {
        const { result } = renderHook(() =>
            useNotificationPreferences(notificationPreferences),
        )

        await result.current.updateNotification('companyNews')

        expect(saveNotifications).toHaveBeenCalledWith({
            ...notificationPreferences,
            companyNews: false,
        })
    })

    it('toggles a false preference to true', async () => {
        const { result } = renderHook(() =>
            useNotificationPreferences(notificationPreferences),
        )

        await result.current.updateNotification('accountActivity')

        expect(saveNotifications).toHaveBeenCalledWith({
            ...notificationPreferences,
            accountActivity: true,
        })
    })

    it('uses the latest notification preferences when the argument changes', async () => {
        const { result, rerender } = renderHook(
            ({ preferences }) => useNotificationPreferences(preferences),
            {
                initialProps: {
                    preferences: notificationPreferences,
                },
            },
        )

        const updatedPreferences: NotificationPreferences = {
            companyNews: false,
            accountActivity: true,
            meetupsNearYou: false,
            newMessages: true,
        }

        rerender({ preferences: updatedPreferences })

        await result.current.updateNotification('newMessages')

        expect(saveNotifications).toHaveBeenCalledWith({
            ...updatedPreferences,
            newMessages: false,
        })
    })
})

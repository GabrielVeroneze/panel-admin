import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAppDispatch } from '@/store'
import { saveEmailSettings } from '../store'
import { useEmailPreferences } from './useEmailPreferences'
import type { EmailPreferences } from '../types'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
}))

vi.mock('../store', () => ({
    saveEmailSettings: vi.fn(),
}))

describe('useEmailPreferences', () => {
    const dispatch = vi.fn()

    const saveEmailSettingsAction = {
        type: 'settings/saveEmailSettings',
    }

    const emailPreferences: EmailPreferences = {
        ratingReminders: true,
        itemUpdateNotifications: false,
        itemCommentNotifications: true,
        buyerReviewNotifications: false,
    }

    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useAppDispatch).mockReturnValue(dispatch)

        vi.mocked(saveEmailSettings).mockReturnValue(
            saveEmailSettingsAction as never,
        )
    })

    it('returns the updateEmailPreference function', () => {
        const { result } = renderHook(() =>
            useEmailPreferences(emailPreferences),
        )

        expect(result.current.updateEmailPreference).toEqual(
            expect.any(Function),
        )
    })

    it('does not dispatch when email preferences are undefined', async () => {
        const { result } = renderHook(() => useEmailPreferences())

        await result.current.updateEmailPreference('ratingReminders')

        expect(saveEmailSettings).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
    })

    it.each([
        'ratingReminders',
        'itemUpdateNotifications',
        'itemCommentNotifications',
        'buyerReviewNotifications',
    ] as const)('toggles the %s preference', async (field) => {
        const { result } = renderHook(() =>
            useEmailPreferences(emailPreferences),
        )

        await result.current.updateEmailPreference(field)

        expect(saveEmailSettings).toHaveBeenCalledTimes(1)
        expect(saveEmailSettings).toHaveBeenCalledWith({
            ...emailPreferences,
            [field]: !emailPreferences[field],
        })

        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(saveEmailSettingsAction)
    })

    it('preserves the other preferences when updating one field', async () => {
        const { result } = renderHook(() =>
            useEmailPreferences(emailPreferences),
        )

        await result.current.updateEmailPreference('ratingReminders')

        const payload = vi.mocked(saveEmailSettings).mock.calls[0][0]

        expect(payload).toEqual({
            ratingReminders: false,
            itemUpdateNotifications: false,
            itemCommentNotifications: true,
            buyerReviewNotifications: false,
        })
    })

    it('toggles a true preference to false', async () => {
        const { result } = renderHook(() =>
            useEmailPreferences(emailPreferences),
        )

        await result.current.updateEmailPreference('ratingReminders')

        expect(saveEmailSettings).toHaveBeenCalledWith({
            ...emailPreferences,
            ratingReminders: false,
        })
    })

    it('toggles a false preference to true', async () => {
        const { result } = renderHook(() =>
            useEmailPreferences(emailPreferences),
        )

        await result.current.updateEmailPreference('itemUpdateNotifications')

        expect(saveEmailSettings).toHaveBeenCalledWith({
            ...emailPreferences,
            itemUpdateNotifications: true,
        })
    })

    it('uses the latest email preferences when the argument changes', async () => {
        const { result, rerender } = renderHook(
            ({ preferences }) => useEmailPreferences(preferences),
            {
                initialProps: {
                    preferences: emailPreferences,
                },
            },
        )

        const updatedPreferences: EmailPreferences = {
            ratingReminders: false,
            itemUpdateNotifications: true,
            itemCommentNotifications: false,
            buyerReviewNotifications: true,
        }

        rerender({ preferences: updatedPreferences })

        await result.current.updateEmailPreference('buyerReviewNotifications')

        expect(saveEmailSettings).toHaveBeenCalledWith({
            ...updatedPreferences,
            buyerReviewNotifications: false,
        })
    })
})

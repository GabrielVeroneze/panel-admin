import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAppDispatch, useAppSelector } from '@/store'
import { Toast } from '@/shared/lib'
import { getApiErrorMessage } from '@/shared/utils'
import { saveEmailSettings } from '../store'
import { useEmailPreferences } from './useEmailPreferences'
import type { EmailPreferences } from '../types'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn(),
}))

vi.mock('../store', () => ({
    saveEmailSettings: vi.fn(),
}))

vi.mock('@/shared/lib', () => ({
    Toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}))

vi.mock('@/shared/utils', () => ({
    getApiErrorMessage: vi.fn(),
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
        vi.mocked(useAppSelector).mockReturnValue(false)

        dispatch.mockReturnValue({
            unwrap: vi.fn().mockResolvedValue(undefined),
        })

        vi.mocked(saveEmailSettings).mockReturnValue(
            saveEmailSettingsAction as never,
        )

        vi.mocked(getApiErrorMessage).mockImplementation(
            (error, { fallback }) =>
                typeof error === 'string' ? error : fallback,
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

    it('shows a success toast after updating email preferences', async () => {
        const { result } = renderHook(() =>
            useEmailPreferences(emailPreferences),
        )

        await result.current.updateEmailPreference('ratingReminders')

        expect(Toast.success).toHaveBeenCalledWith(
            'Email preferences updated successfully.',
        )
        expect(Toast.error).not.toHaveBeenCalled()
    })

    it('shows an error toast when updating email preferences fails', async () => {
        const errorMessage = 'Unable to update email preferences.'

        const unwrap = vi.fn().mockRejectedValue(errorMessage)

        dispatch.mockReturnValue({ unwrap })

        vi.mocked(getApiErrorMessage).mockReturnValue(errorMessage)

        const { result } = renderHook(() =>
            useEmailPreferences(emailPreferences),
        )

        await result.current.updateEmailPreference('ratingReminders')

        expect(Toast.error).toHaveBeenCalledWith(errorMessage)
        expect(Toast.success).not.toHaveBeenCalled()
    })

    it('does not dispatch when email settings are loading', async () => {
        vi.mocked(useAppSelector).mockReturnValue(true)

        const { result } = renderHook(() =>
            useEmailPreferences(emailPreferences),
        )

        await result.current.updateEmailPreference('ratingReminders')

        expect(result.current.emailSettingsLoading).toBe(true)
        expect(saveEmailSettings).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
    })
})

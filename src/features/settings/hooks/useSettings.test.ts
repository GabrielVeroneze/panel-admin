import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAppDispatch, useAppSelector } from '@/store'
import { useSettings } from './useSettings'
import { fetchSettings } from '../store'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn(),
}))

vi.mock('../store', () => ({
    fetchSettings: vi.fn(),
}))

describe('useSettings', () => {
    const dispatch = vi.fn()
    const fetchSettingsAction = {
        type: 'settings/fetchSettings',
    }

    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useAppDispatch).mockReturnValue(dispatch)

        vi.mocked(fetchSettings).mockReturnValue(fetchSettingsAction as never)
    })

    it('returns the settings from the store', () => {
        const settings = {
            profile: {
                avatar: '/avatar.jpg',
                name: 'John Doe',
                role: 'Administrator',
            },
            preferences: {
                language: 'en',
                timezone: 'America/Sao_Paulo',
            },
            generalInformation: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                role: 'Administrator',
                phone: '+5511999999999',
                birthDate: '1990-01-01',
                organization: 'Acme',
                department: 'Engineering',
                address: 'Main Street, 100',
                city: 'São Paulo',
                country: 'BR',
                zipCode: '01000-000',
            },
            socialAccounts: [],
            connectedAccounts: [],
            notifications: {
                companyNews: true,
                accountActivity: true,
                meetupsNearYou: false,
                newMessages: true,
            },
            emailSettings: {
                ratingReminders: true,
                itemUpdateNotifications: false,
                itemCommentNotifications: true,
                buyerReviewNotifications: false,
            },
            recentDevices: [],
        }

        vi.mocked(useAppSelector).mockReturnValue({
            settings,
            loading: false,
        })

        const { result } = renderHook(() => useSettings())

        expect(result.current.settings).toBe(settings)
    })

    it('returns the loading state from the store', () => {
        vi.mocked(useAppSelector).mockReturnValue({
            settings: null,
            loading: true,
        })

        const { result } = renderHook(() => useSettings())

        expect(result.current.loading).toBe(true)
    })

    it('returns null settings when there is no settings data', () => {
        vi.mocked(useAppSelector).mockReturnValue({
            settings: null,
            loading: false,
        })

        const { result } = renderHook(() => useSettings())

        expect(result.current.settings).toBeNull()
    })

    it('dispatches fetchSettings when the hook mounts', () => {
        vi.mocked(useAppSelector).mockReturnValue({
            settings: null,
            loading: false,
        })

        renderHook(() => useSettings())

        expect(fetchSettings).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(fetchSettingsAction)
    })

    it('does not dispatch fetchSettings again when the hook rerenders', () => {
        vi.mocked(useAppSelector).mockReturnValue({
            settings: null,
            loading: false,
        })

        const { rerender } = renderHook(() => useSettings())

        rerender()
        rerender()

        expect(fetchSettings).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledTimes(1)
    })

    it('selects the settings state from the store', () => {
        vi.mocked(useAppSelector).mockReturnValue({
            settings: null,
            loading: false,
        })

        renderHook(() => useSettings())

        expect(useAppSelector).toHaveBeenCalledTimes(1)

        const selector = vi.mocked(useAppSelector).mock.calls[0][0]

        const state = {
            settings: {
                settings: null,
                loading: true,
            },
        } as never

        expect(selector(state)).toEqual({
            settings: null,
            loading: true,
        })
    })
})

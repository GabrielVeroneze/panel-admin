import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useAppDispatch } from '@/store'
import { savePreferences } from '../store'
import { useLanguageTimeForm } from './useLanguageTimeForm'
import type { SettingsPreferences } from '../types'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
}))

vi.mock('../store', () => ({
    savePreferences: vi.fn(),
}))

describe('useLanguageTimeForm', () => {
    const dispatch = vi.fn()

    const savePreferencesAction = {
        type: 'settings/savePreferences',
    }

    const preferences: SettingsPreferences = {
        language: 'pt-BR',
        timezone: 'America/Sao_Paulo',
    }

    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useAppDispatch).mockReturnValue(dispatch)

        vi.mocked(savePreferences).mockReturnValue(
            savePreferencesAction as never,
        )
    })

    it('returns the form methods and onSubmit function', () => {
        const { result } = renderHook(() => useLanguageTimeForm())

        expect(result.current.register).toEqual(expect.any(Function))
        expect(result.current.handleSubmit).toEqual(expect.any(Function))
        expect(result.current.getValues).toEqual(expect.any(Function))
        expect(result.current.setValue).toEqual(expect.any(Function))
        expect(result.current.onSubmit).toEqual(expect.any(Function))
    })

    it('initializes the form with the default values when preferences are undefined', () => {
        const { result } = renderHook(() => useLanguageTimeForm())

        expect(result.current.getValues()).toEqual({
            language: 'en',
            timezone: 'America/New_York',
        })
    })

    it('initializes the form with the provided preferences', () => {
        const { result } = renderHook(() => useLanguageTimeForm(preferences))

        expect(result.current.getValues()).toEqual(preferences)
    })

    it('allows changing the language and timezone values', () => {
        const { result } = renderHook(() => useLanguageTimeForm(preferences))

        act(() => {
            result.current.setValue('language', 'es')
            result.current.setValue('timezone', 'Europe/London')
        })

        expect(result.current.getValues()).toEqual({
            language: 'es',
            timezone: 'Europe/London',
        })
    })

    it('dispatches savePreferences when the form is valid', async () => {
        const { result } = renderHook(() => useLanguageTimeForm(preferences))

        await act(async () => {
            await result.current.onSubmit()
        })

        expect(savePreferences).toHaveBeenCalledTimes(1)
        expect(savePreferences).toHaveBeenCalledWith(preferences)

        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(savePreferencesAction)
    })

    it('submits the latest values entered into the form', async () => {
        const { result } = renderHook(() => useLanguageTimeForm(preferences))

        const updatedPreferences: SettingsPreferences = {
            language: 'es',
            timezone: 'Europe/London',
        }

        act(() => {
            result.current.setValue('language', updatedPreferences.language)
            result.current.setValue('timezone', updatedPreferences.timezone)
        })

        await act(async () => {
            await result.current.onSubmit()
        })

        expect(savePreferences).toHaveBeenCalledWith(updatedPreferences)
    })

    it.each([
        ['language', '', 'Language is required'],
        ['timezone', '', 'Timezone is required'],
    ] as const)(
        'does not submit when %s is empty',
        async (field, value, errorMessage) => {
            const { result } = renderHook(() =>
                useLanguageTimeForm(preferences),
            )

            await act(async () => {
                result.current.setValue(field, value)
            })

            let isValid = true

            await act(async () => {
                isValid = await result.current.trigger(field)
            })

            expect(isValid).toBe(false)
            expect(result.current.getFieldState(field).error?.message).toBe(
                errorMessage,
            )
            expect(savePreferences).not.toHaveBeenCalled()
            expect(dispatch).not.toHaveBeenCalled()
        },
    )

    it('trims whitespace from language and timezone before submitting', async () => {
        const { result } = renderHook(() => useLanguageTimeForm(preferences))

        act(() => {
            result.current.setValue('language', '  pt-BR  ')
            result.current.setValue('timezone', '  America/Sao_Paulo  ')
        })

        await act(async () => {
            await result.current.onSubmit()
        })

        expect(savePreferences).toHaveBeenCalledWith({
            language: 'pt-BR',
            timezone: 'America/Sao_Paulo',
        })
    })
})

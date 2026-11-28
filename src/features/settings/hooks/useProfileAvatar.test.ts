import { beforeEach, describe, expect, it, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useAppDispatch, useAppSelector } from '@/store'
import { updateAvatar } from '../store'
import { useProfileAvatar } from './useProfileAvatar'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn(),
}))

vi.mock('../store', () => ({
    updateAvatar: vi.fn(),
}))

describe('useProfileAvatar', () => {
    const dispatch = vi.fn()

    const updateAvatarAction = {
        type: 'settings/updateAvatar',
    }

    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useAppDispatch).mockReturnValue(dispatch)
        vi.mocked(useAppSelector).mockReturnValue(false)

        vi.mocked(updateAvatar).mockReturnValue(updateAvatarAction as never)

        dispatch.mockReturnValue({
            unwrap: vi.fn().mockResolvedValue(undefined),
        })
    })

    it('returns the inputRef, openFilePicker and handleFileChange', () => {
        const { result } = renderHook(() => useProfileAvatar())

        expect(result.current.inputRef).toBeDefined()
        expect(result.current.inputRef.current).toBeNull()
        expect(result.current.openFilePicker).toEqual(expect.any(Function))
        expect(result.current.handleFileChange).toEqual(expect.any(Function))
    })

    it('opens the file picker when the input is available', () => {
        const { result } = renderHook(() => useProfileAvatar())

        const input = document.createElement('input')
        input.type = 'file'

        const clickSpy = vi.spyOn(input, 'click')

        Object.defineProperty(result.current.inputRef, 'current', {
            configurable: true,
            value: input,
        })

        act(() => {
            result.current.openFilePicker()
        })

        expect(clickSpy).toHaveBeenCalledTimes(1)
    })

    it('does not throw when opening the file picker without an input', () => {
        const { result } = renderHook(() => useProfileAvatar())

        expect(() => {
            result.current.openFilePicker()
        }).not.toThrow()
    })

    it('dispatches updateAvatar with the selected file', async () => {
        const { result } = renderHook(() => useProfileAvatar())

        const file = new File(['avatar content'], 'avatar.png', {
            type: 'image/png',
        })

        const input = document.createElement('input')
        input.type = 'file'

        Object.defineProperty(input, 'files', {
            configurable: true,
            value: [file],
        })

        const event = {
            target: input,
        } as unknown as React.ChangeEvent<HTMLInputElement>

        await act(async () => {
            await result.current.handleFileChange(event)
        })

        expect(updateAvatar).toHaveBeenCalledTimes(1)
        expect(updateAvatar).toHaveBeenCalledWith({
            avatar: file,
        })

        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(updateAvatarAction)
    })

    it('clears the input value after dispatching the selected file', async () => {
        const { result } = renderHook(() => useProfileAvatar())

        const file = new File(['avatar content'], 'avatar.png', {
            type: 'image/png',
        })

        const input = document.createElement('input')
        input.type = 'file'

        Object.defineProperty(input, 'files', {
            configurable: true,
            value: [file],
        })

        Object.defineProperty(input, 'value', {
            configurable: true,
            writable: true,
            value: 'C:\\fakepath\\avatar.png',
        })

        const event = {
            target: input,
        } as unknown as React.ChangeEvent<HTMLInputElement>

        await act(async () => {
            await result.current.handleFileChange(event)
        })

        expect(input.value).toBe('')
    })

    it('does not dispatch or clear the input when no file is selected', async () => {
        const { result } = renderHook(() => useProfileAvatar())

        const input = document.createElement('input')
        input.type = 'file'

        Object.defineProperty(input, 'files', {
            configurable: true,
            value: [],
        })

        Object.defineProperty(input, 'value', {
            configurable: true,
            writable: true,
            value: '',
        })

        const event = {
            target: input,
        } as unknown as React.ChangeEvent<HTMLInputElement>

        await act(async () => {
            await result.current.handleFileChange(event)
        })

        expect(updateAvatar).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
        expect(input.value).toBe('')
    })

    it('clears the input only after the dispatch resolves', async () => {
        const { result } = renderHook(() => useProfileAvatar())

        const file = new File(['avatar content'], 'avatar.png', {
            type: 'image/png',
        })

        const input = document.createElement('input')
        input.type = 'file'

        Object.defineProperty(input, 'files', {
            configurable: true,
            value: [file],
        })

        Object.defineProperty(input, 'value', {
            configurable: true,
            writable: true,
            value: 'C:\\fakepath\\avatar.png',
        })

        let resolveDispatch!: () => void

        const unwrap = vi.fn(
            () =>
                new Promise<void>((resolve) => {
                    resolveDispatch = resolve
                }),
        )

        dispatch.mockReturnValueOnce({ unwrap })

        const event = {
            target: input,
        } as unknown as React.ChangeEvent<HTMLInputElement>

        let handlerPromise!: Promise<void>

        act(() => {
            handlerPromise = result.current.handleFileChange(event)
        })

        expect(input.value).toBe('C:\\fakepath\\avatar.png')

        await act(async () => {
            resolveDispatch()
            await handlerPromise
        })

        expect(input.value).toBe('')
    })

    it('returns the avatar loading state', () => {
        vi.mocked(useAppSelector).mockReturnValue(true)

        const { result } = renderHook(() => useProfileAvatar())

        expect(result.current.avatarLoading).toBe(true)
    })

    it('does not open the file picker while avatar is loading', () => {
        vi.mocked(useAppSelector).mockReturnValue(true)

        const { result } = renderHook(() => useProfileAvatar())

        const input = document.createElement('input')
        input.type = 'file'

        const clickSpy = vi.spyOn(input, 'click')

        Object.defineProperty(result.current.inputRef, 'current', {
            configurable: true,
            value: input,
        })

        act(() => {
            result.current.openFilePicker()
        })

        expect(clickSpy).not.toHaveBeenCalled()
    })
})

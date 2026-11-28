import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAppDispatch, useAppSelector } from '@/store'
import { Toast } from '@/shared/lib'
import { removeConnectedAccount } from '../store'
import { useConnectedAccount } from './useConnectedAccount'
import type { ConnectedAccount } from '../types'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
    useAppSelector: vi.fn(),
}))

vi.mock('../store', () => ({
    removeConnectedAccount: vi.fn(),
}))

vi.mock('@/shared/lib', () => ({
    Toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}))

describe('useConnectedAccount', () => {
    const dispatch = vi.fn()
    const removeConnectedAccountAction = {
        type: 'settings/removeConnectedAccount',
    }

    const account: ConnectedAccount = {
        id: 42,
        name: 'John Doe',
        avatar: '/avatars/john.jpg',
        city: 'São Paulo',
        lastSeen: '5 minutes ago',
    }

    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useAppDispatch).mockReturnValue(dispatch)
        vi.mocked(useAppSelector).mockReturnValue(false)

        vi.mocked(removeConnectedAccount).mockReturnValue(
            removeConnectedAccountAction as never,
        )

        dispatch.mockReturnValue({
            unwrap: vi.fn().mockResolvedValue(undefined),
        } as never)
    })

    it('returns the handleDisconnect function', () => {
        const { result } = renderHook(() => useConnectedAccount(account))

        expect(result.current.handleDisconnect).toEqual(expect.any(Function))
    })

    it('does not dispatch when handleDisconnect has not been called', () => {
        renderHook(() => useConnectedAccount(account))

        expect(removeConnectedAccount).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
    })

    it('dispatches removeConnectedAccount with the account id', async () => {
        const { result } = renderHook(() => useConnectedAccount(account))

        await result.current.handleDisconnect()

        expect(removeConnectedAccount).toHaveBeenCalledTimes(1)
        expect(removeConnectedAccount).toHaveBeenCalledWith(account.id)

        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(removeConnectedAccountAction)
    })

    it.each([1, 42, 999])(
        'uses the correct account id when disconnecting account %s',
        async (id) => {
            const currentAccount = {
                ...account,
                id,
            }

            vi.mocked(removeConnectedAccount).mockReturnValue({
                type: 'settings/removeConnectedAccount',
                payload: id,
            } as never)

            const { result } = renderHook(() =>
                useConnectedAccount(currentAccount),
            )

            await result.current.handleDisconnect()

            expect(removeConnectedAccount).toHaveBeenCalledWith(id)
        },
    )

    it('uses the latest account when the account prop changes', async () => {
        const { result, rerender } = renderHook(
            ({ currentAccount }) => useConnectedAccount(currentAccount),
            {
                initialProps: {
                    currentAccount: account,
                },
            },
        )

        const updatedAccount = {
            ...account,
            id: 99,
        }

        rerender({
            currentAccount: updatedAccount,
        })

        await result.current.handleDisconnect()

        expect(removeConnectedAccount).toHaveBeenCalledWith(99)
    })

    it('returns the loading state', () => {
        vi.mocked(useAppSelector).mockReturnValue(true)

        const { result } = renderHook(() => useConnectedAccount(account))

        expect(result.current.isLoading).toBe(true)
    })

    it('does not disconnect an account that is already loading', async () => {
        vi.mocked(useAppSelector).mockReturnValue(true)

        const { result } = renderHook(() => useConnectedAccount(account))

        await result.current.handleDisconnect()

        expect(removeConnectedAccount).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
    })

    it('shows a success toast after disconnecting an account', async () => {
        const { result } = renderHook(() => useConnectedAccount(account))

        await result.current.handleDisconnect()

        expect(Toast.success).toHaveBeenCalledWith(
            'Account disconnected successfully.',
        )
    })
})

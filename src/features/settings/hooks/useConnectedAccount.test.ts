import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAppDispatch } from '@/store'
import { removeConnectedAccount } from '../store'
import { useConnectedAccount } from './useConnectedAccount'
import type { ConnectedAccount } from '../types'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
}))

vi.mock('../store', () => ({
    removeConnectedAccount: vi.fn(),
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

        vi.mocked(removeConnectedAccount).mockReturnValue(
            removeConnectedAccountAction as never,
        )
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

    it('dispatches removeConnectedAccount with the account id', () => {
        const { result } = renderHook(() => useConnectedAccount(account))

        result.current.handleDisconnect()

        expect(removeConnectedAccount).toHaveBeenCalledTimes(1)
        expect(removeConnectedAccount).toHaveBeenCalledWith(account.id)

        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(removeConnectedAccountAction)
    })

    it.each([1, 42, 999])(
        'uses the correct account id when disconnecting account %s',
        (id) => {
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

            result.current.handleDisconnect()

            expect(removeConnectedAccount).toHaveBeenCalledWith(id)
        },
    )

    it('uses the latest account when the account prop changes', () => {
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

        result.current.handleDisconnect()

        expect(removeConnectedAccount).toHaveBeenCalledWith(99)
    })
})

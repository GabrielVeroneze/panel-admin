import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAppDispatch } from '@/store'
import { connectAccount, disconnectAccount } from '../store'
import { useSocialAccount } from './useSocialAccount'
import type { SocialAccount } from '../types'

vi.mock('@/store', () => ({
    useAppDispatch: vi.fn(),
}))

vi.mock('../store', () => ({
    connectAccount: vi.fn(),
    disconnectAccount: vi.fn(),
}))

describe('useSocialAccount', () => {
    const dispatch = vi.fn()

    const connectAccountAction = {
        type: 'settings/connectAccount',
    }

    const disconnectAccountAction = {
        type: 'settings/disconnectAccount',
    }

    const account: SocialAccount = {
        id: 1,
        platform: 'facebook',
        connected: false,
    }

    beforeEach(() => {
        vi.clearAllMocks()

        vi.mocked(useAppDispatch).mockReturnValue(dispatch)

        vi.mocked(connectAccount).mockReturnValue(connectAccountAction as never)

        vi.mocked(disconnectAccount).mockReturnValue(
            disconnectAccountAction as never,
        )
    })

    it('returns the handleToggleConnection function', () => {
        const { result } = renderHook(() => useSocialAccount(account))

        expect(result.current.handleToggleConnection).toEqual(
            expect.any(Function),
        )
    })

    it('does not dispatch when handleToggleConnection has not been called', () => {
        renderHook(() => useSocialAccount(account))

        expect(connectAccount).not.toHaveBeenCalled()
        expect(disconnectAccount).not.toHaveBeenCalled()
        expect(dispatch).not.toHaveBeenCalled()
    })

    it('connects the account when it is not connected', () => {
        const { result } = renderHook(() => useSocialAccount(account))

        result.current.handleToggleConnection()

        expect(connectAccount).toHaveBeenCalledTimes(1)
        expect(connectAccount).toHaveBeenCalledWith(account.platform)
        expect(disconnectAccount).not.toHaveBeenCalled()

        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(connectAccountAction)
    })

    it('disconnects the account when it is connected', () => {
        const connectedAccount: SocialAccount = {
            ...account,
            connected: true,
            url: 'facebook.com/johndoe',
        }

        const { result } = renderHook(() => useSocialAccount(connectedAccount))

        result.current.handleToggleConnection()

        expect(disconnectAccount).toHaveBeenCalledTimes(1)
        expect(disconnectAccount).toHaveBeenCalledWith(
            connectedAccount.platform,
        )
        expect(connectAccount).not.toHaveBeenCalled()

        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(disconnectAccountAction)
    })

    it.each<SocialAccount['platform']>([
        'facebook',
        'twitter',
        'github',
        'dribbble',
    ])('connects the %s account using the correct platform', (platform) => {
        const currentAccount: SocialAccount = {
            ...account,
            platform,
            connected: false,
        }

        const { result } = renderHook(() => useSocialAccount(currentAccount))

        result.current.handleToggleConnection()

        expect(connectAccount).toHaveBeenCalledWith(platform)
    })

    it.each<SocialAccount['platform']>([
        'facebook',
        'twitter',
        'github',
        'dribbble',
    ])('disconnects the %s account using the correct platform', (platform) => {
        const currentAccount: SocialAccount = {
            ...account,
            platform,
            connected: true,
        }

        const { result } = renderHook(() => useSocialAccount(currentAccount))

        result.current.handleToggleConnection()

        expect(disconnectAccount).toHaveBeenCalledWith(platform)
    })

    it('uses the latest account when the account prop changes', () => {
        const { result, rerender } = renderHook(
            ({ currentAccount }) => useSocialAccount(currentAccount),
            {
                initialProps: {
                    currentAccount: account,
                },
            },
        )

        const updatedAccount: SocialAccount = {
            ...account,
            platform: 'github',
            connected: true,
        }

        rerender({ currentAccount: updatedAccount })

        result.current.handleToggleConnection()

        expect(disconnectAccount).toHaveBeenCalledWith('github')
        expect(connectAccount).not.toHaveBeenCalled()
    })
})

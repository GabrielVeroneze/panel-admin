import { Toast } from '@/shared/lib'
import { getApiErrorMessage } from '@/shared/utils'
import { useAppDispatch, useAppSelector } from '@/store'
import { removeConnectedAccount } from '../store'
import type { ConnectedAccount } from '../types'

export const useConnectedAccount = (account: ConnectedAccount) => {
    const dispatch = useAppDispatch()

    const isLoading = useAppSelector((state) =>
        state.settings.connectedAccountsLoading.includes(account.id),
    )

    const handleDisconnect = async () => {
        if (isLoading) return

        try {
            await dispatch(removeConnectedAccount(account.id)).unwrap()

            Toast.success('Account disconnected successfully.')
        } catch (error) {
            Toast.error(
                typeof error === 'string'
                    ? error
                    : getApiErrorMessage(error, {
                          fallback: 'Unable to disconnect account. Please try again.',
                      }),
            )
        }
    }

    return {
        handleDisconnect,
        isLoading,
    }
}

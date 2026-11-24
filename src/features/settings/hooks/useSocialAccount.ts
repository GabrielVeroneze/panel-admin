import { Toast } from '@/shared/lib'
import { getApiErrorMessage } from '@/shared/utils'
import { useAppDispatch, useAppSelector } from '@/store'
import { connectAccount, disconnectAccount } from '../store'
import type { SocialAccount } from '@/features/settings/types'

export const useSocialAccount = (account: SocialAccount) => {
    const dispatch = useAppDispatch()

    const isLoading = useAppSelector((state) =>
        state.settings.socialAccountsLoading.includes(account.platform),
    )

    const handleToggleConnection = async () => {
        if (isLoading) return

        try {
            if (account.connected) {
                await dispatch(disconnectAccount(account.platform)).unwrap()

                Toast.success('Social account disconnected successfully.')

                return
            }

            await dispatch(connectAccount(account.platform)).unwrap()

            Toast.success('Social account connected successfully.')
        } catch (error) {
            Toast.error(
                getApiErrorMessage(error, {
                    fallback: account.connected
                        ? 'Unable to disconnect social account. Please try again.'
                        : 'Unable to connect social account. Please try again.',
                }),
            )
        }
    }

    return {
        handleToggleConnection,
        isLoading,
    }
}

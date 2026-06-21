import { useAppDispatch } from '@/store'
import { connectAccount, disconnectAccount } from '../store'
import type { SocialAccount } from '@/features/settings/types'

export const useSocialAccount = (account: SocialAccount) => {
    const dispatch = useAppDispatch()

    const handleToggleConnection = () => {
        if (account.connected) {
            dispatch(disconnectAccount(account.platform))

            return
        }

        dispatch(connectAccount(account.platform))
    }

    return {
        handleToggleConnection,
    }
}

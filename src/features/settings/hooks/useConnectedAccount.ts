import { useAppDispatch } from '@/store'
import { removeConnectedAccount } from '../store'
import type { ConnectedAccount } from '../types'

export const useConnectedAccount = (account: ConnectedAccount) => {
    const dispatch = useAppDispatch()

    const handleDisconnect = () => {
        dispatch(removeConnectedAccount(account.id))
    }

    return {
        handleDisconnect,
    }
}

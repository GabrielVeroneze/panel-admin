import { Button, UserAvatar } from '@/shared/components'
import { useConnectedAccount } from '@/features/settings/hooks'
import type { ConnectedAccount } from '@/features/settings/types'
import styles from './ConnectedAccountItem.module.scss'

type ConnectedAccountItemProps = {
    account: ConnectedAccount
}

export const ConnectedAccountItem = ({
    account,
}: ConnectedAccountItemProps) => {
    const { handleDisconnect } = useConnectedAccount(account)

    return (
        <div className={styles.item}>
            <div className={styles.info}>
                <UserAvatar src={account.avatar} alt={account.name} />
                <div className={styles.content}>
                    <h4 className={styles.name}>{account.name}</h4>
                    <span className={styles.city}>{account.city}</span>
                    <span className={styles.lastSeen}>
                        Last seen: {account.lastSeen}
                    </span>
                </div>
            </div>
            <Button
                className={styles.button}
                size="lg"
                variant="transparent"
                onClick={handleDisconnect}
            >
                Disconnect
            </Button>
        </div>
    )
}

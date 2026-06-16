import { Button } from '@/shared/components'
import { socialAccountConfig } from './SocialAccountItem.config'
import type { SocialAccount } from '@/features/settings/types'
import styles from './SocialAccountItem.module.scss'

type SocialAccountItemProps = {
    account: SocialAccount
}

export const SocialAccountItem = ({ account }: SocialAccountItemProps) => {
    const config = socialAccountConfig[account.platform]
    const Icon = config.icon

    return (
        <div className={styles.item}>
            <div className={styles.info}>
                <Icon className={styles.icon} />
                <div className={styles.content}>
                    <h4 className={styles.title}>{config.label}</h4>
                    {account.connected && account.url ? (
                        <a
                            className={styles.link}
                            href={`https://${account.url}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {account.url}
                        </a>
                    ) : (
                        <span className={styles.text}>Not connected</span>
                    )}
                </div>
            </div>
            <Button
                className={styles.button}
                size="lg"
                variant={account.connected ? 'transparent' : 'primary'}
            >
                {account.connected ? 'Disconnect' : 'Connect'}
            </Button>
        </div>
    )
}

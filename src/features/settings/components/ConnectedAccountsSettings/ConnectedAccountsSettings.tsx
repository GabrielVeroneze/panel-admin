import { SettingsCard } from '@/features/settings/components'
import { ConnectedAccountItem } from './ConnectedAccountItem/ConnectedAccountItem'
import { ConnectedAccountsSettingsSkeleton } from './ConnectedAccountsSettingsSkeleton'
import type { ConnectedAccount } from '@/features/settings/types'
import styles from './ConnectedAccountsSettings.module.scss'

type ConnectedAccountsSettingsProps = {
    accounts?: ConnectedAccount[]
    loading: boolean
}

export const ConnectedAccountsSettings = ({
    accounts,
    loading,
}: ConnectedAccountsSettingsProps) => {
    if (loading) return <ConnectedAccountsSettingsSkeleton />

    if (!accounts || accounts.length === 0) {
        return null
    }

    return (
        <SettingsCard className={styles.card} title="Connected accounts">
            <div className={styles.list}>
                {accounts.map((account) => (
                    <ConnectedAccountItem key={account.id} account={account} />
                ))}
            </div>
        </SettingsCard>
    )
}

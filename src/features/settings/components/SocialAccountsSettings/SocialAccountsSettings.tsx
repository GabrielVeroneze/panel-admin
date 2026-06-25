import { SettingsCard } from '@/features/settings/components'
import { SocialAccountItem } from './SocialAccountItem/SocialAccountItem'
import { SocialAccountsSettingsSkeleton } from './SocialAccountsSettingsSkeleton'
import type { SocialAccount } from '@/features/settings/types'
import styles from './SocialAccountsSettings.module.scss'

type SocialAccountsSettingsProps = {
    accounts?: SocialAccount[]
    loading: boolean
}

export const SocialAccountsSettings = ({
    accounts,
    loading,
}: SocialAccountsSettingsProps) => {
    if (loading) return <SocialAccountsSettingsSkeleton />

    if (!accounts || accounts.length === 0) {
        return null
    }

    return (
        <SettingsCard className={styles.card} title="Social accounts">
            <div className={styles.list}>
                {accounts.map((account) => (
                    <SocialAccountItem key={account.id} account={account} />
                ))}
            </div>
        </SettingsCard>
    )
}

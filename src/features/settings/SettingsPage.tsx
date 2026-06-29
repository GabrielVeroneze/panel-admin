import { useSettings } from './hooks'
import { EmptyState } from '@/shared/components'
import { CogSolidIcon } from '@/shared/assets/icons'
import {
    ConnectedAccountsSettings,
    EmailSettings,
    GeneralInformationSettings,
    LanguageTimeSettings,
    NotificationSettings,
    PasswordSettings,
    ProfileSettings,
    RecentDevicesSettings,
    SocialAccountsSettings,
} from './components'
import styles from './SettingsPage.module.scss'

export const SettingsPage = () => {
    const { settings, loading } = useSettings()

    if (!settings) {
        return (
            <EmptyState
                icon={<CogSolidIcon />}
                title="Settings unavailable"
                description="We couldn't load your account settings. Please try again later."
            />
        )
    }

    return (
        <section className={styles.settings}>
            <div className={styles.topSection}>
                <ProfileSettings profile={settings.profile} loading={loading} />
                <LanguageTimeSettings
                    preferences={settings.preferences}
                    loading={loading}
                />
                <SocialAccountsSettings
                    accounts={settings.socialAccounts}
                    loading={loading}
                />
                <GeneralInformationSettings
                    data={settings.generalInformation}
                    loading={loading}
                />
            </div>
            <div className={styles.middleSection}>
                <ConnectedAccountsSettings
                    accounts={settings.connectedAccounts}
                    loading={loading}
                />
                <PasswordSettings loading={loading} />
            </div>
            <div className={styles.bottomSection}>
                <NotificationSettings
                    notificationPreferences={settings.notifications}
                    loading={loading}
                />
                <EmailSettings
                    emailPreferences={settings.emailSettings}
                    loading={loading}
                />
                <RecentDevicesSettings
                    devices={settings.recentDevices}
                    loading={loading}
                />
            </div>
        </section>
    )
}

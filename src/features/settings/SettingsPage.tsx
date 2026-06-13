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
    return (
        <section className={styles.settings}>
            <div className={styles.topSection}>
                <ProfileSettings profile={profile} loading={false} />
                <LanguageTimeSettings
                    preferences={preferences}
                    loading={false}
                />
                <SocialAccountsSettings
                    accounts={socialAccounts}
                    loading={false}
                />
                <GeneralInformationSettings
                    data={generalInformation}
                    loading={false}
                />
            </div>
            <div className={styles.middleSection}>
                <ConnectedAccountsSettings
                    accounts={connectedAccounts}
                    loading={false}
                />
                <PasswordSettings loading={false} />
            </div>
            <div className={styles.bottomSection}>
                <NotificationSettings
                    notifications={notifications}
                    loading={false}
                />
                <EmailSettings emailSettings={emailSettings} loading={false} />
                <RecentDevicesSettings devices={devices} loading={false} />
            </div>
        </section>
    )
}

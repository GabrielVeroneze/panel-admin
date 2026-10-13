import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useSettings } from '@/features/settings/hooks'
import { SettingsPage } from './SettingsPage'
import type {
    ConnectedAccount,
    DeviceSession,
    EmailPreferences,
    GeneralInformation,
    NotificationPreferences,
    SettingsPreferences,
    SettingsProfile,
    SocialAccount,
} from '@/features/settings/types'

const mocks = vi.hoisted(() => ({
    useSettings: vi.fn(),
}))

vi.mock('@/features/settings/hooks', () => ({
    useSettings: mocks.useSettings,
}))

vi.mock('@/shared/assets/icons', () => ({
    CogSolidIcon: () => <svg data-testid="settings-icon" />,
}))

vi.mock('@/shared/components', () => ({
    EmptyState: ({
        icon,
        title,
        description,
    }: {
        icon?: React.ReactNode
        title: string
        description?: string
    }) => (
        <div data-testid="empty-state">
            {icon}
            <h3>{title}</h3>
            {description && <p>{description}</p>}
        </div>
    ),
}))

vi.mock('@/features/settings/components', () => ({
    ConnectedAccountsSettings: ({
        accounts,
        loading,
    }: {
        accounts: ConnectedAccount[]
        loading: boolean
    }) => (
        <div
            data-testid="connected-accounts-settings"
            data-loading={String(loading)}
            data-count={accounts.length}
        />
    ),

    EmailSettings: ({
        emailPreferences,
        loading,
    }: {
        emailPreferences: EmailPreferences
        loading: boolean
    }) => (
        <div
            data-testid="email-settings"
            data-loading={String(loading)}
            data-preferences={JSON.stringify(emailPreferences)}
        />
    ),

    GeneralInformationSettings: ({
        data,
        loading,
    }: {
        data: GeneralInformation
        loading: boolean
    }) => (
        <div
            data-testid="general-information-settings"
            data-loading={String(loading)}
            data-data={JSON.stringify(data)}
        />
    ),

    LanguageTimeSettings: ({
        preferences,
        loading,
    }: {
        preferences: SettingsPreferences
        loading: boolean
    }) => (
        <div
            data-testid="language-time-settings"
            data-loading={String(loading)}
            data-preferences={JSON.stringify(preferences)}
        />
    ),

    NotificationSettings: ({
        notificationPreferences,
        loading,
    }: {
        notificationPreferences: NotificationPreferences
        loading: boolean
    }) => (
        <div
            data-testid="notification-settings"
            data-loading={String(loading)}
            data-preferences={JSON.stringify(notificationPreferences)}
        />
    ),

    PasswordSettings: ({ loading }: { loading: boolean }) => (
        <div data-testid="password-settings" data-loading={String(loading)} />
    ),

    ProfileSettings: ({
        profile,
        loading,
    }: {
        profile: SettingsProfile
        loading: boolean
    }) => (
        <div
            data-testid="profile-settings"
            data-loading={String(loading)}
            data-profile={JSON.stringify(profile)}
        />
    ),

    RecentDevicesSettings: ({
        devices,
        loading,
    }: {
        devices: DeviceSession[]
        loading: boolean
    }) => (
        <div
            data-testid="recent-devices-settings"
            data-loading={String(loading)}
            data-count={devices.length}
        />
    ),

    SocialAccountsSettings: ({
        accounts,
        loading,
    }: {
        accounts: SocialAccount[]
        loading: boolean
    }) => (
        <div
            data-testid="social-accounts-settings"
            data-loading={String(loading)}
            data-count={accounts.length}
        />
    ),
}))

const mockSettings = {
    profile: {
        avatar: '/avatars/john.jpg',
        name: 'John Doe',
        role: 'Administrator',
    } as SettingsProfile,

    preferences: {
        language: 'en',
        timezone: 'America/Sao_Paulo',
    } as SettingsPreferences,

    socialAccounts: [
        {
            id: 1,
            platform: 'github',
            connected: true,
            url: 'https://github.com/johndoe',
        },
    ] as SocialAccount[],

    generalInformation: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'Administrator',
        phone: '+5511999999999',
        birthDate: '1990-01-01',
        organization: 'Example',
        department: 'Engineering',
        address: 'Main Street',
        city: 'Curitiba',
        country: 'BR',
        zipCode: '80000000',
    } as GeneralInformation,

    connectedAccounts: [
        {
            id: 1,
            name: 'Google',
            avatar: '/avatars/google.png',
            city: 'Curitiba',
            lastSeen: '2026-10-12',
        },
    ] as ConnectedAccount[],

    notifications: {
        companyNews: true,
        accountActivity: true,
        meetupsNearYou: false,
        newMessages: true,
    } as NotificationPreferences,

    emailSettings: {
        ratingReminders: true,
        itemUpdateNotifications: false,
        itemCommentNotifications: true,
        buyerReviewNotifications: false,
    } as EmailPreferences,

    recentDevices: [
        {
            id: 1,
            browser: 'Chrome',
            device: 'Desktop',
            location: 'Curitiba, Brazil',
            lastAccessed: '2026-10-12',
        },
    ] as DeviceSession[],
}

const renderSettingsPage = (settings = mockSettings, loading = false) => {
    mocks.useSettings.mockReturnValue({ settings, loading })

    return render(<SettingsPage />)
}

describe('SettingsPage', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the unavailable state when settings are null', () => {
        mocks.useSettings.mockReturnValue({
            settings: null,
            loading: false,
        })

        render(<SettingsPage />)

        expect(
            screen.getByRole('heading', { name: 'Settings unavailable' }),
        ).toBeInTheDocument()

        expect(
            screen.getByText(
                "We couldn't load your account settings. Please try again later.",
            ),
        ).toBeInTheDocument()

        expect(screen.getByTestId('settings-icon')).toBeInTheDocument()
        expect(screen.getByTestId('empty-state')).toBeInTheDocument()
        expect(screen.queryByTestId('profile-settings')).not.toBeInTheDocument()
    })

    it('calls the useSettings hook', () => {
        mocks.useSettings.mockReturnValue({
            settings: mockSettings,
            loading: false,
        })

        render(<SettingsPage />)

        expect(useSettings).toHaveBeenCalledTimes(1)
    })

    it('renders the settings page when settings are available', () => {
        const { container } = renderSettingsPage()

        expect(container.querySelector('section')).toBeInTheDocument()

        expect(screen.queryByTestId('empty-state')).not.toBeInTheDocument()
    })

    it('renders all nine settings sections', () => {
        renderSettingsPage()

        const sections = [
            'profile-settings',
            'language-time-settings',
            'social-accounts-settings',
            'general-information-settings',
            'connected-accounts-settings',
            'password-settings',
            'notification-settings',
            'email-settings',
            'recent-devices-settings',
        ]

        sections.forEach((section) => {
            expect(screen.getByTestId(section)).toBeInTheDocument()
        })
    })

    it.each([
        'profile-settings',
        'language-time-settings',
        'social-accounts-settings',
        'general-information-settings',
        'connected-accounts-settings',
        'password-settings',
        'notification-settings',
        'email-settings',
        'recent-devices-settings',
    ])('passes loading=false to %s when settings are loaded', (section) => {
        renderSettingsPage(mockSettings, false)

        expect(screen.getByTestId(section)).toHaveAttribute(
            'data-loading',
            'false',
        )
    })

    it.each([
        'profile-settings',
        'language-time-settings',
        'social-accounts-settings',
        'general-information-settings',
        'connected-accounts-settings',
        'password-settings',
        'notification-settings',
        'email-settings',
        'recent-devices-settings',
    ])('passes loading=true to %s while settings are loading', (section) => {
        renderSettingsPage(mockSettings, true)

        expect(screen.getByTestId(section)).toHaveAttribute(
            'data-loading',
            'true',
        )
    })

    it('passes profile data to ProfileSettings', () => {
        renderSettingsPage()

        expect(screen.getByTestId('profile-settings')).toHaveAttribute(
            'data-profile',
            JSON.stringify(mockSettings.profile),
        )
    })

    it('passes language and timezone preferences to LanguageTimeSettings', () => {
        renderSettingsPage()

        expect(screen.getByTestId('language-time-settings')).toHaveAttribute(
            'data-preferences',
            JSON.stringify(mockSettings.preferences),
        )
    })

    it('passes social accounts to SocialAccountsSettings', () => {
        renderSettingsPage()

        expect(screen.getByTestId('social-accounts-settings')).toHaveAttribute(
            'data-count',
            '1',
        )
    })

    it('passes general information to GeneralInformationSettings', () => {
        renderSettingsPage()

        expect(
            screen.getByTestId('general-information-settings'),
        ).toHaveAttribute(
            'data-data',
            JSON.stringify(mockSettings.generalInformation),
        )
    })

    it('passes connected accounts to ConnectedAccountsSettings', () => {
        renderSettingsPage()

        expect(
            screen.getByTestId('connected-accounts-settings'),
        ).toHaveAttribute('data-count', '1')
    })

    it('renders PasswordSettings without additional settings data', () => {
        renderSettingsPage()

        expect(screen.getByTestId('password-settings')).toBeInTheDocument()
    })

    it('passes notification preferences to NotificationSettings', () => {
        renderSettingsPage()

        expect(screen.getByTestId('notification-settings')).toHaveAttribute(
            'data-preferences',
            JSON.stringify(mockSettings.notifications),
        )
    })

    it('passes email preferences to EmailSettings', () => {
        renderSettingsPage()

        expect(screen.getByTestId('email-settings')).toHaveAttribute(
            'data-preferences',
            JSON.stringify(mockSettings.emailSettings),
        )
    })

    it('passes recent devices to RecentDevicesSettings', () => {
        renderSettingsPage()

        expect(screen.getByTestId('recent-devices-settings')).toHaveAttribute(
            'data-count',
            '1',
        )
    })

    it('renders all settings sections when loading is true and settings exist', () => {
        renderSettingsPage(mockSettings, true)

        expect(screen.getAllByText).toBeDefined()

        expect(screen.getByTestId('profile-settings')).toBeInTheDocument()
        expect(screen.getByTestId('language-time-settings')).toBeInTheDocument()
        expect(
            screen.getByTestId('social-accounts-settings'),
        ).toBeInTheDocument()
        expect(
            screen.getByTestId('general-information-settings'),
        ).toBeInTheDocument()
        expect(
            screen.getByTestId('connected-accounts-settings'),
        ).toBeInTheDocument()
        expect(screen.getByTestId('password-settings')).toBeInTheDocument()
        expect(screen.getByTestId('notification-settings')).toBeInTheDocument()
        expect(screen.getByTestId('email-settings')).toBeInTheDocument()
        expect(
            screen.getByTestId('recent-devices-settings'),
        ).toBeInTheDocument()
    })
})

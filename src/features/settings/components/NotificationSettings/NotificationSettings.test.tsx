import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useNotificationPreferences } from '@/features/settings/hooks'
import { NotificationSettings } from './NotificationSettings'
import type { NotificationPreferences } from '@/features/settings/types'
import userEvent from '@testing-library/user-event'

const mocks = vi.hoisted(() => ({
    updateNotification: vi.fn(),
}))

vi.mock('@/features/settings/hooks', () => ({
    useNotificationPreferences: vi.fn(),
}))

vi.mock('./NotificationSettingsSkeleton', () => ({
    NotificationSettingsSkeleton: () => (
        <div data-testid="notification-settings-skeleton">
            Loading notification settings
        </div>
    ),
}))

vi.mock('@/features/settings/components', async (importOriginal) => {
    const actual =
        await importOriginal<typeof import('@/features/settings/components')>()

    return {
        ...actual,
        SettingsToggleItem: ({
            label,
            description,
            enabled,
            onChange,
        }: {
            label: string
            description: string
            enabled: boolean
            onChange: () => void
        }) => (
            <div>
                <h3>{label}</h3>
                <p>{description}</p>
                <button
                    type="button"
                    role="switch"
                    aria-label={label}
                    aria-checked={enabled}
                    onClick={onChange}
                >
                    {enabled ? 'Enabled' : 'Disabled'}
                </button>
            </div>
        ),
        SettingsToggleList: ({ children }: { children: React.ReactNode }) => (
            <div data-testid="settings-toggle-list">{children}</div>
        ),
    }
})

const defaultPreferences: NotificationPreferences = {
    companyNews: true,
    accountActivity: false,
    meetupsNearYou: true,
    newMessages: false,
}

const notificationItems = [
    {
        label: 'Company News',
        description:
            'Receive news, announcements, and updates about the platform',
        field: 'companyNews',
    },
    {
        label: 'Account Activity',
        description:
            'Receive important notifications about your account and recent activity',
        field: 'accountActivity',
    },
    {
        label: 'Meetups Near You',
        description:
            'Receive notifications about events and meetups happening near your location',
        field: 'meetupsNearYou',
    },
    {
        label: 'New Messages',
        description:
            'Receive notifications when you get new messages or conversations',
        field: 'newMessages',
    },
] as const

const setup = (
    notificationPreferences = defaultPreferences,
    loading = false,
) => {
    vi.mocked(useNotificationPreferences).mockReturnValue({
        updateNotification: mocks.updateNotification,
    })

    return render(
        <NotificationSettings
            notificationPreferences={notificationPreferences}
            loading={loading}
        />,
    )
}

describe('NotificationSettings', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the skeleton while loading', () => {
        setup(defaultPreferences, true)

        expect(
            screen.getByTestId('notification-settings-skeleton'),
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'Alerts & Notifications',
            }),
        ).not.toBeInTheDocument()
    })

    it('renders the settings card title', () => {
        setup()

        expect(
            screen.getByRole('heading', {
                name: 'Alerts & Notifications',
            }),
        ).toBeInTheDocument()
    })

    it('renders the settings card description', () => {
        setup()

        expect(
            screen.getByText('Manage how and when you receive notifications'),
        ).toBeInTheDocument()
    })

    it('renders the toggle list', () => {
        setup()

        expect(screen.getByTestId('settings-toggle-list')).toBeInTheDocument()
    })

    it('renders all four notification options', () => {
        setup()

        notificationItems.forEach(({ label }) => {
            expect(
                screen.getByRole('switch', { name: label }),
            ).toBeInTheDocument()
        })

        expect(screen.getAllByRole('switch')).toHaveLength(4)
    })

    it.each(notificationItems)(
        'renders the description for $label',
        ({ label, description }) => {
            setup()

            expect(
                screen.getByRole('heading', { name: label }),
            ).toBeInTheDocument()

            expect(screen.getByText(description)).toBeInTheDocument()
        },
    )

    it.each(notificationItems)(
        'renders the initial state of $label',
        ({ label, field }) => {
            setup()

            expect(screen.getByRole('switch', { name: label })).toHaveAttribute(
                'aria-checked',
                String(defaultPreferences[field]),
            )
        },
    )

    it.each(notificationItems)(
        'calls updateNotification with $field when $label is clicked',
        async ({ label, field }) => {
            const user = userEvent.setup()

            setup()

            await user.click(screen.getByRole('switch', { name: label }))

            expect(mocks.updateNotification).toHaveBeenCalledTimes(1)
            expect(mocks.updateNotification).toHaveBeenCalledWith(field)
        },
    )

    it('passes the notification preferences to the hook', () => {
        const preferences: NotificationPreferences = {
            companyNews: false,
            accountActivity: true,
            meetupsNearYou: false,
            newMessages: true,
        }

        setup(preferences)

        expect(useNotificationPreferences).toHaveBeenCalledWith(preferences)
    })

    it('calls the hook even while loading', () => {
        setup(defaultPreferences, true)

        expect(useNotificationPreferences).toHaveBeenCalledWith(
            defaultPreferences,
        )
    })

    it('renders the correct switch states when all preferences are disabled', () => {
        const preferences: NotificationPreferences = {
            companyNews: false,
            accountActivity: false,
            meetupsNearYou: false,
            newMessages: false,
        }

        setup(preferences)

        expect(screen.getAllByRole('switch', { checked: false })).toHaveLength(
            4,
        )
    })

    it('renders the correct switch states when all preferences are enabled', () => {
        const preferences: NotificationPreferences = {
            companyNews: true,
            accountActivity: true,
            meetupsNearYou: true,
            newMessages: true,
        }

        setup(preferences)

        expect(screen.getAllByRole('switch', { checked: true })).toHaveLength(4)
    })
})

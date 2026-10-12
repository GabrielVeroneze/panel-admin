import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { SocialAccountsSettings } from './SocialAccountsSettings'
import type { SocialAccount } from '@/features/settings/types'
import type { ReactNode } from 'react'

const mocks = vi.hoisted(() => ({
    socialAccountItem: vi.fn(),
}))

vi.mock('@/shared/components', () => ({
    Card: ({ children }: { children: ReactNode }) => (
        <div data-testid="card">{children}</div>
    ),
    EmptyState: ({
        title,
        description,
    }: {
        title: string
        description?: string
    }) => (
        <div data-testid="empty-state">
            <h3>{title}</h3>
            {description && <p>{description}</p>}
        </div>
    ),
}))

vi.mock('@/features/settings/components', () => ({
    SettingsCard: ({
        children,
        title,
    }: {
        children: ReactNode
        title: string
    }) => (
        <section data-testid="settings-card">
            <h2>{title}</h2>
            {children}
        </section>
    ),
}))

vi.mock('./SocialAccountItem/SocialAccountItem', () => ({
    SocialAccountItem: ({ account }: { account: SocialAccount }) => {
        mocks.socialAccountItem(account)

        return (
            <div data-testid="social-account-item">
                <span>{account.platform}</span>
                <span>{account.connected ? 'Connected' : 'Disconnected'}</span>
                <span>{account.id}</span>
            </div>
        )
    },
}))

vi.mock('./SocialAccountsSettingsSkeleton', () => ({
    SocialAccountsSettingsSkeleton: () => (
        <div data-testid="social-accounts-settings-skeleton">
            Loading social accounts
        </div>
    ),
}))

const accounts: SocialAccount[] = [
    {
        id: 1,
        platform: 'github',
        connected: true,
        url: 'github.com/johndoe',
    },
    {
        id: 2,
        platform: 'twitter',
        connected: false,
    },
    {
        id: 3,
        platform: 'facebook',
        connected: true,
        url: 'facebook.com/johndoe',
    },
]

describe('SocialAccountsSettings', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the skeleton while loading', () => {
        render(<SocialAccountsSettings accounts={accounts} loading />)

        expect(
            screen.getByTestId('social-accounts-settings-skeleton'),
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', { name: 'Social accounts' }),
        ).not.toBeInTheDocument()
    })

    it('renders the empty state when accounts are undefined', () => {
        render(<SocialAccountsSettings loading={false} />)

        expect(screen.getByTestId('empty-state')).toBeInTheDocument()
        expect(
            screen.getByRole('heading', { name: 'No social accounts' }),
        ).toBeInTheDocument()
        expect(
            screen.getByText('There are no social accounts available.'),
        ).toBeInTheDocument()
    })

    it('renders the empty state when the accounts array is empty', () => {
        render(<SocialAccountsSettings accounts={[]} loading={false} />)

        expect(
            screen.getByRole('heading', { name: 'No social accounts' }),
        ).toBeInTheDocument()

        expect(screen.queryByTestId('settings-card')).not.toBeInTheDocument()

        expect(
            screen.queryByTestId('social-account-item'),
        ).not.toBeInTheDocument()
    })

    it('renders the settings card with the correct title', () => {
        render(<SocialAccountsSettings accounts={accounts} loading={false} />)

        expect(
            screen.getByRole('heading', { name: 'Social accounts' }),
        ).toBeInTheDocument()
    })

    it('renders one item for each social account', () => {
        render(<SocialAccountsSettings accounts={accounts} loading={false} />)

        expect(screen.getAllByTestId('social-account-item')).toHaveLength(
            accounts.length,
        )
    })

    it.each(accounts)(
        'passes the account $platform to SocialAccountItem',
        (account) => {
            render(
                <SocialAccountsSettings accounts={[account]} loading={false} />,
            )

            expect(mocks.socialAccountItem).toHaveBeenCalledWith(account)
        },
    )

    it('renders the platform and connection status for each account', () => {
        render(<SocialAccountsSettings accounts={accounts} loading={false} />)

        const items = screen.getAllByTestId('social-account-item')

        expect(within(items[0]).getByText('github')).toBeInTheDocument()
        expect(within(items[0]).getByText('Connected')).toBeInTheDocument()

        expect(within(items[1]).getByText('twitter')).toBeInTheDocument()
        expect(within(items[1]).getByText('Disconnected')).toBeInTheDocument()

        expect(within(items[2]).getByText('facebook')).toBeInTheDocument()
        expect(within(items[2]).getByText('Connected')).toBeInTheDocument()
    })

    it('does not render the empty state when accounts exist', () => {
        render(<SocialAccountsSettings accounts={accounts} loading={false} />)

        expect(
            screen.queryByRole('heading', { name: 'No social accounts' }),
        ).not.toBeInTheDocument()

        expect(screen.getAllByTestId('social-account-item')).toHaveLength(
            accounts.length,
        )
    })

    it('does not render the skeleton when loading is false', () => {
        render(<SocialAccountsSettings accounts={accounts} loading={false} />)

        expect(
            screen.queryByTestId('social-accounts-settings-skeleton'),
        ).not.toBeInTheDocument()
    })

    it('renders consistently when mounted multiple times', () => {
        const { unmount } = render(
            <SocialAccountsSettings accounts={accounts} loading={false} />,
        )

        expect(screen.getAllByTestId('social-account-item')).toHaveLength(
            accounts.length,
        )

        unmount()

        render(<SocialAccountsSettings accounts={accounts} loading={false} />)

        expect(screen.getAllByTestId('social-account-item')).toHaveLength(
            accounts.length,
        )
    })
})

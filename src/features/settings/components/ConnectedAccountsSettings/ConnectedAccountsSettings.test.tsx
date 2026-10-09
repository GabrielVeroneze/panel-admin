import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ConnectedAccountsSettings } from './ConnectedAccountsSettings'
import type { ConnectedAccount } from '@/features/settings/types'

vi.mock('./ConnectedAccountItem/ConnectedAccountItem', () => ({
    ConnectedAccountItem: ({ account }: { account: ConnectedAccount }) => (
        <div data-testid="connected-account-item">
            <span>{account.name}</span>
            <span>{account.city}</span>
            <span>{account.lastSeen}</span>
        </div>
    ),
}))

vi.mock('./ConnectedAccountsSettingsSkeleton', () => ({
    ConnectedAccountsSettingsSkeleton: () => (
        <div data-testid="connected-accounts-skeleton">
            Loading connected accounts
        </div>
    ),
}))

describe('ConnectedAccountsSettings', () => {
    const accounts: ConnectedAccount[] = [
        {
            id: 1,
            name: 'John Doe',
            avatar: '/avatars/john.png',
            city: 'New York',
            lastSeen: '2 hours ago',
        },
        {
            id: 2,
            name: 'Jane Smith',
            avatar: '/avatars/jane.png',
            city: 'London',
            lastSeen: 'Yesterday',
        },
    ]

    it('renders the skeleton while loading', () => {
        render(<ConnectedAccountsSettings accounts={accounts} loading />)

        expect(
            screen.getByTestId('connected-accounts-skeleton'),
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'Connected accounts',
            }),
        ).not.toBeInTheDocument()

        expect(
            screen.queryByTestId('connected-account-item'),
        ).not.toBeInTheDocument()
    })

    it('renders the empty state when accounts are undefined', () => {
        render(<ConnectedAccountsSettings loading={false} />)

        expect(screen.getByText('No connected accounts')).toBeInTheDocument()

        expect(
            screen.getByText('There are no connected accounts to display.'),
        ).toBeInTheDocument()

        expect(
            screen.queryByRole('heading', {
                name: 'Connected accounts',
            }),
        ).not.toBeInTheDocument()
    })

    it('renders the empty state when accounts are empty', () => {
        render(<ConnectedAccountsSettings accounts={[]} loading={false} />)

        expect(screen.getByText('No connected accounts')).toBeInTheDocument()

        expect(
            screen.getByText('There are no connected accounts to display.'),
        ).toBeInTheDocument()
    })

    it('renders the section title when accounts are available', () => {
        render(
            <ConnectedAccountsSettings accounts={accounts} loading={false} />,
        )

        expect(
            screen.getByRole('heading', {
                name: 'Connected accounts',
            }),
        ).toBeInTheDocument()
    })

    it('renders an item for each connected account', () => {
        render(
            <ConnectedAccountsSettings accounts={accounts} loading={false} />,
        )

        expect(screen.getAllByTestId('connected-account-item')).toHaveLength(2)
    })

    it('renders the information for each connected account', () => {
        render(
            <ConnectedAccountsSettings accounts={accounts} loading={false} />,
        )

        expect(screen.getByText('John Doe')).toBeInTheDocument()
        expect(screen.getByText('New York')).toBeInTheDocument()
        expect(screen.getByText('2 hours ago')).toBeInTheDocument()

        expect(screen.getByText('Jane Smith')).toBeInTheDocument()
        expect(screen.getByText('London')).toBeInTheDocument()
        expect(screen.getByText('Yesterday')).toBeInTheDocument()
    })

    it('renders the empty state instead of the list when accounts are empty', () => {
        render(<ConnectedAccountsSettings accounts={[]} loading={false} />)

        expect(
            screen.queryByTestId('connected-account-item'),
        ).not.toBeInTheDocument()
    })

    it('prioritizes loading over the empty state', () => {
        render(<ConnectedAccountsSettings accounts={[]} loading />)

        expect(
            screen.getByTestId('connected-accounts-skeleton'),
        ).toBeInTheDocument()

        expect(
            screen.queryByText('No connected accounts'),
        ).not.toBeInTheDocument()
    })
})
